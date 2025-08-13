const ultramanList = require('../../data/ultraman.js');
const heroStories = require('../../data/hero-stories.js');

Page({
  data: {
    selectedHero: null,
    showQuiz: false,
    currentQuiz: null,
    showStory: false,
    favorites: [], // 收藏列表
    currentMessageIndex: 0,
    checkinText: "",
    checkinHistory: [],
    showCheckinHistory: false,
    currentTab: 'info',  // 当前选中的标签页
    isLiked: false,
    showBackToTop: false,
    isMember: false,     // 新增：是否是会员
    needMembership: false, // 新增：是否需要会员才能查看
    // 新增：故事章节相关数据
    heroStoryChapters: [], // 英雄故事章节列表
    currentChapter: 1,    // 当前章节ID
    currentChapterData: {}, // 当前章节的详细数据
    recommendedStories: [], // 推荐阅读列表
    videoLoadFailed: false, // 新增：视频加载是否失败
    retryCount: 0,          // 新增：视频加载重试次数
    videoBufferingCount: 0, // 新增：视频加载中处理
    lastPlayTime: 0         // 新增：视频播放时间更新事件
  },

  onLoad(options) {
    // 从URL参数获取英雄ID
    const id = parseInt(options.id || 1);
    const key = options.key; // 获取key参数
    
    // 获取全局会员状态
    const app = getApp();
    const isMember = app.globalData.isMember;
    const limitedHeroes = app.globalData.limitedHeroes;
    
    // 检查是否需要会员权限查看
    const needMembership = id > limitedHeroes && !isMember;
    
    // 查找英雄数据，优先使用key查找，如果没有key则使用id查找
    let hero;
    if (key) {
      hero = ultramanList.find(item => item.key === key);
    }
    
    if (!hero) {
      hero = ultramanList.find(item => item.id === id) || ultramanList[0];
    }
    
    this.setData({ 
      selectedHero: hero,
      showQuiz: false,
      showStory: false,
      currentMessageIndex: 0,
      checkinText: "",
      currentTab: 'info',
      isMember: isMember,
      needMembership: needMembership
    });
    
    // 初始化故事章节数据
    this.initStoryChapters(hero);
    
    // 初始化推荐阅读数据
    this.initRecommendedStories(hero);
    
    // 如果需要会员权限但用户不是会员，显示会员提示
    if (needMembership) {
      wx.showModal({
        title: '会员专享内容',
        content: '该英雄资料仅对会员开放查看，是否前往开通会员？',
        confirmText: '立即开通',
        cancelText: '返回',
        success: (res) => {
          if (res.confirm) {
            // 跳转到会员页面
            wx.navigateTo({
              url: '/pages/membership/membership'
            });
          } else {
            // 用户取消，返回上一页
            wx.navigateBack();
          }
        }
      });
    }
    
    // 设置导航栏标题
    if (hero) {
      wx.setNavigationBarTitle({
        title: hero.name
      });
    }
    
    // 加载收藏数据
    this.loadFavorites();
    this.loadCheckinHistory();
  },

  onShow() {
    // 每次页面显示时重新加载收藏数据
    this.loadFavorites();
    this.loadCheckinHistory();
    
    // 检查会员状态变化
    this.checkMemberStatus();
  },
  
  // 新增：检查会员状态
  checkMemberStatus() {
    const app = getApp();
    const isMember = app.globalData.isMember;
    const limitedHeroes = app.globalData.limitedHeroes;
    
    // 如果有选中的英雄，检查是否需要会员权限
    if (this.data.selectedHero) {
      const needMembership = this.data.selectedHero.id > limitedHeroes && !isMember;
      
      // 更新会员状态数据
      this.setData({
        isMember: isMember,
        needMembership: needMembership
      });
      
      // 如果用户变成会员，取消会员限制
      if (isMember && this.data.needMembership) {
        this.setData({
          needMembership: false
        });
      }
    }
  },
  
  // 跳转到会员页面
  goToMembership() {
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

  // 切换标签页
  switchTab(e) {
    this.setData({
      currentTab: e.currentTarget.dataset.tab
    });
  },

  // 点赞功能
  toggleLike() {
    const isLiked = !this.data.isLiked;
    this.setData({
      isLiked: isLiked
    });
    wx.showToast({
      title: isLiked ? '已添加到喜欢' : '已取消喜欢',
      icon: 'success',
      duration: 1500
    });
  },

  // 显示评论
  showComments() {
    wx.showToast({
      title: '评论功能开发中',
      icon: 'none',
      duration: 1500
    });
  },

  // 分享英雄
  shareHero() {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
    wx.showToast({
      title: '分享功能已打开',
      icon: 'success',
      duration: 1500
    });
  },
  
  // 对战模式
  startBattle() {
    wx.showToast({
      title: '对战模式即将上线',
      icon: 'none',
      duration: 1500
    });
  },
  
  // 知识问答
  startQuiz() {
    wx.showToast({
      title: '知识问答即将上线',
      icon: 'none',
      duration: 1500
    });
  },
  
  // 查看图片集
  viewGallery() {
    wx.showToast({
      title: '图片集即将上线',
      icon: 'none',
      duration: 1500
    });
  },
  
  // 查看视频集
  viewVideo() {
    wx.showToast({
      title: '视频集即将上线',
      icon: 'none',
      duration: 1500
    });
  },
  
  // 返回顶部
  scrollToTop() {
    // 滚动到顶部
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    });
  },
  
  // 监听页面滚动
  onPageScroll(e) {
    // 当滚动超过一定距离时显示返回顶部按钮
    const showBackToTop = e.scrollTop > 300;
    if (showBackToTop !== this.data.showBackToTop) {
      this.setData({
        showBackToTop: showBackToTop
      });
    }
  },

  // 分享配置
  onShareAppMessage() {
    const hero = this.data.selectedHero;
    return {
      title: `奥特曼冒险图鉴 - ${hero ? hero.name : '奥特曼'} 详情`,
      path: '/pages/detail/detail?id=' + (hero ? hero.id : ''),
      imageUrl: hero ? hero.image : ''
    };
  },

  // 处理分享到朋友圈
  onShareTimeline() {
    const { selectedHero } = this.data;
    return {
      title: selectedHero ? `${selectedHero.name}的故事` : '奥特曼图鉴',
      query: selectedHero ? `id=${selectedHero.id}` : '',
      imageUrl: selectedHero ? selectedHero.image : ''
    };
  },

  showHeroStory() {
    this.setData({
      showStory: true,
      showQuiz: false
    });
  },

  // 检查是否已收藏
  isFavorite(id) {
    return this.data.favorites.includes(id);
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

  // 修改：初始化故事章节数据
  initStoryChapters(hero) {
    if (!hero) return;
    
    // 从heroStories数据中获取当前英雄的故事章节
    let chapters = heroStories[hero.key] || [];
    
    // 移除所有章节的posterUrl属性，避免显示初始图片
    chapters = chapters.map(chapter => {
      // 创建一个章节的副本
      const chapterCopy = {...chapter};
      // 删除posterUrl属性
      if ('posterUrl' in chapterCopy) {
        delete chapterCopy.posterUrl;
      }
      return chapterCopy;
    });
    
    // 设置临时章节数据
    this.setData({
      heroStoryChapters: chapters,
      currentChapter: chapters.length > 0 ? chapters[0].id : 1,
      currentChapterData: chapters.length > 0 ? chapters[0] : {}
    });
    
    // 从API获取视频数据
    this.fetchHeroStoryVideos(hero.key);
  },
  
  // 新增：从API获取英雄故事视频
  fetchHeroStoryVideos(heroKey) {
    const app = getApp();
    
    if (!heroKey) return;
    
    // 显示加载提示
    wx.showLoading({
      title: '加载视频...',
      mask: true
    });
    
    // 获取用户token
    const token = wx.getStorageSync('token');
    if (!token) {
      wx.hideLoading();
      console.log('用户未登录，无法获取视频');
      return;
    }
    
    // 调用API获取视频列表
    wx.request({
      url: `${app.globalData.apiBaseUrl}/api/videos/hero/${heroKey}/stories`,
      method: 'GET',
      header: {
        'Authorization': `Bearer ${token}`
      },
      success: (res) => {
        wx.hideLoading();
        
        if (res.statusCode === 200 && res.data && res.data.length > 0) {
          console.log('获取到英雄故事视频数据:', res.data);
          
          // 获取现有章节数据
          let chapters = [...this.data.heroStoryChapters];
          
          // 更新章节数据中的视频URL
          res.data.forEach(videoInfo => {
            const videoTitle = videoInfo.title;
            
            // 查找匹配的章节
            const chapterIndex = chapters.findIndex(chapter => 
              chapter.title === videoTitle || 
              chapter.videoCaption === videoInfo.description
            );
            
            if (chapterIndex !== -1) {
              // 为每个视频生成不同的URL版本
              const originalUrl = videoInfo.url;
              const directUrl = originalUrl.replace('/ultra/videos/', '/ultra/videos/direct/');
              
              console.log(`视频URL信息 - 原始: ${originalUrl}, 直接: ${directUrl}`);
              
              // 对于小视频（<10MB），优先使用直接URL以解决10秒问题
              // 使用直接URL访问可以避免非范围请求限制
              chapters[chapterIndex].directVideoUrl = directUrl;
              
              // 默认使用直接URL
              chapters[chapterIndex].videoUrl = directUrl;
              
              // 保存原始URL作为备用
              chapters[chapterIndex].originalVideoUrl = originalUrl;
            }
          });
          
          // 更新数据
          const currentChapterData = chapters.find(c => c.id === this.data.currentChapter) || chapters[0] || {};
          
          this.setData({
            heroStoryChapters: chapters,
            currentChapterData: currentChapterData,
            // 重置视频加载状态
            videoLoadFailed: false,
            retryCount: 0,
            videoBufferingCount: 0
          });
          
          // 预加载视频信息
          if (currentChapterData && currentChapterData.videoUrl) {
            console.log('预加载视频信息:', currentChapterData.videoUrl);
          }
        } else {
          console.log('没有获取到视频数据或请求失败');
          
          // 如果当前章节没有视频URL，不需要设置失败标志，直接显示"即将上线"提示
          const currentChapterData = this.data.currentChapterData;
          if (currentChapterData && !currentChapterData.videoUrl) {
            console.log('当前章节没有视频，显示"即将上线"提示');
          }
        }
      },
      fail: (err) => {
        wx.hideLoading();
        console.error('获取英雄故事视频失败:', err);
        
        // API请求失败不应该影响UI显示，如果没有视频URL，将继续显示"即将上线"提示
      }
    });
  },

  // 新增：初始化推荐阅读数据
  initRecommendedStories(currentHero) {
    // 从所有英雄中选择3个不同于当前英雄的作为推荐
    let recommended = [];
    if (currentHero) {
      const otherHeroes = ultramanList.filter(hero => hero.key !== currentHero.key);
      
      // 随机选择最多3个其他英雄
      const maxRecommendations = Math.min(3, otherHeroes.length);
      const shuffled = otherHeroes.sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, maxRecommendations);
      
      recommended = selected.map(hero => ({
        id: hero.id,
        key: hero.key,
        title: `${hero.name}的传奇故事`,
        description: hero.description ? hero.description.substring(0, 30) + '...' : '查看更多精彩内容...',
        image: hero.image
      }));
    }
    
    this.setData({
      recommendedStories: recommended
    });
  },

  // 新增：切换故事章节
  switchChapter(e) {
    const chapterId = e.currentTarget.dataset.id;
    const chapter = this.data.heroStoryChapters.find(c => c.id === chapterId);
    
    if (chapter) {
      // 重置视频加载状态
      this.setData({
        currentChapter: chapterId,
        currentChapterData: chapter,
        videoLoadFailed: false
      });
    }
  },
  
  // 新增：视频播放相关事件处理
  onVideoPlay() {
    console.log('视频开始播放');
    // 记录视频播放状态
    this.setData({
      isVideoPlaying: true
    });
  },
  
  onVideoPause() {
    console.log('视频已暂停');
    this.setData({
      isVideoPlaying: false
    });
  },
  
  onVideoEnd() {
    console.log('视频播放结束');
    this.setData({
      isVideoPlaying: false
    });
  },
  
  // 新增：视频加载出错处理
  onVideoError(e) {
    console.error('视频加载出错:', e.detail.errMsg);
    
    // 检查是否有备用URL可以尝试
    const currentChapterData = this.data.currentChapterData;
    this.retryCount = (this.retryCount || 0) + 1;
    
    if (currentChapterData) {
      // 如果当前正在使用directVideoUrl，尝试切换到originalVideoUrl
      if (currentChapterData.videoUrl === currentChapterData.directVideoUrl && 
          currentChapterData.originalVideoUrl &&
          this.retryCount <= 1) {
        console.log('尝试使用原始URL:', currentChapterData.originalVideoUrl);
        currentChapterData.videoUrl = currentChapterData.originalVideoUrl;
        
        this.setData({
          currentChapterData: currentChapterData,
          videoLoadFailed: false
        });
        return;
      }
      
      // 如果当前正在使用originalVideoUrl，尝试切换回directVideoUrl
      if (currentChapterData.videoUrl === currentChapterData.originalVideoUrl && 
          currentChapterData.directVideoUrl &&
          this.retryCount <= 2) {
        console.log('尝试使用直接URL并添加时间戳:', currentChapterData.directVideoUrl);
        // 添加时间戳避免缓存问题
        currentChapterData.videoUrl = `${currentChapterData.directVideoUrl}?t=${Date.now()}`;
        
        this.setData({
          currentChapterData: currentChapterData,
          videoLoadFailed: false
        });
        return;
      }
    }
    
    // 如果重试次数过多或没有其他URL可用，显示错误提示
    console.log('视频加载失败，没有可用的备用URL或重试次数过多');
    this.setData({
      videoLoadFailed: true
    });
  },
  
  // 新增：图片预览功能
  previewImage(e) {
    const current = e.currentTarget.dataset.src;
    const urls = e.currentTarget.dataset.urls;
    
    wx.previewImage({
      current: current,
      urls: urls
    });
  },
  
  // 新增：跳转到推荐故事
  goToRecommendedStory(e) {
    const heroId = e.currentTarget.dataset.id;
    const heroKey = e.currentTarget.dataset.key;
    wx.navigateTo({
      url: `/pages/detail/detail?id=${heroId}&key=${heroKey}`
    });
  },

  // 新增：视频加载中处理
  onVideoWaiting(e) {
    console.log('视频正在缓冲...');
    this.videoBufferingCount = (this.videoBufferingCount || 0) + 1;
    
    // 如果缓冲次数过多，尝试切换到备用URL
    if (this.videoBufferingCount > 3 && this.data.currentChapterData.directVideoUrl) {
      console.log('缓冲次数过多，尝试切换到备用URL');
      // 获取视频上下文
      const videoContext = wx.createVideoContext('storyVideo');
      if (videoContext) {
        const currentTime = this.data.lastPlayTime || 0;
        // 更新当前章节数据使用备用URL
        const currentChapterData = this.data.currentChapterData;
        currentChapterData.videoUrl = currentChapterData.directVideoUrl;
        this.setData({
          currentChapterData: currentChapterData,
          videoLoadFailed: false
        }, () => {
          // 恢复播放位置
          setTimeout(() => {
            videoContext.seek(currentTime);
            videoContext.play();
          }, 500);
        });
      }
    }
  },
  
  // 新增：视频播放时间更新事件
  onTimeUpdate(e) {
    // 记录当前播放时间
    const currentTime = e.detail.currentTime;
    // 保存到data中便于恢复
    this.setData({
      lastPlayTime: currentTime
    });
    
    // 记录每10秒的播放进度
    if (Math.floor(currentTime) % 10 === 0 && currentTime > 0) {
      console.log(`视频播放进度: ${currentTime.toFixed(1)}秒`);
    }
  },
}); 