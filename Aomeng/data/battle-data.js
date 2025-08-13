// 战斗相关数据
const battleData = {
  // 奥特曼技能详细数据
  ultramanSkills: {
    // 迪迦奥特曼技能
    tiga: [
      {
        id: "tiga-1",
        name: "多重斯派修姆光线",
        description: "迪迦奥特曼最强大的光线技，能量巨大，可以在多个方向同时发射",
        gifUrl: "https://wx.99coc.cn/ultra/images/e/eb/Multi_Specium_Ray.gif"
      },
      {
        id: "tiga-2",
        name: "闪耀哉佩利敖光线",
        description: "迪迦闪耀形态的终极技能，威力极大，能量充沛",
        gifUrl: "https://wx.99coc.cn/ultra/images/b/bc/GlitterZepellion.gif"
      },
      {
        id: "tiga-3",
        name: "手刀光刃",
        description: "迪迦使用的锋利切割光刃，能切断多数物质",
        gifUrl: "https://wx.99coc.cn/ultra/images/3/31/Tiga_Slicer.gif"
      },
      {
        id: "tiga-4",
        name: "奥特十字屏障",
        description: "迪迦的强力防御技能，形成十字形护盾抵御攻击",
        gifUrl: "https://wx.99coc.cn/ultra/images/b/bd/Ultra_Cross_Barrier.gif"
      }
    ],
    
    // 赛文奥特曼技能
    seven: [
      {
        id: "seven-1",
        name: "艾梅利姆光线",
        description: "赛文强大的光线技能，威力巨大，能量集中",
        gifUrl: "https://wx.99coc.cn/ultra/images/1/16/Adorium_Ray.gif"
      },
      {
        id: "seven-2",
        name: "宽射光线",
        description: "赛文从双臂发射的强力光束，攻击范围广",
        gifUrl: "https://wx.99coc.cn/ultra/images/3/37/Reijia_Shot.gif"
      },
      {
        id: "seven-3",
        name: "手指飞镖",
        description: "赛文从手指发射的能量飞镖，精准度高",
        gifUrl: "https://wx.99coc.cn/ultra/images/c/c7/Ultraseven_21_Finger_Darts.gif"
      },
      {
        id: "seven-4",
        name: "奥特球",
        description: "赛文形成的能量球，可远程攻击敌人",
        gifUrl: "https://wx.99coc.cn/ultra/images/2/2b/Ultra_Ball.gif"
      },
      {
        id: "seven-5",
        name: "奥特飞踢",
        description: "赛文标志性的飞踢技能，速度快，威力大",
        gifUrl: "https://wx.99coc.cn/ultra/images/f/f8/Seven_21_Neos_Flying_Kick.gif"
      }
    ],
    
    // 泰罗奥特曼技能
    taro: [
      {
        id: "taro-1",
        name: "奥特充能",
        description: "泰罗的能量聚集技能，用来增强自身力量",
        gifUrl: "https://wx.99coc.cn/ultra/images/7/78/TaroUltraCharge.gif"
      },
      {
        id: "taro-2",
        name: "斯特利姆光线",
        description: "泰罗发射的强力光线，穿透力强",
        gifUrl: "https://wx.99coc.cn/ultra/images/b/bc/TaroArrowBeam.gif"
      },
      {
        id: "taro-3",
        name: "射击光线",
        description: "泰罗从手部发射的快速光线，精准度高",
        gifUrl: "https://wx.99coc.cn/ultra/images/7/77/TaroShootingBeam.gif"
      },
      {
        id: "taro-4",
        name: "脚部光线",
        description: "泰罗从脚部发射的特殊光线，出其不意",
        gifUrl: "https://wx.99coc.cn/ultra/images/f/fc/TaroFootBeam.gif"
      }
    ],

    // 赛罗奥特曼技能
    zero: [
      {
        id: "zero-1",
        name: "零宽射线",
        description: "赛罗的强力宽范围光线攻击，能量巨大",
        gifUrl: "https://wx.99coc.cn/ultra/images/c/cd/ExZeroWideShot.gif"
      },
      {
        id: "zero-2",
        name: "究极零踢",
        description: "赛罗的标志性飞踢技能，威力惊人",
        gifUrl: "https://wx.99coc.cn/ultra/images/e/e8/UltraZeroKick.gif"
      },
      {
        id: "zero-3",
        name: "翡翠斩击",
        description: "赛罗使用的锋利能量斩击，切割力极强",
        gifUrl: "https://wx.99coc.cn/ultra/images/a/ad/EmeriumSlash.gif"
      },
      {
        id: "zero-4",
        name: "翡翠连击",
        description: "赛罗快速释放的连续能量斩击，攻击范围广",
        gifUrl: "https://wx.99coc.cn/ultra/images/3/30/EmeriumSlasjRapid.gif"
      },
      {
        id: "zero-5",
        name: "零爆裂",
        description: "赛罗最强的必杀技，可以摧毁任何敌人",
        gifUrl: "https://wx.99coc.cn/ultra/images/f/f5/ZeroBigBang.gif"
      }
    ],

    // 诺亚奥特曼技能
    noa: [
      {
        id: "noa-1",
        name: "诺亚闪电",
        description: "诺亚的强力闪电攻击，威力无匹",
        gifUrl: "https://wx.99coc.cn/ultra/images/c/c1/LightningNoa.gif"
      },
      {
        id: "noa-2",
        name: "诺亚火花",
        description: "诺亚释放的能量火花，可以净化邪恶",
        gifUrl: "https://wx.99coc.cn/ultra/images/5/50/SparkNoa.gif"
      },
      {
        id: "noa-3",
        name: "诺亚地狱火",
        description: "诺亚释放的强力火焰攻击，燃烧一切敌人",
        gifUrl: "https://wx.99coc.cn/ultra/images/8/89/NoaInferno.gif"
      },
      {
        id: "noa-4",
        name: "诺亚重拳",
        description: "诺亚的强力拳击技，威力惊人",
        gifUrl: "https://wx.99coc.cn/ultra/images/8/8d/NoaPunch%2Cgif.gif"
      }
    ],

    // 捷德奥特曼技能
    geed: [
      {
        id: "geed-1",
        name: "翡翠强化光束",
        description: "捷德的强力光线技，能量巨大",
        gifUrl: "https://wx.99coc.cn/ultra/images/9/97/EmeriumBoostBeam.gif"
      },
      {
        id: "geed-2",
        name: "华丽捷德屏障",
        description: "捷德的强力防御屏障，抵御一切攻击",
        gifUrl: "https://wx.99coc.cn/ultra/images/1/14/MagnificentGeedBarrier.gif"
      },
      {
        id: "geed-3",
        name: "破坏爆裂怒火",
        description: "捷德释放的强力爆发能量，威力巨大",
        gifUrl: "https://wx.99coc.cn/ultra/images/4/40/WreckingBurstRage.gif"
      },
      {
        id: "geed-4",
        name: "破坏裂割者",
        description: "捷德的锋利切割攻击，可切断任何物质",
        gifUrl: "https://wx.99coc.cn/ultra/images/e/e5/WreckingRipper16.gif"
      },
      {
        id: "geed-5",
        name: "多重破坏裂割者",
        description: "捷德的多重切割攻击，攻击范围广",
        gifUrl: "https://wx.99coc.cn/ultra/images/2/2c/WreckingRipperMultiple.gif"
      },
      {
        id: "geed-6",
        name: "强化飞镖踢",
        description: "捷德的强力飞踢技能，速度快，威力大",
        gifUrl: "https://wx.99coc.cn/ultra/images/e/e7/BoostSluggerKick.gif"
      },
      {
        id: "geed-7",
        name: "坚实燃烧增强",
        description: "捷德的增强型能量技能，提升自身战斗能力",
        gifUrl: "https://wx.99coc.cn/ultra/images/2/26/SolidBurningBooster.gif"
      },
      {
        id: "geed-8",
        name: "捷德飞镖投掷",
        description: "捷德投掷的能量飞镖，精准度高",
        gifUrl: "https://wx.99coc.cn/ultra/images/4/46/GeedSluggerThrow.gif"
      }
    ],

    // 阿古茹奥特曼技能
    agul: [
      {
        id: "agul-1",
        name: "光子粉碎者",
        description: "阿古茹的强力光线技，能量巨大",
        gifUrl: "https://wx.99coc.cn/ultra/images/a/af/PhotonCrusher.gif"
      },
      {
        id: "agul-2",
        name: "反物质光弹",
        description: "阿古茹释放的爆炸性能量球，可连续发射",
        gifUrl: "https://wx.99coc.cn/ultra/images/b/bc/Liquidator.gif"
      },
      {
        id: "agul-3",
        name: "阿古茹斩击",
        description: "阿古茹的锋利切割攻击，切割力极强",
        gifUrl: "https://wx.99coc.cn/ultra/images/9/95/AgulSlash.gif"
      },
      {
        id: "agul-4",
        name: "阿古茹之刃",
        description: "阿古茹形成的能量刀刃，可切断任何物质",
        gifUrl: "https://wx.99coc.cn/ultra/images/8/89/AgulBlade.gif"
      },
      {
        id: "agul-5",
        name: "光子螺旋",
        description: "阿古茹的强力螺旋攻击，威力巨大",
        gifUrl: "https://wx.99coc.cn/ultra/images/1/19/Agul_Screw_Attack.gif"
      }
    ],

    // 布鲁奥特曼技能
    blu: [
      {
        id: "blu-1",
        name: "布鲁火焰出现",
        description: "布鲁释放的强力火焰攻击，燃烧敌人",
        gifUrl: "https://wx.99coc.cn/ultra/images/1/19/BluFlameEmerge.gif"
      },
      {
        id: "blu-2",
        name: "水流喷射",
        description: "布鲁释放的强力水流攻击，冲击敌人",
        gifUrl: "https://wx.99coc.cn/ultra/images/c/cc/AquaStream.gif"
      },
      {
        id: "blu-3",
        name: "水喷射爆发",
        description: "布鲁释放的爆发性水流攻击，范围更广",
        gifUrl: "https://wx.99coc.cn/ultra/images/b/b2/WaterJetBurst.gif"
      },
      {
        id: "blu-4",
        name: "风暴力量",
        description: "布鲁释放的强力风暴攻击，席卷一切",
        gifUrl: "https://wx.99coc.cn/ultra/images/c/c1/StormForce.gif"
      },
      {
        id: "blu-5",
        name: "布鲁水斩",
        description: "布鲁的水属性切割攻击，锋利无比",
        gifUrl: "https://wx.99coc.cn/ultra/images/2/2d/BluAquaChop.gif"
      }
    ],

    // 查克奥特曼技能
    chuck: [
      {
        id: "chuck-1",
        name: "格兰特光线",
        description: "查克的强力光线技能，威力巨大",
        gifUrl: "https://wx.99coc.cn/ultra/images/6/60/ChuckGraniumBeamTDC.gif"
      },
      {
        id: "chuck-2",
        name: "查克泡沫光线",
        description: "查克释放的泡沫状光线，攻击范围广",
        gifUrl: "https://wx.99coc.cn/ultra/images/5/5b/ChuckBubbleBeam.gif"
      },
      {
        id: "chuck-3",
        name: "联合光线攻击",
        description: "查克与伙伴联合释放的强力光线，威力倍增",
        gifUrl: "https://wx.99coc.cn/ultra/images/a/a7/RegulosFirstMissionCombinedBeamAttack.gif"
      }
    ],

    // 风马奥特曼技能
    fuma: [
      {
        id: "fuma-1",
        name: "旋风幻象",
        description: "风马释放的幻象旋风，迷惑敌人",
        gifUrl: "https://wx.99coc.cn/ultra/images/c/cc/FumaTornadoIllusion.gif"
      },
      {
        id: "fuma-2",
        name: "旋风屏障",
        description: "风马的风属性防御屏障，抵御攻击",
        gifUrl: "https://wx.99coc.cn/ultra/images/f/fb/FumaTornadoBarrier.gif"
      },
      {
        id: "fuma-3",
        name: "星光手里剑",
        description: "风马释放的能量手里剑，速度极快",
        gifUrl: "https://wx.99coc.cn/ultra/images/a/ae/EiSeiKohaShuriken.gif"
      },
      {
        id: "fuma-4",
        name: "七星光波手里剑",
        description: "风马释放的七连星手里剑，攻击范围广",
        gifUrl: "https://wx.99coc.cn/ultra/images/b/b6/ShichiSeiKohaShuriken.gif"
      },
      {
        id: "fuma-5",
        name: "风马冲刺",
        description: "风马的高速冲刺攻击，速度快，威力大",
        gifUrl: "https://wx.99coc.cn/ultra/images/f/f6/FumaDash.gif"
      }
    ],

    // 格丽乔奥特曼技能
    grigio: [
      {
        id: "grigio-1",
        name: "格丽乔踢",
        description: "格丽乔的强力踢击技能，威力惊人",
        gifUrl: "https://wx.99coc.cn/ultra/images/f/fe/GrigioKick.gif"
      },
      {
        id: "grigio-2",
        name: "格丽乔射线",
        description: "格丽乔发射的能量射线，精准度高",
        gifUrl: "https://wx.99coc.cn/ultra/images/9/96/GrigioShot.gif"
      },
      {
        id: "grigio-3",
        name: "格丽乔欢呼充能",
        description: "格丽乔释放的鼓舞能量，增强队友力量",
        gifUrl: "https://wx.99coc.cn/ultra/images/9/9d/Grigio_Cheer_Charge.gif"
      },
      {
        id: "grigio-4",
        name: "格丽乔治愈波",
        description: "格丽乔的治愈能量波，可恢复伤势",
        gifUrl: "https://wx.99coc.cn/ultra/images/2/2e/GrigioHealingWave.gif"
      }
    ],

    // 奥特之父技能
    father: [
      {
        id: "father-1",
        name: "奥特洗礼",
        description: "奥特之父的净化光能，驱散黑暗",
        gifUrl: "https://wx.99coc.cn/ultra/images/0/06/FatherUltraShower.gif"
      },
      {
        id: "father-2",
        name: "奥特充能",
        description: "奥特之父的能量聚集技能，增强自身力量",
        gifUrl: "https://wx.99coc.cn/ultra/images/2/2a/UltraFatherUltraCharge.gif"
      },
      {
        id: "father-3",
        name: "闪耀冲击",
        description: "奥特之父释放的强力闪光，致盲敌人",
        gifUrl: "https://wx.99coc.cn/ultra/images/0/08/UltraFatherBlindingFlash.gif"
      },
      {
        id: "father-4",
        name: "新月射线",
        description: "奥特之父发射的新月形光线，切割敌人",
        gifUrl: "https://wx.99coc.cn/ultra/images/8/81/FatherUltraCrescentShot.gif"
      },
      {
        id: "father-5",
        name: "奥特钥匙光束",
        description: "奥特之父使用奥特钥匙发射的强力光束，威力巨大",
        gifUrl: "https://wx.99coc.cn/ultra/images/2/23/Ultra_Key_Beam.gif"
      }
    ],

    // 奥特之母技能
    mother: [
      {
        id: "mother-1",
        name: "奥特之母光束",
        description: "奥特之母的强力光束，净化一切黑暗",
        gifUrl: "https://wx.99coc.cn/ultra/images/f/f2/MotherBeam.gif"
      },
      {
        id: "mother-2",
        name: "母亲洗礼",
        description: "奥特之母的治愈光线，恢复一切伤势",
        gifUrl: "https://wx.99coc.cn/ultra/images/7/7b/Mother_Mother_Shower.gif"
      },
      {
        id: "mother-3",
        name: "破坏光线",
        description: "奥特之母的攻击性光线，威力强大",
        gifUrl: "https://wx.99coc.cn/ultra/images/7/76/MotherDestructionRay.gif"
      }
    ],

    // 阿斯图拉奥特曼技能
    astra: [
      {
        id: "astra-1",
        name: "奥特缩小",
        description: "阿斯图拉可以将自己或敌人缩小的能力",
        gifUrl: "https://wx.99coc.cn/ultra/images/6/6e/AstraUltraReduction.gif"
      },
      {
        id: "astra-2",
        name: "阿斯图拉燃烧",
        description: "阿斯图拉释放的强力燃烧攻击，焚烧敌人",
        gifUrl: "https://wx.99coc.cn/ultra/images/8/8f/AstraCombustion.gif"
      },
      {
        id: "astra-3",
        name: "阿斯图拉洗礼",
        description: "阿斯图拉释放的净化能量，治愈伤势",
        gifUrl: "https://wx.99coc.cn/ultra/images/3/37/AstraShower.gif"
      },
      {
        id: "astra-4",
        name: "能量光球",
        description: "阿斯图拉形成的能量球，可远程攻击敌人",
        gifUrl: "https://wx.99coc.cn/ultra/images/1/1e/AstraEnergyLightSphere.gif"
      },
      {
        id: "astra-5",
        name: "高速冲击",
        description: "阿斯图拉的高速冲击技能，威力惊人",
        gifUrl: "https://wx.99coc.cn/ultra/images/8/8c/AstraHighSpeedRush.gif"
      },
      {
        id: "astra-6",
        name: "双重闪光",
        description: "阿斯图拉与雷欧联合使用的强力闪光技能",
        gifUrl: "https://wx.99coc.cn/ultra/images/d/d8/UltraDoubleFlasher.gif"
      },
      {
        id: "astra-7",
        name: "双重火花",
        description: "阿斯图拉与雷欧联合使用的能量火花攻击",
        gifUrl: "https://wx.99coc.cn/ultra/images/c/c6/UltraDoubleSpark.gif"
      }
    ]
  }
};

module.exports = battleData;
