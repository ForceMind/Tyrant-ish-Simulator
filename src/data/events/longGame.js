import { event, opt } from "./_helpers.js";

export const longGameEvents = [
  event("long_001", "longGame", "旧臣开始怀旧", "老尚书", "老臣说先帝那会儿也乱，但至少乱得熟悉。", ["后期", "朝堂"], 8, [
    opt("让他讲完，怀旧也是档案", "老臣讲到一半睡着，朝堂第一次被历史催眠。", { court: 5, prestige: 3, happiness: -2 }),
    opt("提醒他现在朕才是版本答案", "老臣闭嘴了，史官默默加了一个脚注。", { prestige: 4, court: -3 }),
    opt("请他退休，别把朝堂开成回忆录", "老臣回乡，带走一半经验和全部唠叨。", { court: -5, happiness: 5, corruption: 3 })
  ], { yearMin: 4 }),
  event("long_002", "longGame", "地方开始懂你", "巡按御史", "地方官已经学会提前猜圣意，猜得准不准另说，胆子越来越准。", ["后期", "腐败"], 8, [
    opt("严查揣摩圣意，朕的脑子不外包", "地方官吓得开始揣摩不揣摩的边界。", { court: 6, corruption: -8, prestige: 3 }),
    opt("利用他们，懂事也是行政资源", "政令快了，良心慢了。", { court: 8, corruption: 8, people: -3 }, {}, "腐败"),
    opt("换一批不懂的", "新人来了，旧问题穿了新官服。", { court: -4, corruption: -4, treasury: -4 })
  ], { yearMin: 4 }),
  event("long_003", "longGame", "皇城维修", "工部尚书", "宫墙年久失修，砖缝里长出的草比部分官员更有生气。", ["后期", "工程"], 7, [
    opt("修，皇城塌了太影响体面", "墙稳了，账歪了。", { treasury: -14, prestige: 5, court: 2 }),
    opt("只修正门，面子工程也是工程", "正门金光闪闪，侧墙继续思考人生。", { treasury: -6, prestige: 4, corruption: 4 }),
    opt("不修，朕相信祖宗建筑质量", "祖宗建筑没说话，掉下一块砖表达意见。", { treasury: 5, prestige: -5, health: -2 })
  ], { yearMin: 5 }),
  event("long_004", "longGame", "老兵归乡", "兵部尚书", "一批老兵请求归乡，他们说再不回去，孩子要管画像叫爹。", ["后期", "军事", "民生"], 8, [
    opt("准归，兵也要有人生", "老兵回乡，军营空了一点，人心暖了一点。", { army: -6, people: 8, prestige: 4 }),
    opt("加饷挽留，国家还需要他们的膝盖", "老兵留下了，膝盖没有完全同意。", { treasury: -10, army: 8, resentment: 3 }),
    opt("编入屯田，回家是不可能回家的", "他们开始种地，眼神像冬天。", { army: 3, treasury: 5, people: -6 }, {}, "镇压")
  ], { yearMin: 5 }),
  event("long_005", "longGame", "史官要求休假", "起居郎", "起居郎说陛下事迹过密，笔已经磨短，良心也快磨没。", ["后期", "史官"], 7, [
    opt("准假，史官也是人", "史官感动得差点把你写好一点。", { prestige: 3, happiness: -2 }),
    opt("不准，朕的人生不能断更", "史官继续写，字里行间开始带刺。", { prestige: -4, happiness: 4 }),
    opt("给他加钱，良心磨没就换银子", "史官收了钱，措辞变得比较有弹性。", { treasury: -5, prestige: 2, corruption: 3 })
  ], { yearMin: 5 }),
  event("long_006", "longGame", "小吏升成老油条", "吏部郎中", "当年战战兢兢的小吏，现在已经能闭着眼睛把责任推圆。", ["后期", "朝堂", "腐败"], 8, [
    opt("整顿吏治，油条也要下锅", "衙门里一阵油烟味，百姓闻着挺香。", { court: 8, corruption: -10, people: 4 }),
    opt("用熟不用生，老油条至少熟", "政务顺了，暗账也顺了。", { court: 7, corruption: 8 }, {}, "腐败"),
    opt("考试重筛，看看谁还会写人话", "考场哀鸿遍野，吏治短暂清醒。", { court: 5, treasury: -4, corruption: -5 })
  ], { yearMin: 6 }),
  event("long_007", "longGame", "京城房价", "京兆尹", "京城房价涨得离谱，百姓说连梦里住宫墙根都要交钱。", ["后期", "民生", "国库"], 7, [
    opt("限价，别让屋顶比人高贵", "房价低头，豪强抬眼。", { people: 8, corruption: -4, prestige: 3 }),
    opt("征房税，涨都涨了朕也参与", "国库进账，百姓出城。", { treasury: 12, people: -8, resentment: 8 }, { taxCount: 1 }, "征税"),
    opt("修官舍分流，至少让官员少抢民房", "官员住进官舍，开始嫌弃朝廷审美。", { treasury: -10, court: 5, people: 4 })
  ], { yearMin: 6 }),
  event("long_008", "longGame", "学子议政", "国子监祭酒", "学生们写策论骂朝政，文采很好，求生欲一般。", ["后期", "民心", "朝堂"], 8, [
    opt("选几篇看看，年轻人骂得新鲜", "你看完发现，有些骂得竟然有用。", { court: 5, people: 6, prestige: 3, happiness: -2 }),
    opt("禁议政，读书不要太懂事", "国子监安静了，民间热闹了。", { court: -3, people: -5, resentment: 7 }, {}, "镇压"),
    opt("办策论大赛，骂得好给官做", "学子们突然骂得更负责了。", { court: 6, people: 4, treasury: -3 })
  ], { yearMin: 6 }),
  event("long_009", "longGame", "第一个十年", "史官", "在位十年，祖宗从震怒变成了疲惫观察。", ["后期", "史官"], 10, [
    opt("大赦纪念，朕也有纪念日", "囚犯出狱，百姓看热闹，官员忙着解释。", { people: 8, prestige: 6, corruption: 5 }),
    opt("整顿纪念，十年了该像个人", "朝廷突然紧张，像年终被抽查。", { court: 8, corruption: -8, happiness: -4 }),
    opt("办宴纪念，活着就是胜利", "宫宴热闹，户部默哀。", { happiness: 14, treasury: -12, prestige: 4 }, {}, "奢靡")
  ], { yearMin: 10 }),
  event("long_010", "longGame", "老臣凋零", "内阁首辅", "几位老臣相继致仕，新人上来第一件事是问规矩能不能改。", ["后期", "朝堂"], 8, [
    opt("放手新人，王朝也要换血", "新人干劲很足，错误也很新。", { court: 5, prestige: 3, corruption: 3 }),
    opt("留老臣顾问，别让经验直接入土", "老臣坐在旁边叹气，效果类似祖制会呼吸。", { court: 7, treasury: -4, happiness: -2 }),
    opt("新旧互审，谁糊弄谁先露馅", "朝堂吵得很凶，账本清得很快。", { corruption: -8, court: 4, prestige: 2 })
  ], { yearMin: 10 }),
  event("long_011", "longGame", "宗室长大", "宗正", "宗室子弟越来越多，俸禄像藤蔓一样爬满账本。", ["后期", "宗室", "国库"], 8, [
    opt("削俸，亲戚也不能无限续杯", "宗室不满，户部短暂活过来。", { treasury: 12, intrigue: 6, prestige: -4 }),
    opt("照发，亲情比较贵", "宗室满意了，国库开始认亲失败。", { treasury: -14, intrigue: -3, corruption: 5 }),
    opt("让宗室办学办仓，领钱要干活", "宗室第一次发现俸禄背后有劳动。", { treasury: -5, people: 6, prestige: 4 })
  ], { yearMin: 10 }),
  event("long_012", "longGame", "边将换代", "兵部尚书", "老将军病退，新将军很勇，勇到让兵部想给他拴根绳。", ["后期", "军事"], 8, [
    opt("给他机会，年轻人要有战场", "新将军冲得很快，捷报和求援一起来。", { army: 7, enemy: -5, treasury: -8 }),
    opt("派老副将压阵，勇敢要带说明书", "战线稳了，新将军学会先看地图。", { army: 6, court: 3, treasury: -5 }),
    opt("调回京城磨性子", "将军很不服，京城多了一个会骑马生气的人。", { army: -4, intrigue: 5, prestige: -2 })
  ], { yearMin: 10 }),
  event("long_013", "longGame", "二十年老账", "户部尚书", "旧账翻出来，里面每一页都像在说：你们当年可真敢。", ["后期", "国库", "腐败"], 9, [
    opt("清旧账，别让过去继续收利息", "旧案重开，官场像被掀了被子。", { corruption: -14, treasury: 10, court: -6 }),
    opt("封存，历史也需要体面", "体面保住了，漏洞也保住了。", { prestige: 4, corruption: 10 }, {}, "腐败"),
    opt("挑大案办，杀鸡给账本看", "账本看懂了，鸡没了。", { corruption: -8, prestige: 6, court: -3 })
  ], { yearMin: 15 }),
  event("long_014", "longGame", "皇帝开始养生", "太医令", "太医说陛下年纪渐长，少熬夜少动怒少信国师。", ["后期", "健康"], 8, [
    opt("听，朕要长期执政", "你早睡三天，国家居然没有趁夜逃跑。", { health: 10, happiness: -3, court: -2 }),
    opt("只听前两条，国师留下", "太医扶额，国师微笑，风险保持皇家平衡。", { health: 3, mandate: 5, treasury: -3 }),
    opt("拒绝，朕的身体归朕胡来", "身体表示收到，并开始准备反奏。", { happiness: 8, health: -8 }, {}, "炼丹")
  ], { ageMin: 35 }),
  event("long_015", "longGame", "民间开始写野史", "锦衣校尉", "民间流传《宫墙秘闻》，销量很好，内容很不适合陛下阅读。", ["后期", "史官", "民心"], 8, [
    opt("禁书，朕不想当畅销题材", "书更难买了，也更好卖了。", { people: -6, resentment: 8, prestige: -3 }, {}, "镇压"),
    opt("买一本看看，学习民间创作", "你读完发现，民间比史官放肆。", { happiness: 5, people: 3, prestige: -2 }),
    opt("让史官写正史反击", "正史很端庄，销量很端庄。", { prestige: 4, court: 3, treasury: -2 })
  ], { yearMin: 8 }),
  event("long_016", "longGame", "老百姓换了一代", "地方知府", "新一代百姓没见过先帝，只知道这朝的税和这朝的笑话。", ["后期", "民生"], 9, [
    opt("减负立信，别让他们一出生就懂逃荒", "年轻人第一次觉得朝廷不全是传说里的坏消息。", { people: 10, resentment: -10, treasury: -8 }),
    opt("继续旧法，祖制就是省事", "省事的是朝廷，记仇的是百姓。", { court: 4, people: -6, resentment: 8 }, {}, "摆烂"),
    opt("办乡学，至少让他们骂得有文化", "乡学开了，策论和怨气一起进步。", { people: 7, prestige: 4, treasury: -6 })
  ], { yearMin: 12 })
];
