export const DECREE_POOL = [
  {
    id: "light_tax",
    title: "轻徭薄赋",
    description: "少收一点，先让百姓误以为朝廷长良心了。",
    duration: 48,
    immediateEffects: { people: 8, treasury: -8, resentment: -6 },
    monthlyEffects: { people: 1, treasury: -1, resentment: -1 },
    response: "税吏拿着新章程沉默了，百姓拿着粮袋也沉默了。"
  },
  {
    id: "hard_tax",
    title: "开源猛政",
    description: "收入上来很快，民怨也会跑得像急报。",
    duration: 48,
    immediateEffects: { treasury: 16, people: -8, resentment: 8 },
    monthlyEffects: { treasury: 2, people: -1, resentment: 2 },
    response: "户部尚书笑出声，然后立刻假装自己很悲悯。"
  },
  {
    id: "frontier_drill",
    title: "边军整训",
    description: "让边军先忙起来，敌军就不太敢让你忙起来。",
    duration: 48,
    immediateEffects: { army: 8, treasury: -8, enemy: -4 },
    monthlyEffects: { army: 1, treasury: -1, enemy: -1 },
    response: "将军终于有钱练兵，士兵终于不用拿木棍想象铁器。"
  },
  {
    id: "court_audit",
    title: "清查账册",
    description: "翻账本，翻到谁心虚谁先出汗。",
    duration: 48,
    immediateEffects: { court: 6, corruption: -10, happiness: -4 },
    monthlyEffects: { court: 1, corruption: -1, happiness: -1 },
    response: "官员们开始怀念没有审计的日子，像怀念青春。"
  },
  {
    id: "river_works",
    title: "河工优先",
    description: "钱流向河堤，总比河水流向京城强。",
    duration: 48,
    immediateEffects: { treasury: -12, people: 6, famine: -5 },
    monthlyEffects: { treasury: -1, people: 1, famine: -1 },
    response: "河道总督第一次收到钱时，表情像收到赦免。"
  },
  {
    id: "inner_budget",
    title: "内帑节流",
    description: "宫里少花一点，快乐先进入寒冬。",
    duration: 48,
    immediateEffects: { treasury: 10, happiness: -8, court: 4 },
    monthlyEffects: { treasury: 1, happiness: -1, corruption: -1 },
    response: "内务府开始研究如何把寒酸说成雅致。"
  },
  {
    id: "palace_mood",
    title: "与朕同乐",
    description: "快乐会涨，账会哭，史官会很忙。",
    duration: 48,
    immediateEffects: { happiness: 14, prestige: 4, treasury: -12 },
    monthlyEffects: { happiness: 2, treasury: -1, corruption: 1 },
    response: "宫里灯火通明，户部尚书的眼圈也通明。"
  },
  {
    id: "eunuch_limit",
    title: "司礼限权",
    description: "太监可以盖章，但不能把国家盖成自己的。",
    duration: 48,
    immediateEffects: { eunuch: -12, court: 4, happiness: -3 },
    monthlyEffects: { eunuch: -1, court: 1 },
    response: "太监总管笑得像规矩本人，背后像账本本人。"
  },
  {
    id: "prince_school",
    title: "东宫严课",
    description: "让皇子多读书，少研究父皇什么时候变历史。",
    duration: 48,
    immediateEffects: { princeAmbition: -10, court: 3, intrigue: 3 },
    monthlyEffects: { princeAmbition: -1, happiness: -1 },
    response: "太子开始背孝经，背得每个字都像另有意思。"
  },
  {
    id: "harem_peace",
    title: "后宫和气令",
    description: "不求真和气，至少别让太医天天研究现场。",
    duration: 48,
    immediateEffects: { intrigue: -12, happiness: -4, prestige: 3 },
    monthlyEffects: { intrigue: -1, happiness: -1 },
    response: "皇后和贵妃同时微笑，宫灯都暗了一点。"
  },
  {
    id: "alchemy_office",
    title: "丹道专办",
    description: "把炼丹正规化，方便以后正规地后悔。",
    duration: 48,
    immediateEffects: { mandate: 10, treasury: -8, health: -3 },
    monthlyEffects: { mandate: 1, treasury: -1, health: -1 },
    response: "国师有了编制，太医有了噩梦。"
  },
  {
    id: "open_market",
    title: "开市通商",
    description: "让钱进来，也让麻烦带着口音进来。",
    duration: 48,
    immediateEffects: { treasury: 8, people: 4, enemy: 4 },
    monthlyEffects: { treasury: 1, people: 1, enemy: 1 },
    response: "商队排进城门，守军第一次觉得税票比刀多。"
  }
];
