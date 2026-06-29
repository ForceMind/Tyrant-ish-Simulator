export const ENDING_RULES = [
  {
    id: "eunuch_puppet",
    title: "太监傀儡",
    priority: 100,
    condition: (state) => state.hidden.eunuch >= 95 && state.stats.court <= 35,
    reason: "太监总管替你批折子、替你见大臣，最后差点替你当祖宗。",
    evaluation: "帝仍坐龙椅，只是龙椅已经不听他的了。"
  },
  {
    id: "prince_coup",
    title: "被皇子篡位",
    priority: 95,
    condition: (state) => state.hidden.princeAmbition >= 90 && (state.meta.health <= 35 || state.meta.prestige <= 30),
    reason: "太子提前尽孝，把父皇送进了历史。",
    evaluation: "宫门开得很早，孝心来得很硬。"
  },
  {
    id: "alchemy_fail",
    title: "修仙失败",
    priority: 90,
    condition: (state) => state.counters.alchemyCount >= 6 && state.meta.health <= 25,
    reason: "帝追求长生，成功缩短了等待时间。",
    evaluation: "炼丹炉还热，太庙已经在排班。"
  },
  {
    id: "fallen_dynasty",
    title: "亡国之君",
    priority: 85,
    condition: (state) => state.stats.people <= 10 && state.stats.army <= 20 && (state.hidden.enemy >= 70 || state.hidden.resentment >= 80),
    reason: "民心和军队一起下班，新朝顺手上班。",
    evaluation: "帝在位多年，擅长把小问题拖成大问题，把大问题拖成新朝代。"
  },
  {
    id: "happy_fool",
    title: "极乐昏君",
    priority: 80,
    condition: (state) => state.stats.happiness >= 95 && state.stats.people <= 20 && state.stats.court <= 20 && state.stats.army <= 25,
    reason: "帝一生很快乐，除了他的国家、百姓、大臣、儿子和祖宗。",
    evaluation: "笑声传出宫墙时，城墙正在往里倒。"
  },
  {
    id: "fiscal_monster",
    title: "财政怪物",
    priority: 75,
    condition: (state) => state.stats.treasury >= 95 && state.stats.people <= 15 && state.hidden.corruption >= 75,
    reason: "国库很满，国家很空。",
    evaluation: "钱库里有回声，田野里也有回声。"
  },
  {
    id: "worker_emperor",
    title: "社畜皇帝",
    priority: 70,
    condition: (state) => state.stats.court >= 80 && state.stats.people >= 75 && state.stats.happiness <= 10 && state.meta.health <= 15,
    reason: "帝把国家治理得很好，把自己治理没了。",
    evaluation: "百姓称颂明君，太医称颂别再卷了。"
  },
  {
    id: "wise_emperor",
    title: "千古明君",
    priority: 60,
    condition: (state) => state.year >= 12 && Object.values(state.stats).every((value) => value >= 70) && state.meta.health >= 45,
    reason: "帝虽偶有离谱，但大体像个人君。",
    evaluation: "史官写到这里，甚至有点不适应。"
  },
  {
    id: "early_death",
    title: "驾崩得很突然",
    priority: 50,
    condition: (state) => state.meta.health <= 0,
    reason: "太医说不是治不了，是陛下太配合丹药。",
    evaluation: "皇位还热，遗诏先凉。"
  },
  {
    id: "collapsed_office",
    title: "政令不出宫门",
    priority: 40,
    condition: (state) => state.stats.court <= 0 && state.meta.prestige <= 20,
    reason: "圣旨传到宫门口，被现实退回。",
    evaluation: "朝廷还在，功能像摆设。"
  }
];
