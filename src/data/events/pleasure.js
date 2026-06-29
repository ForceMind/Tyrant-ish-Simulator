import { event, opt } from "./_helpers.js";

export const pleasureEvents = [
  event("pleasure_001", "pleasure", "御宴三日", "光禄寺卿", "御厨说菜单已经排到后天，户部说国库可能撑不到明天。", ["享乐", "宴会", "奢靡"], 9, [
    opt("开宴，朕要把压力吃回去", "你吃得很快乐，大臣站得很疲惫。", { happiness: 16, treasury: -14, health: -3, corruption: 4 }, {}, "奢靡"),
    opt("减半，留点菜给国库", "御厨学会了节俭摆盘。", { happiness: 6, treasury: -5, prestige: 2 }),
    opt("取消，把菜单发给灾区看看", "灾区没吃上，至少知道宫里原本打算吃什么。", { treasury: 8, people: -3, happiness: -8 })
  ]),
  event("pleasure_002", "pleasure", "新宫殿图纸", "工部尚书", "新宫殿有九十九间暖阁，唯一缺点是国家只有一个国库。", ["享乐", "宫殿", "奢靡"], 9, [
    opt("修，朕要住进预算的尽头", "新宫殿动工，旧国家开始松动。", { happiness: 18, treasury: -24, corruption: 10, resentment: 8 }, { palaceBuilt: 1 }, "宫殿"),
    opt("缩小一半，快乐也可以打折", "工部失望，户部短暂复活。", { happiness: 8, treasury: -10, corruption: 4 }),
    opt("不修，把图纸挂起来解馋", "你看了三天图纸，省了二十万两。", { treasury: 8, happiness: -6, prestige: 2 })
  ]),
  event("pleasure_003", "pleasure", "春猎邀请", "羽林卫", "猎场已经清好，野兔表示自己对皇家活动毫无兴趣。", ["享乐", "打猎"], 7, [
    opt("去猎，朕要证明自己比兔子强", "你射中了树，树没有反抗。", { happiness: 12, prestige: 4, health: -3, treasury: -6 }),
    opt("带百官去，让他们跑一跑", "百官跑得很慢，弹劾写得很快。", { court: -3, happiness: 8, health: -2 }),
    opt("取消，兔子也有民心", "野兔保住了命，御膳房失去灵感。", { people: 3, happiness: -4, treasury: 3 })
  ]),
  event("pleasure_004", "pleasure", "巡游江南", "内务府总管", "江南风景好，账单也会写诗。", ["享乐", "巡游", "奢靡"], 8, [
    opt("巡，朕要体察好看的民情", "你看见烟雨，地方看见机会。", { happiness: 15, prestige: 6, treasury: -18, corruption: 8 }, {}, "奢靡"),
    opt("微服私访，少带点排场", "你成功发现百姓背后也会骂皇帝。", { people: 8, prestige: 4, happiness: 5, treasury: -8 }),
    opt("派画像去巡，省钱又有仪式", "地方官对着画像行礼，画像没有发现贪污。", { treasury: 6, prestige: -4, corruption: 5 })
  ]),
  event("pleasure_005", "pleasure", "奇珍异兽", "西域商人", "商人献上一只会点头的鸟，说它比部分官员更懂圣意。", ["享乐", "宠物", "奇珍"], 7, [
    opt("买，朕需要会点头的朋友", "鸟很快学会点头，也学会吃贡品。", { happiness: 10, treasury: -8, court: -2 }),
    opt("让鸟上朝试试", "鸟点了一早上头，大臣们感到职业危机。", { happiness: 8, court: -5, prestige: -3 }),
    opt("不买，朕已经有很多点头的", "商人走了，大臣们低头更熟练。", { treasury: 4, court: 2 })
  ]),
  event("pleasure_006", "pleasure", "酒池提案", "宠臣", "宠臣建议造酒池，说这样快乐会比较有深度。", ["享乐", "酒池", "奢靡"], 8, [
    opt("造，朕要在快乐里泡发", "酒池很香，国库很醒。", { happiness: 20, health: -8, treasury: -20, resentment: 6 }, { palaceBuilt: 1 }, "奢靡"),
    opt("改成小酒缸，浅尝亡国感", "快乐缩小了，户部活下来了。", { happiness: 8, health: -3, treasury: -6 }),
    opt("罚宠臣戒酒，建议太危险", "宠臣清醒了三天，痛苦得像忠臣。", { court: 4, prestige: 3, happiness: -3 })
  ]),
  event("pleasure_007", "pleasure", "戏班进宫", "梨园总管", "新戏讲昏君误国，戏班说纯属古代虚构。", ["享乐", "戏班"], 7, [
    opt("看，朕喜欢安全的讽刺", "你笑得最大声，史官记得最认真。", { happiness: 10, prestige: 2, court: 2 }),
    opt("改剧本，昏君必须悔改", "戏变正能量了，也变难看了。", { happiness: -3, prestige: 4, court: 3 }),
    opt("禁演，朕讨厌镜子", "戏班闭嘴了，民间开始传手抄本。", { happiness: 4, people: -5, resentment: 6 }, {}, "镇压")
  ]),
  event("pleasure_008", "pleasure", "宫中斗蛐蛐", "小太监", "小太监献上常胜蛐蛐，说它比朝廷更有战斗力。", ["享乐", "宠物", "太监"], 7, [
    opt("斗，朕要看看真正的军魂", "蛐蛐赢了，将军输了面子。", { happiness: 9, army: -3, eunuch: 4 }),
    opt("封它为将军，开个玩笑也要正式", "礼部差点真的写册文。", { happiness: 12, prestige: -5, court: -3 }),
    opt("让太监拿走，别让虫子参政", "太监收下时，表情像失去一个同僚。", { court: 3, eunuch: -2 })
  ])
];
