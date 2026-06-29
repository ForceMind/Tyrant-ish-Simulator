import { event, opt } from "./_helpers.js";

export const courtEvents = [
  event("court_001", "court", "奏折堆成山", "太监总管", "太监说奏折已经堆到窗户了，再高一点就能挡住刺客。", ["朝堂", "奏折"], 10, [
    opt("认真批阅，朕今天像个人", "你批到半夜，发现三本奏折都在问同一头牛归谁。", { court: 10, people: 5, happiness: -8, health: -2 }),
    opt("全部写知道了", "天下第一次感受到一种非常敷衍的中央集权。", { happiness: 8, court: -8, corruption: 6 }, {}, "摆烂"),
    opt("让太监代批", "太监总管学会了盖章，也学会了国家机密。", { happiness: 12, court: -5, eunuch: 12 }, { eunuchDelegations: 1 }, "太监")
  ]),
  event("court_002", "court", "早朝像刑罚", "礼部侍郎", "大臣们五更就站在殿外，表情像被祖宗催更。", ["朝堂", "不上朝"], 9, [
    opt("上朝，给大家一点皇帝震撼", "你讲了半个时辰，大臣们确认陛下真的醒了。", { court: 8, prestige: 4, happiness: -6 }),
    opt("罢朝，朕与被窝议政", "被窝很支持你，六部不太支持。", { happiness: 10, court: -9, eunuch: 5 }, { noCourtStreak: 1 }, "摆烂"),
    opt("远程听政，让屏风替朕有威严", "屏风站得很直，比你更像明君。", { court: 2, happiness: 4, prestige: -3 })
  ]),
  event("court_003", "court", "忠臣撞柱预备", "御史大夫", "御史说若陛下再修偏殿，他就要用脑门给祖制盖章。", ["朝堂", "忠臣", "弹劾"], 8, [
    opt("听劝，先把偏殿改成仓库", "御史愣住了，准备好的遗言突然失业。", { court: 8, people: 5, prestige: 5, happiness: -5 }),
    opt("拖出去冷静，柱子也要休息", "忠臣被拖走时还在背祖训，侍卫背得比他熟。", { court: -8, prestige: -7, corruption: 7 }, { loyalKilled: 1 }, "镇压"),
    opt("赏他一面软垫柱", "御史沉默了，朝堂第一次讨论安全生产。", { happiness: 6, court: 3, prestige: -2 })
  ]),
  event("court_004", "court", "改革像拔牙", "吏部尚书", "新法刚贴出去，旧官僚已经开始装不识字。", ["朝堂", "改革"], 8, [
    opt("硬推新法，朕的牙也疼", "吏治开始变清，官员开始变瘦。", { court: 12, people: 6, corruption: -10, happiness: -8, health: -2 }),
    opt("先开研讨会，研究到没人记得", "会议纪要厚得能垫桌脚，新法薄得像良心。", { court: -3, happiness: 5, corruption: 5 }, {}, "摆烂"),
    opt("让奸臣负责反腐", "他点头很快，像看见一片新牧场。", { court: -6, treasury: 8, corruption: 12 }, {}, "腐败")
  ]),
  event("court_005", "court", "奸臣献策", "中书令", "中书令说只要把坏消息改名叫祥瑞，天下就太平了一半。", ["朝堂", "奸臣", "祥瑞"], 8, [
    opt("采纳，朕喜欢会包装的现实", "灾报换了红封皮，百姓没换肚子。", { prestige: 5, court: -6, mandate: 8, resentment: 6 }, {}, "天命"),
    opt("让他去管仓库，少管脑子", "奸臣去了仓库，仓库很快学会消失。", { treasury: -8, corruption: 10, court: -3 }, {}, "腐败"),
    opt("当众驳回，顺便夸自己清醒", "群臣鼓掌很用力，像在给自己续命。", { court: 7, prestige: 6, happiness: 3 })
  ]),
  event("court_006", "court", "六部互踢皮球", "工部尚书", "河堤、军饷、赈灾都在路上，主要是责任在路上。", ["朝堂", "推诿"], 7, [
    opt("把球踢回去，谁误事谁背锅", "六部第一次跑得像边军急报。", { court: 9, prestige: 4, happiness: -4 }),
    opt("设第七部专门管皮球", "新部门成立当天，就请求再成立一个协调司。", { court: -8, treasury: -5, corruption: 8 }, {}, "腐败"),
    opt("让他们抽签，天命决定背锅人", "被抽中的尚书看着签，像看见祖坟冒烟。", { mandate: 5, court: 2, prestige: -4 })
  ]),
  event("court_007", "court", "密报满天飞", "锦衣校尉", "校尉说朝中有人结党，名单长得像官员通讯录。", ["朝堂", "酷吏"], 7, [
    opt("细查，不冤枉一个坏人", "查到最后，连查案的人也被查得很感动。", { court: 4, corruption: -6, happiness: -5, intrigue: 4 }),
    opt("全抓了，省得朕做阅读理解", "牢房不够用了，朝堂空旷得适合跳舞。", { court: -15, prestige: -8, resentment: 10 }, { loyalKilled: 1 }, "镇压"),
    opt("先压下，朕讨厌同事关系学", "党羽没有消失，只是学会了小声结党。", { happiness: 6, intrigue: 9, corruption: 5 }, {}, "摆烂")
  ]),
  event("court_008", "court", "祖制突然显灵", "太庙令", "太庙令说祖宗托梦，梦里主要是骂你预算超支。", ["朝堂", "祖制", "天命"], 7, [
    opt("祭告祖宗，顺便认个小错", "祖宗没有回话，但香火费很快报销了。", { prestige: 6, mandate: 4, treasury: -4 }),
    opt("祖宗懂什么新经济", "太庙安静了，钦天监不安静了。", { happiness: 8, mandate: -8, prestige: -6 }),
    opt("把祖制装订成册发给六部", "官员们开始用祖制互相攻击，效率意外提高。", { court: 6, happiness: -3, corruption: -3 })
  ])
];
