import { event, opt } from "./_helpers.js";

export const eraSpecificEvents = [
  event("era_moyu_001", "era", "寝宫长出政务", "太监总管", "奏折已经从门缝塞进寝宫，像国家在努力钻进你的被窝。", ["年号", "摸鱼", "不上朝"], 14, [
    opt("把奏折垫高枕头，朕与民同梦", "枕头高了，朝廷低了，太监总管学会了轻声叹气。", { happiness: 12, court: -10, eunuch: 8 }, { noCourtStreak: 1 }, "摆烂"),
    opt("床上批折，姿势昏庸但效率还行", "你在被窝里批出三道政令，史官犹豫要不要写进正史。", { court: 6, happiness: 3, health: 2 }),
    opt("宣布今日为静养国策", "群臣第一次见到把赖床写成制度的人。", { happiness: 8, prestige: -5, court: -4 }, { noCourtStreak: 1 }, "摆烂")
  ], { era: "moyu" }),
  event("era_moyu_002", "era", "被窝摄政", "司礼监", "司礼监建议设立被窝奏事制度，优点是陛下不用起，缺点是国家也不太起。", ["年号", "摸鱼", "太监"], 13, [
    opt("准，国家治理要讲人体工学", "太监们端着奏折进出寝宫，像在给王朝换药。", { happiness: 14, court: -6, eunuch: 10 }, { eunuchDelegations: 1 }, "太监"),
    opt("不准，朕偶尔也要垂直统治", "你站起来那一刻，群臣差点以为中兴开始了。", { court: 8, prestige: 5, happiness: -5 }),
    opt("只准上午被窝办公", "上午是被窝，下午是借口，制度弹性很皇家。", { happiness: 7, court: -2, eunuch: 4 })
  ], { era: "moyu" }),
  event("era_yongle_001", "era", "永乐灯会", "礼部尚书", "礼部想办万灯会，说灯越亮，盛世越不容易看见裂缝。", ["年号", "永乐", "宴会"], 14, [
    opt("办，朕要把夜晚照成账单", "京城亮了三夜，户部黑了半月。", { happiness: 14, prestige: 6, treasury: -16, corruption: 5 }, {}, "奢靡"),
    opt("缩小规模，灯少一点也能装盛世", "灯会体面，账单克制，礼部觉得不够快乐。", { happiness: 6, prestige: 4, treasury: -6 }),
    opt("让商户赞助，盛世要懂招商", "商户赞助了灯，也顺便赞助了几个官员。", { treasury: 6, prestige: 3, corruption: 8 }, {}, "腐败")
  ], { era: "yongle" }),
  event("era_yongle_002", "era", "快乐指标", "内阁首辅", "首辅说陛下既然改元永乐，是否要给六部设快乐考核。", ["年号", "永乐", "享乐"], 13, [
    opt("设，谁不快乐谁反省", "六部开始上交笑容，质量参差不齐。", { happiness: 10, court: -4, prestige: -3 }),
    opt("快乐归朕，六部归活", "大臣们松了口气，快乐仍然没有轮到他们。", { court: 6, happiness: 4 }),
    opt("让户部先快乐一下", "户部尚书看到账本，确认自己没有这个能力。", { treasury: 5, happiness: -2, court: 3 })
  ], { era: "yongle" }),
  event("era_kaibai_001", "era", "摆烂学派", "翰林学士", "翰林院有人写《无为而摆论》，说陛下的懒惰可能是一种哲学。", ["年号", "开摆", "摆烂"], 14, [
    opt("刊行天下，朕的失败需要理论", "士子争相传抄，朝廷第一次有了懒得很高级的感觉。", { happiness: 12, prestige: 4, court: -8 }, {}, "摆烂"),
    opt("烧了，朕可以摆但不能被研究", "翰林很委屈，史官很失望。", { court: 4, prestige: -3, happiness: -2 }),
    opt("改名《勤政备忘录》", "书名很勤政，内容很诚实。", { happiness: 6, court: -3, corruption: 3 })
  ], { era: "kaibai" }),
  event("era_kaibai_002", "era", "边疆自动驾驶", "兵部尚书", "边将问今年战略是什么，兵部说陛下的意思可能是随缘。", ["年号", "开摆", "边疆"], 13, [
    opt("随缘防守，敌军也许讲礼貌", "敌军不讲礼貌，边将讲脏话。", { happiness: 8, army: -8, enemy: 10 }, {}, "摆烂"),
    opt("拨一点军费，随缘也要买弓", "边将收到钱，语气从绝望变成谨慎悲观。", { treasury: -8, army: 7, enemy: -4 }),
    opt("让边将自己发挥，发挥不好就背锅", "边将发挥了，主要发挥求生欲。", { army: 3, court: -4, prestige: -3 })
  ], { era: "kaibai" }),
  event("era_tianming_001", "era", "祥瑞流水线", "钦天监", "钦天监一周上报五次祥瑞，连厨房双黄蛋都快封侯了。", ["年号", "天命", "祥瑞"], 14, [
    opt("全收，天命来都来了", "祥瑞越堆越多，现实越躲越远。", { mandate: 12, prestige: 5, corruption: 8 }, {}, "天命"),
    opt("查验祥瑞，别让鸡蛋参政", "查出三起染色鸟，两起假云，一起厨子失误。", { corruption: -8, court: 5, mandate: -4 }),
    opt("挑最便宜的庆祝", "礼部办得很省，祥瑞显得很寒酸。", { mandate: 5, treasury: -3, happiness: 3 })
  ], { era: "tianming" }),
  event("era_tianming_002", "era", "天命解释权", "国师", "国师说天命不是结果，是解释结果的能力。", ["年号", "天命", "道士"], 13, [
    opt("有道理，朕要掌握最终解释", "从此坏事叫考验，好事叫英明。", { mandate: 10, prestige: 3, resentment: 5 }, {}, "天命"),
    opt("让史官也来解释，互相制衡", "史官解释得很克制，国师解释得很收费。", { court: 5, corruption: -4, mandate: 2 }),
    opt("别解释了，先解决问题", "国师第一次觉得陛下像个实干派，表情很受伤。", { people: 5, court: 5, mandate: -6 })
  ], { era: "tianming" }),
  event("era_baofu_001", "era", "金库回声", "户部尚书", "国库终于有点满，户部尚书开始担心陛下听见钱响就想加税。", ["年号", "暴富", "国库"], 14, [
    opt("继续加，钱会自己嫌少", "钱没嫌少，百姓嫌命长。", { treasury: 18, people: -12, resentment: 14 }, { taxCount: 1 }, "征税"),
    opt("停一季，给纳税人喘气权", "百姓惊讶地发现，朝廷也会偶尔像人。", { people: 9, resentment: -8, treasury: -4 }),
    opt("把钱摆出来巡展", "百姓看见国库很满，终于知道自己为什么很空。", { prestige: 5, people: -5, resentment: 6 })
  ], { era: "baofu" }),
  event("era_baofu_002", "era", "财政神话", "地方知府", "地方官说只要再征一次临时税，临时就能长期稳定。", ["年号", "暴富", "征税"], 13, [
    opt("准，临时是最持久的祖制", "临时税落地，百姓终于懂了什么叫永恒。", { treasury: 16, people: -10, resentment: 12 }, { taxCount: 1 }, "征税"),
    opt("驳回，朕今天反常地克制", "知府很失落，百姓很警惕。", { people: 6, prestige: 3, treasury: -2 }),
    opt("改成富户摊派", "富户出钱，穷户围观，官员抽成。", { treasury: 10, corruption: 7, people: 2 })
  ], { era: "baofu" }),
  event("era_qiuxian_001", "era", "飞升排期", "国师", "国师说飞升讲究时辰，最好先预付三年材料费。", ["年号", "求仙", "炼丹"], 14, [
    opt("预付，朕的未来不能等账期", "国师收钱很像飞升，嗖一下就轻了。", { treasury: -18, mandate: 10, health: -4 }, { alchemyCount: 1 }, "炼丹"),
    opt("按效果付款，先飞一寸看看", "国师说天机不可试飞。", { court: 4, mandate: -5, happiness: -2 }),
    opt("让户部审核仙路预算", "户部看完材料单，确认长生主要长在价格上。", { treasury: 4, corruption: -3, mandate: -3 })
  ], { era: "qiuxian" }),
  event("era_qiuxian_002", "era", "长生体检", "太医令", "太医令请求每月给陛下把脉，说求仙不能只求国师开心。", ["年号", "求仙", "太医"], 13, [
    opt("准，朕要科学地迷信", "太医和国师互相盯着，药方暂时不敢太离谱。", { health: 8, mandate: 3, treasury: -4 }),
    opt("拒绝，朕的脉象属于天机", "太医退下时，表情像已经写好悼词。", { happiness: 6, health: -6, mandate: 5 }, { alchemyCount: 1 }, "炼丹"),
    opt("让国师给太医上课", "太医听完以后，决定更认真地把脉。", { health: 3, court: -3, mandate: 4 })
  ], { era: "qiuxian" }),
  event("era_qinzheng_001", "era", "勤政过敏", "太医令", "陛下连续批折七夜，太医说再勤政下去，国家没亡你先亡。", ["年号", "勤政", "过劳"], 14, [
    opt("继续批，朕要把命卷成政绩", "奏折少了，脉象也少了。", { court: 12, people: 6, happiness: -10, health: -10 }, {}, "过劳"),
    opt("睡四个时辰，向昏君学习一点皮毛", "你睡醒后发现国家还在，世界观受到冲击。", { health: 8, happiness: 5, court: -3 }),
    opt("分给内阁，朕要合法偷懒", "内阁忙了起来，皇帝短暂像个制度。", { court: 6, health: 4, eunuch: -3 })
  ], { era: "qinzheng" }),
  event("era_qinzheng_002", "era", "卷王朝廷", "吏部尚书", "大臣们开始比谁下朝更晚，御史怀疑这也是一种腐败。", ["年号", "勤政", "改革"], 13, [
    opt("鼓励，朕要卷出盛世", "朝廷效率上去了，大臣寿命下来了。", { court: 10, people: 5, corruption: -5, happiness: -5 }),
    opt("禁止无效加班，朕卷但不傻", "大臣们第一次听见理智从龙椅上传来。", { court: 6, health: 4, prestige: 4 }),
    opt("设加班榜，谁第一谁先病休", "榜单一出，大家突然学会按时下班。", { happiness: 4, court: 3, prestige: -2 })
  ], { era: "qinzheng" }),
  event("era_tiequan_001", "era", "铁拳回音", "御史", "御史说朝堂过于安静，安静得像每个人都在吞意见。", ["年号", "铁拳", "镇压"], 14, [
    opt("继续安静，朕喜欢低噪音治理", "意见少了，怨气多了，朝堂像盖着盖子的锅。", { court: -5, people: -8, resentment: 12, prestige: 4 }, {}, "镇压"),
    opt("开言路，但先检查门口刀具", "大臣们小心发言，像在冰面上写奏折。", { court: 7, prestige: 3, resentment: -4 }),
    opt("找几个会说话的忠臣回来", "忠臣回来了，柱子也重新有了工作压力。", { court: 8, people: 3, happiness: -3 })
  ], { era: "tiequan" }),
  event("era_tiequan_002", "era", "酷吏请功", "廷尉", "廷尉说本月办案神速，主要因为认罪速度也很神速。", ["年号", "铁拳", "酷吏"], 13, [
    opt("赏，效率就是正义的亲戚", "酷吏更勤快了，百姓更安静了。", { prestige: 5, people: -8, resentment: 10, court: -3 }, {}, "镇压"),
    opt("查案卷，别让正义抄近路", "案卷越查越薄，廷尉越站越歪。", { court: 6, people: 5, corruption: -5 }),
    opt("调去修路，手段硬就去砸石头", "廷尉第一次把硬用在了正确的地方。", { people: 4, court: 2, treasury: -3 })
  ], { era: "tiequan" })
];
