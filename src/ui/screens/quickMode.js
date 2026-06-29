import { STAT_LABELS } from "../../core/config.js";
import { QUICK_PARAM_GROUPS } from "../../data/quickMode.js";
import { renderStatBars } from "../components/statBars.js";
import { button, escapeHtml } from "../html.js";

export function renderQuickSetup(state) {
  const params = state.quick?.params || {};
  const page = Math.max(0, Math.min(Number(state.quickSetupPage) || 0, QUICK_PARAM_GROUPS.length - 1));
  const group = QUICK_PARAM_GROUPS[page];
  return `
    <main class="screen quick-screen">
      <header class="top-nav">
        ${button("go", "返回官网", "website", "ghost")}
        <div>
          <p class="seal">快速版</p>
          <h1>三分钟写完一朝实录</h1>
          <p class="meta-line">第 ${page + 1}/${QUICK_PARAM_GROUPS.length} 组 · ${escapeHtml(group.title)}</p>
        </div>
      </header>
      <section class="quick-setup-grid">
        ${renderParamGroup(group, params[group.key] || group.options[0].id)}
      </section>
      <section class="quick-start-panel paper-panel">
        <div>
          <h2>快速登基说明</h2>
          <p>先选皇帝底色、施政习惯、开局麻烦和推演速度。系统会自动压缩几年时间，只在关键节点让你拍板。</p>
        </div>
        <div class="quick-setup-actions">
          <button class="btn ghost" type="button" data-action="quickSetupPage" data-value="${page - 1}" ${page === 0 ? "disabled" : ""}>上一组</button>
          ${button("startQuick", "开始速写王朝", "", "primary")}
          <button class="btn ghost" type="button" data-action="quickSetupPage" data-value="${page + 1}" ${page === QUICK_PARAM_GROUPS.length - 1 ? "disabled" : ""}>下一组</button>
        </div>
      </section>
    </main>
  `;
}

export function renderQuickPlay(state) {
  const run = state.quick?.run;
  if (!run?.currentEvent) return renderQuickSetup(state);
  const event = run.currentEvent;
  return `
    <main class="screen quick-play-screen">
      <header class="game-header">
        <div>
          <p class="date-label">快速版 · ${run.year} 年</p>
          <p class="meta-line">关键选择 ${run.choiceCount + 1}/${run.events.length} · 健康 ${run.meta.health} · 威望 ${run.meta.prestige}</p>
        </div>
        ${button("go", "退出", "website", "ghost small")}
      </header>
      <section class="quick-play-layout">
        <article class="event-card quick-event-card">
          <div class="quick-event-copy">
            <p class="event-kicker">关键节点</p>
            <h2>${escapeHtml(event.title)}</h2>
            <p class="event-text">${escapeHtml(event.text)}</p>
          </div>
          <div class="quick-event-illustration" aria-hidden="true">
            <span>${escapeHtml(eventIcon(event.id))}</span>
          </div>
          ${run.lastChoice ? renderLastChoice(run.lastChoice) : ""}
        </article>
        <aside class="imperial-choice-panel quick-choice-panel">
          <div class="choice-panel-head">
            <span>拍板</span>
            <small>一键推进几年，史官负责补刀</small>
          </div>
          <div class="option-list">
            ${event.options.map((option, index) => `
              <button class="option-btn" type="button" data-action="chooseQuickOption" data-value="${index}">
                <span class="option-icon">${escapeHtml(optionIcon(option.text))}</span>
                <span>${escapeHtml(option.text)}</span>
                <small>史官旁批：${escapeHtml(option.response)}</small>
              </button>
            `).join("")}
          </div>
        </aside>
        <aside class="paper-panel quick-log-panel">
          <h2>速写年表</h2>
          <ol class="quick-log">
            ${run.log.map((entry) => `<li><b>${entry.year}年 · ${escapeHtml(entry.title)}</b><span>${escapeHtml(entry.text)}</span></li>`).join("")}
          </ol>
        </aside>
      </section>
      ${renderStatBars(run.stats)}
    </main>
  `;
}

export function renderQuickEnding(state) {
  const run = state.quick?.run;
  if (!run?.ending) return renderQuickSetup(state);
  return `
    <main class="screen ending-screen quick-ending-screen">
      <section class="paper-panel ending-scroll">
        <p class="seal">快速版实录</p>
        <h1>${escapeHtml(run.ending.title)}</h1>
        <p class="big-quote">${escapeHtml(run.ending.evaluation)}</p>
        <p class="posthumous">史称：${escapeHtml(run.ending.posthumous)}</p>
        ${renderQuickFinalStats(run)}
        <div class="ending-chronicle">
          <h2>速写摘抄</h2>
          <ul>
            ${run.log.map((entry) => `<li><b>${entry.year}年 · ${escapeHtml(entry.title)}</b>${escapeHtml(entry.text)}</li>`).join("")}
          </ul>
        </div>
        <div class="compact-actions">
          ${button("restartQuick", "再速写一朝", "", "primary")}
          ${button("newGame", "进入完整模式")}
          ${button("go", "返回官网", "website", "ghost")}
        </div>
      </section>
      ${renderStatBars(run.stats)}
    </main>
  `;
}

function renderParamGroup(group, selectedId) {
  return `
    <section class="paper-panel quick-param-group">
      <div>
        <p class="seal">${escapeHtml(group.title)}</p>
        <p>${escapeHtml(group.description)}</p>
      </div>
      <div class="quick-param-options">
        ${group.options.map((option) => `
          <button class="quick-param-card ${option.id === selectedId ? "active" : ""}" type="button" data-action="quickParam" data-value="${escapeHtml(`${group.key}:${option.id}`)}">
            <span class="param-icon">${escapeHtml(paramIcon(option.id))}</span>
            <b>${escapeHtml(option.title)}</b>
            <span>${escapeHtml(option.text)}</span>
          </button>
        `).join("")}
      </div>
    </section>
  `;
}

function renderLastChoice(choice) {
  return `
    <div class="quick-last-choice">
      <b>上次圣裁：${escapeHtml(choice.text)}</b>
      <span>${escapeHtml(choice.response)}</span>
      <div class="change-list">${renderChanges(choice.changes)}</div>
    </div>
  `;
}

function renderChanges(changes) {
  if (!changes?.length) return `<span>史官：表面平静，通常不是什么好事</span>`;
  return changes.map((change) => {
    const label = STAT_LABELS[change.key] || "暗流";
    const sign = change.delta > 0 ? "+" : "";
    const hidden = !["treasury", "people", "army", "court", "happiness", "health", "prestige"].includes(change.key);
    const text = hidden ? `${label}${change.delta > 0 ? "涌动" : "稍平"}` : `${label} ${sign}${change.delta}`;
    return `<span class="${change.delta > 0 ? "up" : "down"}">${escapeHtml(text)}</span>`;
  }).join("");
}

function renderQuickFinalStats(run) {
  const rows = [
    ["国库", run.stats.treasury],
    ["民心", run.stats.people],
    ["军队", run.stats.army],
    ["朝廷", run.stats.court],
    ["快乐", run.stats.happiness],
    ["健康", run.meta.health],
    ["威望", run.meta.prestige]
  ];
  return `<div class="final-stat-strip quick-final-strip">${rows.map(([label, value]) => `<span><b>${label}</b>${value}</span>`).join("")}</div>`;
}

function paramIcon(id) {
  const icons = {
    lazy: "床",
    diligent: "卷",
    rich: "库",
    immortal: "丹",
    benevolent: "仁",
    iron: "拳",
    delegate: "印",
    pleasure: "乐",
    poor: "碗",
    border: "关",
    harem: "宫",
    omen: "瑞",
    short: "速",
    normal: "传",
    chaos: "压",
    long: "卷"
  };
  return icons[id] || "策";
}

function eventIcon(id) {
  if (id.includes("tax")) return "碗";
  if (id.includes("border")) return "关";
  if (id.includes("flood")) return "堤";
  if (id.includes("palace")) return "宫";
  if (id.includes("eunuch")) return "印";
  if (id.includes("alchemy")) return "丹";
  if (id.includes("prince")) return "储";
  return "奏";
}

function optionIcon(text) {
  if (text.includes("税")) return "税";
  if (text.includes("夜宵") || text.includes("快乐")) return "乐";
  if (text.includes("官位") || text.includes("太监")) return "印";
  if (text.includes("军") || text.includes("亲征")) return "兵";
  if (text.includes("丹")) return "丹";
  return "旨";
}
