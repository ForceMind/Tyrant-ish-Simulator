import { GAME_CONFIG } from "./config.js";

const BASE_MAIN_STATS = {
  treasury: 50,
  people: 50,
  army: 50,
  court: 50,
  happiness: 50
};

const BASE_META_STATS = {
  health: 75,
  prestige: 50
};

const BASE_HIDDEN_STATS = {
  corruption: 0,
  resentment: 0,
  famine: 0,
  disease: 0,
  enemy: 0,
  intrigue: 0,
  eunuch: 0,
  princeAmbition: 0,
  mandate: 0
};

export function clamp(value, min = 0, max = 100) {
  return Math.max(min, Math.min(max, value));
}

export function createInitialState() {
  return {
    screen: "website",
    era: null,
    accessionText: "",
    year: 1,
    monthIndex: 0,
    age: GAME_CONFIG.initialAge,
    stats: { ...BASE_MAIN_STATS },
    meta: { ...BASE_META_STATS },
    hidden: { ...BASE_HIDDEN_STATS },
    currentEvent: null,
    lastResponse: null,
    pendingEnding: null,
    ambition: null,
    ambitionCompleted: false,
    ambitionRewardText: "",
    activeDecrees: [],
    decreeChoices: [],
    nextDecreeTurn: 18,
    chronicle: [],
    achievementsUnlockedNow: [],
    archivePages: {},
    archiveTab: "records",
    quick: null,
    seenEventIds: [],
    bombCooldown: {},
    counters: {
      totalChoices: 0,
      absurdChoices: 0,
      taxCount: 0,
      palaceBuilt: 0,
      loyalKilled: 0,
      eunuchDelegations: 0,
      alchemyCount: 0,
      uprisingCount: 0,
      noCourtStreak: 0,
      sameMistakeStreak: 0,
      lastMistakeTag: "",
      consecutivePills: 0,
      lowAllHighHappy: 0
    },
    ending: null
  };
}

export function applyEraToState(state, era) {
  state.era = era.id;
  state.accessionText = era.accession;
  applyEffects(state, era.effects);
}

export function applyEffects(state, effects = {}) {
  const applied = {};
  Object.entries(effects).forEach(([key, delta]) => {
    if (key in state.stats) {
      state.stats[key] = clamp(state.stats[key] + delta, ...GAME_CONFIG.statBounds.main);
      applied[key] = delta;
      return;
    }

    if (key in state.meta) {
      state.meta[key] = clamp(state.meta[key] + delta, ...GAME_CONFIG.statBounds.meta);
      applied[key] = delta;
      return;
    }

    if (key in state.hidden) {
      state.hidden[key] = clamp(state.hidden[key] + delta, ...GAME_CONFIG.statBounds.hidden);
      applied[key] = delta;
    }
  });
  return applied;
}

export function advanceMonth(state) {
  state.monthIndex += 1;
  if (state.monthIndex >= GAME_CONFIG.months.length) {
    state.monthIndex = 0;
    state.year += 1;
    state.age += 1;
    applyYearlyDrift(state);
  }
}

function applyYearlyDrift(state) {
  if (state.stats.people < 30) state.hidden.resentment = clamp(state.hidden.resentment + 5, ...GAME_CONFIG.statBounds.hidden);
  if (state.stats.treasury < 25) state.hidden.corruption = clamp(state.hidden.corruption + 4, ...GAME_CONFIG.statBounds.hidden);
  if (state.stats.army < 25) state.hidden.enemy = clamp(state.hidden.enemy + 5, ...GAME_CONFIG.statBounds.hidden);
  if (state.stats.court < 25) state.hidden.eunuch = clamp(state.hidden.eunuch + 4, ...GAME_CONFIG.statBounds.hidden);
  if (state.stats.happiness < 20) state.meta.health = clamp(state.meta.health - 4, ...GAME_CONFIG.statBounds.meta);
  if (state.age > 45) state.meta.health = clamp(state.meta.health - 2, ...GAME_CONFIG.statBounds.meta);
}
