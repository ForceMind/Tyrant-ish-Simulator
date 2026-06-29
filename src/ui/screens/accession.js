import { button } from "../html.js";
import { escapeHtml } from "../html.js";
import { t } from "../../i18n/index.js";

export function renderAccession(state) {
  return `
    <main class="screen centered-screen">
      <section class="scroll-panel">
        <p class="seal">登基诏</p>
        <h1>新帝登基</h1>
        <p class="big-quote">${escapeHtml(state.accessionText)}</p>
        ${button("beginReign", t("buttons.begin"), "", "primary")}
      </section>
    </main>
  `;
}
