import { event, opt } from "./_helpers.js";

export const militaryEvents = [
  event("military_001", "military", "边军讨饷", "镇北将军", "边军三个月没发饷，将军的奏折写得像催债。", ["军事", "军饷", "边疆"], 9, [
    opt("发饷，刀口不能空着肚子", "士兵吃饱了，户部开始饿。", { treasury: -18, army: 14, enemy: -5 }),
    opt("先欠着，朕的信用很皇家", "将军谢恩的字写得很用力，像刻墓碑。", { treasury: 8, army: -12, enemy: 8 }, {}, "摆烂"),
    opt("让他们屯田，自给自足很励志", "兵开始种地，敌军开始研究收割时间。", { treasury: 6, army: -6, people: 3, enemy: 5 })
  ]),
  event("military_002", "military", "敌国使者微笑", "鸿胪寺卿", "敌国使者说只是路过，地图上却把你的边关圈了三遍。", ["军事", "外敌", "边疆"], 8, [
    opt("增兵边关，顺便让将军少写小作文", "边关旗帜多了，敌使笑得少了。", { treasury: -12, army: 10, enemy: -10 }),
    opt("送礼求和，朕用钱买安静", "敌使带着礼物走了，地图留得很厚。", { treasury: -14, enemy: -4, prestige: -5 }),
    opt("先不管，万一敌军自己迷路呢", "敌军没有迷路，兵部尚书开始怀疑人生。", { enemy: 12, army: -8, happiness: 5 }, {}, "摆烂")
  ]),
  event("military_003", "military", "将军太受欢迎", "兵部尚书", "镇南将军班师，百姓夹道欢迎，声音比见你还真。", ["军事", "将军", "军阀"], 7, [
    opt("重赏将军，强者值得朕的预算", "将军谢恩，兵部记账，户部捂胸口。", { army: 8, prestige: 3, treasury: -10 }),
    opt("调回京城喝茶，兵权先放桌上", "将军笑得像没笑，茶凉得很快。", { army: -5, court: 5, princeAmbition: 4 }),
    opt("公开夸自己慧眼识人", "将军的功劳绕了一圈，落在你脸上。", { prestige: 6, army: 2, corruption: 3 })
  ]),
  event("military_004", "military", "山贼自称义军", "地方巡检", "山贼贴出告示，说他们不是抢，是替天重新分配。", ["军事", "叛乱", "民怨"], 8, [
    opt("派兵清剿，顺便带路费", "山贼散了，路费也散了。", { army: -6, people: 3, resentment: -5, treasury: -6 }),
    opt("招安，给他们一个合法抢人的机会", "山贼换了官服，百姓认得更清楚了。", { army: 6, corruption: 8, people: -5 }, {}, "腐败"),
    opt("悬赏首领，朕买一个太平", "首领被抓，赏银被领三遍。", { treasury: -8, prestige: 4, corruption: 4 })
  ]),
  event("military_005", "military", "御驾亲征提案", "热血将军", "将军说陛下若亲征，士气必振。太医说陛下若亲征，太医院必忙。", ["军事", "亲征"], 7, [
    opt("亲征，朕要让史书有画面", "你骑马半天，主要贡献是让将军紧张。", { army: 8, prestige: 10, health: -8, treasury: -8 }),
    opt("派将军去，朕在后方精神冲锋", "将军真的去了，你真的精神。", { army: 5, happiness: 5, prestige: -2 }),
    opt("写封狠话过去，节省军费", "敌军读完以后，确认你很会写。", { treasury: 5, enemy: 8, prestige: -5 }, {}, "摆烂")
  ]),
  event("military_006", "military", "武库生锈", "兵部郎中", "兵器库里的刀锈得很统一，像一场安静的投降。", ["军事", "军备"], 8, [
    opt("重铸军械，别让士兵拿铁片祈福", "新刀很亮，户部眼前很黑。", { treasury: -15, army: 13, enemy: -4 }),
    opt("刷漆，远看能吓人", "刀看起来很新，砍起来很讲礼貌。", { treasury: -3, army: -6, corruption: 4 }, {}, "摆烂"),
    opt("办武备大检查，先吓吓自己人", "将领们忙了起来，锈迹也忙着藏。", { court: 4, army: 5, corruption: -4 })
  ]),
  event("military_007", "military", "骑兵买马", "太仆寺卿", "马价涨了，马贩子说不是涨价，是马有上进心。", ["军事", "军备", "国库"], 7, [
    opt("买，骑兵不能靠想象奔跑", "马来了，银子走了，太仆寺笑了。", { treasury: -14, army: 10, corruption: 3 }),
    opt("砍价，朕的脸也能当银子", "马贩子低头，主要是憋笑。", { treasury: -8, army: 5, prestige: -2 }),
    opt("训练步兵跑快点", "步兵听完开始怀念马。", { treasury: 4, army: -5, happiness: 4 })
  ]),
  event("military_008", "military", "边关捷报太漂亮", "兵部尚书", "捷报写得文采飞扬，唯一的问题是敌军还在城外。", ["军事", "外敌", "腐败"], 7, [
    opt("核查军情，诗写得好也不能当城墙", "捷报缩水了，边关终于像现实。", { court: 5, enemy: -4, corruption: -5 }),
    opt("照发天下，朕爱听好消息", "百姓刚庆祝完，又听说敌军来补充说明。", { prestige: 5, enemy: 10, people: -5 }, {}, "摆烂"),
    opt("罚写捷报的人去守城", "文采到了城墙上，突然变得很朴素。", { army: 3, court: 2, prestige: 2 })
  ])
];
