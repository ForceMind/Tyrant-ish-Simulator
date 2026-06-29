import { event, opt } from "./_helpers.js";

export const bombEvents = [
  {
    ...event("bomb_resentment", "bomb", "揭竿而起", "史官", "百姓终于发现，锄头除了种地，也可以换个用法。", ["爆雷", "起义", "民怨"], 20, [
      opt("镇压，先让锄头回地里", "军队出发了，百姓更多了。", { army: -20, people: -15, resentment: -18, prestige: -6 }, { uprisingCount: 1 }, "镇压"),
      opt("赈灾，迟来的饭也算饭", "迟来的仁政像凉掉的饭，能吃，但噎人。", { treasury: -30, people: 12, resentment: -25 }, { uprisingCount: 1 }),
      opt("罪己诏，朕先认错但不退款", "百姓说：知道了，钱呢？", { prestige: -10, people: 8, resentment: -14 }, { uprisingCount: 1 })
    ], { resentmentMin: 80 }),
    bombKey: "resentment"
  },
  {
    ...event("bomb_eunuch", "bomb", "九千岁", "太监总管", "太监总管说话越来越像皇帝，皇帝说话越来越像吉祥物。", ["爆雷", "太监", "朝堂"], 20, [
      opt("夺权，朕要把章抢回来", "你抢到了玉玺，发现流程已经被他抢走了。", { eunuch: -22, court: -10, prestige: 5, happiness: -6 }),
      opt("继续托付，专业的人做专业的祸", "太监总管笑得很谦卑，权力笑得很大声。", { eunuch: 12, happiness: 10, court: -8 }, { eunuchDelegations: 1 }, "太监"),
      opt("扶持外臣制衡，宫里也要搞平衡木", "外臣和太监互咬，朝廷像菜市场。", { eunuch: -10, court: -5, corruption: 8 })
    ], { eunuchMin: 80 }),
    bombKey: "eunuch"
  },
  {
    ...event("bomb_intrigue", "bomb", "后宫着火", "太医", "贵妃说是蜡烛倒了，皇后说是天意，太医说他什么都没看见。", ["爆雷", "宫斗", "后宫"], 18, [
      opt("严查，蜡烛也得招供", "后宫安静得像坟，人人都在等下一支蜡烛。", { intrigue: -22, happiness: -8, prestige: 4 }),
      opt("偏袒皇后，秩序先有主角", "皇后赢了，其他人开始改写战术。", { intrigue: 8, court: 3, happiness: -3 }),
      opt("和稀泥，宫里不能缺泥", "火灭了，烟还在每个人心里。", { intrigue: -6, prestige: -5, happiness: 5 })
    ], { intrigueMin: 80 }),
    bombKey: "intrigue"
  },
  {
    ...event("bomb_enemy", "bomb", "边关失守", "边关急使", "敌军没有打进来，他们只是把国境线往里挪了三百里。", ["爆雷", "外敌", "边疆"], 20, [
      opt("御驾亲征，朕要亲自迷路", "士气确实振了，太医也振了。", { enemy: -20, army: 6, health: -12, treasury: -20, prestige: 8 }),
      opt("调兵回援，京城先别装睡", "兵到了，钱没了，敌军退得很不甘心。", { enemy: -18, army: -10, treasury: -18 }),
      opt("割地求和，地图也可以瘦身", "敌军满意了，祖宗沉默了。", { enemy: -12, prestige: -18, mandate: -10 })
    ], { enemyMin: 80 }),
    bombKey: "enemy"
  },
  {
    ...event("bomb_corruption", "bomb", "满朝都是手", "御史大夫", "御史说贪腐已经不是风气，是天气。", ["爆雷", "腐败", "朝堂"], 18, [
      opt("反腐风暴，先从会哭的查起", "官场开始刮风，奏折开始变薄。", { corruption: -24, court: -8, treasury: 8, prestige: 5 }),
      opt("罚酒三杯，大家懂点分寸", "大家懂了，分寸大概值三杯酒。", { corruption: 8, treasury: 6, prestige: -6 }, {}, "腐败"),
      opt("加俸养廉，朕相信钱能劝人", "清廉没养出来，胃口养大了。", { treasury: -18, corruption: -8, court: 4 })
    ], { corruptionMin: 80 }),
    bombKey: "corruption"
  },
  {
    ...event("bomb_famine", "bomb", "饿殍上书", "地方知府", "灾民说不求见圣颜，只求见一口饭。", ["爆雷", "饥荒", "民生"], 18, [
      opt("大赈，粮比脸面重要", "粮车到了，百姓暂时不骂了。", { famine: -25, treasury: -28, people: 16, resentment: -8 }),
      opt("借粮于豪强，朕先借他们的良心", "豪强借了粮，也借机要了地。", { famine: -15, corruption: 10, people: 6 }),
      opt("迁民就食，人在路上就不算饿在原地", "路上有饭也有泪，地方官有借口。", { famine: -8, people: -6, resentment: 8, treasury: -8 })
    ], { famineMin: 80 }),
    bombKey: "famine"
  },
  {
    ...event("bomb_disease", "bomb", "病气入宫", "太医令", "瘟气终于走到宫门口，守卫说它没有通行牌但很有耐心。", ["爆雷", "疾病", "瘟疫"], 18, [
      opt("封宫封城，先让病也上不了朝", "京城骂声很大，病势小了一点。", { disease: -24, people: -8, happiness: -6, treasury: -12 }),
      opt("广发药材，别让太医只会摇头", "药铺忙起来，太医终于像太医。", { disease: -18, treasury: -20, people: 10 }),
      opt("吃丹防病，朕要用玄学免疫", "丹药很热，脉象很乱。", { disease: 8, health: -12, mandate: 6 }, { alchemyCount: 1, consecutivePills: 1 }, "炼丹")
    ], { diseaseMin: 80 }),
    bombKey: "disease"
  },
  {
    ...event("bomb_prince", "bomb", "东宫夜开门", "禁军统领", "太子的人马半夜入宫，说是来看望父皇，刀也很孝顺。", ["爆雷", "皇子", "宫斗"], 18, [
      opt("废太子，孝心太锋利了", "太子没了名分，宫里多了暗流。", { princeAmbition: -30, intrigue: 12, prestige: -6 }),
      opt("立刻禅位，朕主打体面退休", "你退得很快，史官写得更快。", { prestige: -20, princeAmbition: -10, happiness: -8 }),
      opt("父子谈判，刀先放门外", "谈判成功一半，另一半在互相记仇。", { princeAmbition: -12, intrigue: 6, court: -3 })
    ], { princeAmbitionMin: 80 }),
    bombKey: "princeAmbition"
  }
];
