import { STAT_LABELS } from "../../core/config.js";
import { QUICK_PARAM_GROUPS } from "../../data/quickMode.js";
import { renderStatBars } from "../components/statBars.js";
import { button, escapeHtml } from "../html.js";

export function renderQuickSetup(state) {
  const params = state.quick?.params || {};
  return `
    <main class="screen quick-screen">
      <header class="top-nav">
        ${button("go", "返回官网", "website", "ghost")}
        <div>
          <p class="seal">快速版</p>
          <h1>三分钟写完一朝实录</h1>
        </div>
      </header>
      <section class="quick-setup-grid">
        ${QUICK_PARAM_GROUPS.map((group) => renderParamGroup(group, params[group.key] || group.options[0].id)).join("")}
      </section>
      <section class="quick-start-panel paper-panel">
        <div>
          <h2>快速登基说明</h2>
          <p>先选皇帝底色、施政习惯、开局麻烦和推演速度。系统会自动压缩几年时间，只在关键节点让你拍板。</p>
        </div>
        ${button("startQuick", "开始速写王朝", "", "primary")}
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
          <p class="event-kicker">关键节点</p>
          <h2>${escapeHtml(event.title)}</h2>
          <p class="event-text">${escapeHtml(event.text)}</p>
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
                ${escapeHtml(option.text)}
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

