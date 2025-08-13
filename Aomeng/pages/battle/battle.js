const battleData = require('../../data/battle-data.js');
const ultramanList = require('../../data/ultraman.js');

Page({
  data: {
    selectedUltraman: null,
    ultramanSkills: [],
    currentSkill: null,
    showSkillGif: false,
    isGifLoading: false,  // 添加GIF加载状态
    gifLoadFailed: false, // 添加GIF加载失败状态
    gifRatio: 1, // 默认宽高比为1:1
    gifContainerHeight: 300 // 默认高度
  },

  onLoad(options) {
    // Get ultraman ID from options or use default
    const ultramanId = options.id ? parseInt(options.id) : 1;
    const ultramanKey = options.key || 'tiga'; // 获取key参数，默认为'tiga'
    
    // Find the selected ultraman or use the first one as default
    const selectedUltraman = ultramanList.find(item => item.id === ultramanId) || ultramanList[0];
    
    // 优先使用传入的key参数，如果没有则使用selectedUltraman的key
    const skillKey = ultramanKey || selectedUltraman.key;
    
    // Get skills for this ultraman using key
    const ultramanSkills = battleData.ultramanSkills[skillKey] || battleData.ultramanSkills['tiga'];
    
    this.setData({
      selectedUltraman,
      ultramanSkills
    });

    // Set page title to include the selected skill when one is shown
    wx.setNavigationBarTitle({
      title: selectedUltraman.name + '的技能'
    });
  },

  // Show skill GIF when a skill is tapped
  demonstrateSkill(e) {
    const skill = e.currentTarget.dataset.skill;
    
    // If same skill is clicked again, toggle display
    if (this.data.currentSkill && this.data.currentSkill.id === skill.id && this.data.showSkillGif) {
      this.setData({
        showSkillGif: false,
        currentSkill: null,
        isGifLoading: false,
        gifLoadFailed: false
      });
      // Reset title
      wx.setNavigationBarTitle({
        title: this.data.selectedUltraman.name + '的技能'
      });
      return;
    }
    
    // Check if GIF path is valid
    if (!skill.gifUrl) {
      this.showGifError();
      return;
    }
    
    // 直接显示GIF，简化加载逻辑
    this.setData({
      currentSkill: skill,
      showSkillGif: true,
      isGifLoading: true,  // 初始设为加载中状态
      gifLoadFailed: false
    });
    
    // Update title to show selected skill name
    wx.setNavigationBarTitle({
      title: skill.name
    });
    
    // 设置加载超时（延长到20秒）
    const loadingTimeout = setTimeout(() => {
      // 如果仍在加载中，则认为加载失败
      if (this.data.isGifLoading && this.data.currentSkill && this.data.currentSkill.id === skill.id) {
        console.error('GIF加载超时');
        this.showGifError();
      }
    }, 20000); // 20秒超时
    
    // 保存超时定时器ID，以便在需要时清除
    this.loadingTimeoutId = loadingTimeout;
  },
  
  // Handle GIF load events - 当图片在WXML中加载完成时触发
  onGifLoaded(e) {
    console.log('GIF在界面上加载完成:', e.detail);
    
    // 清除可能存在的超时定时器
    if (this.loadingTimeoutId) {
      clearTimeout(this.loadingTimeoutId);
      this.loadingTimeoutId = null;
    }
    
    // 计算并设置GIF的宽高比
    if (e.detail.width && e.detail.height) {
      const ratio = e.detail.height / e.detail.width;
      
      // 动态调整容器的宽高比
      this.setData({
        gifRatio: ratio,
        isGifLoading: false,
        gifLoadFailed: false
      });
      
      // 通过样式动态设置高度
      const query = wx.createSelectorQuery();
      query.select('.gif-display-area').boundingClientRect();
      query.exec((res) => {
        if (res && res[0]) {
          const width = res[0].width;
          let height = width * ratio;
          
          // 根据图片比例调整容器高度
          const systemInfo = wx.getSystemInfoSync();
          const maxHeight = systemInfo.windowHeight * 0.5; // 屏幕高度的50%
          const minHeight = width * 0.75; // 至少是宽度的75%
          
          // 确保高度在合理范围内，但更倾向于保持原始比例
          const finalHeight = Math.min(Math.max(height, minHeight), maxHeight);
          
          this.setData({
            gifContainerHeight: finalHeight
          });
        }
      });
    }
  },
  
  // 图片加载出错时触发
  onGifError(e) {
    console.error('GIF显示出错:', e);
    
    // 清除可能存在的超时定时器
    if (this.loadingTimeoutId) {
      clearTimeout(this.loadingTimeoutId);
      this.loadingTimeoutId = null;
    }
    
    // 检查是否已经显示错误状态，避免重复处理
    if (!this.data.gifLoadFailed) {
      this.showGifError();
    }
  },
  
  // 显示GIF加载错误
  showGifError() {
    this.setData({
      isGifLoading: false,
      gifLoadFailed: true
    });
  },
  
  // 重试加载GIF
  retryLoadGif() {
    if (this.data.currentSkill) {
      // 重置状态
      this.setData({
        isGifLoading: true,
        gifLoadFailed: false
      });
      
      // 设置新的超时
      const loadingTimeout = setTimeout(() => {
        if (this.data.isGifLoading && this.data.currentSkill) {
          console.error('重试GIF加载超时');
          this.showGifError();
        }
      }, 20000); // 20秒超时
      
      // 保存超时定时器ID
      this.loadingTimeoutId = loadingTimeout;
    }
  },
  
  // Navigate back
  goBack() {
    wx.navigateBack();
  }
});
