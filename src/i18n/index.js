import { zhCN } from "./zh-CN.js";

const dictionaries = {
  "zh-CN": zhCN
};

let currentLanguage = "zh-CN";

export function setLanguage(language) {
  if (dictionaries[language]) currentLanguage = language;
}

export function t(path) {
  const keys = path.split(".");
  let value = dictionaries[currentLanguage];
  for (const key of keys) {
    value = value?.[key];
  }
  return value || path;
}
