import { ENDING_RULES } from "../../data/endings.js";
import { ERA_LIST } from "../../data/eras.js";
import { AMBITIONS } from "../../data/ambitions.js";
import { ACHIEVEMENTS } from "../../data/achievements.js";
import { loadCodex, loadHistory, loadLastEnding } from "../../core/storage.js";
import { renderAchievementList } from "../components/achievementList.js";
import { button, escapeHtml } from "../html.js";
import { t } from "../../i18n/index.js";

export function renderArchives(state) {
  const history = loadHistory();
  const last = loadLastEnding();
  const codex = loadCodex();
  const selected = history.find((record) => record.id === state.selectedHistoryId) || last;
  const historyPage = paginate(history, getArchivePage(state, "history"), 4);
  const endingPage = paginate(ENDING_RULES, getArchivePage(state, "endings"), 4);
  const eraPage = paginate(ERA_LIST, getArchivePage(state, "eras"), 4);
  const ambitionPage = paginate(AMBITIONS, getArchivePage(state, "ambitions"), 4);
  const achievementPage = paginate(ACHIEVEMENTS, getArchivePage(state, "achievements"), 6);
  const activeTab = state.archiveTab || "records";
  const toast = state.toast ? `<p class="toast">${escapeHtml(state.toast)}</p>` : "";
  return `
    <main class="screen archive-screen">
      <header class="top-nav">
        ${button("go", t("buttons.back"), state.era ? "main" : "title", "ghost")}
        <div>
          <p class="seal">史官档案</p>
          <h1>功过簿</h1>
        </div>
      </header>
      ${toast}
      ${renderArchiveTabs(activeTab)}
      <section class="archive-layout archive-layout-rich">
        ${activeTab === "records" ? `
        <article class="paper-panel archive-detail">
          <div class="panel-title-row">
            <h2>实录详情</h2>
            ${button("clearHistory", "清空档案", "", "ghost small")}
          </div>
          ${selected ? renderRecordDetail(selected) : `<p class="muted">${t("labels.noHistory")}</p>`}
        </article>
        <article class="paper-panel">
          <div class="panel-title-row">
            <h2>历代实录</h2>
            ${renderPager("history", historyPage)}
          </div>
          <div class="history-list">
            ${historyPage.items.length ? historyPage.items.map((record) => renderRecordMini(record, selected?.id)).join("") : `<p class="muted">${t("labels.noHistory")}</p>`}
          </div>
        </article>
        <article class="paper-panel archive-wide">
          <h2>王朝总览</h2>
          ${renderCodexSummary(codex)}
        </article>
        ` : ""}
        ${activeTab === "codex" ? `
        <article class="paper-panel">
          <div class="panel-title-row">
            <h2>结局图鉴</h2>
            ${renderPager("endings", endingPage)}
          </div>
          ${renderEndingCodex(codex, endingPage.items)}
        </article>
        <article class="paper-panel">
          <div class="panel-title-row">
            <h2>年号熟练</h2>
            ${renderPager("eras", eraPage)}
          </div>
          ${renderEraMastery(codex, eraPage.items)}
        </article>
        ` : ""}
        ${activeTab === "ambitions" ? `
        <article class="paper-panel">
          <div class="panel-title-row">
            <h2>志向进度</h2>
            ${renderPager("ambitions", ambitionPage)}
          </div>
          ${renderAmbitionProgress(codex, ambitionPage.items)}
        </article>
        ` : ""}
        ${activeTab === "achievements" ? `
        <article class="paper-panel archive-wide">
          <div class="panel-title-row">
            <h2>成就</h2>
            ${renderPager("achievements", achievementPage)}
          </div>
          ${renderAchievementList(achievementPage.items)}
        </article>
        ` : ""}
      </section>
    </main>
  `;
}

function renderArchiveTabs(activeTab) {
  const tabs = [
    ["records", "实录"],
    ["codex", "图鉴"],
    ["ambitions", "志向"],
    ["achievements", "成就"]
  ];
  return `
    <nav class="archive-tabs" aria-label="档案分页">
      ${tabs.map(([key, label]) => `
        <button class="btn small ${activeTab === key ? "primary" : "ghost"}" type="button" data-action="archiveTab" data-value="${key}">${label}</button>
      `).join("")}
    </nav>
  `;
}

function getArchivePage(state, key) {
  return Math.max(1, Number(state.archivePages?.[key]) || 1);
}

function paginate(items, page, pageSize) {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const current = Math.min(Math.max(1, page), totalPages);
  const start = (current - 1) * pageSize;
  return {
    current,
    totalPages,
    items: items.slice(start, start + pageSize)
  };
}

function renderPager(key, page) {
  if (page.totalPages <= 1) return "";
  return `
    <div class="pager" aria-label="分页">
      <button class="btn ghost small" type="button" data-action="archivePage" data-value="${escapeHtml(`${key}:${page.current - 1}`)}" ${page.current <= 1 ? "disabled" : ""}>上页</button>
      <span>${page.current}/${page.totalPages}</span>
      <button class="btn ghost small" type="button" data-action="archivePage" data-value="${escapeHtml(`${key}:${page.current + 1}`)}" ${page.current >= page.totalPages ? "disabled" : ""}>下页</button>
    </div>
  `;
}

function renderRecordDetail(record) {
  return `
    <div class="record-card record-detail-card">
      <p class="seal">${escapeHtml(record.endingTitle)}</p>
      <h2>${escapeHtml(record.posthumous)}</h2>
      <p class="big-quote small-quote">${escapeHtml(record.evaluation)}</p>
      <p>${escapeHtml(record.reason)}</p>
      <dl class="record-grid compact-record-grid">
        <dt>年号</dt><dd>${escapeHtml(record.eraName)}</dd>
        <dt>在位</dt><dd>${record.reignYears} 年</dd>
        <dt>享年</dt><dd>${record.age} 岁</dd>
        <dt>志向</dt><dd>${record.ambitionTitle ? `${escapeHtml(record.ambitionTitle)} · ${record.ambitionCompleted ? "达成" : "未竟"}` : "未立"}</dd>
        <dt>加税</dt><dd>${record.counters.taxCount} 次</dd>
        <dt>修宫殿</dt><dd>${record.counters.palaceBuilt} 座</dd>
        <dt>太监代政</dt><dd>${record.counters.eunuchDelegations} 次</dd>
        <dt>炼丹</dt><dd>${record.counters.alchemyCount} 次</dd>
      </dl>
      ${renderFinalStats(record)}
      ${renderChronicle(record)}
    </div>
  `;
}

function renderFinalStats(record) {
  const stats = record.stats || {};
  const rows = [
    ["国库", stats.treasury],
    ["民心", stats.people],
    ["军队", stats.army],
    ["朝廷", stats.court],
    ["快乐", stats.happiness]
  ];
  return `
    <div class="final-stat-strip">
      ${rows.map(([label, value]) => `<span><b>${label}</b>${value ?? "-"}</span>`).join("")}
    </div>
  `;
}

function renderChronicle(record) {
  const rows = (record.chronicle || []).slice(0, 8).map((entry) => `
    <li><b>${escapeHtml(entry.date)}</b>${escapeHtml(entry.title)}：${escapeHtml(entry.text)}</li>
  `).join("");
  return rows ? `<div class="ending-chronicle"><h2>史官摘抄</h2><ul>${rows}</ul></div>` : "";
}

function renderRecordMini(record, selectedId) {
  const active = record.id === selectedId ? "active" : "";
  return `
    <button class="record-card mini record-button ${active}" type="button" data-action="viewHistory" data-value="${escapeHtml(record.id)}">
      <b>${escapeHtml(record.bookTitle)}</b>
      <span>${escapeHtml(record.posthumous)} · ${escapeHtml(record.endingTitle)}</span>
      <small>${record.ambitionTitle ? `${escapeHtml(record.ambitionTitle)} · ${record.ambitionCompleted ? "志向达成" : "志向未竟"}` : "没有志向，只有事故"}</small>
    </button>
  `;
}

function renderCodexSummary(codex) {
  const discoveredEndings = Object.keys(codex.endings || {}).length;
  const discoveredEras = Object.keys(codex.eras || {}).length;
  const completedAmbitions = Object.values(codex.ambitions || {}).filter((item) => item.completed > 0).length;
  const rows = [
    ["累计朝代", `${codex.totalRuns} 局`],
    ["累计在位", `${codex.totalReignYears} 年`],
    ["最长在位", `${codex.bestReignYears} 年`],
    ["最高享年", `${codex.longestLivedAge} 岁`],
    ["结局收集", `${discoveredEndings}/${ENDING_RULES.length}`],
    ["年号体验", `${discoveredEras}/${ERA_LIST.length}`],
    ["志向达成", `${completedAmbitions}/${AMBITIONS.length}`],
    ["累计荒唐", `${codex.absurdChoices} 次`]
  ];
  return `<div class="codex-summary">${rows.map(([label, value]) => `<span><b>${label}</b>${value}</span>`).join("")}</div>`;
}

function renderEndingCodex(codex, endings) {
  return `
    <div class="codex-grid">
      ${endings.map((ending) => {
        const found = codex.endings?.[ending.id];
        return `
          <div class="codex-item ${found ? "found" : "unknown"}">
            <b>${found ? escapeHtml(ending.title) : "？？？"}</b>
            <span>${found ? `达成 ${found.count} 次 · 最长 ${found.bestReignYears} 年` : "尚未写进史书"}</span>
            <small>${found ? escapeHtml(ending.evaluation) : "史官留了一页空白，等你犯出新水平。"}</small>
          </div>
        `;
      }).join("")}
    </div>
  `;
}

function renderEraMastery(codex, eras) {
  return `
    <div class="codex-grid">
      ${eras.map((era) => {
        const found = codex.eras?.[era.id] || Object.values(codex.eras || {}).find((item) => item.name === era.name);
        const level = getEraLevel(found);
        return `
          <div class="codex-item ${found ? "found" : "unknown"}">
            <b>${escapeHtml(era.name)} · ${level}</b>
            <span>${found ? `开局 ${found.count} 次 · 最长 ${found.bestReignYears} 年` : "尚未改元"}</span>
            <small>${found ? `志向达成 ${found.completedAmbitions} 次` : escapeHtml(era.description)}</small>
          </div>
        `;
      }).join("")}
    </div>
  `;
}

function renderAmbitionProgress(codex, ambitions) {
  return `
    <div class="codex-grid">
      ${ambitions.map((ambition) => {
        const found = codex.ambitions?.[ambition.id];
        return `
          <div class="codex-item ${found?.completed ? "found" : "unknown"}">
            <b>${escapeHtml(ambition.title)}</b>
            <span>${found ? `尝试 ${found.attempts} 次 · 达成 ${found.completed} 次` : "尚未立为国策"}</span>
            <small>${escapeHtml(ambition.description)}</small>
          </div>
        `;
      }).join("")}
    </div>
  `;
}

function getEraLevel(era) {
  if (!era) return "未登基";
  if (era.bestReignYears >= 20) return "老祖宗级";
  if (era.bestReignYears >= 12) return "老练";
  if (era.bestReignYears >= 6) return "入门";
  return "试用";
}
