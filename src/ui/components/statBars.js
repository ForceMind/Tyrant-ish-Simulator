import { GAME_CONFIG } from "../../core/config.js";
import { escapeHtml } from "../html.js";

const STAT_DESCRIPTIONS = {
  treasury: "钱袋厚度。太低会破产，太高容易养出贪官和奢靡。",
  people: "百姓支持。低了会逃荒、起义，甚至开始研究锄头的新用途。",
  army: "边关底气。太弱守不住门，太强也可能不太听话。",
  court: "政令效率。低了以后，圣旨出宫门都要问路。",
  happiness: "皇帝心情。低了会乱拍板，高了可能国家替你难过。"
};

export function renderStatBars(stats) {
  return `
    <section class="stat-grid" aria-label="五维数值">
      ${GAME_CONFIG.mainStats.map((stat) => renderStatBar(stat.label, stats[stat.key])).join("")}
    </section>
  `;
}

function renderStatBar(label, value) {
  const stat = GAME_CONFIG.mainStats.find((item) => item.label === label);
  const description = stat ? STAT_DESCRIPTIONS[stat.key] : "";
  const status = value <= 20 ? "danger" : value >= 80 ? "strong" : "normal";
  return `
    <div class="stat-row ${status}">
      <div class="stat-head">
        <span>${escapeHtml(label)}</span>
        <b>${value}</b>
      </div>
      <div class="stat-track"><span style="width:${value}%"></span></div>
      <p class="stat-desc">${escapeHtml(description)}</p>
    </div>
  `;
}
