import { STAT_LABELS } from "../../core/config.js";
import { button, escapeHtml } from "../html.js";
import { renderStatBars } from "../components/statBars.js";
import { t } from "../../i18n/index.js";

export function renderResponse(state) {
  const response = state.lastResponse;
  return `
    <main class="screen response-screen">
      <section class="response-panel">
        <p class="seal">${escapeHtml(response.eventTitle)}</p>
        <h1>${t("labels.selected")}</h1>
        <p class="chosen">${escapeHtml(response.selectedText)}</p>
        <p class="big-quote">${escapeHtml(response.response)}</p>
        <div class="change-list">
          <h2>${t("labels.effect")}</h2>
          ${renderChanges(response.changes)}
        </div>
        ${state.ambitionRewardText ? `<div class="achievement-pop"><b>志向达成</b><span>${escapeHtml(state.ambitionRewardText)}</span></div>` : ""}
        ${renderAchievementPop(state.achievementsUnlockedNow)}
        ${button("nextMonth", t("buttons.nextMonth"), "", "primary")}
      </section>
      ${renderStatBars(state.stats)}
    </main>
  `;
}

function renderChanges(changes) {
  if (!changes.length) return `<p class="muted">表面风平浪静，史官觉得这更吓人。</p>`;
  return changes.map((change) => {
    const hidden = hiddenKeys.includes(change.key);
    const label = hidden ? "暗流" : STAT_LABELS[change.key] || change.key;
    const sign = change.delta > 0 ? "+" : "";
    const text = hidden
      ? `${label}${change.delta > 0 ? "涌动" : "稍平"}`
      : `${label} ${sign}${change.delta}`;
    return `<span class="${change.delta > 0 ? "up" : "down"}">${escapeHtml(text)}</span>`;
  }).join("");
}

function renderAchievementPop(achievements) {
  if (!achievements?.length) return "";
  return `
    <div class="achievement-pop">
      <b>${t("labels.achievement")}</b>
      ${achievements.map((item) => `<span>${escapeHtml(item.title)}</span>`).join("")}
    </div>
  `;
}

const hiddenKeys = ["corruption", "resentment", "famine", "disease", "enemy", "intrigue", "eunuch", "princeAmbition", "mandate"];
