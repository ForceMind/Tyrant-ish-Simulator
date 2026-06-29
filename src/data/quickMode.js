export const QUICK_PARAM_GROUPS = [
  {
    key: "temper",
    title: "皇帝底色",
    description: "决定你这位皇帝先天像什么事故。",
    options: [
      {
        id: "lazy",
        title: "床榻治国",
        text: "朕负责睡，天下负责自转。",
        effects: { happiness: 18, court: -8, eunuch: 8 },
        tags: ["摆烂", "太监"]
      },
      {
        id: "diligent",
        title: "卷王登基",
        text: "朕不睡，六部也别想睡。",
        effects: { court: 16, people: 8, happiness: -10, health: -8 },
        tags: ["勤政", "改革"]
      },
      {
        id: "rich",
        title: "国库优先",
        text: "百姓的潜力，户部的简历。",
        effects: { treasury: 22, people: -12, resentment: 10 },
        tags: ["征税", "国库"]
      },
      {
        id: "immortal",
        title: "飞升预备",
        text: "治国只是副业，炼丹才是主线。",
        effects: { health: 6, treasury: -10, court: -5, mandate: 10 },
        tags: ["修仙", "天命"]
      }
    ]
  },
  {
    key: "policy",
    title: "施政习惯",
    description: "你处理问题的第一反应。",
    options: [
      {
        id: "benevolent",
        title: "先像个人",
        text: "百姓先喘口气，史官先不阴阳。",
        effects: { people: 12, prestige: 6, treasury: -8 },
        tags: ["仁政", "民生"]
      },
      {
        id: "iron",
        title: "铁拳提速",
        text: "解决问题之前，先解决吵闹声。",
        effects: { army: 15, people: -8, court: -4, resentment: 8 },
        tags: ["镇压", "军队"]
      },
      {
        id: "delegate",
        title: "授权专业人士",
        text: "太监总管说他很专业，尤其专业地不像奴才。",
        effects: { happiness: 10, eunuch: 16, court: -4 },
        tags: ["太监", "放权"]
      },
      {
        id: "pleasure",
        title: "快乐优先",
        text: "王朝会不会亡不知道，朕今天必须开心。",
        effects: { happiness: 20, treasury: -12, corruption: 8 },
        tags: ["享乐", "宫殿"]
      }
    ]
  },
  {
    key: "opening",
    title: "开局麻烦",
    description: "给史官一个起笔的坏消息。",
    options: [
      {
        id: "poor",
        title: "户部空碗",
        text: "国库穷得很有层次，连老鼠都开始节食。",
        effects: { treasury: -18, corruption: 4 },
        tags: ["国库", "征税"]
      },
      {
        id: "border",
        title: "边关漏风",
        text: "敌国来信问路，兵部假装没看懂。",
        effects: { army: -12, enemy: 16 },
        tags: ["外敌", "军队"]
      },
      {
        id: "harem",
        title: "后宫预热",
        text: "皇后笑得端庄，贵妃笑得像伏笔。",
        effects: { intrigue: 16, princeAmbition: 6 },
        tags: ["宫斗", "皇子"]
      },
      {
        id: "omen",
        title: "祥瑞太多",
        text: "地方连报三只白鹿，礼部怀疑有人批发。",
        effects: { mandate: 16, corruption: 6 },
        tags: ["天命", "修仙"]
      }
    ]
  },
  {
    key: "tempo",
    title: "推演速度",
    description: "决定这局快速版有多快把锅煮开。",
    options: [
      {
        id: "short",
        title: "六年速亡",
        text: "适合地铁两站，看完一个王朝自我介绍。",
        steps: 5,
        yearStep: 1,
        effects: { prestige: 4 },
        tags: ["短局"]
      },
      {
        id: "normal",
        title: "十年小传",
        text: "够写一卷实录，也够把小错拖成制度。",
        steps: 7,
        yearStep: 2,
        effects: {},
        tags: ["标准"]
      },
      {
        id: "chaos",
        title: "十二年加压",
        text: "史官开了倍速，户部开了止痛药。",
        steps: 8,
        yearStep: 2,
        effects: { enemy: 6, resentment: 6, corruption: 6 },
        tags: ["高压"]
      }
    ]
  }
];

export const QUICK_EVENTS = [
  {
    id: "quick_memorials",
    title: "奏折第一山",
    text: "登基第二天，奏折堆到窗户。太监说再高一点就能防刺客。",
    tags: ["勤政", "摆烂", "放权"],
    options: [
      {
        text: "朕亲自批，今天先像个人",
        response: "你批到三更，发现五本奏折都在争同一头牛的归属。",
        effects: { court: 10, people: 4, happiness: -8, health: -3 }
      },
      {
        text: "全部写知道了，主打情绪稳定",
        response: "天下第一次感受到一种非常敷衍的中央集权。",
        effects: { happiness: 8, court: -8, corruption: 5 }
      },
      {
        text: "让太监代批，朕信任流程",
        response: "太监总管学会了盖章，也学会了国家机密。",
        effects: { happiness: 10, eunuch: 14, court: -5 }
      }
    ]
  },
  {
    id: "quick_tax",
    title: "户部端来空碗",
    text: "户部尚书说国库还能撑三个月，再少一点就只能给官员发精神俸禄。",
    tags: ["国库", "征税", "享乐"],
    options: [
      {
        text: "加税，朕相信百姓还有隐藏余额",
        response: "户部尚书眼前一亮，百姓眼前一黑。",
        effects: { treasury: 22, people: -14, resentment: 14 }
      },
      {
        text: "宫里少点夜宵，朕先装三年节俭",
        response: "御膳房痛失预算，史官痛失讽刺素材。",
        effects: { treasury: 10, happiness: -8, prestige: 5 }
      },
      {
        text: "卖几个官位，反正他们迟早也贪",
        response: "新任县令们排队交钱，百姓开始排队搬家。",
        effects: { treasury: 26, corruption: 18, people: -6 }
      }
    ]
  },
  {
    id: "quick_flood",
    title: "河堤开始讲笑话",
    text: "黄河水位很有上进心，工部说河堤也很努力，只是努力方向不详。",
    tags: ["民生", "仁政", "征税"],
    options: [
      {
        text: "拨款修堤，钱没了可以再哭",
        response: "河堤稳住了，户部尚书的眼神塌了。",
        effects: { treasury: -18, people: 12, famine: -8, prestige: 6 }
      },
      {
        text: "让地方自筹，朕相信基层智慧",
        response: "地方很有智慧，第一步是把账本写得像天书。",
        effects: { corruption: 12, people: -6, famine: 8 }
      },
      {
        text: "办祈雨大典，流程比堤坝便宜",
        response: "雨没有停，礼部的仪式感倒是很满。",
        effects: { treasury: -5, mandate: 8, people: -8, famine: 10 }
      }
    ]
  },
  {
    id: "quick_border",
    title: "边关地图缩水",
    text: "兵部说敌军没有入侵，只是把国境线往里挪了一点，语气很委婉。",
    tags: ["外敌", "军队", "镇压"],
    options: [
      {
        text: "拨军饷，先让将军别写小作文",
        response: "将军终于不哭了，户部开始替他哭。",
        effects: { treasury: -14, army: 14, enemy: -10 }
      },
      {
        text: "御驾亲征，朕想体验边塞滤镜",
        response: "你刚到军营，士兵第一次觉得敌军不是最大风险。",
        effects: { prestige: 10, army: 6, health: -8, enemy: -4 }
      },
      {
        text: "先不管，万一敌军自己迷路呢",
        response: "敌军没有迷路，但兵部尚书开始怀疑人生。",
        effects: { enemy: 16, army: -8, happiness: 5 }
      }
    ]
  },
  {
    id: "quick_palace",
    title: "新宫殿很懂事",
    text: "工部呈上新宫殿图纸，说它不但好看，还特别能消耗国库。",
    tags: ["享乐", "宫殿", "腐败"],
    options: [
      {
        text: "修，盛世需要一个像样的背景板",
        response: "新宫殿拔地而起，旧民心缓缓躺平。",
        effects: { happiness: 16, prestige: 5, treasury: -22, resentment: 10, corruption: 8 }
      },
      {
        text: "先修半座，朕的节俭也要有排面",
        response: "半座宫殿像半句检讨，大家都知道后面还有。",
        effects: { happiness: 8, treasury: -10, corruption: 5 }
      },
      {
        text: "不修，把图纸裱起来当盛世",
        response: "工部沉默了，百姓忽然觉得皇帝今天挺像人。",
        effects: { people: 8, treasury: 8, happiness: -6 }
      }
    ]
  },
  {
    id: "quick_eunuch",
    title: "司礼监很主动",
    text: "太监总管说陛下万机劳神，奴才愿替陛下先劳一劳国家。",
    tags: ["太监", "放权", "摆烂"],
    options: [
      {
        text: "准了，朕要把快乐外包回来",
        response: "你得到了睡眠，太监总管得到了朝政说明书。",
        effects: { happiness: 14, eunuch: 18, court: -7 }
      },
      {
        text: "只许抄不许批，盖章离朕远点",
        response: "太监总管点头，袖子里的印泥显得很失落。",
        effects: { court: 6, eunuch: 4, happiness: -3 }
      },
      {
        text: "撤了他的椅子，站着反省权力",
        response: "司礼监开始低调，低调得像在记仇。",
        effects: { eunuch: -12, court: 5, intrigue: 6 }
      }
    ]
  },
  {
    id: "quick_alchemy",
    title: "国师端来新丹",
    text: "国师说此丹可延年益寿。太医看了一眼，开始给自己写遗书。",
    tags: ["修仙", "天命"],
    options: [
      {
        text: "丹来，朕要向天再借五百年",
        response: "你感觉浑身发热，可能是仙气，也可能是太医在烧病历。",
        effects: { happiness: 10, mandate: 10, health: -12, treasury: -8 }
      },
      {
        text: "让国师先吃，朕尊重研发流程",
        response: "国师吃完沉默很久，最后说飞升需要排队。",
        effects: { health: 4, mandate: -6, court: 4 }
      },
      {
        text: "炼丹炉改熬粥，先救活几个百姓",
        response: "百姓喝上了粥，国师失去了职业尊严。",
        effects: { people: 10, famine: -10, mandate: -8, treasury: -6 }
      }
    ]
  },
  {
    id: "quick_prince",
    title: "东宫提前懂事",
    text: "太子开始频繁问候龙体，语气孝顺得让太医后背发凉。",
    tags: ["皇子", "宫斗"],
    options: [
      {
        text: "给太子监国，年轻人要有实习机会",
        response: "太子接过奏折，眼神像提前看见了年终奖。",
        effects: { court: 8, princeAmbition: 16, prestige: -5 }
      },
      {
        text: "安排读书，先把野心塞进课本",
        response: "太傅讲到仁孝，太子认真记下了“时机”二字。",
        effects: { princeAmbition: -8, court: 4, treasury: -5 }
      },
      {
        text: "朕身体好得很，传太医来配合表演",
        response: "太医把脉后说龙体康健，手抖得像在写免责声明。",
        effects: { prestige: 5, health: -4, intrigue: 8 }
      }
    ]
  }
];

export const QUICK_ENDINGS = [
  {
    id: "quick_eunuch",
    title: "快速傀儡",
    condition: (run) => run.hidden.eunuch >= 75,
    evaluation: "你把流程交给了专业人士，专业人士顺手把你也流程化了。",
    posthumous: "速成九千岁体验版"
  },
  {
    id: "quick_immortal",
    title: "飞升排队失败",
    condition: (run) => run.meta.health <= 20 && run.hidden.mandate >= 45,
    evaluation: "你追求长生，成功把等待时间压缩得很短。",
    posthumous: "求仙短帝"
  },
  {
    id: "quick_fallen",
    title: "速通亡国",
    condition: (run) => run.stats.people <= 20 && (run.stats.army <= 25 || run.hidden.enemy >= 70),
    evaluation: "王朝像一张没保存的表格，关得很快，丢得很全。",
    posthumous: "开局崩帝"
  },
  {
    id: "quick_vault",
    title: "国库很满，街上很空",
    condition: (run) => run.stats.treasury >= 82 && run.stats.people <= 28,
    evaluation: "户部很幸福，百姓很抽象，国家很像一只上锁的钱箱。",
    posthumous: "暴富财帝"
  },
  {
    id: "quick_happy",
    title: "极乐样板间",
    condition: (run) => run.stats.happiness >= 85 && run.stats.people <= 35,
    evaluation: "你很快乐。除了国家、百姓、大臣和祖宗，大家都替你难过。",
    posthumous: "快乐先帝"
  },
  {
    id: "quick_worker",
    title: "社畜皇帝试用装",
    condition: (run) => run.stats.court >= 75 && run.stats.people >= 65 && run.meta.health <= 35,
    evaluation: "你把国家治理得像样，把自己治理得不太像活人。",
    posthumous: "勤政卷帝"
  },
  {
    id: "quick_wise",
    title: "小型明君",
    condition: (run) => Object.values(run.stats).every((value) => value >= 58) && run.meta.health >= 45,
    evaluation: "你没有完全离谱。史官写到这里，甚至有点不适应。",
    posthumous: "体验版明君"
  },
  {
    id: "quick_absurd",
    title: "荒唐但能凑合",
    condition: () => true,
    evaluation: "国家没好到哪去，也没坏到立刻换朝。史官称之为：还能再观察两集。",
    posthumous: "凑合帝"
  }
];

