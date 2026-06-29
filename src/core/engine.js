import { GAME_CONFIG } from "./config.js";
import { ACHIEVEMENTS } from "../data/achievements.js";
import { AMBITIONS } from "../data/ambitions.js";
import { DECREE_POOL } from "../data/decrees.js";
import { BOMB_EVENTS, EVENT_POOL } from "../data/events/index.js";
import { ENDING_RULES } from "../data/endings.js";
import { ERA_LIST } from "../data/eras.js";
import { buildHistoryRecord } from "../data/historyTitles.js";
import { addHistoryRecord, loadAchievements, saveAchievements } from "./storage.js";
import { advanceMonth, applyEffects, clamp } from "./state.js";

export function getEra(state) {
  return ERA_LIST.find((era) => era.id === state.era) || null;
}

export function getCurrentDateLabel(state) {
  const era = getEra(state);
  const eraName = era ? era.name : "无年号";
  return `${eraName}${state.year}年 · ${GAME_CONFIG.months[state.monthIndex]}`;
}

export function getAmbition(state) {
  return AMBITIONS.find((ambition) => ambition.id === state.ambition) || null;
}

export function getTurn(state) {
  return (state.year - 1) * 12 + state.monthIndex;
}

export function selectAmbition(state, ambitionId) {
  const ambition = AMBITIONS.find((item) => item.id === ambitionId);
  if (!ambition) return false;
  state.ambition = ambition.id;
  addChronicle(state, "王朝志向", `新帝定下「${ambition.title}」：${ambition.flavor}`);
  startNextEvent(state);
  return true;
}

export function startNextEvent(state) {
  state.achievementsUnlockedNow = [];
  state.ambitionRewardText = "";
  state.lastResponse = null;
  state.pendingEnding = checkEnding(state);
  if (state.pendingEnding) {
    finishGame(state, state.pendingEnding);
    return;
  }

  if (shouldOfferDecree(state)) {
    state.decreeChoices = buildDecreeChoices(state);
    state.screen = "decree";
    return;
  }

  state.currentEvent = pickEvent(state);
  state.screen = "main";
}

export function continueToNextMonth(state) {
  advanceMonth(state);
  applyMonthlyDecrees(state);
  expireDecrees(state);
  startNextEvent(state);
}

export function chooseDecree(state, decreeId) {
  const decree = state.decreeChoices.find((item) => item.id === decreeId) || DECREE_POOL.find((item) => item.id === decreeId);
  if (!decree) return false;
  const turn = getTurn(state);
  const before = snapshotValues(state);
  applyEffects(state, decree.immediateEffects);
  state.activeDecrees = [
    ...state.activeDecrees.filter((item) => item.id !== decree.id),
    {
      id: decree.id,
      title: decree.title,
      description: decree.description,
      monthlyEffects: decree.monthlyEffects,
      expiresTurn: turn + decree.duration
    }
  ].slice(-3);
  state.nextDecreeTurn = turn + 18;
  state.decreeChoices = [];
  state.lastResponse = {
    eventTitle: "阶段诏令",
    selectedText: decree.title,
    response: decree.response,
    changes: diffValues(before, snapshotValues(state))
  };
  addChronicle(state, "颁布诏令", `颁行「${decree.title}」。${decree.response}`);
  state.screen = "decreeResult";
  return true;
}

export function pickEvent(state) {
  const bomb = pickBombEvent(state);
  if (bomb) return bomb;

  const era = getEra(state);
  const candidates = EVENT_POOL.filter((event) => matchesConditions(event.conditions, state));
  const weighted = candidates.map((event) => {
    let weight = event.weight || 1;
    if (era) {
      event.tags.forEach((tag) => {
        weight += era.tagWeights[tag] || 0;
      });
    }
    if (state.seenEventIds.includes(event.id)) weight = Math.max(1, Math.floor(weight * 0.12));
    return { event, weight };
  });

  return weightedPick(weighted).event;
}

function pickBombEvent(state) {
  const currentTurn = state.year * 12 + state.monthIndex;
  const candidates = BOMB_EVENTS.filter((event) => {
    const hiddenKey = event.bombKey;
    const cooldownUntil = state.bombCooldown[hiddenKey] || 0;
    return currentTurn >= cooldownUntil && matchesConditions(event.conditions, state);
  });

  if (!candidates.length) return null;
  const picked = weightedPick(candidates.map((event) => ({ event, weight: event.weight || 10 }))).event;
  state.bombCooldown[picked.bombKey] = currentTurn + GAME_CONFIG.bombCooldownMonths;
  return picked;
}

function weightedPick(items) {
  const total = items.reduce((sum, item) => sum + item.weight, 0);
  let roll = Math.random() * total;
  for (const item of items) {
    roll -= item.weight;
    if (roll <= 0) return item;
  }
  return items[items.length - 1];
}

export function applyOption(state, optionIndex) {
  const event = state.currentEvent;
  const option = event.options[optionIndex];
  if (!event || !option) return;

  const before = snapshotValues(state);
  applyEffects(state, option.effects);
  updateCounters(state, event, option);
  updateSoftSignals(state);
  const changes = diffValues(before, snapshotValues(state));

  state.seenEventIds = [event.id, ...state.seenEventIds.filter((id) => id !== event.id)].slice(0, 72);
  state.counters.totalChoices += 1;
  state.lastResponse = {
    eventTitle: event.title,
    selectedText: option.text,
    response: option.response,
    changes
  };
  addChronicle(state, event.category === "bomb" ? `爆雷：${event.title}` : event.title, `选择「${option.text}」。${option.response}`);
  checkAmbition(state);

  const unlocked = checkAchievements(state);
  state.achievementsUnlockedNow = unlocked;
  state.pendingEnding = checkEnding(state);
  if (state.pendingEnding) {
    finishGame(state, state.pendingEnding);
  } else {
    state.screen = "response";
  }
}

function snapshotValues(state) {
  return { ...state.stats, ...state.meta, ...state.hidden };
}

function diffValues(before, after) {
  return Object.entries(after)
    .map(([key, value]) => ({ key, delta: value - before[key], value }))
    .filter((item) => item.delta !== 0);
}

function updateCounters(state, event, option) {
  Object.entries(option.counters || {}).forEach(([key, delta]) => {
    state.counters[key] = (state.counters[key] || 0) + delta;
  });

  const mistakeTag = option.mistakeTag || event.tags.find((tag) => ["征税", "摆烂", "太监", "炼丹", "宫殿", "镇压"].includes(tag)) || "";
  if (mistakeTag && option.effects && hasMostlyBadHiddenEffect(option.effects)) {
    if (state.counters.lastMistakeTag === mistakeTag) {
      state.counters.sameMistakeStreak += 1;
    } else {
      state.counters.lastMistakeTag = mistakeTag;
      state.counters.sameMistakeStreak = 1;
    }
  }

  if (!option.counters?.noCourtStreak && event.category === "court") {
    state.counters.noCourtStreak = 0;
  }

  if (!option.counters?.consecutivePills) {
    state.counters.consecutivePills = 0;
  }

  if (mistakeTag || hasMostlyBadHiddenEffect(option.effects || {})) {
    state.counters.absurdChoices += 1;
  }

  if (event.category === "bomb" && event.tags.includes("起义")) {
    state.counters.uprisingCount += 1;
  }
}

function hasMostlyBadHiddenEffect(effects) {
  return Object.entries(effects).some(([key, delta]) => GAME_CONFIG.hiddenStats.includes(key) && delta > 0);
}

function updateSoftSignals(state) {
  const allLow = Object.values(state.stats).every((value) => value < 20);
  if (allLow && state.stats.happiness > 90) state.counters.lowAllHighHappy += 1;
  state.meta.health = clamp(state.meta.health, ...GAME_CONFIG.statBounds.meta);
  state.meta.prestige = clamp(state.meta.prestige, ...GAME_CONFIG.statBounds.meta);
}

function shouldOfferDecree(state) {
  return state.ambition && getTurn(state) >= (state.nextDecreeTurn ?? 18) && !state.pendingEnding;
}

function buildDecreeChoices(state) {
  const activeIds = new Set(state.activeDecrees.map((item) => item.id));
  const scored = DECREE_POOL
    .filter((decree) => !activeIds.has(decree.id))
    .map((decree) => ({ decree, score: scoreDecree(decree, state) + Math.random() * 5 }))
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, 3).map((item) => item.decree);
}

function scoreDecree(decree, state) {
  let score = 10;
  const effects = { ...decree.immediateEffects, ...decree.monthlyEffects };
  Object.entries(effects).forEach(([key, delta]) => {
    if (key in state.stats && state.stats[key] < 35 && delta > 0) score += 8;
    if (key in state.hidden && state.hidden[key] > 55 && delta < 0) score += 8;
    if (key === "health" && state.meta.health < 35 && delta > 0) score += 6;
    if (key === "treasury" && state.stats.treasury < 30 && delta > 0) score += 5;
  });
  return score;
}

function applyMonthlyDecrees(state) {
  state.activeDecrees.forEach((decree) => {
    applyEffects(state, decree.monthlyEffects);
  });
}

function expireDecrees(state) {
  const turn = getTurn(state);
  const expired = state.activeDecrees.filter((decree) => decree.expiresTurn <= turn);
  expired.forEach((decree) => {
    addChronicle(state, "诏令期满", `「${decree.title}」到期，六部松了口气，户部看情况决定要不要哭。`);
  });
  state.activeDecrees = state.activeDecrees.filter((decree) => decree.expiresTurn > turn);
}

function checkAmbition(state) {
  if (state.ambitionCompleted) return;
  const ambition = getAmbition(state);
  if (!ambition || !ambition.condition(state)) return;
  applyEffects(state, ambition.reward);
  state.ambitionCompleted = true;
  state.ambitionRewardText = ambition.rewardText;
  addChronicle(state, "志向达成", `「${ambition.title}」达成。${ambition.rewardText}`);
}

function addChronicle(state, title, text) {
  const entry = {
    turn: getTurn(state),
    date: getCurrentDateLabel(state),
    title,
    text
  };
  state.chronicle = [entry, ...(state.chronicle || [])].slice(0, 80);
}

function matchesConditions(conditions = {}, state) {
  return Object.entries(conditions).every(([key, expected]) => {
    const actual = readConditionValue(key, state);
    if (key.endsWith("Min")) return actual >= expected;
    if (key.endsWith("Max")) return actual <= expected;
    return actual === expected;
  });
}

function readConditionValue(key, state) {
  const clean = key.replace(/Min$|Max$/, "");
  const aliases = {
    year: state.year,
    month: state.monthIndex + 1,
    age: state.age,
    era: state.era,
    ambition: state.ambition
  };
  if (clean in aliases) return aliases[clean];
  if (clean in state.stats) return state.stats[clean];
  if (clean in state.meta) return state.meta[clean];
  if (clean in state.hidden) return state.hidden[clean];
  if (clean in state.counters) return state.counters[clean];
  return 0;
}

export function checkEnding(state) {
  return ENDING_RULES
    .slice()
    .sort((a, b) => b.priority - a.priority)
    .find((ending) => ending.condition(state)) || null;
}

function checkAchievements(state) {
  const saved = loadAchievements();
  const unlocked = [];
  ACHIEVEMENTS.forEach((achievement) => {
    if (!saved[achievement.id] && achievement.condition(state)) {
      saved[achievement.id] = {
        id: achievement.id,
        unlockedAt: new Date().toISOString()
      };
      unlocked.push(achievement);
    }
  });
  if (unlocked.length) saveAchievements(saved);
  return unlocked;
}

export function finishGame(state, ending) {
  state.ending = ending;
  state.screen = "ending";
  const record = buildHistoryRecord(state, ending);
  state.historyRecord = record;
  addHistoryRecord(record);
  checkAchievements(state);
}
