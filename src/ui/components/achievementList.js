import { ACHIEVEMENTS } from "../../data/achievements.js";
import { loadAchievements } from "../../core/storage.js";
import { escapeHtml } from "../html.js";
import { t } from "../../i18n/index.js";

export function renderAchievementList(items = ACHIEVEMENTS) {
  const unlocked = loadAchievements();
  const rows = items.map((achievement) => {
    const done = Boolean(unlocked[achievement.id]);
    return `
      <li class="achievement ${done ? "unlocked" : "locked"}">
        <b>${done ? "已解锁" : "未解锁"} · ${escapeHtml(achievement.title)}</b>
        <span>${escapeHtml(achievement.description)}</span>
      </li>
    `;
  }).join("");

  return `<ul class="achievement-list">${rows || `<li>${t("labels.noAchievements")}</li>`}</ul>`;
}
