import { renderAccession } from "./screens/accession.js";
import { renderAmbition } from "./screens/ambition.js";
import { renderArchives } from "./screens/archives.js";
import { renderDecree, renderDecreeResult } from "./screens/decree.js";
import { renderEnding } from "./screens/ending.js";
import { renderEraSelect } from "./screens/eraSelect.js";
import { renderMainGame } from "./screens/mainGame.js";
import { renderResponse } from "./screens/response.js";
import { renderSettings } from "./screens/settings.js";
import { renderTitle } from "./screens/title.js";

export function render(root, state) {
  const screen = state.screen || "title";
  const html = {
    title: () => renderTitle(state),
    era: () => renderEraSelect(state),
    accession: () => renderAccession(state),
    ambition: () => renderAmbition(state),
    decree: () => renderDecree(state),
    decreeResult: () => renderDecreeResult(state),
    main: () => state.currentEvent ? renderMainGame(state) : renderTitle(state),
    response: () => state.lastResponse ? renderResponse(state) : renderMainGame(state),
    ending: () => renderEnding(state),
    archives: () => renderArchives(state),
    settings: () => renderSettings(state)
  }[screen]?.() || renderTitle(state);

  root.innerHTML = html;
}
