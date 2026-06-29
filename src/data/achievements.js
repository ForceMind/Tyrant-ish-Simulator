export const ACHIEVEMENTS = [
  {
    id: "no_court_year",
    title: "一年不上朝",
    description: "连续十二个月把朝政熬成自助餐。",
    condition: (state) => state.counters.noCourtStreak >= 12
  },
  {
    id: "tax_master",
    title: "百姓潜力开发大师",
    description: "累计加税十次，百姓潜力终于开始反向开发你。",
    condition: (state) => state.counters.taxCount >= 10
  },
  {
    id: "treasury_or_bust",
    title: "朕与国库共存亡",
    description: "国库到顶，民心见底。",
    condition: (state) => state.stats.treasury >= 100 && state.stats.people < 10
  },
  {
    id: "eunuch_plan",
    title: "九千岁养成计划",
    description: "太监权势达到八十，皇帝开始像宫廷吉祥物。",
    condition: (state) => state.hidden.eunuch >= 80
  },
  {
    id: "pill_time",
    title: "丹来",
    description: "连续吃丹药三次，太医已经不看脉了，只看天。",
    condition: (state) => state.counters.consecutivePills >= 3
  },
  {
    id: "as_i_wish",
    title: "这盛世如朕所愿",
    description: "五维全低于二十但快乐高于九十。",
    condition: (state) => Object.values(state.stats).every((value) => value < 20) && state.stats.happiness > 90
  },
  {
    id: "never_change",
    title: "朕错了，但不改",
    description: "同类错误连续选择五次。",
    condition: (state) => state.counters.sameMistakeStreak >= 5
  },
  {
    id: "ten_years",
    title: "祖宗先别急",
    description: "单局在位十年，太庙暂时不用加班。",
    condition: (state) => state.year >= 10
  },
  {
    id: "ambition_done",
    title: "史官有主线了",
    description: "完成一次王朝志向。",
    condition: (state) => state.ambitionCompleted
  },
  {
    id: "three_decrees",
    title: "诏令批发商",
    description: "同时维持三道阶段诏令。",
    condition: (state) => (state.activeDecrees || []).length >= 3
  },
  {
    id: "hidden_firefighter",
    title: "拆雷熟练工",
    description: "经历至少三次爆雷还没下台。",
    condition: (state) => state.counters.uprisingCount >= 1 && (state.chronicle || []).filter((entry) => entry.title.includes("爆") || entry.title.includes("揭竿") || entry.text.includes("爆雷")).length >= 2
  },
  {
    id: "old_emperor",
    title: "老登但能打",
    description: "活到五十岁，史官开始担心自己先退休。",
    condition: (state) => state.age >= 50
  },
  {
    id: "balanced_realm",
    title: "五边形皇帝",
    description: "五维同时不低于八十。",
    condition: (state) => Object.values(state.stats).every((value) => value >= 80)
  }
];
