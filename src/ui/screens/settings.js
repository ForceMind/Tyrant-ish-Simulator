import { button, escapeHtml } from "../html.js";
import { t } from "../../i18n/index.js";

export function renderSettings(state) {
  const toast = state.toast ? `<p class="toast">${escapeHtml(state.toast)}</p>` : "";
  return `
    <main class="screen centered-screen">
      <section class="paper-panel settings-panel">
        <p class="seal">设置</p>
        <h1>内阁小房间</h1>
        <p class="muted">当前 Demo 为纯前端单机版。存档、成就、史官档案都在本浏览器里。</p>
        ${toast}
        <div class="title-actions compact-actions">
          ${button("clearSave", t("buttons.clearSave"), "", "danger")}
          ${button("clearHistory", "清空史官档案", "", "danger")}
          ${button("clearCodex", "清空王朝图鉴", "", "danger")}
          ${button("clearAchievements", t("buttons.clearAchievements"), "", "danger")}
          ${button("go", t("buttons.back"), "title")}
        </div>
      </section>
    </main>
  `;
}
