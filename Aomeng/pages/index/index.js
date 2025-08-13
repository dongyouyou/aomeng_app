// index.js
const ultramanList = require('../../data/ultraman.js');

Page({
  data: {
    ultramanList: [],  // 修改为空数组，由onLoad中动态设置
    selectedId: null,
    selectedHero: null,
    showQuiz: false,
    currentQuiz: null,
    showStory: false,
    favorites: [], // 收藏列表
    currentMessageIndex: 0,
    checkinText: "",
    checkinHistory: [],
    showCheckinHistory: false,
    currentTab: 'info',  // 新增：当前选中的标签页
    isMember: false,     // 新增：是否是会员
    showMemberTip: false, // 新增：是否显示会员提示
    totalHeroCount: 0    // 新增：总英雄数量
  },

  onLoad() {
    this.setData({
      selectedId: null,
      selectedHero: null,
      showQuiz: false,
      currentQuiz: null,
      showStory: false,
      currentMessageIndex: 0,
      checkinText: "",
      currentTab: 'info'
    });
    // 加载收藏数据
    this.loadFavorites();
    this.loadCheckinHistory();
    // 获取会员状态并加载英雄列表
    this.checkMemberStatus();
  },

  onShow() {
    // 每次页面显示时重新检查会员状态并加载英雄列表
    this.checkMemberStatus();
    // 每次页面显示时重新加载收藏数据
    this.loadFavorites();
    this.loadCheckinHistory();
  },

  // 新增：检查会员状态并加载英雄列表
  checkMemberStatus() {
    const app = getApp();
    const isMember = app.globalData.isMember;
    const limitedCount = app.globalData.limitedHeroes;
    let heroList = ultramanList;
    const totalCount = ultramanList.length;
    
    // 如果不是会员，则限制显示的英雄数量
    if (!isMember) {
      heroList = ultramanList.slice(0, limitedCount);
    }
    
    this.setData({
      ultramanList: heroList,
      isMember: isMember,
      showMemberTip: !isMember && totalCount > limitedCount,
      totalHeroCount: totalCount  // 保存总英雄数量
    });
  },
  
  // 跳转到会员页面
  goToMembership() {
    const app = getApp();
    // 检查用户是否已登录
    if (!app.globalData.isLogged) {
      wx.showModal({
        title: '提示',
        content: '请先登录后再开通会员',
        showCancel: false,
        success: () => {
          // 直接跳转到"我的"页面
          wx.switchTab({
            url: '/pages/mine/mine'
          });
        }
      });
      return;
    }
    
    // 已登录，直接跳转到会员页面
    wx.navigateTo({
      url: '/pages/membership/membership'
    });
  },

  // 加载收藏数据
  loadFavorites() {
    const favorites = wx.getStorageSync('favorites') || [];
    this.setData({ favorites });
  },

  // 加载打卡历史
  loadCheckinHistory() {
    const checkinHistory = wx.getStorageSync('checkinHistory') || [];
    this.setData({ checkinHistory });
  },

  // 切换收藏状态
  toggleFavorite() {
    const { selectedHero, favorites } = this.data;
    if (!selectedHero) return;

    let newFavorites = [...favorites];
    const index = newFavorites.findIndex(id => id === selectedHero.id);

    if (index === -1) {
      // 添加收藏
      newFavorites.push(selectedHero.id);
      wx.showToast({
        title: '已添加收藏',
        icon: 'success'
      });
    } else {
      // 取消收藏
      newFavorites.splice(index, 1);
      wx.showToast({
        title: '已取消收藏',
        icon: 'none'
      });
    }

    // 保存到本地存储
    wx.setStorageSync('favorites', newFavorites);
    this.setData({ favorites: newFavorites });
  },

  // 互动消息导航
  nextMessage() {
    const { currentMessageIndex, selectedHero } = this.data;
    if (currentMessageIndex < selectedHero.interactiveMessages.length - 1) {
      this.setData({
        currentMessageIndex: currentMessageIndex + 1
      });
    }
  },

  prevMessage() {
    const { currentMessageIndex } = this.data;
    if (currentMessageIndex > 0) {
      this.setData({
        currentMessageIndex: currentMessageIndex - 1
      });
    }
  },

  // 打卡功能
  onCheckinInput(e) {
    this.setData({
      checkinText: e.detail.value
    });
  },

  submitCheckin() {
    const { checkinText, selectedHero, checkinHistory } = this.data;
    if (!checkinText.trim()) {
      wx.showToast({
        title: '请输入打卡内容',
        icon: 'none'
      });
      return;
    }

    const newCheckin = {
      id: Date.now(),
      heroId: selectedHero.id,
      heroName: selectedHero.name,
      content: checkinText,
      timestamp: new Date().toISOString()
    };

    const newHistory = [newCheckin, ...checkinHistory];
    wx.setStorageSync('checkinHistory', newHistory);
    
    this.setData({
      checkinHistory: newHistory,
      checkinText: ''
    });

    wx.showToast({
      title: '打卡成功',
      icon: 'success'
    });
  },

  // 分享功能
  onShareAppMessage(res) {
    const { selectedHero } = this.data;
    if (res.from === 'button' && selectedHero) {
      return {
        title: `快来看看${selectedHero.name}的故事！`,
        imageUrl: selectedHero.image,
        path: `/pages/index/index?heroId=${selectedHero.id}`
      };
    }
    return {
      title: '奥特曼图鉴',
      path: '/pages/index/index'
    };
  },

  // 处理分享到朋友圈
  onShareTimeline() {
    const { selectedHero } = this.data;
    return {
      title: selectedHero ? `${selectedHero.name}的故事` : '奥特曼图鉴',
      query: selectedHero ? `heroId=${selectedHero.id}` : '',
      imageUrl: selectedHero ? selectedHero.image : ''
    };
  },

  selectHero(e) {
    const id = e.currentTarget.dataset.id;
    
    // 导航到详情页面
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`
    });
  },

  showHeroStory() {
    this.setData({
      showStory: true,
      showQuiz: false
    });
  },

  startQuiz() {
    if (this.data.selectedHero) {
      this.setData({
        showQuiz: true,
        currentQuiz: this.data.selectedHero.kidInteraction.quiz,
        showStory: false
      });
    }
  },

  closeDetail() {
    this.setData({ 
      selectedId: null,
      selectedHero: null,
      showQuiz: false,
      showStory: false,
      currentMessageIndex: 0,
      checkinText: ""
    });
  },

  stopPropagation(e) {
    e.stopPropagation();
  },

  // 检查是否已收藏
  isFavorite(id) {
    return this.data.favorites.includes(id);
  },

  // 新增：切换标签页
  switchTab(e) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({
      currentTab: tab
    });
  },

  // 进入战斗页面
  goBattlePage() {
    const ultraman = this.data.selectedHero;
    if (ultraman) {
      wx.navigateTo({
        url: `/pages/battle/battle?id=${ultraman.id}&key=${ultraman.key}`
      });
    } else {
      wx.navigateTo({
        url: '/pages/battle/battle'
      });
    }
  },
});
