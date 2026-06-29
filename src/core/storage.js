import { GAME_CONFIG } from "./config.js";

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function saveGame(state) {
  writeJson(GAME_CONFIG.storageKeys.save, state);
}

export function loadGame() {
  return readJson(GAME_CONFIG.storageKeys.save, null);
}

export function clearSave() {
  localStorage.removeItem(GAME_CONFIG.storageKeys.save);
}

export function loadAchievements() {
  return readJson(GAME_CONFIG.storageKeys.achievements, {});
}

export function saveAchievements(achievements) {
  writeJson(GAME_CONFIG.storageKeys.achievements, achievements);
}

export function clearAchievements() {
  localStorage.removeItem(GAME_CONFIG.storageKeys.achievements);
}

export function loadHistory() {
  return readJson(GAME_CONFIG.storageKeys.history, []);
}

export function saveHistory(history) {
  writeJson(GAME_CONFIG.storageKeys.history, history.slice(0, GAME_CONFIG.maxHistory));
}

export function clearHistory() {
  localStorage.removeItem(GAME_CONFIG.storageKeys.history);
  localStorage.removeItem(GAME_CONFIG.storageKeys.lastEnding);
}

export function addHistoryRecord(record) {
  const history = loadHistory();
  const next = [record, ...history].slice(0, GAME_CONFIG.maxHistory);
  saveHistory(next);
  writeJson(GAME_CONFIG.storageKeys.lastEnding, record);
  updateCodex(record);
}

export function loadLastEnding() {
  return readJson(GAME_CONFIG.storageKeys.lastEnding, null);
}

export function loadCodex() {
  return readJson(GAME_CONFIG.storageKeys.codex, createEmptyCodex());
}

export function saveCodex(codex) {
  writeJson(GAME_CONFIG.storageKeys.codex, codex);
}

export function clearCodex() {
  localStorage.removeItem(GAME_CONFIG.storageKeys.codex);
}

function updateCodex(record) {
  const codex = loadCodex();
  codex.totalRuns += 1;
  codex.totalReignYears += record.reignYears || 0;
  codex.bestReignYears = Math.max(codex.bestReignYears || 0, record.reignYears || 0);
  codex.longestLivedAge = Math.max(codex.longestLivedAge || 0, record.age || 0);
  codex.absurdChoices += record.counters?.absurdChoices || 0;
  codex.taxCount += record.counters?.taxCount || 0;
  codex.palaceBuilt += record.counters?.palaceBuilt || 0;
  codex.alchemyCount += record.counters?.alchemyCount || 0;

  const ending = codex.endings[record.endingId] || { id: record.endingId, title: record.endingTitle, count: 0, bestReignYears: 0 };
  ending.title = record.endingTitle;
  ending.count += 1;
  ending.bestReignYears = Math.max(ending.bestReignYears || 0, record.reignYears || 0);
  ending.lastPosthumous = record.posthumous;
  codex.endings[record.endingId] = ending;

  const eraKey = record.era || record.eraName;
  const era = codex.eras[eraKey] || { id: eraKey, name: record.eraName, count: 0, bestReignYears: 0, completedAmbitions: 0 };
  era.name = record.eraName;
  era.count += 1;
  era.bestReignYears = Math.max(era.bestReignYears || 0, record.reignYears || 0);
  if (record.ambitionCompleted) era.completedAmbitions += 1;
  codex.eras[eraKey] = era;

  if (record.ambition) {
    const ambition = codex.ambitions[record.ambition] || { id: record.ambition, title: record.ambitionTitle, attempts: 0, completed: 0 };
    ambition.title = record.ambitionTitle;
    ambition.attempts += 1;
    if (record.ambitionCompleted) ambition.completed += 1;
    codex.ambitions[record.ambition] = ambition;
  }

  codex.lastUpdatedAt = new Date().toISOString();
  saveCodex(codex);
}

function createEmptyCodex() {
  return {
    totalRuns: 0,
    totalReignYears: 0,
    bestReignYears: 0,
    longestLivedAge: 0,
    absurdChoices: 0,
    taxCount: 0,
    palaceBuilt: 0,
    alchemyCount: 0,
    endings: {},
    eras: {},
    ambitions: {},
    lastUpdatedAt: ""
  };
}
