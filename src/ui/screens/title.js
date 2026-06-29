import { GAME_CONFIG } from "../../core/config.js";
import { button } from "../html.js";
import { t } from "../../i18n/index.js";

export function renderTitle(state) {
  const toast = state.toast ? `<p class="toast">${state.toast}</p>` : "";
  return `
    <main class="screen title-screen">
      <section class="hero-panel">
        <p class="seal">单机王朝荒唐实录</p>
        <h1>${GAME_CONFIG.title}</h1>
        <p class="subtitle">${GAME_CONFIG.subtitle}</p>
        <div class="title-actions">
          ${button("newGame", t("buttons.start"), "", "primary")}
          ${button("loadGame", t("buttons.load"))}
          ${button("go", t("buttons.archives"), "archives")}
          ${button("go", t("buttons.settings"), "settings")}
        </div>
        ${toast}
      </section>
    </main>
  `;
}
