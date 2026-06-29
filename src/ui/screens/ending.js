import { button, escapeHtml } from "../html.js";
import { renderStatBars } from "../components/statBars.js";
import { t } from "../../i18n/index.js";

export function renderEnding(state) {
  const record = state.historyRecord;
  return `
    <main class="screen ending-screen">
      <section class="scroll-panel ending-scroll">
        <p class="seal">王朝收摊</p>
        <h1>《${escapeHtml(record.bookTitle)}》</h1>
        <h2>${escapeHtml(record.endingTitle)}</h2>
        <p class="big-quote">${escapeHtml(record.evaluation)}</p>
        <p>${escapeHtml(record.reason)}</p>
        ${record.ambitionTitle ? `<p><b>王朝志向：</b>${escapeHtml(record.ambitionTitle)} · ${record.ambitionCompleted ? "达成" : "未竟"}</p>` : ""}
        <dl class="record-grid">
          <dt>年号</dt><dd>${escapeHtml(record.eraName)}</dd>
          <dt>在位</dt><dd>${record.reignYears} 年</dd>
          <dt>享年</dt><dd>${record.age} 岁</dd>
          <dt>荒唐选择</dt><dd>${record.counters.absurdChoices || record.counters.taxCount + record.counters.palaceBuilt + record.counters.alchemyCount} 次</dd>
          <dt>修宫殿</dt><dd>${record.counters.palaceBuilt} 座</dd>
          <dt>加税</dt><dd>${record.counters.taxCount} 次</dd>
          <dt>杀忠臣</dt><dd>${record.counters.loyalKilled} 次</dd>
          <dt>太监代政</dt><dd>${record.counters.eunuchDelegations} 次</dd>
          <dt>炼丹</dt><dd>${record.counters.alchemyCount} 次</dd>
          <dt>起义</dt><dd>${record.counters.uprisingCount} 次</dd>
        </dl>
        <p class="posthumous">${escapeHtml(record.posthumous)}</p>
        ${renderChronicle(record)}
        <div class="title-actions compact-actions">
          ${button("newGame", t("buttons.restart"), "", "primary")}
          ${button("go", t("buttons.archives"), "archives")}
        </div>
      </section>
      ${renderStatBars(record.stats)}
    </main>
  `;
}

function renderChronicle(record) {
  const rows = (record.chronicle || []).slice(0, 6).map((entry) => `
    <li><b>${escapeHtml(entry.date)}</b>${escapeHtml(entry.title)}：${escapeHtml(entry.text)}</li>
  `).join("");
  return rows ? `<div class="ending-chronicle"><h2>史官摘抄</h2><ul>${rows}</ul></div>` : "";
}
