export function event(id, category, title, speaker, text, tags, weight, options, conditions = {}) {
  return { id, category, title, speaker, text, tags, weight, conditions, options };
}

export function opt(text, response, effects, counters = {}, mistakeTag = "") {
  return { text, response, effects, counters, mistakeTag };
}
