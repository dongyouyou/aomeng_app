const ultramanList = require('../../data/ultraman.js');

Page({
  data: {
    ultramanList: ultramanList,
    selectedLeft: null,
    selectedRight: null,
    showSelector: false,
    selectorPosition: 'left', // 'left' or 'right'
  },

  onLoad() {
    this.setData({
      selectedLeft: null,
      selectedRight: null
    });
  },

  showHeroSelector(e) {
    const position = e.currentTarget.dataset.position;
    this.setData({
      showSelector: true,
      selectorPosition: position
    });
  },

  selectHero(e) {
    const hero = this.data.ultramanList.find(item => item.id === e.currentTarget.dataset.id);
    
    // 处理英雄数据，确保可以正确显示
    const processedHero = this.processHeroData(hero);
    
    if (this.data.selectorPosition === 'left') {
      this.setData({
        selectedLeft: processedHero,
        showSelector: false
      });
    } else {
      this.setData({
        selectedRight: processedHero,
        showSelector: false
      });
    }
  },
  
  // 处理英雄数据，确保可以正确显示在对比图表中
  processHeroData(hero) {
    if (!hero) return null;
    
    const processedHero = {...hero};
    
    // 处理力量数据
    const powerValue = this.extractNumber(hero.power);
    processedHero.powerValue = powerValue;
    
    // 处理速度数据
    const speedValue = this.convertSpeedToKmh(hero.speed);
    processedHero.speedValue = speedValue;
    
    // 处理身高数据
    const heightValue = this.extractNumber(hero.height);
    processedHero.heightValue = heightValue;
    
    // 处理体重数据
    const weightValue = this.extractNumber(hero.weight);
    processedHero.weightValue = weightValue;
    
    return processedHero;
  },
  
  // 提取字符串中的数字部分
  extractNumber(str) {
    if (!str || str === "未知") return 0;
    // 如果已经是数字，直接返回
    if (!isNaN(str)) return Number(str);
    
    // 提取字符串中的第一个数字部分
    const matches = str.match(/[\d,]+/);
    if (matches && matches.length > 0) {
      // 移除逗号后转换为数字
      return Number(matches[0].replace(/,/g, ''));
    }
    return 0;
  },
  
  // 将不同单位的速度转换为 km/h
  convertSpeedToKmh(speedStr) {
    if (!speedStr || speedStr === "未知") return 0;
    
    // 如果已经是数字，直接返回
    if (!isNaN(speedStr)) return Number(speedStr);
    
    // 提取数字部分
    const matches = speedStr.match(/[\d.]+/);
    if (!matches || matches.length === 0) return 0;
    
    const value = parseFloat(matches[0]);
    
    // 根据单位进行转换
    if (speedStr.includes("Mach")) {
      // 1 Mach ≈ 1062.17 km/h
      return Math.round(value * 1062.17);
    } else if (speedStr.includes("km/h") || speedStr.includes("km per hour")) {
      return value;
    }
    
    return value;
  },

  closeSelector() {
    this.setData({
      showSelector: false
    });
  },

  stopPropagation(e) {
    e.stopPropagation();
  }
});
