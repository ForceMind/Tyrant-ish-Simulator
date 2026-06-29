import { button, escapeHtml } from "../html.js";
import { STAT_LABELS } from "../../core/config.js";
import { t } from "../../i18n/index.js";

export function renderDecree(state) {
  return `
    <main class="screen decree-screen">
      <section class="scroll-panel">
        <p class="seal">阶段诏令</p>
        <h1>六部等朕拍板</h1>
        <p class="muted">每道诏令持续十八个月。好处会慢慢来，副作用也会排队来。</p>
        <div class="decree-grid">
          ${state.decreeChoices.map((decree) => `
            <article class="decree-card">
              <h2>${escapeHtml(decree.title)}</h2>
              <p>${escapeHtml(decree.description)}</p>
              <div class="decree-meta">持续 ${decree.duration} 个月</div>
              <button class="btn primary" type="button" data-action="chooseDecree" data-value="${escapeHtml(decree.id)}">颁布此令</button>
            </article>
          `).join("")}
        </div>
      </section>
    </main>
  `;
}

export function renderDecreeResult(state) {
  const response = state.lastResponse;
  return `
    <main class="screen centered-screen">
      <section class="response-panel">
        <p class="seal">${escapeHtml(response.eventTitle)}</p>
        <h1>${escapeHtml(response.selectedText)}</h1>
        <p class="big-quote">${escapeHtml(response.response)}</p>
        ${renderChanges(response.changes)}
        ${button("beginReign", "开始本月政务", "", "primary")}
      </section>
    </main>
  `;
}

function renderChanges(changes) {
  if (!changes?.length) return "";
  return `
    <div class="change-list">
      ${changes.map((change) => {
        const sign = change.delta > 0 ? "+" : "";
        return `<span class="${change.delta > 0 ? "up" : "down"}">${escapeHtml(STAT_LABELS[change.key] || change.key)} ${sign}${change.delta}</span>`;
      }).join("")}
    </div>
  `;
}
