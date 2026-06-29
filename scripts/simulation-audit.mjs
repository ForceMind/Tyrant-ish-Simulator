import { AMBITIONS } from "../src/data/ambitions.js";
import { ENDING_RULES } from "../src/data/endings.js";
import { ERA_LIST } from "../src/data/eras.js";
import { applyOption, chooseDecree, continueToNextMonth, selectAmbition, startNextEvent } from "../src/core/engine.js";
import { applyEraToState, createInitialState } from "../src/core/state.js";

globalThis.localStorage = {
  store: new Map(),
  getItem(key) {
    return this.store.has(key) ? this.store.get(key) : null;
  },
  setItem(key, value) {
    this.store.set(key, String(value));
  },
  removeItem(key) {
    this.store.delete(key);
  }
};

const MAIN_KEYS = ["treasury", "people", "army", "court", "happiness"];
const HIDDEN_KEYS = ["corruption", "resentment", "famine", "disease", "enemy", "intrigue", "eunuch", "princeAmbition", "mandate"];

const PROFILES = [
  {
    id: "wise",
    label: "明君保守线",
    era: "qinzheng",
    ambition: "renovate_realm",
    weights: {
      treasury: 1.2,
      people: 2.2,
      army: 1.4,
      court: 2.1,
      happiness: 1.2,
      health: 2.2,
      prestige: 1.2,
      corruption: -2.4,
      resentment: -2.4,
      famine: -2.2,
      disease: -2.2,
      enemy: -2.1,
      intrigue: -1.8,
      eunuch: -2.2,
      princeAmbition: -1.6,
      mandate: 0.2
    }
  },
  {
    id: "eunuch",
    label: "太监放权线",
    era: "moyu",
    ambition: "happy_throne",
    weights: { eunuch: 5, court: -2.4, happiness: 1.4, health: 0.4, treasury: 0.3, corruption: 1.2 },
    counterWeights: { eunuchDelegations: 8 }
  },
  {
    id: "alchemy",
    label: "求仙嗑丹线",
    era: "qiuxian",
    ambition: "immortal_trial",
    weights: { health: -3.2, mandate: 2.4, treasury: -1.2, court: -1, happiness: 0.8, disease: 1.5 },
    counterWeights: { alchemyCount: 10, consecutivePills: 5 },
    tagWeights: { "炼丹": 3, "道士": 2, "祥瑞": 1 }
  },
  {
    id: "fiscal",
    label: "国库怪物线",
    era: "baofu",
    ambition: "golden_vault",
    weights: { treasury: 5, corruption: 3.2, people: -3.2, resentment: 1.8, court: -0.4 },
    counterWeights: { taxCount: 7 }
  },
  {
    id: "fallen",
    label: "亡国放火线",
    era: "tiequan",
    ambition: "quiet_frontier",
    weights: { people: -4, army: -3.8, resentment: 4.5, enemy: 4.5, court: -1.4, happiness: 0.8, health: -0.8 }
  },
  {
    id: "happy",
    label: "极乐摆烂线",
    era: "kaibai",
    ambition: "happy_throne",
    weights: { happiness: 5, people: -2.8, court: -2.8, army: -2.5, health: -0.8, treasury: -0.4 },
    tagWeights: { "摆烂": 2, "宴会": 2, "巡游": 2, "奢靡": 2 }
  },
  {
    id: "prince",
    label: "东宫失控线",
    era: "yongle",
    ambition: "happy_throne",
    weights: { princeAmbition: 5, intrigue: 2.2, health: -2.4, prestige: -2.2, happiness: 1, court: -0.8 },
    tagWeights: { "皇子": 3, "宫斗": 2, "外戚": 1 }
  },
  {
    id: "worker",
    label: "社畜勤政线",
    era: "qinzheng",
    ambition: "clean_court",
    weights: { court: 4.5, people: 4, happiness: -4.5, health: -4, prestige: 1.2, corruption: -1.4, resentment: -1.4 },
    tagWeights: { "改革": 2, "过劳": 4, "奏折": 1 }
  },
  {
    id: "collapse",
    label: "政令崩坏线",
    era: "moyu",
    ambition: "eunuch_leash",
    weights: { court: -5, prestige: -4.5, eunuch: 1.8, happiness: 1.2, corruption: 1.1 }
  }
];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function withSeed(seed, fn) {
  const originalRandom = Math.random;
  let value = seed % 2147483647;
  if (value <= 0) value += 2147483646;
  Math.random = () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
  try {
    return fn();
  } finally {
    Math.random = originalRandom;
  }
}

function runScenario(profile, seed, maxMonths = 216) {
  return withSeed(seed, () => {
    localStorage.store.clear();
    const state = createInitialState();
    applyEraToState(state, findById(ERA_LIST, profile.era));
    selectAmbition(state, findById(AMBITIONS, profile.ambition).id);

    const seenEvents = [];
    const duplicateEvents = [];
    const checkpoints = [];
    const seenSet = new Set();

    for (let month = 0; month < maxMonths && state.screen !== "ending"; month += 1) {
      if (state.screen === "decree") {
        chooseDecree(state, chooseDecreeId(state, profile));
        startNextEvent(state);
      }

      assert(state.screen === "main", `${profile.id} unexpected screen: ${state.screen}`);
      const eventId = state.currentEvent.id;
      if (state.currentEvent.category !== "bomb" && seenSet.has(eventId) && !eventId.startsWith("timeline_gap_")) {
        duplicateEvents.push(eventId);
      }
      seenSet.add(eventId);
      seenEvents.push(eventId);

      applyOption(state, chooseOptionIndex(state.currentEvent, profile));

      if ((month + 1) % 24 === 0 || state.screen === "ending") {
        checkpoints.push(snapshot(state, month + 1));
      }

      if (state.screen !== "ending") continueToNextMonth(state);
    }

    return {
      profile: profile.id,
      label: profile.label,
      seed,
      ending: state.ending?.id || "not_finished",
      endingTitle: state.ending?.title || "未结局",
      months: state.counters.totalChoices,
      year: state.year,
      uniqueEvents: seenSet.size,
      duplicateEvents,
      timelineGaps: seenEvents.filter((id) => id.startsWith("timeline_gap_")).length,
      checkpoints,
      final: snapshot(state, state.counters.totalChoices)
    };
  });
}

function chooseOptionIndex(event, profile) {
  let bestIndex = 0;
  let bestScore = -Infinity;
  event.options.forEach((option, index) => {
    const score = scoreOption(event, option, profile);
    if (score > bestScore) {
      bestScore = score;
      bestIndex = index;
    }
  });
  return bestIndex;
}

function scoreOption(event, option, profile) {
  let score = 0;
  Object.entries(option.effects || {}).forEach(([key, delta]) => {
    score += (profile.weights[key] || 0) * delta;
  });
  Object.entries(option.counters || {}).forEach(([key, delta]) => {
    score += (profile.counterWeights?.[key] || 0) * delta;
  });
  (event.tags || []).forEach((tag) => {
    score += profile.tagWeights?.[tag] || 0;
  });
  return score;
}

function chooseDecreeId(state, profile) {
  let best = state.decreeChoices[0];
  let bestScore = -Infinity;
  state.decreeChoices.forEach((decree) => {
    const effects = { ...decree.immediateEffects, ...decree.monthlyEffects };
    const score = Object.entries(effects).reduce((sum, [key, delta]) => sum + (profile.weights[key] || 0) * delta, 0);
    if (score > bestScore) {
      bestScore = score;
      best = decree;
    }
  });
  return best.id;
}

function findById(items, id) {
  const item = items.find((candidate) => candidate.id === id);
  assert(item, `missing id: ${id}`);
  return item;
}

function snapshot(state, month) {
  return {
    month,
    stats: pickKeys(state.stats, MAIN_KEYS),
    meta: { health: state.meta.health, prestige: state.meta.prestige },
    hidden: pickKeys(state.hidden, HIDDEN_KEYS),
    counters: {
      totalChoices: state.counters.totalChoices,
      taxCount: state.counters.taxCount,
      eunuchDelegations: state.counters.eunuchDelegations,
      alchemyCount: state.counters.alchemyCount,
      uprisingCount: state.counters.uprisingCount,
      absurdChoices: state.counters.absurdChoices
    }
  };
}

function pickKeys(source, keys) {
  return Object.fromEntries(keys.map((key) => [key, source[key]]));
}

function summarize(results) {
  const endingCounts = {};
  const profileSummary = {};
  results.forEach((result) => {
    endingCounts[result.ending] = (endingCounts[result.ending] || 0) + 1;
    if (!profileSummary[result.profile]) profileSummary[result.profile] = [];
    profileSummary[result.profile].push({
      seed: result.seed,
      ending: result.ending,
      months: result.months,
      timelineGaps: result.timelineGaps,
      duplicateEvents: result.duplicateEvents.length,
      finalStats: result.final.stats,
      finalHidden: result.final.hidden
    });
  });
  return { endingCounts, profileSummary };
}

const seeds = [101, 202, 303, 404, 505];
const results = PROFILES.flatMap((profile, profileIndex) => (
  seeds.map((seed) => runScenario(profile, seed + profileIndex * 1000))
));

const duplicateCount = results.reduce((sum, result) => sum + result.duplicateEvents.length, 0);
const naturalEndings = new Set(results.map((result) => result.ending).filter((id) => id !== "not_finished"));
const endingRuleIds = new Set(ENDING_RULES.map((ending) => ending.id));

assert(duplicateCount === 0, `普通事件重复出现 ${duplicateCount} 次`);
assert(naturalEndings.size >= 4, `自然模拟结局覆盖不足：${[...naturalEndings].join(", ")}`);
assert(endingRuleIds.size >= 8, "结局规则不足 8 种");

console.log(JSON.stringify({
  runs: results.length,
  profiles: PROFILES.length,
  seeds: seeds.length,
  naturalEndingTypes: naturalEndings.size,
  endingRuleTypes: endingRuleIds.size,
  ...summarize(results)
}, null, 2));
