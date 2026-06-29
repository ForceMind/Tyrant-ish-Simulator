import { GAME_CONFIG } from "./config.js";
import { clamp } from "./state.js";
import { QUICK_ENDINGS, QUICK_EVENTS, QUICK_PARAM_GROUPS } from "../data/quickMode.js";

const BASE_QUICK_RUN = {
  stats: {
    treasury: 50,
    people: 50,
    army: 50,
    court: 50,
    happiness: 50
  },
  meta: {
    health: 70,
    prestige: 50
  },
  hidden: {
    corruption: 0,
    resentment: 0,
    famine: 0,
    disease: 0,
    enemy: 0,
    intrigue: 0,
    eunuch: 0,
    princeAmbition: 0,
    mandate: 0
  }
};

export function createQuickDraft() {
  return {
    params: Object.fromEntries(QUICK_PARAM_GROUPS.map((group) => [group.key, group.options[0].id])),
    run: null
  };
}

export function setQuickParam(state, groupKey, optionId) {
  const group = QUICK_PARAM_GROUPS.find((item) => item.key === groupKey);
  if (!group || !group.options.some((item) => item.id === optionId)) return false;
  state.quick = state.quick || createQuickDraft();
  state.quick.params = { ...state.quick.params, [groupKey]: optionId };
  return true;
}

export function startQuickRun(state) {
  state.quick = state.quick || createQuickDraft();
  state.quick.run = buildRun(state.quick.params);
  state.screen = "quickPlay";
}

export function chooseQuickOption(state, optionIndex) {
  const run = state.quick?.run;
  const event = run?.currentEvent;
  const option = event?.options[Number(optionIndex)];
  if (!run || !event || !option) return false;

  const before = snapshot(run);
  applyQuickEffects(run, option.effects);
  run.choiceCount += 1;
  run.lastChoice = {
    title: event.title,
    text: option.text,
    response: option.response,
    changes: diff(before, snapshot(run))
  };
  run.log = [
    {
      year: run.year,
      title: event.title,
      text: `选择「${option.text}」。${option.response}`
    },
    ...run.log
  ].slice(0, 10);

  run.stepIndex += 1;
  run.year += run.yearStep;
  applyQuickDrift(run);
  run.ending = pickQuickEnding(run);

  if (run.ending || run.stepIndex >= run.events.length) {
    run.ending = run.ending || pickQuickEnding(run, true);
    run.currentEvent = null;
    state.screen = "quickEnding";
    return true;
  }

  run.currentEvent = run.events[run.stepIndex];
  state.screen = "quickPlay";
  return true;
}

function buildRun(params) {
  const run = {
    ...BASE_QUICK_RUN,
    stats: { ...BASE_QUICK_RUN.stats },
    meta: { ...BASE_QUICK_RUN.meta },
    hidden: { ...BASE_QUICK_RUN.hidden },
    params,
    selectedOptions: selectedOptions(params),
    tags: [],
    year: 1,
    yearStep: 2,
    maxSteps: 7,
    stepIndex: 0,
    choiceCount: 0,
    events: [],
    currentEvent: null,
    log: [],
    lastChoice: null,
    ending: null
  };

  run.selectedOptions.forEach((option) => {
    run.tags.push(...(option.tags || []));
    if (option.steps) run.maxSteps = option.steps;
    if (option.yearStep) run.yearStep = option.yearStep;
    applyQuickEffects(run, option.effects);
  });

  run.events = buildEventPlan(run).slice(0, run.maxSteps);
  run.currentEvent = run.events[0];
  run.log = [
    {
      year: 1,
      title: "快速登基",
      text: `史官翻开速写本：${run.selectedOptions.map((item) => item.title).join("、")}。`
    }
  ];
  return run;
}

function selectedOptions(params) {
  return QUICK_PARAM_GROUPS.map((group) => {
    const id = params[group.key] || group.options[0].id;
    return group.options.find((option) => option.id === id) || group.options[0];
  });
}

function buildEventPlan(run) {
  const scored = QUICK_EVENTS.map((event, index) => {
    const tagScore = event.tags.reduce((score, tag) => score + (run.tags.includes(tag) ? 4 : 0), 0);
    return { event, score: tagScore + (QUICK_EVENTS.length - index) * 0.1 };
  }).sort((a, b) => b.score - a.score);

  const picked = [];
  scored.forEach(({ event }) => {
    if (!picked.some((item) => item.id === event.id)) picked.push(event);
  });
  QUICK_EVENTS.forEach((event) => {
    if (!picked.some((item) => item.id === event.id)) picked.push(event);
  });
  return picked;
}

function applyQuickEffects(run, effects = {}) {
  Object.entries(effects).forEach(([key, delta]) => {
    if (key in run.stats) run.stats[key] = clamp(run.stats[key] + delta, ...GAME_CONFIG.statBounds.main);
    if (key in run.meta) run.meta[key] = clamp(run.meta[key] + delta, ...GAME_CONFIG.statBounds.meta);
    if (key in run.hidden) run.hidden[key] = clamp(run.hidden[key] + delta, ...GAME_CONFIG.statBounds.hidden);
  });
}

function applyQuickDrift(run) {
  if (run.stats.people < 35) run.hidden.resentment = clamp(run.hidden.resentment + 6, ...GAME_CONFIG.statBounds.hidden);
  if (run.stats.treasury < 30) run.hidden.corruption = clamp(run.hidden.corruption + 5, ...GAME_CONFIG.statBounds.hidden);
  if (run.stats.army < 35) run.hidden.enemy = clamp(run.hidden.enemy + 6, ...GAME_CONFIG.statBounds.hidden);
  if (run.hidden.famine > 45) run.stats.people = clamp(run.stats.people - 5, ...GAME_CONFIG.statBounds.main);
  if (run.hidden.eunuch > 55) run.stats.court = clamp(run.stats.court - 4, ...GAME_CONFIG.statBounds.main);
  if (run.stats.happiness < 25) run.meta.health = clamp(run.meta.health - 4, ...GAME_CONFIG.statBounds.meta);
}

function pickQuickEnding(run, force = false) {
  const ending = QUICK_ENDINGS.find((item) => item.condition(run));
  if (!ending || (!force && ending.id === "quick_absurd")) return null;
  return ending;
}

function snapshot(run) {
  return { ...run.stats, ...run.meta, ...run.hidden };
}

function diff(before, after) {
  return Object.entries(after)
    .map(([key, value]) => ({ key, delta: value - before[key], value }))
    .filter((item) => item.delta !== 0);
}

