import { AMBITIONS } from "../../data/ambitions.js";
import { button, escapeHtml } from "../html.js";
import { t } from "../../i18n/index.js";

export function renderAmbition() {
  return `
    <main class="screen ambition-screen">
      <header class="top-nav">
        ${button("go", t("buttons.back"), "era", "ghost")}
        <div>
          <p class="seal">王朝志向</p>
          <h1>给史官一个主线</h1>
        </div>
      </header>
      <section class="ambition-grid">
        ${AMBITIONS.map((ambition) => `
          <article class="ambition-card paper-panel">
            <h2>${escapeHtml(ambition.title)}</h2>
            <p class="big-quote small-quote">${escapeHtml(ambition.flavor)}</p>
            <p>${escapeHtml(ambition.description)}</p>
            <button class="btn primary" type="button" data-action="selectAmbition" data-value="${escapeHtml(ambition.id)}">定为本朝志向</button>
          </article>
        `).join("")}
      </section>
    </main>
  `;
}
