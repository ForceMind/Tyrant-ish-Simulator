import { getAmbition, getCurrentDateLabel, getTurn } from "../../core/engine.js";
import { renderEventCard, renderOptions } from "../components/eventCard.js";
import { renderStatBars } from "../components/statBars.js";
import { button, escapeHtml } from "../html.js";
import { t } from "../../i18n/index.js";

export function renderMainGame(state) {
  const ambition = getAmbition(state);
  return `
    <main class="screen game-screen">
      <header class="game-header">
        <div>
          <p class="date-label">${getCurrentDateLabel(state)}</p>
          <p class="meta-line">${t("labels.age")} ${state.age} · ${t("labels.reign")} ${state.year} 年 · ${t("labels.health")} ${state.meta.health} · ${t("labels.prestige")} ${state.meta.prestige}</p>
        </div>
        ${button("go", "档案", "archives", "ghost small")}
      </header>
      <section class="game-body">
        <div class="main-column">
          ${renderLongTermPanel(state, ambition)}
          ${renderRiskPanel(state)}
          ${renderEventCard(state.currentEvent)}
        </div>
        ${renderOptions(state.currentEvent.options)}
      </section>
      ${renderStatBars(state.stats)}
    </main>
  `;
}

function renderLongTermPanel(state, ambition) {
  const turn = getTurn(state);
  const decreeText = state.activeDecrees.length
    ? state.activeDecrees.map((decree) => {
      const left = Math.max(0, decree.expiresTurn - turn);
      return `<span title="${escapeHtml(decree.description)}">${escapeHtml(decree.title)} · ${left}月</span>`;
    }).join("")
    : "<span>暂无诏令 · 六部正在假装忙</span>";

  const nextDecreeLeft = Math.max(0, (state.nextDecreeTurn ?? 18) - turn);
  const chronicle = (state.chronicle || []).slice(0, 2).map((entry) => `
    <li><b>${escapeHtml(entry.date)}</b>${escapeHtml(entry.title)}：${escapeHtml(entry.text)}</li>
  `).join("");

  return `
    <aside class="long-term-panel">
      <div>
        <p class="panel-label">王朝志向</p>
        <h2>${ambition ? escapeHtml(ambition.title) : "尚未立志"}</h2>
        <p>${ambition ? escapeHtml(ambition.progress(state)) : "史官正在等你给本朝找个说法。"}</p>
        ${state.ambitionCompleted ? `<strong class="success-text">志向已达成</strong>` : ""}
      </div>
      <div>
        <p class="panel-label">现行诏令</p>
        <div class="decree-chips">${decreeText}</div>
        <p class="tiny-note">下次廷议：${nextDecreeLeft === 0 ? "本月" : `${nextDecreeLeft}个月后`}</p>
      </div>
      <div>
        <p class="panel-label">近月实录</p>
        <ul class="mini-chronicle">${chronicle || "<li>史官磨好了墨，正在等你犯事。</li>"}</ul>
      </div>
    </aside>
  `;
}

function renderRiskPanel(state) {
  const risks = [
    risk("民怨", state.hidden.resentment, "乡里怨声开始压不住", "民间仍有骂声，但还没成队"),
    risk("腐败", state.hidden.corruption, "账本缝里都是手", "官场油滑，尚未满锅"),
    risk("外敌", state.hidden.enemy, "边关地图不太老实", "边境偶有风声"),
    risk("疾病", state.hidden.disease, "药铺排队比衙门长", "城中小病小咳"),
    risk("饥荒", state.hidden.famine, "粮价像要飞升", "粮仓不算充实"),
    risk("宫斗", state.hidden.intrigue, "后宫笑声有刀背味", "宫墙内有小风小浪"),
    risk("太监", state.hidden.eunuch, "司礼监脚步声太密", "近侍开始懂流程"),
    risk("皇子", state.hidden.princeAmbition, "东宫灯火亮得太晚", "皇子们正在长大")
  ].filter(Boolean).slice(0, 4);

  return `
    <aside class="risk-panel">
      <div class="risk-header">
        <p class="panel-label">暗流风向</p>
        <span>不显示数值，只显示坏消息的味道</span>
      </div>
      <div class="risk-list">
        ${risks.length ? risks.join("") : `<span class="risk calm">天下暂时没有明显坏味道</span>`}
      </div>
    </aside>
  `;
}

function risk(label, value, highText, midText) {
  if (value >= 70) return `<span class="risk high"><b>${label}</b>${highText}</span>`;
  if (value >= 40) return `<span class="risk mid"><b>${label}</b>${midText}</span>`;
  return "";
}
