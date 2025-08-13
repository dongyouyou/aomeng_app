const ultramanList = require('../../data/ultraman.js');  // 直接引入数据文件

Page({
  data: {
    rankList: [],
    activeTab: 'power',
    maxValue: 100,
    isLoading: true,
    showDebug: false,  // 关闭调试模式
    isMember: false,  // 是否是会员
    limitedRanking: 5  // 非会员可查看的排名数量限制
  },

  onLoad: function(options) {
    // 确保全局数据可用，如果不可用则使用本地数据
    try {
      const app = getApp();
      if (app && app.globalData && app.globalData.heroes && app.globalData.heroes.length > 0) {
        this.heroes = app.globalData.heroes;
      } else {
        this.heroes = ultramanList || [];
        console.log('使用本地数据源，全局数据不可用');
      }
    } catch (error) {
      this.heroes = ultramanList || [];
      console.error('获取全局数据出错:', error);
    }

    // 检查会员状态
    this.checkMemberStatus();

    // 初始加载力量排行
    this.switchTab({ currentTarget: { dataset: { tab: 'power' } } });
  },
  
  onShow: function() {
    // 每次页面显示时重新检查会员状态
    this.checkMemberStatus();
    
    // 刷新当前排行榜数据
    this.switchTab({ currentTarget: { dataset: { tab: this.data.activeTab } } });
  },
  
  // 检查会员状态
  checkMemberStatus: function() {
    const app = getApp();
    const isMember = app.globalData.isMember || false;
    
    this.setData({
      isMember: isMember
    });
    
    console.log('排行榜页面 - 会员状态:', isMember);
  },

  // 跳转到会员中心
  goToMembership: function() {
    wx.navigateTo({
      url: '/pages/membership/membership'
    });
  },
  
  // 显示会员提示
  showMemberTip: function() {
    wx.showModal({
      title: '会员专享',
      content: '开通会员可查看完整排行榜',
      confirmText: '了解会员',
      cancelText: '关闭',
      success: (res) => {
        if (res.confirm) {
          this.goToMembership();
        }
      }
    });
  },

  // 计算百分比方法
  getStatPercentage: function(item) {
    const { activeTab, maxValue } = this.data;
    
    if (activeTab === 'power' && item.power && item.power !== '未知') {
      return Math.min(parseInt(item.power) / maxValue * 100, 100);
    } 
    else if (activeTab === 'speed' && item.speed && item.speed !== '未知') {
      return Math.min(parseInt(item.speed) / maxValue * 100, 100);
    } 
    else if (activeTab === 'height' && item.height && item.height !== '未知') {
      const heightValue = parseFloat(item.height);
      if (!isNaN(heightValue)) {
        return Math.min(heightValue / maxValue * 100, 100);
      }
    } 
    else if (activeTab === 'weight' && item.weight && item.weight !== '未知') {
      const weightValue = parseFloat(item.weight);
      if (!isNaN(weightValue)) {
        return Math.min(weightValue / maxValue * 100, 100);
      }
    }
    
    return 0;
  },

  switchTab: function(e) {
    const tab = e.currentTarget.dataset.tab;
    
    this.setData({
      activeTab: tab,
      isLoading: true
    });
    
    wx.showLoading({
      title: '加载中...',
    });
    
    // 使用this.heroes而不是全局变量heroes
    let heroes = this.heroes || [];
    let sortedList = [];
    let maxVal = 0;
    
    if (tab === 'power') {
      // 按力量排序
      sortedList = heroes.filter(h => h.power && h.power !== '未知')
                         .sort((a, b) => parseInt(b.power) - parseInt(a.power));
      
      // 找出最大值用于计算百分比
      if (sortedList.length > 0) {
        maxVal = parseInt(sortedList[0].power);
      }
    } 
    else if (tab === 'speed') {
      // 按速度排序
      sortedList = heroes.filter(h => h.speed && h.speed !== '未知')
                         .sort((a, b) => parseInt(b.speed) - parseInt(a.speed));
      
      if (sortedList.length > 0) {
        maxVal = parseInt(sortedList[0].speed);
      }
    } 
    else if (tab === 'height') {
      // 按身高排序 - 处理单位
      sortedList = heroes.filter(h => h.height && h.height !== '未知')
                         .map(h => {
                           // 提取数字部分
                           const heightValue = parseFloat(h.height);
                           return {...h, heightValue};
                         })
                         .filter(h => !isNaN(h.heightValue))
                         .sort((a, b) => b.heightValue - a.heightValue);
      
      if (sortedList.length > 0) {
        maxVal = sortedList[0].heightValue;
      }
    } 
    else if (tab === 'weight') {
      // 按体重排序 - 处理单位
      sortedList = heroes.filter(h => h.weight && h.weight !== '未知')
                         .map(h => {
                           // 提取数字部分
                           const weightValue = parseFloat(h.weight);
                           return {...h, weightValue};
                         })
                         .filter(h => !isNaN(h.weightValue))
                         .sort((a, b) => b.weightValue - a.weightValue);
      
      if (sortedList.length > 0) {
        maxVal = sortedList[0].weightValue;
      }
    }
    
    // 确保至少有一些数据
    if (sortedList.length === 0) {
      console.warn('没有找到符合条件的数据');
    }
    
    // 为非会员限制显示的数据量，但保留完整列表用于计算最大值
    const fullList = [...sortedList];
    
    // 如果不是会员且列表长度超过限制，则截取
    if (!this.data.isMember && sortedList.length > this.data.limitedRanking) {
      sortedList = sortedList.slice(0, this.data.limitedRanking);
    }

    this.setData({
      rankList: sortedList,
      fullListLength: fullList.length, // 存储完整列表长度
      maxValue: maxVal || 100,  // 确保maxValue不为0
      isLoading: false
    });
    
    wx.hideLoading();
  },
  
  goToDetail: function(e) {
    const hero = e.currentTarget.dataset.hero;
    const index = e.currentTarget.dataset.index;
    
    // 检查是否是锁定的项
    if (index >= this.data.limitedRanking && !this.data.isMember) {
      this.showMemberTip();
      return;
    }
    
    if (hero && hero.id) {
      wx.navigateTo({
        url: `/pages/detail/detail?id=${hero.id}`
      });
    } else {
      wx.showToast({
        title: '英雄数据不完整',
        icon: 'none'
      });
    }
  },

  // 计算百分比
  calculatePercent(value, min, max) {
    if (max === min) return 100;
    return Math.round((value - min) / (max - min) * 100);
  },
  
  // 提取字符串中的数字部分
  extractNumber(str) {
    if (!str || str === "未知") return 0;
    // 如果已经是数字，直接返回
    if (!isNaN(str)) return Number(str);
    
    // 提取字符串中的数字部分
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
  }
});
