import { event, opt } from "./_helpers.js";

export const peopleEvents = [
  event("people_001", "people", "旱得冒烟", "地方知府", "三个月没下雨，田里裂得像户部尚书的心。", ["民生", "旱灾", "饥荒"], 9, [
    opt("开仓赈济，饭先比圣旨快", "百姓端到粥时，第一次觉得朝廷不像传说。", { treasury: -18, people: 14, famine: -12, prestige: 5 }),
    opt("祈雨，朕和天空谈谈", "雨没来，道士先来报销。", { treasury: -6, mandate: 6, famine: 8, people: -5 }, {}, "天命"),
    opt("加税修水利，百姓再努努力", "百姓努力了，主要努力不骂出声。", { treasury: 8, people: -12, resentment: 14, famine: 4 }, { taxCount: 1 }, "征税")
  ]),
  event("people_002", "people", "黄河小脾气", "河道总督", "河堤有点松，水声有点响，奏报写得有点像遗书。", ["民生", "水灾", "河堤"], 9, [
    opt("拨款修堤，别让鱼上朝", "河堤稳了，工部终于做了件不像诗的事。", { treasury: -20, people: 12, famine: -6, prestige: 4 }),
    opt("让地方自筹，朕负责精神支持", "地方筹到了钱，也筹到了民怨。", { treasury: 6, people: -10, resentment: 10 }, {}, "摆烂"),
    opt("派钦差盯着，谁贪谁游泳", "钦差到后，河堤和官员都紧张了。", { court: 6, corruption: -8, treasury: -8 })
  ]),
  event("people_003", "people", "瘟疫传闻", "太医令", "城里咳嗽声越来越整齐，像一支很不吉利的乐队。", ["民生", "瘟疫", "疾病"], 8, [
    opt("隔离医治，朕不让病进奏折", "药汤苦，命更贵，百姓暂时同意。", { treasury: -16, people: 10, disease: -15, health: -2 }),
    opt("宣布只是风寒，稳定很重要", "人心稳了半天，病情没听你的。", { prestige: 3, disease: 14, people: -8 }, {}, "摆烂"),
    opt("请道士驱邪，太医旁边看热闹", "道士跳得很累，病人咳得很准。", { treasury: -8, mandate: 8, disease: 8, court: -3 }, {}, "炼丹")
  ]),
  event("people_004", "people", "逃荒队伍", "驿丞", "官道上全是逃荒百姓，走得比你的政令还快。", ["民生", "逃荒", "民怨"], 8, [
    opt("设粥棚，先把人留在人间", "粥很稀，但至少不是圣旨。", { treasury: -12, people: 10, resentment: -8, famine: -5 }),
    opt("拦回去种地，朕相信土地会感动", "土地没感动，百姓很愤怒。", { army: -3, people: -10, resentment: 14 }, {}, "镇压"),
    opt("登记成劳役，来都来了", "户部说妙，百姓说脏。", { treasury: 10, people: -12, resentment: 12 }, {}, "征税")
  ]),
  event("people_005", "people", "粮价飞升", "市舶司小吏", "米价涨得太快，百姓开始研究空气的饱腹感。", ["民生", "粮价", "饥荒"], 8, [
    opt("平抑粮价，别让米比朕金贵", "粮商哭了，百姓吃上了，户部又瘦了。", { treasury: -14, people: 12, famine: -8 }),
    opt("放任市场，朕相信看不见的手", "那只手确实看不见，主要伸进了百姓碗里。", { treasury: 5, people: -10, famine: 10, corruption: 4 }, {}, "腐败"),
    opt("抓几个奸商祭账本", "粮价低了一点，商人胆子小了一圈。", { people: 5, court: 3, corruption: -4, prestige: 2 })
  ]),
  event("people_006", "people", "乡绅修桥", "地方知府", "乡绅愿意修桥，但桥头碑要比桥还高。", ["民生", "乡绅", "腐败"], 7, [
    opt("准，能过人就行", "桥能过人，碑能挡路。", { people: 7, corruption: 5, prestige: 2 }),
    opt("朝廷出钱，不让功劳外包", "桥修得端正，户部站得不稳。", { treasury: -10, people: 8, court: 3 }),
    opt("让乡绅顺便修学堂", "乡绅笑得很苦，孩子笑得很真。", { people: 10, prestige: 4, corruption: -3 })
  ]),
  event("people_007", "people", "村里闹鬼", "县令", "村民说夜里有鬼哭，县令说可能是欠税的人在练习。", ["民生", "天命", "民怨"], 6, [
    opt("派人查，鬼也要备案", "查出是粮仓漏风，鬼背了半个月黑锅。", { court: 4, people: 4, mandate: -3 }),
    opt("建庙安民，香火费走国库", "庙很快建好，鬼没来，账来了。", { treasury: -8, people: 5, mandate: 5 }),
    opt("抓几个造谣的，朕不喜欢玄学差评", "村里安静了，安静得很像在憋事。", { people: -6, resentment: 8, prestige: -3 }, {}, "镇压")
  ]),
  event("people_008", "people", "丰收但不多", "户部小吏", "今年收成不错，百姓刚想笑，税吏已经在门口练笑。", ["民生", "丰收", "征税"], 7, [
    opt("减税三成，给百姓一个活路表情", "百姓笑得很小心，怕你反悔。", { treasury: -10, people: 12, resentment: -8, prestige: 4 }),
    opt("照旧征收，朕不打扰丰收", "百姓的丰收被朝廷精准收割。", { treasury: 12, people: -5, resentment: 6 }, { taxCount: 1 }, "征税"),
    opt("加征喜税，既然大家都高兴", "大家确实高兴过，主要是你来之前。", { treasury: 20, people: -14, resentment: 16 }, { taxCount: 1 }, "征税")
  ])
];
