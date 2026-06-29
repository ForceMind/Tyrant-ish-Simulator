import { GAME_CONFIG } from "../../core/config.js";
import { escapeHtml } from "../html.js";

export function renderStatBars(stats) {
  return `
    <section class="stat-grid" aria-label="五维数值">
      ${GAME_CONFIG.mainStats.map((stat) => renderStatBar(stat.label, stats[stat.key])).join("")}
    </section>
  `;
}

function renderStatBar(label, value) {
  const status = value <= 20 ? "danger" : value >= 80 ? "strong" : "normal";
  return `
    <div class="stat-row ${status}">
      <div class="stat-head">
        <span>${escapeHtml(label)}</span>
        <b>${value}</b>
      </div>
      <div class="stat-track"><span style="width:${value}%"></span></div>
    </div>
  `;
}
