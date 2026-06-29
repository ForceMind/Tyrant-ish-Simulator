import { event, opt } from "./_helpers.js";

export const treasuryEvents = [
  event("treasury_001", "treasury", "户部哭穷", "户部尚书", "国库只剩三个月俸禄。再不想办法，臣就要自带干粮上朝了。", ["国库", "征税", "民怨"], 10, [
    opt("加税，朕相信百姓的潜力", "户部尚书眼前一亮，百姓眼前一黑。", { treasury: 20, people: -15, resentment: 12 }, { taxCount: 1 }, "征税"),
    opt("宫里少点夜宵，朕先装三天节俭", "太监总管当场落泪：陛下，您终于像个人君了。", { treasury: 8, happiness: -10, court: 5 }),
    opt("卖几个官位，反正他们迟早也贪", "新任县令排队交钱，百姓开始排队搬家。", { treasury: 25, corruption: 15, people: -8 }, {}, "腐败")
  ], { treasuryMax: 60 }),
  event("treasury_002", "treasury", "铸币新政", "少府监", "少府监建议把铜钱做薄一点，反正百姓也不会拿尺子量良心。", ["国库", "铸币"], 8, [
    opt("铸薄钱，朕要轻装上阵", "钱轻了，物价飘了，商人笑得很重。", { treasury: 16, people: -8, corruption: 6, resentment: 5 }, {}, "国库"),
    opt("维持旧制，别让钱也学朕变坏", "户部很失望，市场很意外。", { people: 5, prestige: 4, treasury: -3 }),
    opt("发行纪念大钱，刻朕侧脸", "百姓说像不像不重要，买不起才重要。", { treasury: 10, prestige: 3, resentment: 4 })
  ]),
  event("treasury_003", "treasury", "贡品山海", "鸿胪寺卿", "藩属送来一车奇珍，户部问能不能把孔雀折成银子。", ["国库", "贡品", "奢靡"], 7, [
    opt("全部入库，孔雀也算流动资产", "孔雀不流动，账本流泪。", { treasury: 8, prestige: 4 }),
    opt("摆宴炫耀，朕要让外邦见识饭量", "外邦确实见识了，户部也见识了。", { happiness: 12, prestige: 6, treasury: -10, corruption: 4 }, {}, "奢靡"),
    opt("赏给大臣，看看谁先露馅", "收礼的人很感动，没收礼的人开始写弹劾。", { court: -4, corruption: 8, prestige: 2 })
  ]),
  event("treasury_004", "treasury", "盐商请安", "盐运使", "盐商说愿为国分忧，只求税少一点、路宽一点、官瞎一点。", ["国库", "贸易", "腐败"], 8, [
    opt("收钱办事，国家也要懂人情", "盐商分忧分得很熟练，百姓吃盐吃得很慎重。", { treasury: 18, corruption: 14, people: -6 }, {}, "腐败"),
    opt("严查盐税，朕今天不吃糖衣", "盐商哭得很咸，户部笑得很甜。", { treasury: 10, corruption: -8, court: 4 }),
    opt("让他们捐桥，桥名叫朕英明", "桥修好了，碑比桥贵。", { prestige: 5, people: 4, corruption: 5 })
  ]),
  event("treasury_005", "treasury", "库银长腿", "户部郎中", "账上少了三千两，库吏说银子可能是思乡。", ["国库", "贪污"], 8, [
    opt("查到底，朕的钱不许私奔", "银子没全回来，人倒是跪了一排。", { treasury: 12, corruption: -10, court: 3 }),
    opt("罚俸三月，意思到了就行", "贪官松了口气，银子也松了口气。", { treasury: 4, corruption: 8, prestige: -3 }, {}, "腐败"),
    opt("装没看见，朕今天眼神不好", "户部学会了眨眼，国库学会了漏风。", { happiness: 5, treasury: -10, corruption: 12 }, {}, "摆烂")
  ]),
  event("treasury_006", "treasury", "开矿发财梦", "工部侍郎", "山里发现矿脉，工部说只要先花一大笔钱，就可能赚一更大笔梦。", ["国库", "工程"], 7, [
    opt("投，朕讨厌错过暴富", "矿是有的，账也是塌的。", { treasury: -12, prestige: 4, corruption: 5 }),
    opt("民间承包，朝廷只收快乐钱", "商人挖矿，官员挖商人，百姓挖野菜。", { treasury: 15, corruption: 12, people: -5 }, {}, "腐败"),
    opt("先修路，别让银子迷路", "路通了，矿还在，工部居然像在做事。", { treasury: -6, court: 5, people: 5 })
  ]),
  event("treasury_007", "treasury", "边贸开放", "鸿胪寺卿", "商队想进关贸易，将军想收税，御史想写长文。", ["国库", "贸易", "外敌"], 7, [
    opt("开放边贸，钱包先外交", "银子进来了，口音也进来了。", { treasury: 14, people: 4, enemy: 4 }),
    opt("层层设卡，朕要每道门都响钱", "商队变少，走私变聪明。", { treasury: 8, corruption: 8, enemy: 6 }, {}, "腐败"),
    opt("关门，朕的安全感比较贵", "边关安静了，商人和户部一起瘦了。", { army: 4, treasury: -8, people: -3 })
  ]),
  event("treasury_008", "treasury", "赏赐停不下", "内务府总管", "宫里人人有功，连御花园的石头都说自己站岗多年。", ["国库", "赏赐", "奢靡"], 7, [
    opt("赏，朕要买一个好心情", "宫里喜气洋洋，户部阴气沉沉。", { happiness: 14, treasury: -16, corruption: 5 }, {}, "奢靡"),
    opt("按功劳赏，石头先排后面", "有功者欢喜，无功者开始写功劳。", { court: 5, treasury: -6, prestige: 3 }),
    opt("全免，夸奖也是赏赐", "宫人获得精神财富，精神当晚就贬值。", { treasury: 5, happiness: -6, intrigue: 5 })
  ])
];
