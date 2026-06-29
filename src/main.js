import { createInitialState, applyEraToState } from "./core/state.js";
import { applyOption, chooseDecree, continueToNextMonth, selectAmbition, startNextEvent } from "./core/engine.js";
import { chooseQuickOption, createQuickDraft, setQuickParam, startQuickRun } from "./core/quickEngine.js";
import { clearAchievements, clearCodex, clearHistory, clearSave, loadGame, saveGame } from "./core/storage.js";
import { ERA_LIST } from "./data/eras.js";
import { QUICK_PARAM_GROUPS } from "./data/quickMode.js";
import { render } from "./ui/render.js";

let state = createInitialState();

const actions = {
  go(screen) {
    if (screen === "archives") state.returnScreen = state.screen || "website";
    state.screen = screen;
    renderApp();
  },
  newGame() {
    state = createInitialState();
    state.screen = "era";
    renderApp();
  },
  quickParam(value) {
    const [groupKey, optionId] = String(value || "").split(":");
    state.quick = state.quick || createQuickDraft();
    setQuickParam(state, groupKey, optionId);
    state.screen = "quickSetup";
    renderApp();
  },
  quickSetupPage(value) {
    state.quickSetupPage = Math.max(0, Math.min(Number(value) || 0, QUICK_PARAM_GROUPS.length - 1));
    state.screen = "quickSetup";
    renderApp();
  },
  startQuick() {
    state.quick = state.quick || createQuickDraft();
    startQuickRun(state);
    renderApp();
  },
  chooseQuickOption(optionIndex) {
    chooseQuickOption(state, optionIndex);
    renderApp();
  },
  restartQuick() {
    state.quick = createQuickDraft();
    state.screen = "quickSetup";
    renderApp();
  },
  loadGame() {
    const saved = loadGame();
    if (saved) {
      state = saved;
      renderApp();
    } else {
      state.returnScreen = state.screen || "title";
      state.screen = "archives";
      state.toast = "史官翻遍竹简，只找到一张空白欠条。";
      renderApp();
    }
  },
  selectEra(eraId) {
    const era = ERA_LIST.find((item) => item.id === eraId);
    if (!era) return;
    state = createInitialState();
    applyEraToState(state, era);
    state.screen = "accession";
    saveGame(state);
    renderApp();
  },
  beginReign() {
    if (!state.ambition) {
      state.screen = "ambition";
      saveGame(state);
      renderApp();
      return;
    }
    startNextEvent(state);
    saveGame(state);
    renderApp();
  },
  selectAmbition(ambitionId) {
    selectAmbition(state, ambitionId);
    saveGame(state);
    renderApp();
  },
  chooseDecree(decreeId) {
    chooseDecree(state, decreeId);
    saveGame(state);
    renderApp();
  },
  chooseOption(optionIndex) {
    applyOption(state, Number(optionIndex));
    saveGame(state);
    renderApp();
  },
  nextMonth() {
    continueToNextMonth(state);
    saveGame(state);
    renderApp();
  },
  viewHistory(recordId) {
    state.selectedHistoryId = recordId;
    state.screen = "archives";
    renderApp();
  },
  archivePage(value) {
    const [key, pageText] = String(value || "").split(":");
    const page = Math.max(1, Number(pageText) || 1);
    if (!key) return;
    state.archivePages = { ...state.archivePages, [key]: page };
    state.screen = "archives";
    renderApp();
  },
  archiveTab(value) {
    state.archiveTab = value || "records";
    state.screen = "archives";
    renderApp();
  },
  backFromArchives() {
    state.screen = state.returnScreen || (state.era ? "main" : "website");
    renderApp();
  },
  closeHistory() {
    state.selectedHistoryId = "";
    renderApp();
  },
  clearSave() {
    clearSave();
    state.toast = "旧档已焚。史官表示火候刚好。";
    renderApp();
  },
  clearHistory() {
    clearHistory();
    state.selectedHistoryId = "";
    state.toast = "史官档案已清空，历史暂时装作无事发生。";
    renderApp();
  },
  clearCodex() {
    clearCodex();
    state.toast = "王朝图鉴已清空，史官决定重新认识你。";
    renderApp();
  },
  clearAchievements() {
    clearAchievements();
    state.toast = "成就已清空。功过簿开始装失忆。";
    renderApp();
  }
};

function bindGlobalActions() {
  document.addEventListener("click", (event) => {
    const target = event.target.closest("[data-action]");
    if (!target) return;
    event.preventDefault();
    const action = target.dataset.action;
    const value = target.dataset.value;
    if (actions[action]) actions[action](value);
  });
}

function renderApp() {
  render(document.getElementById("app"), state);
  if (state.toast) state.toast = "";
}

bindGlobalActions();
renderApp();
