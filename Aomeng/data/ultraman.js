const ultramanList = [
  {
    id: 1,
    key: "tiga",
    name: "迪迦奥特曼",
    image: "https://static.wikia.nocookie.net/ultra/images/3/38/UltramanTiga.png",
    description: "能够在强大、敏捷、全能形态之间自由切换，拥有强大的战斗能力",
    features: ["形态切换", "光线技能", "格斗技能"],
    power: "25000 t",
    speed: "1593 km/h",
    defense: "未知",
    height: "900 m",
    weight: "100000 t",
    skills: ["哉佩利敖光线", "定格光线", "计时器闪光"],
    personality: "坚毅、勇敢、充满希望",
    classicQuotes: ["人类的光芒比任何光芒都要璀璨！", "只要心中有光，黑暗就永远无法战胜我们！"],
    emotionalStory: "大古与迪迦的羁绊，展现了人类与奥特曼并肩作战的感人故事。在最终决战中，全人类的信念之光让迪迦重获新生。",
    nostalgiaIndex: 95,
    friendlinessIndex: 90,
    kidInteraction: {
      challenge: "尝试模仿迪迦的变身动作",
      quiz: "你知道迪迦有几种形态吗？",
      funFact: "迪迦的计时器闪烁是在提醒我们要珍惜时间哦！",
      quiz: {
        question: "迪迦奥特曼变身时需要使用什么？",
        options: ["神光棒", "变身器", "火花棱镜", "beta胶囊"],
        answer: 2
      }
    },
    memorableScenes: [
      {
        title: "人类的光芒",
        description: "在最终之战中，全人类的信念之光让迪迦重获新生，展现了人类的无限可能。",
        emotion: "希望",
        year: 1996
      },
      {
        title: "永不言弃",
        description: "即使在最困难的时候，迪迦也从未放弃过对和平的追求。",
        emotion: "勇气",
        year: 1996
      },
      {
        year: "1996",
        title: "光的传承",
        description: "大古在远古遗迹中接受迪迦的光，成为新的迪迦奥特曼的感人时刻。",
        emotion: "希望"
      },
      {
        year: "1997",
        title: "最后的微笑",
        description: "在与邪神加坦杰厄的最终决战中，迪迦靠着全人类的光获得胜利。",
        emotion: "勇气"
      }
    ],
    growthLessons: [
      {
        title: "相信自己",
        content: "就像大古相信自己能够成为光一样，每个人都应该相信自己的潜力。"
      },
      {
        title: "团结就是力量",
        content: "只有团结一心，才能创造奇迹，战胜困难。"
      },
      {
        title: "永不放弃的精神",
        content: "即使面对强大的对手，也要坚持到底，相信光明终将战胜黑暗。"
      },
      {
        title: "团结的力量",
        content: "只有团结一心，才能创造奇迹，就像人类的光最终帮助迪迦战胜了最强大的敌人。"
      }
    ],
    interactiveMessages: [
      "你也有属于自己的光芒！",
      "永远不要放弃希望！",
      "相信自己，你也可以成为别人的光！",
      "你相信光吗？每个人心中都有属于自己的光芒！",
      "不要害怕失败，重要的是永不放弃的心！",
      "让我们一起守护这美丽的地球吧！"
    ]
  },
  {
    id: 2,
    key: "seven",
    name: "赛文奥特曼",
    image: "https://static.wikia.nocookie.net/ultra/images/3/39/Ultraseven_awsome.png",
    description: "来自M78星云的警备队队员，擅长使用眼镜光线和冰斧",
    features: ["格斗专家", "冷冻技能", "飞行能力"],
    power: "50000 t",
    speed: "800 km/h",
    defense: "未知",
    height: "400 m",
    weight: "35000 t",
    skills: ["眼镜光线", "冰斧投掷", "环形光线"],
    personality: "正义感强、严谨、富有责任心",
    classicQuotes: ["为了守护和平，赛文永不言弃！", "正义必将战胜邪恶！"],
    emotionalStory: "为了保护地球，赛文放弃了自己的一只眼睛，却获得了更强大的力量。他教会了人类团结与勇气的重要性。",
    nostalgiaIndex: 92,
    friendlinessIndex: 85,
    kidInteraction: {
      challenge: "学习赛文的经典战斗姿势",
      quiz: "赛文最标志性的武器是什么？",
      funFact: "赛文的眼镜是因为受伤后变成的，告诉我们要勇敢面对困难！"
    },
    memorableScenes: [
      {
        title: "守护和平",
        description: "赛文为了保护地球，放弃了自己的一只眼睛，展现了他对和平的坚定信念。",
        emotion: "勇气",
        year: 1967
      },
      {
        title: "正义必胜",
        description: "赛文的正义感和责任心，让他在面对邪恶时从未退缩。",
        emotion: "正义",
        year: 1967
      }
    ],
    growthLessons: [
      {
        title: "勇敢面对困难",
        content: "就像赛文勇敢面对自己的伤痛一样，我们也应该勇敢面对自己的困难。"
      },
      {
        title: "责任感",
        content: "赛文的责任感让他保护了地球，我们也应该对自己的责任感负责。"
      }
    ],
    interactiveMessages: [
      "你也可以成为守护者！",
      "永远不要放弃正义！",
      "勇敢面对困难，你会变得更强大！"
    ]
  },
  {
    id: 3,
    key: "taro",
    name: "泰罗奥特曼",
    image: "https://static.wikia.nocookie.net/ultra/images/3/39/Taro_Info.png",
    description: "奥特兄弟中最强的战士之一，拥有超强的光线技能",
    features: ["光线技能", "力量强大", "变身能力"],
    power: "58000 t",
    speed: "1240 km/h",
    defense: "未知",
    height: "600 m",
    weight: "55000 t",
    skills: ["斯特利姆光线", "超级八十光线", "泰罗飞踢"],
    personality: "智慧、勇敢、富有责任心",
    classicQuotes: ["为了保护地球，泰罗永不放弃！", "光线的力量将点亮未来！"],
    emotionalStory: "泰罗的故事告诉我们，智慧和勇敢可以战胜任何困难。他与人类的友谊也让我们看到，奥特曼和人类可以携手并进。",
    nostalgiaIndex: 95,
    friendlinessIndex: 92,
    kidInteraction: {
      challenge: "学习泰罗的光线技能",
      quiz: "泰罗最强大的技能是什么？",
      funFact: "泰罗的超级八十光线是他最强大的技能之一，告诉我们要勇敢面对挑战！"
    },
    memorableScenes: [
      {
        title: "保护地球",
        description: "泰罗为了保护地球，展现了他对地球的热爱和责任感。",
        emotion: "热爱",
        year: 1973
      },
      {
        title: "光线的力量",
        description: "泰罗的光线技能，让他在面对黑暗时从未退缩。",
        emotion: "勇气",
        year: 1973
      }
    ],
    growthLessons: [
      {
        title: "保护地球",
        content: "就像泰罗保护地球一样，我们也应该保护自己的地球和环境。"
      },
      {
        title: "勇敢面对黑暗",
        content: "泰罗的勇敢和正义感，让他在面对黑暗时从未退缩，我们也应该勇敢面对自己的黑暗。"
      }
    ],
    interactiveMessages: [
      "你也可以保护地球！",
      "永远不要放弃正义！",
      "勇敢面对黑暗，你会变得更强大！"
    ]
  },
  {
    id: 4,
    key: "zero",
    name: "赛罗奥特曼",
    image: "https://static.wikia.nocookie.net/ultra/images/3/33/Zero_profil_I.png",
    description: "赛文奥特曼的儿子，光之国最年轻的战士，拥有强大的战斗能力",
    features: ["光线技能", "格斗技巧", "飞行能力"],
    power: "230000 t",
    speed: "10622 km/h",
    defense: "未知",
    height: "54 m",
    weight: "55000 t",
    skills: ["集束光线", "零式飞踢", "等离子火花斩"],
    personality: "勇敢、正义感强、充满活力",
    classicQuotes: ["为了守护和平，赛罗永不言弃！", "光之国的未来由我来守护！"],
    emotionalStory: "赛罗的故事告诉我们，年轻一代也可以肩负起保护世界的重任。他与人类的友谊展现了新一代奥特曼的成长。",
    nostalgiaIndex: 88,
    friendlinessIndex: 92,
    kidInteraction: {
      challenge: "学习赛罗的经典战斗姿势",
      quiz: "赛罗最标志性的武器是什么？",
      funFact: "赛罗的零式飞踢是他最强大的技能之一，告诉我们要勇敢面对挑战！"
    },
    memorableScenes: [
      {
        title: "守护未来",
        description: "赛罗为了保护光之国的未来，展现了他对和平的坚定信念。",
        emotion: "勇气",
        year: 2010
      },
      {
        title: "正义必胜",
        description: "赛罗的正义感和责任心，让他在面对邪恶时从未退缩。",
        emotion: "正义",
        year: 2010
      }
    ],
    growthLessons: [
      {
        title: "勇敢面对困难",
        content: "就像赛罗勇敢面对自己的挑战一样，我们也应该勇敢面对自己的困难。"
      },
      {
        title: "责任感",
        content: "赛罗的责任感让他保护了光之国，我们也应该对自己的责任感负责。"
      }
    ],
    interactiveMessages: [
      "你也可以成为守护者！",
      "永远不要放弃正义！",
      "勇敢面对困难，你会变得更强大！"
    ]
  },
  {
    id: 5,
    key: "noa",
    name: "诺亚奥特曼",
    image: "https://static.wikia.nocookie.net/ultra/images/f/f8/Ultraman_Noa_Info.png",
    description: "传说中的光之巨人，拥有最强大的力量",
    features: ["超强光线", "瞬间移动", "能量转换"],
    power: "250000 t",
    speed: "28679 km/h",
    defense: "未知",
    height: "10000 m",
    weight: "55000 t",
    skills: ["诺亚闪电", "诺亚光波", "诺亚屏障"],
    personality: "神秘、强大、充满智慧",
    classicQuotes: ["光之力量，永存不灭！", "为了宇宙的和平！"],
    emotionalStory: "诺亚的故事告诉我们，真正的力量来自于内心的光明。他的存在象征着希望与和平。",
    nostalgiaIndex: 95,
    friendlinessIndex: 85,
    kidInteraction: {
      challenge: "学习诺亚的经典战斗姿势",
      quiz: "诺亚最强大的技能是什么？",
      funFact: "诺亚的诺亚闪电是他最强大的技能之一，告诉我们要相信光的力量！"
    },
    memorableScenes: [
      {
        title: "光之力量",
        description: "诺亚展现了他最强大的力量，保护了宇宙的和平。",
        emotion: "希望",
        year: 2004
      },
      {
        title: "和平守护者",
        description: "诺亚的正义感和责任心，让他在面对黑暗时从未退缩。",
        emotion: "正义",
        year: 2004
      }
    ],
    growthLessons: [
      {
        title: "相信光明",
        content: "就像诺亚相信光的力量一样，我们也应该相信内心的光明。"
      },
      {
        title: "守护和平",
        content: "诺亚的责任感让他保护了宇宙，我们也应该为和平贡献自己的力量。"
      }
    ],
    interactiveMessages: [
      "相信光的力量！",
      "永远不要放弃希望！",
      "让我们一起守护和平！"
    ]
  },
  {
    id: 6,
    key: "geed",
    name: "捷德奥特曼",
    image: "https://static.wikia.nocookie.net/ultra/images/3/39/Img_top_chara_02.png",
    description: "贝利亚之子，拥有强大的战斗能力",
    features: ["形态切换", "光线技能", "格斗技巧"],
    power: "100000 t",
    speed: "6373 km/h",
    defense: "未知",
    height: "1200 m",
    weight: "43000 t",
    skills: ["捷德光线", "捷德飞踢", "捷德屏障"],
    personality: "勇敢、正义感强、充满活力",
    classicQuotes: ["为了守护和平，捷德永不言弃！", "光之力量，永存不灭！"],
    emotionalStory: "捷德的故事告诉我们，即使出身黑暗，也可以选择光明。他的成长展现了正义的力量。",
    nostalgiaIndex: 85,
    friendlinessIndex: 90,
    kidInteraction: {
      challenge: "学习捷德的经典战斗姿势",
      quiz: "捷德最标志性的武器是什么？",
      funFact: "捷德的捷德光线是他最强大的技能之一，告诉我们要勇敢面对挑战！"
    },
    memorableScenes: [
      {
        title: "光之力量",
        description: "捷德展现了他最强大的力量，保护了地球的和平。",
        emotion: "希望",
        year: 2017
      },
      {
        title: "和平守护者",
        description: "捷德的正义感和责任心，让他在面对黑暗时从未退缩。",
        emotion: "正义",
        year: 2017
      }
    ],
    growthLessons: [
      {
        title: "相信光明",
        content: "就像捷德相信光的力量一样，我们也应该相信内心的光明。"
      },
      {
        title: "守护和平",
        content: "捷德的责任感让他保护了地球，我们也应该为和平贡献自己的力量。"
      }
    ],
    interactiveMessages: [
      "相信光的力量！",
      "永远不要放弃希望！",
      "让我们一起守护和平！"
    ]
  },
  {
    id: 7,
    key: "agul",
    name: "阿古茹奥特曼",
    image: "https://static.wikia.nocookie.net/ultra/images/1/1e/Ultraman_Agul_V2.png",
    description: "海洋的守护者，拥有强大的水属性能力",
    features: ["水属性技能", "格斗技巧", "飞行能力"],
    power: "90000 t",
    speed: "7860 km/h",
    defense: "未知",
    height: "1300 m",
    weight: "46000 t",
    skills: ["阿古茹光线", "海洋冲击波", "水之屏障"],
    personality: "冷静、正义感强、富有责任感",
    classicQuotes: ["为了守护海洋的和平！", "水的力量将净化一切！"],
    emotionalStory: "阿古茹的故事告诉我们，保护环境的重要性。他与海洋的羁绊展现了守护者的责任。",
    nostalgiaIndex: 85,
    friendlinessIndex: 80,
    kidInteraction: {
      challenge: "学习阿古茹的经典战斗姿势",
      quiz: "阿古茹最标志性的技能是什么？",
      funFact: "阿古茹的水之屏障是他最强大的防御技能之一，告诉我们要保护环境！"
    },
    memorableScenes: [
      {
        title: "海洋守护者",
        description: "阿古茹为了保护海洋，展现了他对环境的责任感。",
        emotion: "责任",
        year: 1998
      }
    ],
    growthLessons: [
      {
        title: "保护环境",
        content: "就像阿古茹保护海洋一样，我们也应该保护我们的环境。"
      }
    ],
    interactiveMessages: [
      "让我们一起保护海洋！",
      "水的力量将净化一切！",
      "为了地球的未来！"
    ]
  },
  {
    id: 8,
    key: "blu",
    name: "布鲁奥特曼",
    image: "https://static.wikia.nocookie.net/ultra/images/d/df/Ultraman_Blu.png",
    description: "光之国的年轻战士，擅长格斗技巧",
    features: ["格斗技巧", "光线技能", "飞行能力"],
    power: "47000 t",
    speed: "1593 km/h",
    defense: "未知",
    height: "680 m",
    weight: "43000 t",
    skills: ["布鲁光线", "布鲁飞踢", "布鲁屏障"],
    personality: "热情、勇敢、充满活力",
    classicQuotes: ["为了光之国的未来！", "让我们并肩作战！"],
    emotionalStory: "布鲁的故事展现了年轻一代的成长，他用自己的方式守护着和平。",
    nostalgiaIndex: 80,
    friendlinessIndex: 90,
    kidInteraction: {
      challenge: "学习布鲁的经典战斗姿势",
      quiz: "布鲁最擅长的技能是什么？",
      funFact: "布鲁的飞踢技能告诉我们要勇敢面对挑战！"
    },
    memorableScenes: [
      {
        title: "年轻的力量",
        description: "布鲁展现了他作为年轻战士的勇气和决心。",
        emotion: "勇气",
        year: 2018
      }
    ],
    growthLessons: [
      {
        title: "勇敢成长",
        content: "就像布鲁一样，我们也要勇敢地面对成长中的挑战。"
      }
    ],
    interactiveMessages: [
      "让我们一起成长！",
      "永远不要放弃希望！",
      "为了光之国的未来！"
    ]
  },
  {
    id: 9,
    key: "chuck",
    name: "查克奥特曼",
    image: "https://static.wikia.nocookie.net/ultra/images/3/3a/Ultraman_Chuck.png",
    description: "来自U40星云的战士，拥有强大的力量",
    features: ["力量强大", "光线技能", "格斗技巧"],
    power: "95000 t",
    speed: "6373 km/h",
    defense: "未知",
    height: "1300 m",
    weight: "68000 t",
    skills: ["查克光线", "查克飞踢", "查克屏障"],
    personality: "豪爽、正义感强、富有责任感",
    classicQuotes: ["为了U40的荣耀！", "力量就是正义！"],
    emotionalStory: "查克的故事告诉我们，真正的力量来自于内心的正义。",
    nostalgiaIndex: 85,
    friendlinessIndex: 85,
    kidInteraction: {
      challenge: "学习查克的经典战斗姿势",
      quiz: "查克最强大的技能是什么？",
      funFact: "查克的力量告诉我们，正义终将战胜邪恶！"
    },
    memorableScenes: [
      {
        title: "力量与正义",
        description: "查克展现了他强大的力量和坚定的正义感。",
        emotion: "正义",
        year: 1971
      }
    ],
    growthLessons: [
      {
        title: "正义的力量",
        content: "就像查克一样，我们要用正义的力量保护他人。"
      }
    ],
    interactiveMessages: [
      "为了正义而战！",
      "力量就是正义！",
      "让我们一起守护和平！"
    ]
  },
  {
    id: 10,
    key: "fuma",
    name: "风马奥特曼",
    image: "https://static.wikia.nocookie.net/ultra/images/8/82/Ultraman_Fuma_Info.png",
    description: "风之战士，拥有超快的速度和敏捷的身手",
    features: ["速度极快", "风属性技能", "格斗技巧"],
    power: "28000 t",
    speed: "6373 km/h",
    defense: "未知",
    height: "900 m",
    weight: "25000 t",
    skills: ["风马光线", "风之飞踢", "风之屏障"],
    personality: "敏捷、机智、充满活力",
    classicQuotes: ["风的速度将带来胜利！", "为了和平而战！"],
    emotionalStory: "风马的故事展现了速度与智慧的结合，他用自己的方式守护着和平。",
    nostalgiaIndex: 80,
    friendlinessIndex: 85,
    kidInteraction: {
      challenge: "学习风马的经典战斗姿势",
      quiz: "风马最擅长的技能是什么？",
      funFact: "风马的速度告诉我们，有时候快就是最好的防御！"
    },
    memorableScenes: [
      {
        title: "风的速度",
        description: "风马展现了他惊人的速度和敏捷的身手。",
        emotion: "速度",
        year: 2019
      }
    ],
    growthLessons: [
      {
        title: "速度与智慧",
        content: "就像风马一样，我们要学会用智慧和速度解决问题。"
      }
    ],
    interactiveMessages: [
      "速度就是力量！",
      "为了和平而战！",
      "让我们一起守护未来！"
    ]
  },
  {
    id: 11,
    key: "grigio",
    name: "格丽乔奥特曼",
    image: "https://static.wikia.nocookie.net/ultra/images/4/4d/Ultra-woman-grigio.png",
    description: "光之国的女战士，拥有治愈和战斗能力",
    features: ["治愈能力", "光线技能", "格斗技巧"],
    power: "70000 t",
    speed: "5311 km/h",
    defense: "未知",
    height: "500 m",
    weight: "40000 t",
    skills: ["格丽乔光线", "治愈光线", "格丽乔屏障"],
    personality: "温柔、坚强、富有同情心",
    classicQuotes: ["治愈的力量将带来希望！", "为了守护大家的笑容！"],
    emotionalStory: "格丽乔的故事告诉我们，温柔的力量同样可以守护和平。",
    nostalgiaIndex: 85,
    friendlinessIndex: 95,
    kidInteraction: {
      challenge: "学习格丽乔的经典战斗姿势",
      quiz: "格丽乔最擅长的技能是什么？",
      funFact: "格丽乔的治愈能力告诉我们，关爱他人也是一种力量！"
    },
    memorableScenes: [
      {
        title: "治愈的力量",
        description: "格丽乔展现了她强大的治愈能力和温柔的心。",
        emotion: "温柔",
        year: 2019
      }
    ],
    growthLessons: [
      {
        title: "温柔的力量",
        content: "就像格丽乔一样，我们要学会用温柔的力量帮助他人。"
      }
    ],
    interactiveMessages: [
      "治愈的力量带来希望！",
      "为了守护大家的笑容！",
      "让我们一起创造美好的未来！"
    ]
  },
  {
    id: 12,
    key: "father",
    name: "奥特之父",
    image: "https://static.wikia.nocookie.net/ultra/images/f/fa/Father_Infobox.png",
    description: "光之国的最高领导者，拥有最强大的力量和智慧",
    features: ["超强光线", "领导能力", "智慧"],
    power: "50000 t",
    speed: "700 km/h",
    defense: "未知",
    height: "350 m",
    weight: "50000 t (Current)",
    skills: ["奥特之父光线", "宇宙能量", "领导光环"],
    personality: "威严、智慧、富有责任感",
    classicQuotes: ["为了光之国的未来！", "和平需要每个人的努力！"],
    emotionalStory: "奥特之父作为光之国的最高领导者，始终守护着宇宙的和平。他的智慧和力量让所有奥特曼都为之敬仰。",
    nostalgiaIndex: 95,
    friendlinessIndex: 90,
    kidInteraction: {
      challenge: "学习奥特之父的领导姿势",
      quiz: "奥特之父最强大的技能是什么？",
      funFact: "奥特之父的领导光环告诉我们，真正的力量来自于团结！"
    },
    memorableScenes: [
      {
        title: "光之国的守护者",
        description: "奥特之父展现了他作为领导者的智慧和力量。",
        emotion: "威严",
        year: 1972
      }
    ],
    growthLessons: [
      {
        title: "领导的力量",
        content: "就像奥特之父一样，我们要学会用智慧和力量领导他人。"
      }
    ],
    interactiveMessages: [
      "为了光之国的未来！",
      "和平需要每个人的努力！",
      "让我们一起守护宇宙！"
    ]
  },
  {
    id: 13,
    key: "mother",
    name: "奥特之母",
    image: "https://static.wikia.nocookie.net/ultra/images/e/e3/Mother_Infobox.png",
    description: "光之国的慈母，拥有强大的治愈能力和智慧",
    features: ["治愈能力", "智慧", "母爱"],
    power: "30000 t",
    speed: "500 km/h",
    defense: "未知",
    height: "350 m",
    weight: "32000 t",
    skills: ["治愈光线", "母爱光环", "智慧之光"],
    personality: "温柔、智慧、富有爱心",
    classicQuotes: ["用爱守护和平！", "治愈的力量将带来希望！"],
    emotionalStory: "奥特之母用她的爱和智慧守护着光之国，她的治愈能力让所有奥特曼都感受到温暖。",
    nostalgiaIndex: 95,
    friendlinessIndex: 98,
    kidInteraction: {
      challenge: "学习奥特之母的治愈姿势",
      quiz: "奥特之母最擅长的技能是什么？",
      funFact: "奥特之母的治愈能力告诉我们，关爱他人也是一种力量！"
    },
    memorableScenes: [
      {
        title: "光之国的慈母",
        description: "奥特之母展现了她作为母亲的温柔和智慧。",
        emotion: "母爱",
        year: 1972
      }
    ],
    growthLessons: [
      {
        title: "爱的力量",
        content: "就像奥特之母一样，我们要学会用爱和智慧帮助他人。"
      }
    ],
    interactiveMessages: [
      "用爱守护和平！",
      "治愈的力量将带来希望！",
      "让我们一起创造美好的未来！"
    ]
  },
  {
    id: 14,
    key: "astra",
    name: "阿斯图拉奥特曼",
    image: "https://static.wikia.nocookie.net/ultra/images/1/10/Astra_movie_II.png",
    description: "来自U40星云的战士，拥有强大的力量和勇气",
    features: ["力量强大", "勇气", "格斗技巧"],
    power: "85000 t",
    speed: "5311 km/h",
    defense: "未知",
    height: "400 m",
    weight: "35000 t",
    skills: ["阿斯图拉光线", "勇气之拳", "力量屏障"],
    personality: "勇敢、正义感强、富有责任感",
    classicQuotes: ["为了U40的荣耀！", "勇气就是力量！"],
    emotionalStory: "阿斯图拉的故事告诉我们，真正的力量来自于内心的勇气。他的战斗精神让所有奥特曼都为之敬佩。",
    nostalgiaIndex: 90,
    friendlinessIndex: 85,
    kidInteraction: {
      challenge: "学习阿斯图拉的战斗姿势",
      quiz: "阿斯图拉最强大的技能是什么？",
      funFact: "阿斯图拉的勇气告诉我们，面对困难要勇敢！"
    },
    memorableScenes: [
      {
        title: "勇气与力量",
        description: "阿斯图拉展现了他强大的力量和勇气。",
        emotion: "勇气",
        year: 1973
      }
    ],
    growthLessons: [
      {
        title: "勇气的力量",
        content: "就像阿斯图拉一样，我们要学会用勇气面对困难。"
      }
    ],
    interactiveMessages: [
      "为了U40的荣耀！",
      "勇气就是力量！",
      "让我们一起守护和平！"
    ]
  }
];

module.exports = ultramanList;
