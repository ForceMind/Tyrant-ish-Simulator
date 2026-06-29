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
import { renderWebsite } from "./screens/website.js";
import { renderQuickEnding, renderQuickPlay, renderQuickSetup } from "./screens/quickMode.js";

export function render(root, state) {
  const screen = state.screen || "website";
  const html = {
    website: () => renderWebsite(state),
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
    settings: () => renderSettings(state),
    quickSetup: () => renderQuickSetup(state),
    quickPlay: () => renderQuickPlay(state),
    quickEnding: () => renderQuickEnding(state)
  }[screen]?.() || renderWebsite(state);

  root.innerHTML = html;
}
