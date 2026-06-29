export const GAME_CONFIG = {
  title: "朕错了，但不改",
  subtitle: "My Bad, Your Empire",
  version: "0.1.0-demo",
  storageKeys: {
    save: "shitEmperor.save.v1",
    achievements: "shitEmperor.achievements.v1",
    history: "shitEmperor.history.v1",
    lastEnding: "shitEmperor.lastEnding.v1",
    codex: "shitEmperor.codex.v1",
    settings: "shitEmperor.settings.v1"
  },
  months: ["正月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "冬月", "腊月"],
  statBounds: {
    main: [0, 100],
    hidden: [0, 120],
    meta: [0, 100]
  },
  initialAge: 18,
  maxHistory: 12,
  mainStats: [
    { key: "treasury", label: "国库" },
    { key: "people", label: "民心" },
    { key: "army", label: "军队" },
    { key: "court", label: "朝廷" },
    { key: "happiness", label: "快乐" }
  ],
  metaStats: [
    { key: "health", label: "健康" },
    { key: "prestige", label: "威望" }
  ],
  hiddenStats: [
    "corruption",
    "resentment",
    "famine",
    "disease",
    "enemy",
    "intrigue",
    "eunuch",
    "princeAmbition",
    "mandate"
  ],
  bombCooldownMonths: 4
};

export const STAT_LABELS = {
  treasury: "国库",
  people: "民心",
  army: "军队",
  court: "朝廷",
  happiness: "快乐",
  health: "健康",
  prestige: "威望",
  corruption: "腐败",
  resentment: "民怨",
  famine: "饥荒",
  disease: "疾病",
  enemy: "外敌",
  intrigue: "宫斗",
  eunuch: "太监权势",
  princeAmbition: "皇子野心",
  mandate: "天命"
};
