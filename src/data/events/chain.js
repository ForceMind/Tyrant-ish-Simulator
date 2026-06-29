import { event, opt } from "./_helpers.js";

export const chainEvents = [
  event("chain_tax_001", "chain", "税吏有了心得", "地方税吏", "税吏总结出新话术：不是多收，是提前感受国家需要。", ["连锁", "征税"], 10, [
    opt("推广话术，收税也要有文采", "百姓听完更气了，但税确实交得更明白。", { treasury: 14, people: -8, resentment: 10 }, { taxCount: 1 }, "征税"),
    opt("禁止花活，收税少点表演", "税吏不演了，百姓骂得也更直接。", { people: 5, resentment: -5, treasury: -4 }),
    opt("让税吏去国子监讲课", "学子们记下了反面教材，税吏记下了出场费。", { treasury: 5, prestige: -2, corruption: 4 })
  ], { taxCountMin: 3 }),
  event("chain_tax_002", "chain", "百姓学会藏粮", "县令", "百姓开始把粮藏得比边关军情还深，税吏挖地挖到怀疑人生。", ["连锁", "征税", "民怨"], 10, [
    opt("搜，朕不信粮会隐身", "粮搜出来一点，怨气搜出来很多。", { treasury: 10, people: -10, resentment: 12 }, { taxCount: 1 }, "征税"),
    opt("减税换信任，先把铲子放下", "百姓半信半疑，税吏很不适应。", { people: 10, resentment: -12, treasury: -8 }),
    opt("奖励主动纳税户，给他们挂红牌", "红牌挂上后，他们被邻居看得很复杂。", { treasury: 6, people: -3, resentment: 5 })
  ], { taxCountMin: 6 }),
  event("chain_tax_003", "chain", "税簿比人厚", "户部尚书", "户籍册越修越厚，村里人越修越少。", ["连锁", "征税", "逃荒"], 9, [
    opt("继续核户，纸面上不能少人", "纸上人口很齐，路上人口也很齐。", { treasury: 8, people: -8, resentment: 10, famine: 4 }, { taxCount: 1 }, "征税"),
    opt("停核一年，让人先活在村里", "地方官很失落，百姓很谨慎。", { people: 9, resentment: -8, treasury: -6 }),
    opt("改按土地征，地至少不会跑", "地没跑，兼并跑得更快。", { treasury: 10, corruption: 8, people: -4 })
  ], { taxCountMin: 8 }),
  event("chain_eunuch_001", "chain", "司礼监有了小本本", "太监总管", "太监总管记下了每位大臣的习惯，连谁上朝先迈左脚都知道。", ["连锁", "太监"], 10, [
    opt("好，信息就是权力的早点", "太监总管点头，权力顺手吃了午饭。", { eunuch: 12, court: -5, happiness: 8 }, { eunuchDelegations: 1 }, "太监"),
    opt("烧了小本本，朕不想被笔记统治", "本子烧了，记本子的人还在。", { eunuch: -8, court: 4, prestige: 3 }),
    opt("让内阁也建小本本", "朝廷进入互相记账时代，效率和疑心一起涨。", { court: 4, intrigue: 6, corruption: -3 })
  ], { eunuchDelegationsMin: 2 }),
  event("chain_eunuch_002", "chain", "太监开始收徒", "司礼监", "小太监们排队学盖章，像一群尚未长成的麻烦。", ["连锁", "太监"], 9, [
    opt("制度化培养，朕要稳定偷懒", "司礼监人才济济，皇权稍微拥挤。", { eunuch: 14, happiness: 9, court: -6 }, { eunuchDelegations: 1 }, "太监"),
    opt("限额，麻烦也要编制管理", "小太监少了，大太监开始珍惜垄断。", { eunuch: -6, court: 3, happiness: -2 }),
    opt("送去读律令，至少懂点法", "他们学会了法，也学会了法的缝。", { court: 4, eunuch: 4, corruption: 3 })
  ], { eunuchDelegationsMin: 4 }),
  event("chain_eunuch_003", "chain", "玉玺睡在司礼监", "内阁首辅", "首辅说玉玺最近在司礼监待得太久，像在那里租了房。", ["连锁", "太监", "朝堂"], 10, [
    opt("拿回来，玉玺不是外派岗位", "玉玺回宫，太监总管笑容少了一层。", { eunuch: -14, court: 6, prestige: 4 }),
    opt("继续放着，朕相信专业保管", "首辅沉默了，司礼监热闹了。", { eunuch: 12, happiness: 8, court: -8 }, { eunuchDelegations: 1 }, "太监"),
    opt("做个副玺糊弄流程", "副玺一出，真假权力开始互相装真。", { court: -5, corruption: 8, prestige: -4 })
  ], { eunuchMin: 55 }),
  event("chain_alchemy_001", "chain", "丹渣再利用", "国师", "国师说丹渣也有灵性，扔了可惜，吃了也许不可惜。", ["连锁", "炼丹"], 9, [
    opt("试试，朕不浪费仙缘", "丹渣很环保，身体很反对。", { health: -8, mandate: 6, happiness: 5 }, { alchemyCount: 1, consecutivePills: 1 }, "炼丹"),
    opt("埋进御花园，看看花怕不怕", "花开得很艳，太医看得很紧张。", { mandate: 3, happiness: 3, disease: 3 }),
    opt("赏给国师，仙缘原路返回", "国师笑得勉强，太医笑得真诚。", { health: 4, mandate: -4, prestige: 2 })
  ], { alchemyCountMin: 3 }),
  event("chain_alchemy_002", "chain", "太医院集体失眠", "太医令", "太医们轮流守夜，不是守你，是守那口丹炉别靠近你。", ["连锁", "炼丹", "健康"], 10, [
    opt("让他们别紧张，朕命硬", "太医听完更紧张，国师听完更兴奋。", { happiness: 6, health: -8, mandate: 5 }, { alchemyCount: 1, consecutivePills: 1 }, "炼丹"),
    opt("暂停炼丹，给太医一点人权", "太医院终于睡了一觉，国师失眠了。", { health: 10, mandate: -6, happiness: -4 }),
    opt("设丹药审批，玄学也要盖章", "国师开始写申请，字里全是不服。", { court: 5, health: 4, mandate: -3 })
  ], { alchemyCountMin: 5 }),
  event("chain_alchemy_003", "chain", "民间仿丹", "市井郎中", "民间开始仿制御丹，招牌写着皇帝同款，太医同款头疼。", ["连锁", "炼丹", "疾病"], 9, [
    opt("禁售，朕的错误不能民用", "假丹少了，笑话没少。", { disease: -8, prestige: 3, mandate: -4 }),
    opt("收专卖税，错误也要财政化", "国库进钱，民间进药，太医进噩梦。", { treasury: 12, disease: 8, corruption: 6 }, { taxCount: 1 }, "腐败"),
    opt("公布安全丹方，至少少毒一点", "郎中们照抄，国师觉得被开源冒犯。", { disease: -5, people: 5, mandate: -3 })
  ], { alchemyCountMin: 6 }),
  event("chain_palace_001", "chain", "宫殿排队", "工部尚书", "新宫还没完，旧宫又嫌自己不够新。", ["连锁", "宫殿", "奢靡"], 10, [
    opt("继续修，建筑群要有家族感", "工地连成一片，国家像在装修里过日子。", { happiness: 14, treasury: -20, corruption: 10, resentment: 6 }, { palaceBuilt: 1 }, "宫殿"),
    opt("停工，宫殿也要懂得满足", "工匠散了，户部像捡回半条命。", { treasury: 10, happiness: -6, resentment: -4 }),
    opt("改成粮仓，奢靡转型民生", "贵妃不高兴，灾民很实际。", { people: 10, famine: -8, prestige: 4, happiness: -5 })
  ], { palaceBuiltMin: 2 }),
  event("chain_palace_002", "chain", "工匠讨工钱", "工部匠头", "工匠说宫殿可以慢慢修，工钱不能慢慢活。", ["连锁", "宫殿", "民怨"], 9, [
    opt("发钱，别让宫殿建在骂声上", "工匠拿到钱，户部失去血色。", { treasury: -14, people: 6, resentment: -5 }),
    opt("欠着，皇家信誉很硬", "信誉确实硬，硬到砸脚。", { treasury: 8, resentment: 10, corruption: 4 }, {}, "摆烂"),
    opt("用宫中旧物抵账", "工匠拿走旧屏风，内务府开始清点尊严。", { treasury: 4, happiness: -3, people: 3 })
  ], { palaceBuiltMin: 3 }),
  event("chain_palace_003", "chain", "新宫漏雨", "工部尚书", "刚修好的宫殿开始漏雨，工部说这是建筑在呼吸。", ["连锁", "宫殿", "腐败"], 9, [
    opt("查工部，呼吸声像贪污", "工部跪了一片，雨还在下。", { corruption: -10, court: -4, treasury: 6 }),
    opt("再拨款修，别让朕淋成明君", "雨停了，钱也停了。", { treasury: -12, happiness: 6, corruption: 6 }, {}, "腐败"),
    opt("搬回旧宫，承认祖宗建筑更硬", "祖宗赢了，工部输了，贵妃冷笑了。", { treasury: 5, prestige: -2, happiness: -4 })
  ], { palaceBuiltMin: 4 }),
  event("chain_uprising_001", "chain", "起义余波", "地方巡抚", "上次起义平了，但百姓看官府的眼神像还没散会。", ["连锁", "起义", "民怨"], 10, [
    opt("安抚乡里，别让余波变海啸", "粥棚和减税一起上，怨气终于慢了一点。", { treasury: -14, people: 10, resentment: -12 }),
    opt("抓余党，余波也要有名单", "名单越来越长，安静越来越薄。", { army: -4, people: -8, resentment: 10 }, {}, "镇压"),
    opt("派清官下去，至少给他们一个稀有物种", "清官到任，地方官像见了天敌。", { people: 7, corruption: -8, court: 4 })
  ], { uprisingCountMin: 1 }),
  event("chain_uprising_002", "chain", "义军改行", "兵部尚书", "一批降卒想当正规军，说反正都会拿刀，不如拿有编制的刀。", ["连锁", "起义", "军事"], 8, [
    opt("收编，刀有编制比较好管", "军队多了，忠诚度像临时税一样临时。", { army: 10, treasury: -6, resentment: -4, corruption: 4 }),
    opt("遣散回乡，别把火种放军营", "他们回去了，地方官睡得不踏实。", { people: 4, army: -3, resentment: 3 }),
    opt("送去修边墙，力气用在墙上", "边墙高了，怨气也被风吹散一点。", { army: 3, enemy: -5, treasury: -5 })
  ], { uprisingCountMin: 1 }),
  event("chain_lowhappy_001", "chain", "皇帝情绪账", "近侍", "近侍说陛下最近笑得少，连御膳房的糖都显得失职。", ["连锁", "快乐", "健康"], 9, [
    opt("办小宴，朕要抢救自己", "你笑了半晚，户部哭了半本账。", { happiness: 12, health: 3, treasury: -8 }),
    opt("继续硬扛，明君哪有情绪", "情绪没了，脉象也快没了。", { court: 5, happiness: -6, health: -6 }, {}, "过劳"),
    opt("出宫走走，看看百姓怎么活", "你看见很多麻烦，也看见一点人气。", { happiness: 6, people: 5, prestige: 3 })
  ], { happinessMax: 25 }),
  event("chain_lowhealth_001", "chain", "遗诏草稿", "中书舍人", "中书舍人小心问遗诏格式，问得太小心，反而很大声。", ["连锁", "健康", "皇子"], 9, [
    opt("写一版，朕主打未雨绸缪", "遗诏写好了，皇子们读空气的能力变强了。", { prestige: 3, princeAmbition: 8, happiness: -6 }),
    opt("撕了，朕还没下线", "你撕得很有气势，太医不敢鼓掌。", { happiness: 6, health: -3, prestige: -2 }),
    opt("立储细则，别让孝心自由发挥", "东宫安静了，宗室开始认真算亲戚关系。", { princeAmbition: -8, intrigue: 6, court: 4 })
  ], { healthMax: 30 })
];
