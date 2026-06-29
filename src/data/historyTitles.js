import { ERA_LIST } from "./eras.js";
import { AMBITIONS } from "./ambitions.js";

const POSTHUMOUS_TITLES = [
  { id: "lazy", text: "懒", condition: (state) => state.counters.noCourtStreak >= 8 },
  { id: "swing", text: "摆", condition: (state) => state.counters.sameMistakeStreak >= 5 },
  { id: "cash", text: "财", condition: (state) => state.counters.taxCount >= 8 || state.stats.treasury >= 90 },
  { id: "pill", text: "丹", condition: (state) => state.counters.alchemyCount >= 5 },
  { id: "work", text: "卷", condition: (state) => state.stats.court >= 75 && state.meta.health <= 25 },
  { id: "wild", text: "荒", condition: (state) => state.counters.palaceBuilt >= 4 },
  { id: "grim", text: "厉", condition: (state) => state.counters.loyalKilled >= 2 || state.hidden.resentment >= 85 },
  { id: "ghost", text: "幽", condition: (state) => state.meta.prestige <= 20 },
  { id: "spirit", text: "灵", condition: (state) => state.hidden.mandate >= 70 },
  { id: "broken", text: "屎", condition: () => true }
];

export function buildHistoryRecord(state, ending) {
  const era = ERA_LIST.find((item) => item.id === state.era);
  const ambition = AMBITIONS.find((item) => item.id === state.ambition);
  const title = POSTHUMOUS_TITLES.find((item) => item.condition(state))?.text || "屎";
  const eraName = era?.name || "无名";
  const reignYears = Math.max(1, state.year);

  return {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    createdAt: new Date().toISOString(),
    bookTitle: `${eraName}实录`,
    era: state.era,
    eraName,
    reignYears,
    age: state.age,
    endingId: ending.id,
    endingTitle: ending.title,
    reason: ending.reason,
    evaluation: ending.evaluation,
    posthumous: `史称：${eraName}${title}帝`,
    stats: { ...state.stats },
    meta: { ...state.meta },
    hidden: { ...state.hidden },
    ambition: state.ambition,
    ambitionTitle: ambition?.title || "",
    ambitionCompleted: state.ambitionCompleted,
    activeDecrees: [...(state.activeDecrees || [])],
    chronicle: [...(state.chronicle || [])].slice(0, 12),
    counters: {
      absurdChoices: state.counters.absurdChoices,
      palaceBuilt: state.counters.palaceBuilt,
      taxCount: state.counters.taxCount,
      loyalKilled: state.counters.loyalKilled,
      eunuchDelegations: state.counters.eunuchDelegations,
      alchemyCount: state.counters.alchemyCount,
      uprisingCount: state.counters.uprisingCount
    }
  };
}
