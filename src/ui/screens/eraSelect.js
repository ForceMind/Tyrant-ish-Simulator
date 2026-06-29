import { ERA_LIST } from "../../data/eras.js";
import { button } from "../html.js";
import { escapeHtml } from "../html.js";
import { t } from "../../i18n/index.js";

export function renderEraSelect() {
  return `
    <main class="screen era-screen">
      <header class="top-nav">
        ${button("go", t("buttons.back"), "title", "ghost")}
        <div>
          <p class="seal">改元</p>
          <h1>选择年号</h1>
        </div>
      </header>
      <section class="era-grid">
        ${ERA_LIST.map((era) => `
          <article class="era-card">
            <h2>${escapeHtml(era.name)}</h2>
            <p>${escapeHtml(era.description)}</p>
            <div class="era-effects">${formatEffects(era.effects)}</div>
            <button class="btn primary" type="button" data-action="selectEra" data-value="${era.id}">改元${escapeHtml(era.name)}</button>
          </article>
        `).join("")}
      </section>
    </main>
  `;
}

function formatEffects(effects) {
  return Object.entries(effects).map(([key, value]) => {
    const sign = value > 0 ? "+" : "";
    return `<span>${escapeHtml(labelMap[key] || key)} ${sign}${value}</span>`;
  }).join("");
}

const labelMap = {
  treasury: "国库",
  people: "民心",
  army: "军队",
  court: "朝廷",
  happiness: "快乐",
  health: "健康",
  prestige: "威望",
  corruption: "暗流",
  resentment: "民怨",
  eunuch: "太监",
  mandate: "天命"
};
