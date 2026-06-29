import { EVENT_POOL, BOMB_EVENTS } from "../src/data/events/index.js";
import { ERA_LIST } from "../src/data/eras.js";
import { AMBITIONS } from "../src/data/ambitions.js";
import { DECREE_POOL } from "../src/data/decrees.js";
import { createInitialState, applyEraToState } from "../src/core/state.js";
import {
  applyOption,
  finishGame,
  chooseDecree,
  continueToNextMonth,
  getCurrentDateLabel,
  selectAmbition,
  startNextEvent
} from "../src/core/engine.js";
import { render } from "../src/ui/render.js";
import { ENDING_RULES } from "../src/data/endings.js";
import { loadCodex, loadHistory } from "../src/core/storage.js";

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

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function checkContent() {
  assert(EVENT_POOL.length >= 120, `普通事件不足：${EVENT_POOL.length}`);
  assert(BOMB_EVENTS.length >= 8, `爆雷事件不足：${BOMB_EVENTS.length}`);
  assert(ERA_LIST.length >= 8, `年号不足：${ERA_LIST.length}`);
  assert(AMBITIONS.length >= 8, `王朝志向不足：${AMBITIONS.length}`);
  assert(DECREE_POOL.length >= 12, `诏令不足：${DECREE_POOL.length}`);

  const ids = new Set();
  EVENT_POOL.forEach((event) => {
    assert(!ids.has(event.id), `重复事件 ID：${event.id}`);
    ids.add(event.id);
    assert(event.title && event.speaker && event.text, `事件文案缺失：${event.id}`);
    assert(Array.isArray(event.options) && event.options.length >= 3, `事件选项不足：${event.id}`);
    event.options.forEach((option, index) => {
      assert(option.text && option.response && option.effects, `选项不完整：${event.id} #${index}`);
    });
  });
}

function runLongGame() {
  const summaries = [];
  ERA_LIST.forEach((era, eraIndex) => {
    const state = createInitialState();
    applyEraToState(state, era);
    selectAmbition(state, AMBITIONS[eraIndex % AMBITIONS.length].id);
    const seen = [];
    let maxDecrees = 0;

    for (let month = 0; month < 120 && state.screen !== "ending"; month += 1) {
      if (state.screen === "decree") {
        chooseDecree(state, state.decreeChoices[0].id);
        startNextEvent(state);
      }
      assert(state.screen === "main", `${era.id} 意外页面：${state.screen}`);
      seen.push(state.currentEvent.id);
      maxDecrees = Math.max(maxDecrees, state.activeDecrees.length);
      applyOption(state, chooseSurvivalOption(state.currentEvent));
      if (state.screen !== "ending") continueToNextMonth(state);
    }

    const unique = new Set(seen).size;
    assert(state.counters.totalChoices >= 80, `${era.id} 长局月份不足：${state.counters.totalChoices}`);
    assert(unique >= 70, `${era.id} 独立事件不足：${unique}`);
    assert(maxDecrees >= 3, `${era.id} 未形成三诏令并行`);
    summaries.push({
      era: era.id,
      date: getCurrentDateLabel(state),
      months: state.counters.totalChoices,
      unique,
      maxDecrees,
      screen: state.screen
    });
  });
  return summaries;
}

function chooseSurvivalOption(event) {
  let bestIndex = 0;
  let bestScore = -Infinity;
  event.options.forEach((option, index) => {
    const score = scoreOption(option.effects || {});
    if (score > bestScore) {
      bestScore = score;
      bestIndex = index;
    }
  });
  return bestIndex;
}

function scoreOption(effects) {
  const mainKeys = ["treasury", "people", "army", "court", "happiness"];
  const hiddenKeys = ["corruption", "resentment", "famine", "disease", "enemy", "intrigue", "eunuch", "princeAmbition", "mandate"];
  let score = 0;
  mainKeys.forEach((key) => {
    score += (effects[key] || 0) * 1.2;
  });
  score += (effects.health || 0) * 1.5;
  score += (effects.prestige || 0) * 0.8;
  hiddenKeys.forEach((key) => {
    score -= (effects[key] || 0) * 1.6;
  });
  return score;
}

function checkRendering() {
  const root = { innerHTML: "" };
  const state = createInitialState();
  ["title", "era", "ambition", "archives", "settings"].forEach((screen) => {
    state.screen = screen;
    render(root, state);
    assert(root.innerHTML.includes("<main"), `页面未渲染：${screen}`);
  });

  applyEraToState(state, ERA_LIST[0]);
  selectAmbition(state, AMBITIONS[0].id);
  render(root, state);
  assert(root.innerHTML.includes("暗流风向"), "主界面缺少暗流风向");
  assert(root.innerHTML.includes("史官旁批"), "选项缺少史官旁批");
}

function checkCodex() {
  const state = createInitialState();
  applyEraToState(state, ERA_LIST[0]);
  selectAmbition(state, AMBITIONS[0].id);
  state.year = 9;
  state.age = 27;
  state.stats.treasury = 80;
  state.stats.people = 82;
  state.stats.army = 78;
  state.stats.court = 81;
  state.stats.happiness = 76;
  state.ambitionCompleted = true;
  state.counters.absurdChoices = 12;
  state.counters.taxCount = 3;
  finishGame(state, ENDING_RULES.find((ending) => ending.id === "wise_emperor") || ENDING_RULES[0]);

  const codex = loadCodex();
  assert(codex.totalRuns >= 1, "图鉴未记录总局数");
  assert(Object.keys(codex.endings).length >= 1, "图鉴未记录结局");
  assert(Object.keys(codex.eras).length >= 1, "图鉴未记录年号");
  assert(Object.keys(codex.ambitions).length >= 1, "图鉴未记录志向");
  assert(loadHistory().length >= 1, "历史档案未记录结局");

  const root = { innerHTML: "" };
  state.screen = "archives";
  render(root, state);
  assert(root.innerHTML.includes("王朝总览"), "档案页缺少王朝总览");
  state.archiveTab = "codex";
  render(root, state);
  assert(root.innerHTML.includes("结局图鉴"), "档案页缺少结局图鉴");
  assert(root.innerHTML.includes("年号熟练"), "档案页缺少年号熟练");
  state.archiveTab = "ambitions";
  render(root, state);
  assert(root.innerHTML.includes("志向进度"), "档案页缺少志向进度");
}

checkContent();
const summaries = runLongGame();
checkRendering();
checkCodex();

console.log(JSON.stringify({
  events: EVENT_POOL.length,
  bombs: BOMB_EVENTS.length,
  eras: ERA_LIST.length,
  ambitions: AMBITIONS.length,
  decrees: DECREE_POOL.length,
  longGame: summaries
}, null, 2));
