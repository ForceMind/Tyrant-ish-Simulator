export const AMBITIONS = [
  {
    id: "renovate_realm",
    title: "中兴大业",
    description: "五维长期保持体面，史官试着写点不阴阳怪气的话。",
    flavor: "朕要把祖宗留下的烂摊子，修成不那么烂的摊子。",
    rewardText: "群臣发现陛下居然真在治国，纷纷不知所措。",
    condition: (state) => state.year >= 8 && Object.values(state.stats).every((value) => value >= 65),
    progress: (state) => `目标：八年后五维都不低于65。当前最低：${Math.min(...Object.values(state.stats))}`,
    reward: { prestige: 12, people: 8, court: 8, mandate: 8 }
  },
  {
    id: "golden_vault",
    title: "国库怪梦",
    description: "把国库堆到夸张，但别让百姓全跑光。",
    flavor: "朕要钱，但朕暂时还要纳税人。",
    rewardText: "户部尚书抱着账本睡了一晚，梦里全是铜钱排队进宫。",
    condition: (state) => state.stats.treasury >= 95 && state.stats.people >= 35,
    progress: (state) => `目标：国库95且民心不低于35。当前国库${state.stats.treasury}，民心${state.stats.people}`,
    reward: { prestige: 8, corruption: -8, treasury: 5 }
  },
  {
    id: "happy_throne",
    title: "极乐龙椅",
    description: "快乐很重要，但国家最好别当场散架。",
    flavor: "朕不是昏君，朕只是把情绪价值摆在龙案上。",
    rewardText: "你快乐得很有分寸，史官第一次承认享乐也有技术含量。",
    condition: (state) => state.year >= 6 && state.stats.happiness >= 90 && Object.values(state.stats).filter((value) => value < 35).length <= 1,
    progress: (state) => `目标：六年后快乐90，且低于35的主数值不超过1项。当前快乐${state.stats.happiness}`,
    reward: { happiness: 8, prestige: 6, health: 5 }
  },
  {
    id: "quiet_frontier",
    title: "边关无事",
    description: "让外敌少一点，让边将别天天写遗书。",
    flavor: "朕要让边疆无聊到只能数羊。",
    rewardText: "边关终于安静，驿卒一时不知道没有急报该怎么跑。",
    condition: (state) => state.year >= 7 && state.stats.army >= 75 && state.hidden.enemy <= 25,
    progress: (state) => `目标：七年后军队75且外敌不高于25。当前军队${state.stats.army}，外敌暗流${state.hidden.enemy}`,
    reward: { army: 8, prestige: 8, enemy: -10 }
  },
  {
    id: "clean_court",
    title: "清流朝堂",
    description: "腐败压下去，朝廷别像收费窗口。",
    flavor: "朕要让贪官听见脚步声就开始反省。",
    rewardText: "官员们突然开始谈理想，户部怀疑他们是不是病了。",
    condition: (state) => state.year >= 6 && state.stats.court >= 75 && state.hidden.corruption <= 25,
    progress: (state) => `目标：六年后朝廷75且腐败不高于25。当前朝廷${state.stats.court}，腐败暗流${state.hidden.corruption}`,
    reward: { court: 10, corruption: -12, prestige: 6 }
  },
  {
    id: "immortal_trial",
    title: "谨慎求仙",
    description: "碰玄学可以，但别把自己炼成史料。",
    flavor: "朕要长生，也要先活到下个月。",
    rewardText: "太医和国师罕见地同时点头，虽然点头理由完全相反。",
    condition: (state) => state.year >= 6 && state.counters.alchemyCount >= 4 && state.meta.health >= 50,
    progress: (state) => `目标：六年后炼丹至少4次且健康50。当前炼丹${state.counters.alchemyCount}次，健康${state.meta.health}`,
    reward: { mandate: 12, health: 8, happiness: 5 }
  },
  {
    id: "eunuch_leash",
    title: "九千岁上限管理",
    description: "可以让太监干活，但别让他把皇帝干成摆件。",
    flavor: "朕要偷懒，但玉玺不能跟着偷走。",
    rewardText: "太监总管笑得很职业，职业到不敢多笑。",
    condition: (state) => state.year >= 5 && state.counters.eunuchDelegations >= 3 && state.hidden.eunuch <= 45,
    progress: (state) => `目标：五年后太监代政至少3次且权势不高于45。当前代政${state.counters.eunuchDelegations}次，暗流${state.hidden.eunuch}`,
    reward: { happiness: 8, court: 6, eunuch: -10 }
  },
  {
    id: "people_stay",
    title: "百姓留下",
    description: "不要求人人歌颂，至少别人人逃荒。",
    flavor: "朕要的盛世很朴素：百姓还在户籍上。",
    rewardText: "地方官报上人口回流，语气像见到钱自己走回国库。",
    condition: (state) => state.year >= 7 && state.stats.people >= 80 && state.hidden.resentment <= 30 && state.hidden.famine <= 30,
    progress: (state) => `目标：七年后民心80，民怨和饥荒不高于30。当前民心${state.stats.people}`,
    reward: { people: 10, prestige: 8, resentment: -10, famine: -8 }
  }
];
