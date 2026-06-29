import { event, opt } from "./_helpers.js";

export const blackSwanEvents = [
  event("black_001", "blackSwan", "地龙翻身", "钦天监", "大地震后，钦天监说这是地气不顺，百姓说这是房子没了。", ["黑天鹅", "灾异", "民生"], 4, [
    opt("救灾，别让废墟等批文", "灾民看见粮车，比看见圣旨高兴。", { treasury: -25, people: 16, prestige: 8, mandate: -4 }),
    opt("先祭天，流程不能塌", "祭坛很稳，民房不稳。", { treasury: -8, mandate: 8, people: -10, resentment: 10 }, {}, "天命"),
    opt("让地方自救，朕相信韧性", "韧性有了，怨气也有了。", { treasury: 6, people: -15, resentment: 16, famine: 5 }, {}, "摆烂")
  ], { yearMin: 2 }),
  event("black_002", "blackSwan", "刺客进宫", "禁军统领", "刺客被抓时说只是迷路，手里的短刀显得很不礼貌。", ["黑天鹅", "刺杀", "宫斗"], 4, [
    opt("严查宫禁，连花盆都审", "宫门紧了，后宫也紧张了。", { army: 5, intrigue: -6, prestige: 3 }),
    opt("扩大株连，朕要安全感", "安全感上来了，人心下去了。", { prestige: -6, people: -8, resentment: 10, intrigue: 5 }, {}, "镇压"),
    opt("低调处理，朕不想上热搜史书", "消息还是传出去了，版本比刺客还多。", { prestige: -5, intrigue: 6, happiness: -3 })
  ]),
  event("black_003", "blackSwan", "全国起义传闻", "驿卒", "十八路百姓表示不想再相信潜力了。", ["黑天鹅", "起义", "民怨"], 4, [
    opt("镇压，朕的耐心用完了", "军队出发了，百姓更多了。", { army: -20, people: -15, resentment: -10, prestige: -5 }, { uprisingCount: 1 }, "镇压"),
    opt("赈灾，迟来的仁政也是仁政", "迟来的饭能吃，但噎人。", { treasury: -30, people: 12, resentment: -15 }, { uprisingCount: 1 }),
    opt("罪己诏，先把锅写圆", "你说都是朕的错。百姓说：知道了，钱呢？", { prestige: -10, people: 8, resentment: -8 }, { uprisingCount: 1 })
  ], { resentmentMin: 55 }),
  event("black_004", "blackSwan", "外敌越界散步", "边关守将", "敌军没有打进来，他们只是把国境线往里挪了三百里。", ["黑天鹅", "外敌", "边疆"], 4, [
    opt("全国动员，地不能自己回来", "军旗动了，户部也动了急救心思。", { treasury: -25, army: 10, enemy: -18, people: -5 }),
    opt("割地求安，朕很会舍小保小", "敌军满意了，祖宗可能不满意。", { enemy: -8, prestige: -18, mandate: -8 }),
    opt("派使者骂回去", "使者骂得很有文采，边境丢得很朴素。", { enemy: 10, prestige: -8, army: -5 }, {}, "摆烂")
  ], { enemyMin: 55 }),
  event("black_005", "blackSwan", "国库被借空", "户部尚书", "户部说有一笔临时调度，调着调着就度没了。", ["黑天鹅", "国库", "腐败"], 4, [
    opt("抄家追银，朕的钱要回家", "银子回了一半，敌人多了一倍。", { treasury: 18, corruption: -10, court: -6 }),
    opt("悄悄补账，面子先活", "账本好看了，漏洞也长大了。", { treasury: -10, corruption: 12, prestige: -3 }, {}, "腐败"),
    opt("公开审计，谁难看谁活该", "难看的不止账，还有很多官脸。", { corruption: -12, court: 6, prestige: 5 })
  ], { corruptionMin: 55 }),
  event("black_006", "blackSwan", "太子门客太多", "东宫詹事", "东宫门口车马比早朝还热闹，孝心看起来很会组队。", ["黑天鹅", "皇子", "宫斗"], 4, [
    opt("削东宫班底，亲情需要瘦身", "太子低头称是，门客低头记仇。", { princeAmbition: -12, intrigue: 8, prestige: 2 }),
    opt("召太子谈心，父子局别带刀", "谈心很温和，沉默很锋利。", { princeAmbition: -5, happiness: -3, intrigue: 3 }),
    opt("赏太子，先稳住未来的麻烦", "太子谢恩时，眼神像在验收。", { treasury: -10, princeAmbition: 10, prestige: -4 }, {}, "皇子")
  ], { princeAmbitionMin: 50 }),
  event("black_007", "blackSwan", "瘟疫入京", "太医令", "城门口的病人越来越多，京城第一次觉得热闹不是好词。", ["黑天鹅", "瘟疫", "疾病"], 4, [
    opt("封坊救治，疼也要切开烂肉", "怨声很大，但病势终于慢了。", { treasury: -20, disease: -18, people: 6, happiness: -5 }),
    opt("隐瞒消息，别吓着朕", "你没被消息吓着，被现实吓着了。", { disease: 16, people: -12, prestige: -8 }, {}, "摆烂"),
    opt("开坛祈福，药方和符纸一起上", "符纸飞得很漂亮，药材到得很慢。", { treasury: -10, disease: -5, mandate: 8, court: -3 })
  ], { diseaseMin: 50 }),
  event("black_008", "blackSwan", "祥瑞过量", "钦天监", "一月之内三次祥瑞，史官怀疑天命也开始刷业绩。", ["黑天鹅", "祥瑞", "天命"], 4, [
    opt("大办庆典，天命都这么努力了", "庆典很盛大，灾民看得很远。", { happiness: 12, mandate: 10, treasury: -18, resentment: 8 }, {}, "奢靡"),
    opt("低调记录，别把天命用透支", "钦天监有点失落，户部非常清醒。", { mandate: 4, treasury: 4, prestige: 2 }),
    opt("查谁在制造祥瑞", "查出几只染色鸟和一批很懂上意的人。", { corruption: -8, mandate: -8, court: 5 })
  ], { mandateMin: 50 })
];
