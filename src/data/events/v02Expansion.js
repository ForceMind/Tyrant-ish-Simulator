import { event, opt } from "./_helpers.js";

const KINDS = {
  court: {
    tags: ["朝堂", "时间线"],
    good: ["细查旧案，朕今天不靠感觉治国", "案卷终于从传说变成证据，御史感动得差点忘了弹劾。", { court: 7, prestige: 3, happiness: -3, corruption: -4 }],
    bad: ["先压着，别让真相影响节奏", "真相很懂事地退下了，问题很不懂事地长大了。", { happiness: 5, court: -5, corruption: 6 }, {}, "摆烂"],
    weird: ["开个会研究怎么开会", "会议开得很圆满，主要圆在没有棱角。", { court: 2, treasury: -3, corruption: 2 }]
  },
  treasury: {
    tags: ["国库", "财政"],
    good: ["查账，别让银子学会轻功", "账本被翻得发白，几笔银子被迫回到人间。", { treasury: 8, corruption: -6, court: 2 }],
    bad: ["加派，朕相信民间还有隐藏余额", "户部眼前一亮，百姓眼前一黑。", { treasury: 15, people: -9, resentment: 10 }, { taxCount: 1 }, "征税"],
    weird: ["改名叫祥瑞银，听起来就不亏", "银子没有变多，但奏报变香了。", { prestige: 3, treasury: 5, mandate: 4, corruption: 4 }]
  },
  people: {
    tags: ["民生", "百姓"],
    good: ["拨粮拨钱，先让人活得像人", "粥棚热了起来，骂声短暂地开始排队。", { treasury: -12, people: 10, resentment: -8, famine: -6 }],
    bad: ["让地方自筹，朕提供精神支持", "地方收到了精神，百姓没收到米。", { treasury: 5, people: -8, resentment: 9, corruption: 3 }, {}, "摆烂"],
    weird: ["写一篇仁政公告，先把气氛救活", "公告贴满墙，饥饿看完表示字不错。", { prestige: 4, people: 2, resentment: 3 }]
  },
  army: {
    tags: ["军事", "边疆"],
    good: ["补饷整军，别让刀先饿弯", "军营终于有了饭味，将军暂时不写小作文。", { treasury: -12, army: 10, enemy: -6, prestige: 3 }],
    bad: ["让将军自己想办法，朕相信前线创造力", "前线确实有创造力，创造了新的借口。", { treasury: 6, army: -8, enemy: 9, corruption: 3 }, {}, "摆烂"],
    weird: ["御赐战鼓，声音大点像有钱", "鼓声很响，军饷还是很小声。", { prestige: 5, army: 3, treasury: -4 }]
  },
  harem: {
    tags: ["后宫", "宫斗"],
    good: ["立规矩，笑里藏刀也要排队", "后宫安静了一点，主要在研究新规漏洞。", { intrigue: -8, court: 3, happiness: -3 }],
    bad: ["偏袒会撒娇的，朕也是讲效率的", "效率很高，仇恨也很高。", { happiness: 8, intrigue: 10, princeAmbition: 4 }, {}, "宫斗"],
    weird: ["办一场家宴，刀先不许上桌", "饭菜很热，气氛更热，太医坐得很远。", { happiness: 5, intrigue: -3, treasury: -5 }]
  },
  alchemy: {
    tags: ["修仙", "炼丹"],
    good: ["让太医验丹，玄学也要走流程", "国师不高兴，太医第一次觉得自己像个人。", { health: 6, mandate: -4, court: 2 }],
    bad: ["先吃一颗，朕用身体支持科研", "丹药入口，太医的遗书开头已经想好了。", { health: -10, happiness: 7, mandate: 7 }, { alchemyCount: 1, consecutivePills: 1 }, "炼丹"],
    weird: ["封存丹炉，让它冷静一下", "丹炉冷了，国师的脸也冷了。", { health: 4, mandate: -5, happiness: -3 }]
  },
  pleasure: {
    tags: ["享乐", "奢靡"],
    good: ["缩小排场，朕低调得很昂贵", "排场小了，账本终于能喘半口气。", { treasury: 8, happiness: -5, resentment: -3 }],
    bad: ["照办，盛世先从朕舒服开始", "宫里灯火通明，城外账房昏迷。", { happiness: 15, treasury: -14, resentment: 7, corruption: 5 }, { palaceBuilt: 1 }, "奢靡"],
    weird: ["卖门票给百姓参观，宫殿自己还债", "百姓看完表示好看，但不像自己国家。", { treasury: 6, prestige: 3, people: -3 }]
  },
  prince: {
    tags: ["皇子", "继承"],
    good: ["定储训，孝心必须有边界", "东宫读起规矩，表情像被迫学习做人。", { princeAmbition: -9, court: 4, prestige: 2 }],
    bad: ["让他们竞争，优秀的儿子自己卷出来", "皇子们很上进，上进到开始研究宫门钥匙。", { princeAmbition: 12, intrigue: 8, prestige: -3 }, {}, "皇子"],
    weird: ["安排他们一起抄祖训，亲情靠手酸维护", "祖训没抄完，兄弟情先抄薄了。", { princeAmbition: -3, intrigue: 4, happiness: 2 }]
  },
  wise: {
    tags: ["盛世", "长局"],
    good: ["继续维护，盛世也要交保养费", "你修补了小裂缝，史官差点没素材。", { treasury: -8, people: 5, court: 5, prestige: 3 }],
    bad: ["先放一放，太平久了会自己太平", "太平听完开始松螺丝。", { happiness: 6, court: -7, corruption: 5, eunuch: 4 }, {}, "摆烂"],
    weird: ["让史官写盛世报告，先稳住情绪", "报告很好看，问题在脚注里偷偷排队。", { prestige: 5, treasury: -3, corruption: 2 }]
  },
  enemy: {
    tags: ["外敌", "边疆"],
    good: ["修边墙补斥候，别让地图再减肥", "边墙高了一截，敌军开始怀念低成本入境。", { treasury: -12, army: 6, enemy: -10 }],
    bad: ["先议和，朕的底线可以临时活动", "底线往后退了三十里，礼部称之为弹性疆域。", { enemy: -3, prestige: -10, mandate: -4 }],
    weird: ["送厚礼探口风，钱先替兵探路", "礼物到了，对方口风很软，胃口很硬。", { treasury: -10, enemy: -4, corruption: 3 }]
  }
};

function planned(id, category, title, speaker, text, kind, conditions = {}, extraTags = [], weight = 7) {
  const base = KINDS[kind];
  return event(`v02_${id}`, category, title, speaker, text, [...base.tags, ...extraTags], weight, [
    opt(...base.good),
    opt(...base.bad),
    opt(...base.weird)
  ], conditions);
}

const timelineSpecs = [
  ["a001", "timeline", "摸鱼元年第一次朝会", "礼部尚书", "群臣等了半个时辰，终于确认皇帝不是压轴，是还没起。", "court", { era: "moyu", yearMax: 1 }, ["年号"]],
  ["a002", "timeline", "永乐元年灯火账", "户部尚书", "新年第一场宫宴刚散，账本已经像宿醉一样站不稳。", "pleasure", { era: "yongle", yearMax: 1 }, ["年号"]],
  ["a003", "timeline", "开摆元年缺席照", "起居郎", "起居郎画了一张空龙椅，说这至少比没有记录强。", "court", { era: "kaibai", yearMax: 1 }, ["年号"]],
  ["a004", "timeline", "天命元年祥云采购", "钦天监", "钦天监说天象很吉，前提是别问云为什么像欠条。", "alchemy", { era: "tianming", yearMax: 1 }, ["年号", "天命"]],
  ["a005", "timeline", "暴富元年钱袋普查", "户部侍郎", "地方开始统计百姓钱袋，百姓开始统计逃跑路线。", "treasury", { era: "baofu", yearMax: 1 }, ["年号"]],
  ["a006", "timeline", "求仙元年丹炉开光", "国师", "新丹炉比龙椅还亮，太医站在旁边像丧事预备队。", "alchemy", { era: "qiuxian", yearMax: 1 }, ["年号"]],
  ["a007", "timeline", "勤政元年灯油告急", "内务府", "陛下夜批奏折，灯油消耗得像国家前途一样猛烈。", "court", { era: "qinzheng", yearMax: 1 }, ["年号", "过劳"]],
  ["a008", "timeline", "铁拳元年御史闭麦", "御史大夫", "御史台今日无人弹劾，主要是大家都在练习吞字。", "court", { era: "tiequan", yearMax: 1 }, ["年号", "镇压"]],
  ["a009", "timeline", "民间改元小报", "锦衣校尉", "市井已经给新年号配了顺口溜，押韵程度令人不安。", "people", { yearMin: 2, yearMax: 2 }, ["民间"]],
  ["a010", "timeline", "第一批新官到任", "吏部尚书", "新官们穿着新袍，眼神清澈得像还没看过账本。", "court", { yearMin: 2, yearMax: 2 }, ["选官"]],
  ["a011", "timeline", "县里学会揣摩", "巡按御史", "地方奏报开始统一口径：陛下圣明，问题不明。", "court", { yearMin: 2, yearMax: 3 }, ["地方"]],
  ["a012", "timeline", "登基恩诏到期", "户部尚书", "当年免的税终于回来了，回来时还带着利息的眼神。", "treasury", { yearMin: 2, yearMax: 3 }, ["征税"]],
  ["a013", "timeline", "老臣试探底线", "内阁首辅", "老臣们发现新帝脾气有规律，开始像摸门锁一样摸圣意。", "court", { yearMin: 2, yearMax: 4 }, ["朝堂"]],
  ["a014", "timeline", "乡绅送万民伞", "地方知府", "万民伞很大，下面站的主要是送伞的人。", "people", { yearMin: 2, yearMax: 4 }, ["民心"]],
  ["a015", "timeline", "边将递第一封长信", "兵部尚书", "边将写了八页军情，前七页都在解释为什么要钱。", "army", { yearMin: 2, yearMax: 4 }, ["边疆"]],
  ["a016", "timeline", "后宫第一次请安风波", "皇后", "请安排位比朝班还复杂，礼部看了都想辞职。", "harem", { yearMin: 2, yearMax: 4 }, ["后宫"]],
  ["a017", "timeline", "初政账本回响", "户部郎中", "三年前的一笔临时款，如今长成了正式麻烦。", "treasury", { yearMin: 3, yearMax: 5 }, ["初政"]],
  ["a018", "timeline", "新法第一批漏洞", "刑部尚书", "新法刚落地，地方已经学会从旁边钻过去。", "court", { yearMin: 3, yearMax: 5 }, ["改革"]],
  ["a019", "timeline", "减税后的空仓", "户部尚书", "百姓喘了口气，国库跟着咳了三声。", "treasury", { yearMin: 3, yearMax: 5 }, ["财政"]],
  ["a020", "timeline", "加税后的空村", "地方知县", "村口石碑还在，村民很有礼貌地不在。", "people", { yearMin: 3, yearMax: 5, resentmentMin: 25 }, ["民怨"]],
  ["a021", "timeline", "军饷旧欠翻红", "兵部郎中", "欠饷账目被圈成红色，像军营里一颗安静的火星。", "army", { yearMin: 3, yearMax: 5 }, ["军饷"]],
  ["a022", "timeline", "第一次河工验收", "工部尚书", "河堤看起来很直，只有河水知道它虚不虚。", "people", { yearMin: 3, yearMax: 5 }, ["河工"]],
  ["a023", "timeline", "国子监年轻嘴", "祭酒", "学子们开始议政，文采飞扬，求生欲落地。", "court", { yearMin: 3, yearMax: 5 }, ["学子"]],
  ["a024", "timeline", "宫宴传到民间", "市井小吏", "百姓知道宫里吃得好以后，突然对自己的粥有了意见。", "pleasure", { yearMin: 3, yearMax: 5 }, ["享乐"]],
  ["a025", "timeline", "官仓鼠患", "户部仓官", "官仓有鼠，体型很像某些官员的良心。", "treasury", { yearMin: 6, yearMax: 10 }, ["腐败"]],
  ["a026", "timeline", "地方乡约成势", "巡按御史", "乡绅把乡约写得像小朝廷，盖章盖得很有野心。", "people", { yearMin: 6, yearMax: 10 }, ["地方"]],
  ["a027", "timeline", "边贸私市", "边关守将", "边民和敌国做买卖，和平得让兵部觉得失业。", "enemy", { yearMin: 6, yearMax: 10 }, ["贸易"]],
  ["a028", "timeline", "新贵抢旧贵椅子", "礼部侍郎", "朝堂座次开始变化，椅子第一次感受到政治压力。", "court", { yearMin: 6, yearMax: 10 }, ["派系"]],
  ["a029", "timeline", "粮价学会登天", "地方知府", "粮价涨得很励志，只是百姓不太想被激励。", "people", { yearMin: 6, yearMax: 10, famineMin: 20 }, ["粮价"]],
  ["a030", "timeline", "太医院病例堆高", "太医令", "病案堆得像奏折，太医终于理解皇帝的痛。", "people", { yearMin: 6, yearMax: 10, diseaseMin: 20 }, ["疾病"]],
  ["a031", "timeline", "将门子弟请功", "兵部尚书", "将门子弟还没上阵，已经把功劳的名字想好了。", "army", { yearMin: 6, yearMax: 10 }, ["将门"]],
  ["a032", "timeline", "外戚办学", "皇后", "外戚说是办学，书院门口的车马像在办势力。", "harem", { yearMin: 6, yearMax: 10 }, ["外戚"]],
  ["a033", "timeline", "巡游路费追加", "内务府", "巡游路线越画越长，户部尚书的寿命越画越短。", "pleasure", { yearMin: 6, yearMax: 10 }, ["巡游"]],
  ["a034", "timeline", "科举押题案", "礼部尚书", "考题还没开封，答案已经在某些人梦里熟了。", "court", { yearMin: 6, yearMax: 10, corruptionMin: 25 }, ["科举"]],
  ["a035", "timeline", "河道总督变胖", "工部尚书", "河道总督说治河辛苦，腰带替他承认收成不错。", "people", { yearMin: 6, yearMax: 10, corruptionMin: 30 }, ["河工"]],
  ["a036", "timeline", "十年小吏成老油条", "吏部郎中", "当年清澈的小吏，如今能闭眼背出推责流程。", "court", { yearMin: 6, yearMax: 10 }, ["后期"]],
  ["a037", "timeline", "盛世保养费", "户部尚书", "国家看起来很好，维护起来很贵，像一件祖传瓷器。", "wise", { yearMin: 11, yearMax: 18, peopleMin: 65 }, ["盛世"]],
  ["a038", "timeline", "清流开始挑刺", "御史大夫", "国家太平后，清流终于有空研究措辞里的灰尘。", "wise", { yearMin: 11, yearMax: 18, courtMin: 65 }, ["清流"]],
  ["a039", "timeline", "老百姓要更多", "地方知府", "百姓吃饱后开始想吃好，仁政终于进入续费模式。", "wise", { yearMin: 11, yearMax: 18, peopleMin: 70 }, ["民生"]],
  ["a040", "timeline", "军队太久没打仗", "兵部尚书", "军队训练得很好，就是开始把操场当战场。", "army", { yearMin: 11, yearMax: 18, armyMin: 70 }, ["军队"]],
  ["a041", "timeline", "富户要求体面", "户部尚书", "富户说愿为朝廷分忧，前提是忧能换成牌匾。", "treasury", { yearMin: 11, yearMax: 18, treasuryMin: 70 }, ["财政"]],
  ["a042", "timeline", "皇子们学会等", "宗正", "皇子们长大了，最擅长的功课叫沉默地计算时间。", "prince", { yearMin: 11, yearMax: 18 }, ["皇子"]],
  ["a043", "timeline", "太庙问答", "太常寺卿", "太庙祭祀上，祖宗牌位很安静，但压力很吵。", "wise", { yearMin: 11, yearMax: 18 }, ["史官"]],
  ["a044", "timeline", "老臣退休潮", "吏部尚书", "老臣们集体请退，新人们集体假装不兴奋。", "court", { yearMin: 11, yearMax: 18 }, ["换代"]],
  ["a045", "timeline", "地方开始讲规矩", "巡按御史", "地方官终于讲规矩了，主要讲对自己有利的那几条。", "court", { yearMin: 11, yearMax: 18 }, ["地方"]],
  ["a046", "timeline", "皇城排水旧账", "工部尚书", "一场雨把十年前省下的钱全冲回了脸上。", "people", { yearMin: 11, yearMax: 18 }, ["工程"]],
  ["a047", "timeline", "宫中旧宠失势", "内侍", "旧宠失势，新宠还没坐稳，后宫像换季的天气。", "harem", { yearMin: 11, yearMax: 18 }, ["后宫"]],
  ["a048", "timeline", "祥瑞审美疲劳", "钦天监", "祥云看多了，群臣开始怀疑天命是不是批发的。", "alchemy", { yearMin: 11, yearMax: 18, mandateMin: 35 }, ["天命"]],
  ["a049", "timeline", "晚年第一声咳", "太医令", "太医听见你咳嗽，表情像听见国运打了个喷嚏。", "alchemy", { yearMin: 19 }, ["晚年"]],
  ["a050", "timeline", "太子试穿礼服", "宗正", "太子说只是试试礼服，镜子说他看了很久。", "prince", { yearMin: 19 }, ["继承"]],
  ["a051", "timeline", "老将军不服老", "兵部尚书", "老将军请战，膝盖在旁边提交反对意见。", "army", { yearMin: 19 }, ["晚年"]],
  ["a052", "timeline", "史官预写评价", "起居郎", "史官开始预写结尾，笔尖悬着，像在等你犯大错。", "wise", { yearMin: 19 }, ["史官"]],
  ["a053", "timeline", "皇孙开蒙", "皇后", "皇孙背祖训背得很甜，皇子们听得很酸。", "prince", { yearMin: 19 }, ["皇孙"]],
  ["a054", "timeline", "国库养老账", "户部尚书", "户部说晚年也要预算，长寿突然显得很贵。", "treasury", { yearMin: 19 }, ["晚年"]],
  ["a055", "timeline", "地方只认旧名", "地方知府", "百姓还在说你登基时的笑话，时间没有冲淡，反而押韵了。", "people", { yearMin: 19 }, ["民间"]],
  ["a056", "timeline", "宫门夜锁加厚", "禁军统领", "宫门锁换了三道，安全感和疑心一起加厚。", "prince", { yearMin: 19 }, ["政变"]],
  ["a057", "timeline", "老臣遗疏", "内阁首辅", "老臣临终递来遗疏，内容像把一生的叹气装订成册。", "court", { yearMin: 19 }, ["忠臣"]],
  ["a058", "timeline", "丹炉最后优惠", "国师", "国师说此丹适合晚年进补，太医说晚年适合远离国师。", "alchemy", { yearMin: 19 }, ["炼丹"]],
  ["a059", "timeline", "边关换防迟缓", "兵部尚书", "换防队伍走得慢，敌军看得很有耐心。", "enemy", { yearMin: 19 }, ["边疆"]],
  ["a060", "timeline", "太庙座位问题", "太常寺卿", "太常寺开始讨论你的牌位规格，你突然觉得礼制很冒犯。", "wise", { yearMin: 19 }, ["太庙"]]
];

const chainSpecs = [
  ["b001", "chain", "第三次加税后的沉默", "地方知府", "百姓这次没骂，地方官说这比骂还可怕。", "treasury", { taxCountMin: 3 }, ["征税"]],
  ["b002", "chain", "第六次加税后的空灶", "巡按御史", "灶台很干净，干净得不像被用来做饭。", "people", { taxCountMin: 6 }, ["征税", "民怨"]],
  ["b003", "chain", "第十次加税后的新传说", "说书人", "说书人把税吏讲成妖怪，税吏要求分成。", "treasury", { taxCountMin: 10 }, ["征税"]],
  ["b004", "chain", "税吏要护卫", "户部尚书", "税吏说出门不安全，百姓说他们终于理解了。", "treasury", { taxCountMin: 5, resentmentMin: 45 }, ["征税"]],
  ["b005", "chain", "乡里互相举报", "县令", "为了少交税，邻里关系终于进化成互相写奏折。", "people", { taxCountMin: 7 }, ["征税"]],
  ["b006", "chain", "逃税学问成书", "锦衣校尉", "民间小册子叫《避税三十六计》，销量让户部眼红。", "treasury", { taxCountMin: 9 }, ["征税"]],
  ["b007", "chain", "太监代批成例", "司礼监", "大臣递奏折时先看太监脸色，龙椅突然像旁听席。", "court", { eunuchDelegationsMin: 3 }, ["太监"]],
  ["b008", "chain", "内廷小印泛滥", "内阁首辅", "宫里出现十几枚小印，每一枚都像小小的皇帝。", "court", { eunuchDelegationsMin: 5 }, ["太监"]],
  ["b009", "chain", "九千岁门生", "吏部尚书", "新官谢恩先谢司礼监，礼部说流程不对但声音很小。", "court", { eunuchMin: 60 }, ["太监"]],
  ["b010", "chain", "奏折绕开御案", "起居郎", "奏折从你桌前路过，像熟人装没看见。", "court", { eunuchMin: 70 }, ["太监"]],
  ["b011", "chain", "内库钥匙易主", "内务府", "钥匙还叫内库钥匙，只是不太认识皇帝了。", "treasury", { eunuchMin: 65 }, ["太监"]],
  ["b012", "chain", "请安方向错了", "礼部尚书", "有大臣差点向太监行大礼，膝盖暴露了时代变化。", "court", { eunuchMin: 75 }, ["太监"]],
  ["b013", "chain", "宫殿预算长脚", "工部尚书", "预算自己往上跑，工部说这叫建筑有生命力。", "pleasure", { palaceBuiltMin: 2 }, ["宫殿"]],
  ["b014", "chain", "木料商拜龙颜", "户部尚书", "木料商排队谢恩，百姓排队看谁又发财了。", "pleasure", { palaceBuiltMin: 3 }, ["宫殿"]],
  ["b015", "chain", "新宫挤掉旧街", "京兆尹", "宫墙往外挪了一点，百姓的人生往里缩了一截。", "pleasure", { palaceBuiltMin: 4 }, ["宫殿"]],
  ["b016", "chain", "工匠学会罢工", "工部匠头", "工匠说手艺可以慢，肚子不能慢。", "people", { palaceBuiltMin: 3, resentmentMin: 30 }, ["宫殿"]],
  ["b017", "chain", "宫殿命名困难", "礼部侍郎", "新宫太多，礼部已经开始用天气命名。", "pleasure", { palaceBuiltMin: 5 }, ["宫殿"]],
  ["b018", "chain", "烂尾宫苑", "工部尚书", "半座宫殿立在城边，像国家没说完的谎。", "pleasure", { palaceBuiltMin: 4, treasuryMax: 25 }, ["宫殿"]],
  ["b019", "chain", "丹药第三次回甘", "太医令", "你说丹药回甘，太医说那可能是脏器在告别。", "alchemy", { alchemyCountMin: 3 }, ["炼丹"]],
  ["b020", "chain", "国师开始加料", "国师", "国师说剂量代表诚意，太医说诚意太重会压死人。", "alchemy", { alchemyCountMin: 5 }, ["炼丹"]],
  ["b021", "chain", "丹炉边的遗嘱", "起居郎", "起居郎问遗诏格式，国师说这叫飞升预案。", "alchemy", { alchemyCountMin: 6 }, ["炼丹"]],
  ["b022", "chain", "太医集体练跪", "太医令", "太医们每天练跪，不为礼仪，为了出事时姿势标准。", "alchemy", { alchemyCountMin: 4, healthMax: 45 }, ["炼丹"]],
  ["b023", "chain", "民间假丹泛滥", "市舶小吏", "百姓说皇帝都吃，肯定有用，太医说这逻辑最毒。", "alchemy", { alchemyCountMin: 5 }, ["炼丹"]],
  ["b024", "chain", "道士互相举报", "锦衣校尉", "道士们开始举报同行不够仙，主要是同行抢生意。", "alchemy", { alchemyCountMin: 4 }, ["炼丹"]],
  ["b025", "chain", "镇压后的安静", "兵部尚书", "地方安静得像睡着，只有账本知道下面还在发热。", "army", { loyalKilledMin: 2 }, ["镇压"]],
  ["b026", "chain", "酷吏要升迁", "刑部侍郎", "酷吏说自己办事有效率，犯人说确实很快。", "court", { loyalKilledMin: 2 }, ["镇压"]],
  ["b027", "chain", "军营疲惫", "兵部郎中", "士兵不是怕打仗，是怕今天又去打百姓。", "army", { uprisingCountMin: 1 }, ["镇压"]],
  ["b028", "chain", "乡里不递状纸", "巡按御史", "百姓不告了，地方官说治理成功，史官说你别急。", "people", { resentmentMin: 60 }, ["镇压"]],
  ["b029", "chain", "忠臣墓前草", "御史大夫", "被你处理过的忠臣墓前草长得很好，像在替他说话。", "court", { loyalKilledMin: 1 }, ["忠臣"]],
  ["b030", "chain", "狱卒要求加班费", "刑部尚书", "牢房太满，狱卒说再装下去自己也算犯人。", "court", { loyalKilledMin: 2 }, ["镇压"]],
  ["b031", "chain", "深夜奏折有回声", "内阁首辅", "你批到三更，殿里只剩朱笔和太医互相瞪眼。", "court", { happinessMax: 25 }, ["过劳"]],
  ["b032", "chain", "清流催命", "御史大夫", "清流说陛下勤政感天动地，太医说主要动了肝火。", "wise", { courtMin: 75, healthMax: 45 }, ["过劳"]],
  ["b033", "chain", "改革排队", "吏部尚书", "新政排得像早朝，谁都说自己先救国。", "court", { courtMin: 70 }, ["改革"]],
  ["b034", "chain", "皇帝忘了笑", "近侍", "近侍说陛下最近笑得少，连赏赐都像批复。", "court", { happinessMax: 20 }, ["过劳"]],
  ["b035", "chain", "太医封笔抗议", "太医令", "太医说再不休息，他就把脉案改成控诉书。", "wise", { healthMax: 30, courtMin: 70 }, ["过劳"]],
  ["b036", "chain", "勤政变成传说", "起居郎", "民间说皇帝不睡觉，百姓佩服，枕头同情。", "wise", { happinessMax: 20, peopleMin: 70 }, ["过劳"]],
  ["b037", "chain", "卖官售后", "吏部尚书", "买官的人要求配套权力，像买宅子要带院。", "treasury", { corruptionMin: 45 }, ["卖官"]],
  ["b038", "chain", "县令回本计划", "巡按御史", "新县令上任第一天就问本地韭菜长势。", "treasury", { corruptionMin: 55 }, ["卖官"]],
  ["b039", "chain", "官帽行情上涨", "市井牙人", "官帽有了市价，读书人第一次怀疑科举性价比。", "court", { corruptionMin: 60 }, ["卖官"]],
  ["b040", "chain", "清官显得不合群", "御史大夫", "清官站在朝堂里，像一张没被污染的白纸，很刺眼。", "court", { corruptionMin: 65 }, ["腐败"]],
  ["b041", "chain", "账房拜神", "户部郎中", "账房说已经算不清，只能求神别看细账。", "treasury", { corruptionMin: 70 }, ["腐败"]],
  ["b042", "chain", "地方送礼创新", "内务府", "贡品越来越含蓄，贵得越来越直白。", "treasury", { corruptionMin: 75 }, ["腐败"]],
  ["b043", "chain", "边关小败不报", "边将", "边将说只是小摩擦，地图说摩擦掉了一块。", "enemy", { enemyMin: 35 }, ["外敌"]],
  ["b044", "chain", "斥候开始辞职", "兵部尚书", "斥候说看得太多，主要是看不到援兵。", "enemy", { enemyMin: 45 }, ["外敌"]],
  ["b045", "chain", "敌国学会试探", "边关急使", "敌军今天只往前走五里，像在测试你的脾气。", "enemy", { enemyMin: 55 }, ["外敌"]],
  ["b046", "chain", "边民两边纳税", "地方知府", "边民给两边交税，终于实现了双重痛苦。", "people", { enemyMin: 50 }, ["外敌"]],
  ["b047", "chain", "将军写遗书模板", "边将", "将军写好了遗书，只差把日期留成活页。", "army", { enemyMin: 60, armyMax: 45 }, ["外敌"]],
  ["b048", "chain", "国境线会走路", "钦天监", "地图边线越描越靠里，礼部说这是笔误，兵部说不是。", "enemy", { enemyMin: 65 }, ["外敌"]]
];

const lateWiseSpecs = [
  ["d001", "longGame", "仁政账单", "户部尚书", "惠民政策很好，就是每一条都长着嘴要钱。", "wise", { yearMin: 8, peopleMin: 70 }, ["明君"]],
  ["d002", "longGame", "百姓开始挑口味", "地方知府", "粥棚办久了，百姓开始讨论盐放得少。", "wise", { yearMin: 8, peopleMin: 75 }, ["明君"]],
  ["d003", "longGame", "清廉也要预算", "御史大夫", "反腐很成功，成功到没人敢签字。", "wise", { yearMin: 8, corruptionMax: 20 }, ["明君"]],
  ["d004", "longGame", "河工二次维护", "工部尚书", "河堤没有垮，但开始用小裂缝提醒你别得意。", "people", { yearMin: 8, peopleMin: 65 }, ["河工"]],
  ["d005", "longGame", "粮仓太满", "户部郎中", "粮仓太满也有烦恼，老鼠看起来很有国家归属感。", "treasury", { yearMin: 8, treasuryMin: 70 }, ["明君"]],
  ["d006", "longGame", "地方等中央兜底", "巡按御史", "地方官学会一句话：反正陛下会救。", "wise", { yearMin: 8, peopleMin: 75 }, ["明君"]],
  ["d007", "longGame", "百姓求桥求路求学校", "地方知府", "民心高了，愿望也高了，奏报像购物清单。", "wise", { yearMin: 9, peopleMin: 80 }, ["明君"]],
  ["d008", "longGame", "赈灾仓轮换", "户部尚书", "旧粮再不换，仁政就会长出霉味。", "people", { yearMin: 9, treasuryMin: 60 }, ["明君"]],
  ["d009", "longGame", "善政被冒领", "巡按御史", "地方把你的仁政写成自己的功劳，墨很厚，脸更厚。", "court", { yearMin: 9, peopleMin: 70 }, ["明君"]],
  ["d010", "longGame", "乡校要先生", "国子监祭酒", "学校建了，先生不够，孩子们先学会了等。", "wise", { yearMin: 10, peopleMin: 70 }, ["明君"]],
  ["d011", "longGame", "行政过密", "内阁首辅", "制度太细，官员连打喷嚏都想找条文。", "court", { yearMin: 9, courtMin: 75 }, ["明君"]],
  ["d012", "longGame", "六部互相礼貌拖延", "吏部尚书", "大家都很守规矩，事情也很守规矩地不动。", "court", { yearMin: 9, courtMin: 80 }, ["明君"]],
  ["d013", "longGame", "奏折变专业", "起居郎", "奏折越来越专业，专业到你读完想另请皇帝。", "court", { yearMin: 10, courtMin: 75 }, ["过劳"]],
  ["d014", "longGame", "清流太清", "御史大夫", "清流连清流都嫌不够清，朝堂像一盆互相过滤的水。", "wise", { yearMin: 10, courtMin: 80 }, ["明君"]],
  ["d015", "longGame", "官员怕犯错", "内阁首辅", "吏治太严后，官员学会了最安全的政绩：不动。", "court", { yearMin: 10, corruptionMax: 15 }, ["明君"]],
  ["d016", "longGame", "改革疲劳", "礼部尚书", "新法旧法排队进殿，连朱笔都开始装病。", "wise", { yearMin: 10, courtMin: 75 }, ["改革"]],
  ["d017", "longGame", "皇帝早餐会议", "近侍", "你把早餐也改成会议，馒头听完都硬了。", "wise", { yearMin: 11, happinessMax: 35 }, ["过劳"]],
  ["d018", "longGame", "太医反向上疏", "太医令", "太医说国家很好，陛下不像国家。", "wise", { yearMin: 11, healthMax: 45 }, ["过劳"]],
  ["d019", "longGame", "公文格式大战", "中书舍人", "格式统一后，大家开始为统一格式的格式吵架。", "court", { yearMin: 11, courtMin: 75 }, ["明君"]],
  ["d020", "longGame", "清官子弟穷哭", "吏部尚书", "清官太清，家里孩子看见俸禄开始研究别的出路。", "court", { yearMin: 11, corruptionMax: 20 }, ["明君"]],
  ["d021", "longGame", "盛世惯性", "史官", "国家运转得太顺，顺到所有人都开始忘记保养。", "wise", { yearMin: 12, peopleMin: 70, courtMin: 70 }, ["盛世"]],
  ["d022", "longGame", "太平军费争论", "兵部尚书", "边关安静后，户部看军费的眼神像看多余亲戚。", "army", { yearMin: 12, armyMin: 70 }, ["盛世"]],
  ["d023", "longGame", "盛世税率争论", "户部尚书", "百姓说太平该减税，户部说太平也很贵。", "treasury", { yearMin: 12, peopleMin: 70 }, ["盛世"]],
  ["d024", "longGame", "外邦来学制度", "礼部尚书", "外邦使臣来学习治理，礼部赶紧把阴暗角落扫到帘后。", "wise", { yearMin: 12, prestigeMin: 65 }, ["盛世"]],
  ["d025", "longGame", "国史馆催稿", "史官", "史官说盛世也要有章节，否则后人以为你只会平稳。", "wise", { yearMin: 13 }, ["史官"]],
  ["d026", "longGame", "地方样板太假", "巡按御史", "样板县干净得不像人住，像专门给圣驾看的道具。", "court", { yearMin: 13, courtMin: 70 }, ["盛世"]],
  ["d027", "longGame", "老百姓怕政策变", "地方知府", "百姓开始存旧告示，像存祖传护身符。", "wise", { yearMin: 13, peopleMin: 75 }, ["盛世"]],
  ["d028", "longGame", "好官升太快", "吏部尚书", "好官被一路提拔，地方开始怀念他还没高升的时候。", "court", { yearMin: 13, courtMin: 75 }, ["盛世"]],
  ["d029", "longGame", "盛世里的小偷懒", "内阁首辅", "太平久了，官员偷懒都偷得很有制度感。", "court", { yearMin: 14, peopleMin: 70 }, ["盛世"]],
  ["d030", "longGame", "边关和平病", "边将", "和平太久，士兵练刀时开始讨论菜谱。", "army", { yearMin: 14, armyMin: 75 }, ["盛世"]],
  ["d031", "longGame", "明君前置考一", "史官", "史官说若想千古留名，先别把今天过成预算事故。", "wise", { yearMin: 10, peopleMin: 70, courtMin: 70 }, ["明君"]],
  ["d032", "longGame", "明君前置考二", "太庙令", "祖宗牌位前的香很直，问题也很直。", "wise", { yearMin: 11, treasuryMin: 65, armyMin: 65 }, ["明君"]],
  ["d033", "longGame", "明君前置考三", "御史大夫", "御史说盛名最怕小洞，尤其是你自己抠出来的。", "wise", { yearMin: 12, prestigeMin: 60 }, ["明君"]],
  ["d034", "longGame", "明君前置考四", "太医令", "太医说千古可以，先活过这周。", "wise", { yearMin: 12, healthMax: 55 }, ["明君"]],
  ["d035", "longGame", "明君前置考五", "户部尚书", "户部说盛世不能只看笑脸，也要看账脸。", "treasury", { yearMin: 12, treasuryMax: 60 }, ["明君"]],
  ["d036", "longGame", "明君前置考六", "地方知府", "地方说中央很好，就是好得有点远。", "people", { yearMin: 12, peopleMin: 70 }, ["明君"]]
];

const endingSupportSpecs = [
  ["e001", "endingSupport", "东宫夜读兵书", "宗正", "太子最近读兵书，孝心突然带了阵型。", "prince", { yearMin: 5 }, ["皇子"]],
  ["e002", "endingSupport", "皇子结交边将", "兵部尚书", "皇子说只是交朋友，边将说朋友带兵也很合理。", "prince", { yearMin: 6 }, ["皇子"]],
  ["e003", "endingSupport", "外戚押注东宫", "皇后", "外戚开始送礼送得很有未来感。", "prince", { yearMin: 6 }, ["外戚"]],
  ["e004", "endingSupport", "遗诏纸张预订", "内务府", "内务府买了上好黄纸，大家都假装不知道用途。", "prince", { yearMin: 8, healthMax: 55 }, ["皇子"]],
  ["e005", "endingSupport", "皇子府扩门", "京兆尹", "皇子府门扩宽了，据说是方便马车，也方便野心。", "prince", { yearMin: 8 }, ["皇子"]],
  ["e006", "endingSupport", "东宫请安太勤", "近侍", "太子请安请得很勤，像在确认龙椅保修期。", "prince", { yearMin: 10 }, ["皇子"]],
  ["e007", "endingSupport", "司礼监二层门", "太监总管", "司礼监多了一道门，大臣进去前先学会低头。", "court", { eunuchMin: 45 }, ["太监"]],
  ["e008", "endingSupport", "太监办私塾", "内阁首辅", "小太监开始学批红，字迹像一窝刚破壳的权力。", "court", { eunuchMin: 50 }, ["太监"]],
  ["e009", "endingSupport", "内廷管军械", "兵部尚书", "太监说帮忙点军械，兵部说这忙听起来像夺命。", "army", { eunuchMin: 55 }, ["太监"]],
  ["e010", "endingSupport", "宫门先问司礼监", "禁军统领", "禁军进宫先问太监，礼部假装没看见。", "court", { eunuchMin: 60 }, ["太监"]],
  ["e011", "endingSupport", "小皇帝流程", "起居郎", "你还没说话，司礼监已经替你安排好了沉默。", "court", { eunuchMin: 70 }, ["太监"]],
  ["e012", "endingSupport", "九千岁寿宴", "礼部尚书", "太监总管过寿，贺礼堆得像另一个国库。", "treasury", { eunuchMin: 75 }, ["太监"]],
  ["e013", "endingSupport", "账面盛世", "户部尚书", "国库满得很好看，地方空得也很整齐。", "treasury", { treasuryMin: 80, peopleMax: 35 }, ["财政怪物"]],
  ["e014", "endingSupport", "空城税额", "地方知府", "县里人少了，税额没少，数学很努力。", "treasury", { treasuryMin: 75, peopleMax: 30 }, ["财政怪物"]],
  ["e015", "endingSupport", "银库回声", "户部郎中", "银库太满，说话有回声，田野也有。", "treasury", { treasuryMin: 85, resentmentMin: 45 }, ["财政怪物"]],
  ["e016", "endingSupport", "富商买路", "京兆尹", "富商说愿意捐路，条件是路最好通向他家。", "treasury", { treasuryMin: 70, corruptionMin: 50 }, ["财政怪物"]],
  ["e017", "endingSupport", "百姓押身契", "地方知府", "百姓把未来押了，户部说这叫财政前瞻。", "people", { treasuryMin: 80, peopleMax: 25 }, ["财政怪物"]],
  ["e018", "endingSupport", "国库锁加厚", "户部尚书", "锁越来越厚，门外的人越来越少。", "treasury", { treasuryMin: 90 }, ["财政怪物"]],
  ["e019", "endingSupport", "义旗换名字", "巡按御史", "叛民给队伍改名叫义军，朝廷给奏报改名叫误会。", "people", { resentmentMin: 55 }, ["亡国"]],
  ["e020", "endingSupport", "边城自保", "边关守将", "边城开始自己谈条件，朝廷像远房亲戚。", "enemy", { enemyMin: 50, armyMax: 50 }, ["亡国"]],
  ["e021", "endingSupport", "粮道断续", "兵部尚书", "粮道一会儿通一会儿断，像朝廷的自信。", "army", { armyMax: 45, enemyMin: 45 }, ["亡国"]],
  ["e022", "endingSupport", "豪强筑寨", "地方知府", "豪强筑寨自保，官府路过还要先敲门。", "people", { resentmentMin: 50, courtMax: 45 }, ["亡国"]],
  ["e023", "endingSupport", "逃兵回乡", "兵部郎中", "逃兵说不是叛逃，是回家看看国家还在不在。", "army", { armyMax: 35 }, ["亡国"]],
  ["e024", "endingSupport", "敌国借道", "礼部尚书", "敌国说只是借道，地图听完打了个冷颤。", "enemy", { enemyMin: 60 }, ["亡国"]],
  ["e025", "endingSupport", "朱笔磨秃", "起居郎", "朱笔磨秃了，你的脸色也像被批阅过。", "wise", { courtMin: 70, happinessMax: 25 }, ["社畜"]],
  ["e026", "endingSupport", "太医蹲守御案", "太医令", "太医搬到御案旁，像给奏折配了急救。", "wise", { healthMax: 40, courtMin: 70 }, ["社畜"]],
  ["e027", "endingSupport", "百姓夸你不休息", "地方知府", "百姓夸你勤政，枕头在宫里替你沉默。", "wise", { peopleMin: 70, happinessMax: 25 }, ["社畜"]],
  ["e028", "endingSupport", "朝臣被卷哭", "内阁首辅", "大臣说陛下太勤，听起来像夸奖，表情像求饶。", "court", { courtMin: 75, happinessMax: 30 }, ["社畜"]],
  ["e029", "endingSupport", "早朝提前到夜里", "礼部尚书", "早朝越来越早，早到已经不能叫早。", "wise", { courtMin: 75, healthMax: 40 }, ["社畜"]],
  ["e030", "endingSupport", "改革不让人睡", "吏部尚书", "新政很有效，副作用是全朝一起像熬夜的鬼。", "court", { courtMin: 80, happinessMax: 25 }, ["社畜"]],
  ["e031", "endingSupport", "酒池预算", "内务府", "内务府说酒池可以小一点，但小了就不像错误。", "pleasure", { happinessMin: 75 }, ["昏君"]],
  ["e032", "endingSupport", "巡游扰民", "地方知府", "圣驾过境后，百姓学会把欢迎和叹气写在同一张脸上。", "pleasure", { happinessMin: 70 }, ["昏君"]],
  ["e033", "endingSupport", "宫中宠物封官", "礼部侍郎", "宠物得了封号，几位寒窗十年的学子沉默了。", "pleasure", { happinessMin: 80 }, ["昏君"]],
  ["e034", "endingSupport", "猎场圈地", "兵部尚书", "猎场越圈越大，百姓的田越看越像误入。", "pleasure", { happinessMin: 75 }, ["昏君"]],
  ["e035", "endingSupport", "宴会盖过朝会", "起居郎", "起居郎分不清今天是议政还是上菜。", "pleasure", { happinessMin: 85 }, ["昏君"]],
  ["e036", "endingSupport", "快乐满朝低头", "太监总管", "宫里笑声很大，朝堂没人敢提醒外面没声音。", "pleasure", { happinessMin: 90, courtMax: 35 }, ["昏君"]]
];

const evergreenSpecs = [
  ["g001", "longGame", "十年旧桥", "工部尚书", "旧桥还没塌，但每次车过都像在提醒朝廷别省钱。", "people", { yearMin: 10 }, ["常青"]],
  ["g002", "longGame", "地方文书积灰", "巡按御史", "县衙文书堆成小山，山里住着很多没解决的百姓。", "court", { yearMin: 10 }, ["常青"]],
  ["g003", "longGame", "驿站老马", "兵部郎中", "驿站老马跑不动了，急报开始学会迟到。", "army", { yearMin: 10 }, ["常青"]],
  ["g004", "longGame", "粮仓换瓦", "户部仓官", "粮仓屋顶漏雨，谷子还没发芽，户部先发慌。", "treasury", { yearMin: 10 }, ["常青"]],
  ["g005", "longGame", "乡学屋梁", "国子监祭酒", "乡学屋梁歪得很有学问，学生上课顺便学避险。", "wise", { yearMin: 10 }, ["常青"]],
  ["g006", "longGame", "旧案申冤", "刑部尚书", "十年前的小案重新敲门，声音比当年更响。", "court", { yearMin: 10 }, ["常青"]],
  ["g007", "longGame", "盐价小波", "户部尚书", "盐价一动，百姓的饭碗先感到了朝廷存在。", "treasury", { yearMin: 10 }, ["常青"]],
  ["g008", "longGame", "边镇婚书", "边关守将", "边民和外族通婚，礼部说复杂，百姓说日子要过。", "enemy", { yearMin: 10 }, ["常青"]],
  ["g009", "longGame", "太医院药柜", "太医令", "药柜里旧方太多，新病看了都不知道该害怕哪张。", "alchemy", { yearMin: 10 }, ["常青"]],
  ["g010", "longGame", "宫灯保养", "内务府", "宫灯年久失修，昨夜灭得像在替国库表态。", "pleasure", { yearMin: 10 }, ["常青"]],
  ["g011", "longGame", "城门税争议", "京兆尹", "城门税收得太熟练，百姓进城像先被朝廷摸了一把。", "treasury", { yearMin: 10 }, ["常青"]],
  ["g012", "longGame", "老吏带徒", "吏部尚书", "老吏教新人办事，第一课叫如何把事办得像没办。", "court", { yearMin: 10 }, ["常青"]],
  ["g013", "longGame", "村社修井", "地方知府", "村井塌了半边，百姓说水还在，就是朝廷不太在。", "people", { yearMin: 10 }, ["常青"]],
  ["g014", "longGame", "军马换蹄", "兵部尚书", "军马蹄铁旧了，跑起来像在敲欠饷的钟。", "army", { yearMin: 10 }, ["常青"]],
  ["g015", "longGame", "贡品标准", "礼部尚书", "贡品越来越花，地方越来越懂得把问题包装成礼物。", "treasury", { yearMin: 10 }, ["常青"]],
  ["g016", "longGame", "皇庄界碑", "宗正", "皇庄界碑往外挪了一寸，百姓心里往里缩了一尺。", "people", { yearMin: 10 }, ["常青"]],
  ["g017", "longGame", "学官缺员", "礼部侍郎", "学官不够，学生们先学会了自习和吐槽。", "wise", { yearMin: 10 }, ["常青"]],
  ["g018", "longGame", "巡河船漏水", "工部郎中", "巡河船自己漏水，像在提前演示河堤风险。", "people", { yearMin: 10 }, ["常青"]],
  ["g019", "longGame", "旧军器翻修", "兵部郎中", "库里的旧刀亮不起来，将军的脸也亮不起来。", "army", { yearMin: 10 }, ["常青"]],
  ["g020", "longGame", "内库盘点", "内务府", "内库盘点出三箱旧物，每一箱都像祖宗留下的账。", "treasury", { yearMin: 10 }, ["常青"]],
  ["g021", "longGame", "地方戏讽政", "锦衣校尉", "戏台上没说皇帝，观众笑得都很懂。", "people", { yearMin: 11 }, ["常青"]],
  ["g022", "longGame", "退休官回乡", "吏部尚书", "退休官回乡办学，顺便把朝廷旧毛病也带回去了。", "court", { yearMin: 11 }, ["常青"]],
  ["g023", "longGame", "边关茶税", "户部尚书", "边茶税一涨，商队和怨气一起绕路。", "treasury", { yearMin: 11 }, ["常青"]],
  ["g024", "longGame", "寺庙田产", "礼部尚书", "寺庙田产越记越多，佛祖看起来也开始懂理财。", "treasury", { yearMin: 11 }, ["常青"]],
  ["g025", "longGame", "军户逃籍", "兵部尚书", "军户名册很厚，真实人数很谦虚。", "army", { yearMin: 11 }, ["常青"]],
  ["g026", "longGame", "县学闹饭", "地方知府", "学生说读圣贤书也要吃饭，祭酒觉得很现实。", "people", { yearMin: 11 }, ["常青"]],
  ["g027", "longGame", "御花园修枝", "内务府", "御花园树枝太密，像朝廷里某些关系。", "pleasure", { yearMin: 11 }, ["常青"]],
  ["g028", "longGame", "驿卒脚伤", "兵部郎中", "驿卒脚上全是旧伤，急报看了都不好意思催。", "army", { yearMin: 11 }, ["常青"]],
  ["g029", "longGame", "民间借贷", "地方知府", "借条在乡里流得比圣旨快，利息比官威硬。", "people", { yearMin: 11 }, ["常青"]],
  ["g030", "longGame", "城墙草长", "工部尚书", "城墙缝里长草，守军说至少证明土地肥沃。", "enemy", { yearMin: 11 }, ["常青"]],
  ["g031", "longGame", "朝参礼节老化", "礼部尚书", "朝参礼节复杂到新人行完礼已经忘了来干嘛。", "court", { yearMin: 12 }, ["常青"]],
  ["g032", "longGame", "县仓借粮", "户部郎中", "县仓说借粮救急，急救完以后粮很难回来。", "people", { yearMin: 12 }, ["常青"]],
  ["g033", "longGame", "水师晒船", "兵部尚书", "水师的船晒得很好，问题是敌人一般不在岸上等。", "army", { yearMin: 12 }, ["常青"]],
  ["g034", "longGame", "旧宫女养老", "皇后", "老宫女们到了出宫年纪，宫里才想起人也会旧。", "harem", { yearMin: 12 }, ["常青"]],
  ["g035", "longGame", "山路驿道", "地方知府", "山路坏了三段，百姓说走路像参加科举，步步要命。", "people", { yearMin: 12 }, ["常青"]],
  ["g036", "longGame", "钦天监旧仪", "钦天监", "观星仪偏了半寸，天命听起来开始有误差。", "alchemy", { yearMin: 12 }, ["常青"]],
  ["g037", "longGame", "粮价平准", "户部尚书", "平准仓要进要出，像国库在练呼吸。", "treasury", { yearMin: 12 }, ["常青"]],
  ["g038", "longGame", "捕快欠薪", "刑部侍郎", "捕快欠薪后抓贼很佛，贼都觉得气氛温柔。", "court", { yearMin: 12 }, ["常青"]],
  ["g039", "longGame", "边民迁村", "边关守将", "边村想往里迁，地图不同意，百姓更不同意。", "enemy", { yearMin: 12 }, ["常青"]],
  ["g040", "longGame", "贡道塌方", "礼部侍郎", "贡道塌了，地方说贡品在路上，路说没有。", "treasury", { yearMin: 12 }, ["常青"]],
  ["g041", "longGame", "老县令口碑", "巡按御史", "老县令名声很好，好到大家忘了查他账。", "court", { yearMin: 13 }, ["常青"]],
  ["g042", "longGame", "宫中旧账", "内务府", "内务府翻出旧账，每一页都像先帝留下的坑。", "treasury", { yearMin: 13 }, ["常青"]],
  ["g043", "longGame", "民谣换词", "锦衣校尉", "民谣换了新词，老曲调还是熟悉的阴阳怪气。", "people", { yearMin: 13 }, ["常青"]],
  ["g044", "longGame", "屯田收成", "兵部尚书", "屯田收成不错，士兵说打仗和种地至少得选一个累。", "army", { yearMin: 13 }, ["常青"]],
  ["g045", "longGame", "书院争名", "国子监祭酒", "书院争朝廷题名，读书人的虚荣很有文化。", "wise", { yearMin: 13 }, ["常青"]],
  ["g046", "longGame", "药材产地造假", "太医令", "药材产地写得很远，疗效也离得很远。", "alchemy", { yearMin: 13 }, ["常青"]],
  ["g047", "longGame", "渡口收钱", "地方知府", "渡口私收过路钱，河水都觉得自己被利用了。", "people", { yearMin: 13 }, ["常青"]],
  ["g048", "longGame", "禁军换装", "禁军统领", "禁军新甲很好看，唯一问题是比旧甲更贵。", "army", { yearMin: 13 }, ["常青"]],
  ["g049", "longGame", "京城夜禁", "京兆尹", "夜禁一严，百姓早睡了，怨气醒着。", "court", { yearMin: 14 }, ["常青"]],
  ["g050", "longGame", "老桥碑文", "工部尚书", "修桥碑文比桥还长，功劳站满了石头。", "wise", { yearMin: 14 }, ["常青"]],
  ["g051", "longGame", "边贸银流", "户部郎中", "边贸银子流得很快，快到朝廷只看见尾巴。", "treasury", { yearMin: 14 }, ["常青"]],
  ["g052", "longGame", "义仓钥匙", "地方知府", "义仓钥匙在乡绅手里，百姓看见钥匙比看见粮还难。", "people", { yearMin: 14 }, ["常青"]],
  ["g053", "longGame", "旧将荐人", "兵部尚书", "旧将推荐新人，推荐信里一半是情分，一半是伏笔。", "army", { yearMin: 14 }, ["常青"]],
  ["g054", "longGame", "宫宴节制", "皇后", "皇后建议少办宴，内务府像听见自己被裁员。", "pleasure", { yearMin: 14 }, ["常青"]],
  ["g055", "longGame", "清丈田亩", "户部尚书", "田亩一清，藏起来的地和藏起来的火气一起出现。", "treasury", { yearMin: 14 }, ["常青"]],
  ["g056", "longGame", "州县合并", "吏部尚书", "州县合并听起来省钱，地方百姓听起来像搬家。", "court", { yearMin: 14 }, ["常青"]],
  ["g057", "longGame", "风雨祭坛", "太常寺卿", "祭坛年久漏雨，祭天仪式开始先看天气。", "alchemy", { yearMin: 15 }, ["常青"]],
  ["g058", "longGame", "边关子弟入学", "国子监祭酒", "边关子弟进京读书，口音比奏折更真实。", "wise", { yearMin: 15 }, ["常青"]],
  ["g059", "longGame", "旧港淤塞", "工部尚书", "港口淤了半截，商船进来像朝臣上奏一样费劲。", "treasury", { yearMin: 15 }, ["常青"]],
  ["g060", "longGame", "天下例行小修", "内阁首辅", "没有大灾大乱，只有到处都要一点钱的小毛病。", "wise", { yearMin: 15 }, ["常青"]]
];

export const v02ExpansionEvents = [
  ...timelineSpecs.map((spec) => planned(...spec)),
  ...chainSpecs.map((spec) => planned(...spec)),
  ...lateWiseSpecs.map((spec) => planned(...spec)),
  ...endingSupportSpecs.map((spec) => planned(...spec)),
  ...evergreenSpecs.map((spec) => planned(...spec))
];

function bomb(id, title, speaker, text, kind, hiddenKey, min, effects = {}) {
  const base = KINDS[kind];
  return {
    ...event(`v02_bomb_${id}`, "bomb", title, speaker, text, ["爆雷", ...base.tags], 18, [
      opt(base.good[0], base.good[1], { ...base.good[2], [hiddenKey]: -18, ...effects.good }),
      opt(base.bad[0], base.bad[1], { ...base.bad[2], [hiddenKey]: -8, ...effects.bad }, base.bad[3] || {}, base.bad[4] || ""),
      opt(base.weird[0], base.weird[1], { ...base.weird[2], [hiddenKey]: -12, ...effects.weird })
    ], { [`${hiddenKey}Min`]: min }),
    bombKey: `${hiddenKey}_${min}`
  };
}

function lowBomb(id, title, speaker, text, kind, hiddenKey, max, effects = {}) {
  const base = KINDS[kind];
  return {
    ...event(`v02_bomb_${id}`, "bomb", title, speaker, text, ["爆雷", ...base.tags], 18, [
      opt(base.good[0], base.good[1], { ...base.good[2], [hiddenKey]: 10, ...effects.good }),
      opt(base.bad[0], base.bad[1], { ...base.bad[2], [hiddenKey]: 6, ...effects.bad }, base.bad[3] || {}, base.bad[4] || ""),
      opt(base.weird[0], base.weird[1], { ...base.weird[2], [hiddenKey]: 8, ...effects.weird })
    ], { [`${hiddenKey}Max`]: max }),
    bombKey: `${hiddenKey}_low_${max}`
  };
}

export const v02BombEvents = [
  bomb("resentment_70", "民怨成潮", "地方急使", "怨气从村口漫到县衙，连门槛都像在叹气。", "people", "resentment", 70),
  bomb("resentment_110", "万民不跪", "史官", "百姓终于发现，沉默不一定要跪着沉默。", "people", "resentment", 110, { bad: { army: -8, people: -10 } }),
  bomb("corruption_70", "账本长毛", "户部尚书", "账本里的烂账多到像有自己的生态。", "treasury", "corruption", 70),
  bomb("corruption_110", "官场成泥", "御史大夫", "贪腐不再是风气，是地形。", "court", "corruption", 110, { bad: { court: -10, treasury: 8 } }),
  bomb("enemy_70", "边墙试探", "边关急使", "敌军没有大举入侵，只是每天进来一点点，像借盐。", "enemy", "enemy", 70),
  bomb("enemy_110", "三路入寇", "兵部尚书", "敌军分三路来，兵部地图第一次显得不够宽。", "enemy", "enemy", 110, { good: { army: -8 }, bad: { prestige: -10 } }),
  bomb("eunuch_70", "司礼监抬头", "内阁首辅", "太监总管说话不用提高声音，大臣已经自动低头。", "court", "eunuch", 70),
  bomb("eunuch_110", "龙椅旁听", "起居郎", "今日议政很顺利，唯一缺点是皇帝像来参观的。", "court", "eunuch", 110, { good: { court: -8 }, bad: { prestige: -10 } }),
  bomb("intrigue_prince", "后宫押宝", "皇后", "妃嫔们不再只争宠，开始争未来的太后座位。", "prince", "intrigue", 75, { bad: { princeAmbition: 10 } }),
  bomb("famine_disease", "饥疫同路", "太医令", "饥荒和疫病在路口碰头，决定一起进城。", "people", "famine", 75, { good: { disease: -6 }, bad: { disease: 8 } }),
  bomb("mandate_high", "祥瑞挤爆天门", "钦天监", "祥瑞多到钦天监写不完，百姓开始怀疑天也会拍马屁。", "alchemy", "mandate", 95, { bad: { corruption: 8, prestige: -5 } }),
  lowBomb("mandate_low", "天象摆脸色", "钦天监", "天象难看得很直接，钦天监连修辞都省了。", "alchemy", "mandate", 8, { good: { mandate: 10 }, bad: { people: -6, prestige: -6 }, weird: { mandate: 8 } })
];
