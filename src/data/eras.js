export const ERA_LIST = [
  {
    id: "moyu",
    name: "摸鱼",
    description: "国可一日无君，朕不可一日无床。",
    effects: { happiness: 20, court: -10, eunuch: 5 },
    tagWeights: { 不上朝: 8, 太监: 6, 奏折: 4, 摆烂: 5 },
    accession: "新帝改元摸鱼。群臣本以为这是谦词，直到皇帝连续三天没出寝宫。"
  },
  {
    id: "yongle",
    name: "永乐",
    description: "听起来很像盛世，其实主要是朕很快乐。",
    effects: { happiness: 15, treasury: 5, people: -5 },
    tagWeights: { 宴会: 6, 宫殿: 6, 巡游: 5, 奢靡: 4 },
    accession: "新帝改元永乐。礼部说名字吉祥，户部说预算不祥。"
  },
  {
    id: "kaibai",
    name: "开摆",
    description: "开国是不可能开国的，开摆倒是可以。",
    effects: { happiness: 25, army: -10, court: -10, health: 5 },
    tagWeights: { 摆烂: 8, 外敌: 5, 不上朝: 6, 边疆: 4 },
    accession: "新帝改元开摆。太庙香还没灭，政务已经开始自主离职。"
  },
  {
    id: "tianming",
    name: "天命",
    description: "朕不是错了，是天命还没理解朕。",
    effects: { court: 10, corruption: 8, mandate: 10 },
    tagWeights: { 祥瑞: 7, 奸臣: 5, 灾异: 6, 天命: 5 },
    accession: "新帝改元天命。钦天监连夜翻书，努力证明昨天的乌鸦叫得很吉利。"
  },
  {
    id: "baofu",
    name: "暴富",
    description: "国库要满，百姓先忍忍。",
    effects: { treasury: 25, people: -15, resentment: 8 },
    tagWeights: { 征税: 9, 卖官: 7, 民怨: 6, 国库: 5 },
    accession: "新帝改元暴富。户部尚书跪得很快，百姓的钱袋凉得更快。"
  },
  {
    id: "qiuxian",
    name: "求仙",
    description: "朕的目标不是治国，是飞升。",
    effects: { health: 5, treasury: -10, court: -5, mandate: 5 },
    tagWeights: { 炼丹: 9, 道士: 7, 祥瑞: 5, 暴毙: 4 },
    accession: "新帝改元求仙。群臣准备治国，道士准备报价，太医准备免责。"
  },
  {
    id: "qinzheng",
    name: "勤政",
    description: "每天只睡三个时辰，卷死整个朝廷。",
    effects: { court: 20, people: 10, happiness: -15, health: -10 },
    tagWeights: { 改革: 8, 忠臣: 6, 过劳: 6, 奏折: 4 },
    accession: "新帝改元勤政。第一天批了九百本奏折，第二天太医先递了辞呈。"
  },
  {
    id: "tiequan",
    name: "铁拳",
    description: "解决不了问题，就解决提出问题的人。",
    effects: { army: 20, people: -10, court: -5, prestige: 5 },
    tagWeights: { 镇压: 8, 酷吏: 7, 叛乱: 5, 军队: 5 },
    accession: "新帝改元铁拳。御史台集体安静，连咳嗽都先写奏折申请。"
  }
];
