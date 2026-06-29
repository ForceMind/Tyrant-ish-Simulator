import { GAME_CONFIG } from "../../core/config.js";
import { escapeHtml } from "../html.js";

export function renderEventCard(event) {
  const isBomb = event.category === "bomb";
  return `
    <article class="event-card ${isBomb ? "bomb-card" : ""}">
      <div class="event-kicker">${isBomb ? "爆雷事件" : "本月奏报"}</div>
      <h2>${escapeHtml(event.title)}</h2>
      <p class="speaker">${escapeHtml(event.speaker)}</p>
      <p class="event-text">${escapeHtml(event.text)}</p>
      <div class="tag-row">${event.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
    </article>
  `;
}

export function renderOptions(options) {
  return `
    <div class="option-list">
      ${options.map((option, index) => `
        <button class="option-btn" type="button" data-action="chooseOption" data-value="${index}" data-survival-score="${scoreOption(option.effects || {})}">
          <span>${escapeHtml(option.text)}</span>
          <small>${escapeHtml(describeOption(option))}</small>
        </button>
      `).join("")}
    </div>
  `;
}

function describeOption(option) {
  const effects = option.effects || {};
  const hiddenUp = Object.entries(effects).filter(([key, value]) => GAME_CONFIG.hiddenStats.includes(key) && value > 0).length;
  const hiddenDown = Object.entries(effects).filter(([key, value]) => GAME_CONFIG.hiddenStats.includes(key) && value < 0).length;
  const mainUps = ["treasury", "people", "army", "court", "happiness"].filter((key) => effects[key] > 0).length;
  const mainDowns = ["treasury", "people", "army", "court", "happiness"].filter((key) => effects[key] < 0).length;

  if (hiddenUp >= 2) return "史官旁批：眼前很爽，后账很会长";
  if (hiddenDown >= 2) return "史官旁批：像是在拆一颗旧雷";
  if (effects.happiness > 8 && effects.treasury < 0) return "史官旁批：快乐有价，户部付款";
  if (effects.treasury > 10 && effects.people < 0) return "史官旁批：国库吃饱，民间噎住";
  if (effects.army > 6 || effects.enemy < -5) return "史官旁批：边关会少写几封遗书";
  if (effects.court > 6 || effects.corruption < -5) return "史官旁批：朝廷短暂像个机构";
  if (effects.health < -6) return "史官旁批：太医已经开始预判后事";
  if (mainUps > mainDowns) return "史官旁批：看起来像能过日子";
  if (mainDowns > mainUps) return "史官旁批：这一步主要靠脸皮";
  return "史官旁批：表面平静，暗处记账";
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
  return Math.round(score * 10) / 10;
}
