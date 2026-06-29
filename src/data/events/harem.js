import { event, opt } from "./_helpers.js";

export const haremEvents = [
  event("harem_001", "harem", "选秀大典", "皇后", "礼部说选秀能充实后宫，户部说后宫已经很会充实账单。", ["后宫", "选秀"], 8, [
    opt("大选，朕要让宫里热闹", "宫里热闹了，账本也热闹得冒烟。", { happiness: 15, treasury: -14, intrigue: 10 }, {}, "后宫"),
    opt("小选，意思意思别太意思", "礼部点头，皇后点头得更慢。", { happiness: 6, treasury: -5, intrigue: 3 }),
    opt("停选，朕今天像个节俭的人", "皇后微笑，内务府哭泣。", { treasury: 8, court: 3, happiness: -5 })
  ]),
  event("harem_002", "harem", "皇后冷笑", "皇后", "皇后说后宫很和睦，说完杯子自己裂了。", ["后宫", "宫斗"], 8, [
    opt("查，朕讨厌杯子受委屈", "查出三条线索、七个眼神和一堆不承认。", { intrigue: -6, court: 3, happiness: -4 }),
    opt("赏皇后，宫里需要一个大声的秩序", "皇后满意了，贵妃开始研究天象。", { intrigue: 5, prestige: 4, treasury: -5 }),
    opt("装没听懂，朕只是路过婚姻", "杯子裂得更响了。", { happiness: 5, intrigue: 10 }, {}, "摆烂")
  ]),
  event("harem_003", "harem", "贵妃要修园子", "贵妃", "贵妃说御花园太旧，花听了都没有上进心。", ["后宫", "宫殿", "奢靡"], 8, [
    opt("修，花也要有皇家气质", "花还没开，工部先谢了。", { happiness: 14, treasury: -18, corruption: 8, resentment: 4 }, { palaceBuilt: 1 }, "宫殿"),
    opt("不修，朕让花学习朴素", "贵妃笑得像霜降。", { treasury: 6, happiness: -6, intrigue: 6 }),
    opt("改成菜园，审美和民生都要", "贵妃沉默，太监开始研究种葱礼仪。", { people: 5, treasury: 3, happiness: -3 })
  ]),
  event("harem_004", "harem", "皇子背书很响", "太傅", "大皇子背书流畅，问的问题却像在预习登基。", ["后宫", "皇子"], 7, [
    opt("夸他，有志气是好事", "皇子眼睛亮了，太傅背后凉了。", { princeAmbition: 10, prestige: 2 }),
    opt("让他多读孝经，重点背", "皇子读得很响，孝心听不出来。", { princeAmbition: -5, court: 3, happiness: -2 }),
    opt("派去封地体验生活", "皇子带着书走了，封地开始变得很像小朝廷。", { princeAmbition: 6, court: 4, treasury: -4 })
  ]),
  event("harem_005", "harem", "外戚想进步", "国舅", "国舅说自己愿为国家分忧，尤其愿意分一点兵权和盐税。", ["后宫", "外戚", "腐败"], 7, [
    opt("给个闲职，闲不闲看他本事", "国舅上任三天，闲职开始忙着收礼。", { corruption: 10, court: -4, intrigue: 5 }, {}, "腐败"),
    opt("拒绝，亲戚也要排队祸国", "皇后说你懂规矩，国舅说他记住了。", { court: 5, intrigue: 4, prestige: 3 }),
    opt("派去修陵，离权力远点", "国舅离京很远，账单离户部很近。", { treasury: -8, intrigue: -3, corruption: 3 })
  ]),
  event("harem_006", "harem", "公主想办学", "公主", "公主说想开女学，礼部脸上写着祖制过敏。", ["后宫", "民生", "改革"], 7, [
    opt("准，祖制也该学点新字", "女学开张，礼部开始学习如何不晕倒。", { people: 8, prestige: 5, court: -2, treasury: -5 }),
    opt("缓缓，朕先安抚旧脑袋", "公主不说话，礼部松了口气。", { court: 3, prestige: -3, happiness: -2 }),
    opt("改成皇家才艺班，听起来不吓人", "改革穿上了礼服，勉强混进了祖制。", { people: 4, prestige: 3, treasury: -3 })
  ]),
  event("harem_007", "harem", "太医什么都没看见", "太医", "贵妃落水，皇后在岸边赏花，太医说自己主要研究风景。", ["后宫", "宫斗"], 8, [
    opt("严查，风景也要供词", "后宫安静了三天，像暴雨前的礼貌。", { intrigue: -8, prestige: 3, happiness: -4 }),
    opt("和稀泥，水已经很浑了", "所有人都满意地不满意。", { intrigue: 8, happiness: 4 }, {}, "摆烂"),
    opt("罚太医写观景心得", "太医写完以后，更确定自己什么都没看见。", { happiness: 3, court: -2, intrigue: 3 })
  ]),
  event("harem_008", "harem", "东宫账本", "詹事府", "太子府花销暴涨，账上写着读书用，里面夹着马和酒。", ["后宫", "皇子", "国库"], 7, [
    opt("查账，读书不能骑马喝酒", "太子说知错，账房说终于有人看见我。", { treasury: 6, princeAmbition: -6, prestige: 3 }),
    opt("补贴东宫，太子快乐国家稳定", "太子快乐了，其他皇子开始学习不稳定。", { treasury: -10, princeAmbition: 8, intrigue: 5 }, {}, "皇子"),
    opt("扣一半，剩下的当亲情", "太子不服，但亲情确实便宜。", { treasury: 5, princeAmbition: 4, happiness: 2 })
  ])
];
