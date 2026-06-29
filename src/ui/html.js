export function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function button(action, label, value = "", extraClass = "") {
  const valueAttr = value === "" ? "" : ` data-value="${escapeHtml(value)}"`;
  return `<button class="btn ${extraClass}" type="button" data-action="${escapeHtml(action)}"${valueAttr}>${escapeHtml(label)}</button>`;
}
