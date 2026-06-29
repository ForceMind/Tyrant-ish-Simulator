import { event, opt } from "./_helpers.js";

export const rareEvents = [
  event("rare_001", "rare", "无字碑梦", "史官", "你梦见一块无字碑，醒来后史官盯着你，像在等素材。", ["稀有", "史官", "天命"], 3, [
    opt("下罪己诏，先给碑一点字", "天下看见你认错，开始等你改。", { prestige: -5, people: 8, resentment: -8 }),
    opt("刻满功绩，空着多浪费", "碑是满了，史官是沉默了。", { prestige: 8, mandate: 5, corruption: 5 }),
    opt("把碑搬进御花园，朕自己欣赏", "碑很安静，像一位很懂事的大臣。", { happiness: 6, prestige: -3 })
  ], { yearMin: 3 }),
  event("rare_002", "rare", "白发宫女", "宫女", "老宫女说她见过三朝皇帝，你是最有节目效果的一个。", ["稀有", "后宫", "史官"], 3, [
    opt("赏她，懂欣赏的人不多了", "她谢恩时笑得很慈祥，像在看一出长寿闹剧。", { happiness: 5, prestige: 3, treasury: -3 }),
    opt("问前朝旧事，听听祖宗怎么翻车", "故事很长，教训很近。", { court: 5, prestige: 4, happiness: -2 }),
    opt("让她别乱说，节目效果也要保密", "她点头，转身就成了新的传说。", { intrigue: 5, prestige: -3 })
  ], { yearMin: 4 }),
  event("rare_003", "rare", "雨后金光", "钦天监", "暴雨后宫墙现出金光，工部说可能是墙皮掉得比较高级。", ["稀有", "祥瑞"], 3, [
    opt("认作祥瑞，墙皮也懂忠君", "百官称贺，工部悄悄把梯子藏了。", { mandate: 10, prestige: 5, corruption: 4 }),
    opt("查墙皮，别让建筑参与玄学", "查出偷工减料，祥瑞当场变案情。", { corruption: -10, court: 5, mandate: -5 }),
    opt("刮下来入库，金光也算资产", "户部认真称重，钦天监认真破防。", { treasury: 5, mandate: -4, happiness: 3 })
  ]),
  event("rare_004", "rare", "敌国送猫", "鸿胪寺卿", "敌国送来一只猫，说愿两国和睦。猫看你的眼神不像和睦。", ["稀有", "外敌", "宠物"], 3, [
    opt("收下，朕外交手腕柔软", "猫住进宫里，边境暂时没动，御膳房鱼少了。", { enemy: -5, happiness: 8, treasury: -2 }),
    opt("退回去，朕不接受毛茸茸的阴谋", "敌使尴尬，猫不尴尬。", { enemy: 4, prestige: 3 }),
    opt("封它为边关观察使", "礼部快疯了，猫很镇定。", { happiness: 10, prestige: -4, court: -3 })
  ]),
  event("rare_005", "rare", "海商献钟", "海商", "海商献上一座自鸣钟，说它比早朝准时，也比陛下准时。", ["稀有", "贸易", "奇珍"], 3, [
    opt("买下，朕要让时间为朕打工", "钟准时响了，你准时烦了。", { prestige: 5, happiness: 4, treasury: -8 }),
    opt("送给礼部，催他们别磨叽", "礼部从此被钟声支配，效率略有羞耻地提高。", { court: 6, treasury: -4 }),
    opt("拆了研究，看看时间值多少钱", "工匠拆完以后，时间不走了，账还在走。", { court: -2, corruption: 3, treasury: -3 })
  ], { yearMin: 2 }),
  event("rare_006", "rare", "井中传言", "京兆尹", "京城有人说井水能照见国运，排队的人比领粥还多。", ["稀有", "民心", "天命"], 3, [
    opt("封井，国运不许随便围观", "队伍散了，谣言开始流动。", { mandate: -4, resentment: 5, prestige: -2 }),
    opt("派人解释，科学地败给排队", "解释的人嗓子哑了，井还是很红。", { court: 3, people: 2, mandate: -2 }),
    opt("收参观费，国运也要养家", "国库小赚，民间大笑。", { treasury: 8, prestige: -3, corruption: 3 })
  ]),
  event("rare_007", "rare", "异国医书", "太医令", "海商带来异国医书，太医说看不懂，但比国师靠谱的概率很高。", ["稀有", "健康", "贸易"], 3, [
    opt("翻译医书，救命先跨语言", "太医读得很慢，脉象稳得很快。", { health: 8, disease: -5, treasury: -5 }),
    opt("给国师看看，玄学也要国际化", "国师看完以后，决定说这是旁门左道。", { mandate: 3, health: -2, court: -2 }),
    opt("束之高阁，朕怕新知识有副作用", "书没副作用，无知有。", { happiness: 3, disease: 4 })
  ], { yearMin: 3 }),
  event("rare_008", "rare", "夜市成风", "京兆尹", "京城夜市越来越热闹，宵禁像一个被大家礼貌忽略的老人。", ["稀有", "民生", "贸易"], 3, [
    opt("开放夜市，人间烟火也算政绩", "百姓快乐，商税增加，巡夜兵闻着香味上班。", { people: 8, treasury: 6, happiness: 4 }),
    opt("严禁，夜里就该像朝廷一样安静", "夜市没了，怨气有了。", { court: 3, people: -6, resentment: 6 }, {}, "镇压"),
    opt("收摊位费，烟火气也要交钱", "夜市还在，摊主笑容薄了。", { treasury: 10, people: -2, corruption: 3 }, { taxCount: 1 }, "征税")
  ], { yearMin: 2 }),
  event("rare_009", "rare", "废太庙小门", "太庙令", "太庙后墙有扇小门，老人说先帝小时候常从那里逃课。", ["稀有", "祖制", "史官"], 3, [
    opt("封上，祖宗也要体面", "小门没了，故事还在。", { prestige: 4, mandate: 3, treasury: -2 }),
    opt("留着，给后代一点退路", "太庙令叹气，史官偷笑。", { happiness: 5, prestige: -2 }),
    opt("改成展览，祖宗逃课也能创收", "百姓排队参观，祖宗被迫亲民。", { treasury: 6, people: 3, mandate: -3 })
  ], { yearMin: 4 }),
  event("rare_010", "rare", "群臣集体沉默", "内阁首辅", "你问有何异议，满朝沉默得像被统一训练过。", ["稀有", "朝堂"], 3, [
    opt("点名发言，别把朝堂开成灵堂", "被点到的大臣说了真话，然后立刻后悔。", { court: 6, prestige: 3, happiness: -2 }),
    opt("满意，沉默就是赞成", "沉默变成制度，问题变成地基。", { happiness: 6, court: -6, corruption: 5 }, {}, "摆烂"),
    opt("设匿名奏箱，给胆小一点出口", "奏箱很快满了，内容很刺激。", { court: 5, corruption: -4, intrigue: 3 })
  ], { courtMax: 35 }),
  event("rare_011", "rare", "军中唱歌", "边军校尉", "边军流行一首小调，歌词里有饷银、有故乡，还有一点点骂户部。", ["稀有", "军事", "军饷"], 3, [
    opt("补饷，别让歌唱成战书", "歌声亮了，刀也亮得比较安心。", { treasury: -12, army: 9, enemy: -3 }),
    opt("禁歌，军营不是戏台", "歌停了，怨气改成哼。", { army: -5, resentment: 5, prestige: -2 }, {}, "镇压"),
    opt("改歌词，加入朕的英明", "士兵唱得很敷衍，押韵都不救你。", { prestige: 3, army: -2, happiness: 2 })
  ], { armyMax: 40 }),
  event("rare_012", "rare", "粮仓鼠患", "仓场侍郎", "粮仓老鼠肥得不像偷粮，像在领俸禄。", ["稀有", "粮仓", "腐败"], 3, [
    opt("查仓，老鼠背后可能有人", "查出鼠洞和账洞一样多。", { corruption: -8, treasury: 6, famine: -4 }),
    opt("养猫，制度不够猫来凑", "猫上任后很积极，官员开始紧张。", { famine: -5, happiness: 4, treasury: -3 }),
    opt("报自然损耗，给老鼠留点体面", "老鼠很体面，百姓不体面。", { corruption: 8, famine: 6, treasury: -5 }, {}, "腐败")
  ], { corruptionMin: 35 }),
  event("rare_013", "rare", "宫墙外的童谣", "锦衣校尉", "孩子们唱童谣，押韵押得很好，内容押得很危险。", ["稀有", "民怨", "史官"], 3, [
    opt("查源头，童谣不能自己长腿", "源头没查清，孩子们学会小声唱。", { resentment: 6, prestige: -3 }, {}, "镇压"),
    opt("听完，看看百姓怎么编排朕", "你听懂了笑点，也听懂了问题。", { people: 5, resentment: -5, happiness: -2 }),
    opt("请翰林写新童谣对冲", "新童谣很端庄，孩子们不爱唱。", { prestige: 3, court: 2, treasury: -2 })
  ], { resentmentMin: 35 }),
  event("rare_014", "rare", "将星入梦", "钦天监", "钦天监说有将星入梦，兵部问能不能直接入编。", ["稀有", "军事", "天命"], 3, [
    opt("寻访将才，别让星星白加班", "找来一位猛将，性格像未驯服的捷报。", { army: 10, prestige: 4, treasury: -5 }),
    opt("办武举，给星星一个考场", "武举热闹，兵部终于像在招人。", { army: 7, court: 3, treasury: -6 }),
    opt("写进祥瑞，先领精神收益", "钦天监很会写，边军很缺人。", { mandate: 8, army: -3, prestige: 3 })
  ], { yearMin: 3 }),
  event("rare_015", "rare", "无人认领的功劳", "吏部尚书", "一项政绩没人敢认，因为大家怀疑后面一定有锅。", ["稀有", "朝堂", "改革"], 3, [
    opt("查清归属，该赏就赏", "真干活的人被找出来，表情像被抓。", { court: 6, prestige: 4, corruption: -3 }),
    opt("朕认了，功劳不能浪费", "功劳有主了，锅也在路上。", { prestige: 6, happiness: 4, corruption: 4 }),
    opt("集体嘉奖，锅也集体分摊", "人人有份，人人不服。", { court: 3, treasury: -5, prestige: 2 })
  ], { yearMin: 4 }),
  event("rare_016", "rare", "祖坟冒青烟", "宗正", "宗正说祖坟冒青烟，工部说也可能是旁边厨房烟囱歪了。", ["稀有", "祖制", "祥瑞"], 3, [
    opt("祭祖，祖宗给面子朕得接着", "祭礼隆重，祖宗和户部都被供上了。", { mandate: 8, prestige: 6, treasury: -8 }),
    opt("修烟囱，别让祖宗背锅", "烟囱正了，祥瑞没了，工部难得诚实。", { court: 4, mandate: -4, treasury: -3 }),
    opt("两边都办，现实和玄学都不得罪", "祖宗满意与否未知，账单确定不满意。", { mandate: 5, prestige: 4, treasury: -10 })
  ], { yearMin: 5 })
];
