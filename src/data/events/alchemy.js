import { event, opt } from "./_helpers.js";

export const alchemyEvents = [
  event("alchemy_001", "alchemy", "丹炉冒绿烟", "国师", "国师说绿烟是祥瑞，太医说绿色在医书里通常不太吉利。", ["修仙", "炼丹", "道士"], 9, [
    opt("服丹，朕要提前适应长生", "丹药入口，舌头先见了祖宗。", { happiness: 8, health: -10, mandate: 8 }, { alchemyCount: 1, consecutivePills: 1 }, "炼丹"),
    opt("让国师先尝，仙路不能插队", "国师笑容短暂停顿，长生计划突然讲究流程。", { court: 4, mandate: -4, health: 2 }),
    opt("封炉，朕今天想活得传统点", "太医松了口气，道士叹了口价。", { health: 5, happiness: -4, treasury: 4 })
  ]),
  event("alchemy_002", "alchemy", "白鹿路过", "钦天监", "城外有白鹿路过，钦天监说这是祥瑞，猎户说这是鹿。", ["修仙", "祥瑞", "天命"], 8, [
    opt("大赦天下，鹿都来了", "囚犯感谢白鹿，白鹿不知情。", { mandate: 10, people: 6, prestige: 5, corruption: 4 }),
    opt("抓来养着，祥瑞不能旷工", "白鹿住进宫里，眼神越来越像大臣。", { happiness: 8, treasury: -5, mandate: 4 }),
    opt("当普通鹿处理，别让动物加班", "钦天监很失望，猎户很赞同。", { court: 3, mandate: -5, people: 2 })
  ]),
  event("alchemy_003", "alchemy", "天象不太配合", "钦天监监正", "昨夜星象乱得像六部会议，监正请求给宇宙一点预算。", ["修仙", "天象", "灾异"], 8, [
    opt("祭天，朕和星星讲道理", "星星没回，礼部账单很亮。", { treasury: -10, mandate: 8, prestige: 3 }),
    opt("改历法，错的一定是月份", "新历刚发下去，百姓开始不知道今天该不该交税。", { court: -5, mandate: 6, people: -3 }),
    opt("让监正闭嘴，夜空不许添堵", "天象没变，监正学会白天汇报。", { happiness: 5, mandate: -8, prestige: -3 })
  ]),
  event("alchemy_004", "alchemy", "封禅预算", "礼部尚书", "礼部说封禅能昭告天地，户部说天地能不能自己来看。", ["修仙", "封禅", "奢靡"], 7, [
    opt("封禅，朕要把排场办到山顶", "山很高，账更高。", { prestige: 12, mandate: 12, treasury: -22, resentment: 5 }, {}, "奢靡"),
    opt("缩小规模，天地也该体谅路费", "礼部嫌寒酸，户部嫌还不够寒酸。", { prestige: 4, mandate: 5, treasury: -8 }),
    opt("取消，朕与天地心照不宣", "天地没有意见，礼部很有意见。", { treasury: 6, court: -3, mandate: -4 })
  ]),
  event("alchemy_005", "alchemy", "仙人卖课", "云游道士", "道士说三千两买不了长生，但能买长生入门体验。", ["修仙", "道士", "国库"], 7, [
    opt("买课，朕要系统学习飞升", "课程第一讲：先交续费。", { treasury: -12, happiness: 8, mandate: 6, health: -2 }, { alchemyCount: 1 }, "炼丹"),
    opt("请他去太医院互相伤害", "太医和道士吵到半夜，病人听得很清醒。", { court: 3, health: 3, mandate: -3 }),
    opt("赶走，朕讨厌付费知识", "道士走前留下一句天机不可退款。", { treasury: 4, happiness: -2, mandate: -5 })
  ]),
  event("alchemy_006", "alchemy", "灵芝像蘑菇", "采药官", "采药官献上千年灵芝，厨子说炖汤应该不错。", ["修仙", "炼丹", "祥瑞"], 8, [
    opt("入丹，朕要尊重它的千年努力", "灵芝没有白活，至少让你晕得很有年代感。", { health: -6, happiness: 7, mandate: 5 }, { alchemyCount: 1, consecutivePills: 1 }, "炼丹"),
    opt("炖汤，长生先从好喝开始", "汤很好喝，国师很受伤。", { health: 3, happiness: 5, mandate: -3 }),
    opt("供起来，让它继续千年", "灵芝开始当摆件，内务府开始擦灰。", { prestige: 3, mandate: 4, treasury: -3 })
  ]),
  event("alchemy_007", "alchemy", "梦见祖龙", "史官", "你梦见祖龙说了很多话，醒来只记得他语气不太满意。", ["修仙", "天命", "祖制"], 7, [
    opt("修德政，别让祖龙二次入梦", "百姓得了实惠，祖龙可能少骂两句。", { people: 8, prestige: 5, happiness: -4, treasury: -6 }),
    opt("修宫殿压压梦", "噩梦没压住，地基先压住了国库。", { happiness: 10, treasury: -16, corruption: 6 }, { palaceBuilt: 1 }, "宫殿"),
    opt("让史官写成祥瑞", "史官写得很努力，祖龙梦里可能又皱眉。", { mandate: 8, prestige: 3, corruption: 4 })
  ]),
  event("alchemy_008", "alchemy", "太医拒绝背锅", "太医令", "太医令请求在丹药旁边署名国师，最好离太医院远一点。", ["修仙", "炼丹", "暴毙"], 8, [
    opt("继续吃，太医就是胆小", "太医退后三步，国师前进一步，朕的脉象横跳。", { health: -12, happiness: 9, mandate: 6 }, { alchemyCount: 1, consecutivePills: 1 }, "炼丹"),
    opt("停丹三月，先让身体追上理想", "身体表示谢谢，国师表示不理解。", { health: 8, happiness: -5, mandate: -4 }),
    opt("让太医改良丹方", "太医把朱砂减半，把求生欲加满。", { health: 3, court: 2, mandate: 2 })
  ])
];
