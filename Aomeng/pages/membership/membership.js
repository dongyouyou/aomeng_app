Page({
  data: {
    userInfo: null,
    isLogged: false,
    isMember: false,
    memberExpireDate: null,
    formattedExpireDate: '',
    showPayment: false,
    paymentMethod: 'wechat',
    selectedPlan: 'monthly',
    membershipPlans: [
      {
        id: 'monthly',
        name: '月度会员',
        price: 9.9,
        description: '单月有效期'
      },
      {
        id: 'quarterly',
        name: '季度会员',
        price: 25.8,
        description: '连续三个月有效期',
        discount: 3.9
      },
      {
        id: 'yearly',
        name: '年度会员',
        price: 89.9,
        description: '连续十二个月有效期',
        discount: 28.9
      }
    ],
    announcements: [
      {
        id: 1,
        date: '2024-03-30',
        content: '近期将上线奥特曼赛罗、雷欧、艾斯三位新角色，敬请期待！'
      },
      {
        id: 2,
        date: '2024-04-05',
        content: '将增加奥特曼技能联动功能，会员可优先体验。'
      },
      {
        id: 3,
        date: '2024-04-10',
        content: '将举办线上奥特曼知识竞赛，冠军可获得一年会员资格。'
      }
    ]
  },

  // API配置
  apiConfig: {
    baseUrl: 'https://wx.99coc.cn/ultraman-api'
  },

  onLoad() {
    this.checkUserStatus();
  },
  
  // 每次页面显示时检查用户状态
  onShow() {
    this.checkUserStatus();
  },
  
  // 检查用户登录和会员状态
  checkUserStatus() {
    const app = getApp();
    console.log('会员中心检查登录状态:', {
      isLogged: app.globalData.isLogged,
      hasUserInfo: !!app.globalData.userInfo,
      userInfoStorage: !!wx.getStorageSync('userInfo'),
      tokenStorage: !!wx.getStorageSync('token')
    });
    
    // 首先尝试从本地存储获取用户信息
    if (!app.globalData.isLogged || !app.globalData.userInfo) {
      const userInfo = wx.getStorageSync('userInfo');
      const token = wx.getStorageSync('token');
      
      if (userInfo && token) {
        // 更新全局状态
        app.globalData.userInfo = userInfo;
        app.globalData.token = token;
        app.globalData.isLogged = true;
        
        console.log('从本地存储更新全局登录状态');
      }
    }
    
    // 再次检查登录状态
    if (app.globalData.isLogged && app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        isLogged: true
      });
      
      // 检查会员状态
      if (app.globalData.isMember && app.globalData.memberExpireDate) {
        const expireDate = new Date(app.globalData.memberExpireDate);
        const formattedDate = this.formatDate(expireDate);
        
        this.setData({
          isMember: true,
          memberExpireDate: app.globalData.memberExpireDate,
          formattedExpireDate: formattedDate
        });
      } else {
        this.setData({
          isMember: false,
          memberExpireDate: null,
          formattedExpireDate: ''
        });
      }
    } else {
      // 如果没有登录，则提示用户登录
      wx.showModal({
        title: '提示',
        content: '请先登录后再访问会员中心',
        showCancel: false,
        success: () => {
          // 返回到我的页面
          wx.navigateBack();
        }
      });
    }
  },
  
  // 格式化日期
  formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  },
  
  // 显示支付弹窗
  showPaymentModal() {
    if (!this.data.isLogged) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      });
      return;
    }
    
    this.setData({
      showPayment: true,
      paymentMethod: 'wechat' // 默认选择微信支付
    });
  },
  
  // 隐藏支付弹窗
  hidePaymentModal() {
    this.setData({
      showPayment: false
    });
  },
  
  // 阻止事件冒泡
  stopPropagation() {
    return false;
  },
  
  // 选择支付方式
  selectPaymentMethod(e) {
    const method = e.currentTarget.dataset.method;
    this.setData({
      paymentMethod: method
    });
  },
  
  // 选择会员套餐
  selectPlan(e) {
    const plan = e.currentTarget.dataset.plan;
    this.setData({
      selectedPlan: plan
    });
  },
  
  // 选择支付方式
  selectPayment(e) {
    const payment = e.currentTarget.dataset.payment;
    this.setData({
      paymentMethod: payment
    });
  },
  
  // 显示支付选项
  showPayment() {
    if (!this.data.isLogged) {
      wx.showModal({
        title: '请先登录',
        content: '开通会员需要先登录账号',
        showCancel: false
      });
      return;
    }
    
    this.setData({
      showPayment: true
    });
  },
  
  // 关闭支付选项
  hidePayment() {
    this.setData({
      showPayment: false
    });
  },
  
  // 执行支付流程
  processPayment() {
    if (!this.data.selectedPlan) {
      wx.showToast({
        title: '请选择会员套餐',
        icon: 'none'
      });
      return;
    }
    
    wx.showLoading({
      title: '正在请求支付',
      mask: true
    });
    
    // 获取选中套餐的价格信息
    const planInfo = this.data.membershipPlans.find(plan => plan.id === this.data.selectedPlan);
    
    if (!planInfo) {
      wx.hideLoading();
      wx.showToast({
        title: '套餐信息无效',
        icon: 'none'
      });
      return;
    }
    
    // 模拟向服务器请求支付参数
    setTimeout(() => {
      wx.hideLoading();
      
      // 检查支付环境
      if (!wx.canIUse('requestPayment')) {
        // 当前开发工具可能不支持支付接口，使用模拟支付
        console.log('当前环境不支持requestPayment，使用模拟支付');
        wx.showModal({
          title: '开发环境提示',
          content: '当前开发环境不支持真实支付，是否模拟支付成功？',
          success: (res) => {
            if (res.confirm) {
              this.handlePaymentSuccess(planInfo);
            }
          }
        });
        return;
      }
      
      // 根据支付方式调用不同的支付接口
      if (this.data.paymentMethod === 'wechat') {
        this.wechatPay(planInfo);
      } else if (this.data.paymentMethod === 'alipay') {
        this.alipayPay(planInfo);
      }
    }, 1000);
  },
  
  // 微信支付
  wechatPay(planInfo) {
    // 在真实环境中，这里应该是从服务器获取支付参数
    console.log('准备发起微信支付', planInfo);
    
    // 模拟向服务器请求微信支付参数
    wx.showLoading({
      title: '请求支付中...',
      mask: true
    });
    
    // 实际开发中，这里应该通过API请求获取支付参数
    setTimeout(() => {
      wx.hideLoading();
      
      try {
        // 调用微信支付接口
        wx.requestPayment({
          timeStamp: '' + Math.floor(Date.now() / 1000),
          nonceStr: 'xxxyyyzz' + Math.random().toString(36).substr(2),
          package: 'prepay_id=wx123456789',
          signType: 'MD5',
          paySign: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
          success: (res) => {
            console.log('支付成功', res);
            this.handlePaymentSuccess(planInfo);
          },
          fail: (err) => {
            console.log('支付失败', err);
            if (err.errMsg.indexOf('cancel') >= 0) {
              wx.showToast({
                title: '支付已取消',
                icon: 'none'
              });
            } else {
              // 开发环境下模拟支付成功
              wx.showModal({
                title: '开发环境提示',
                content: '支付参数无效，是否模拟支付成功？',
                success: (res) => {
                  if (res.confirm) {
                    this.handlePaymentSuccess(planInfo);
                  }
                }
              });
            }
          }
        });
      } catch (error) {
        console.error('requestPayment错误:', error);
        // 如果出错，提供模拟支付选项
        wx.showModal({
          title: '支付接口错误',
          content: '无法调用支付接口，是否模拟支付成功？',
          success: (res) => {
            if (res.confirm) {
              this.handlePaymentSuccess(planInfo);
            }
          }
        });
      }
    }, 1000);
  },
  
  // 支付宝支付
  alipayPay(planInfo) {
    // 模拟支付宝支付
    console.log('发起支付宝支付', planInfo);
    
    wx.showModal({
      title: '提示',
      content: '小程序环境不支持支付宝支付，请使用微信支付',
      showCancel: false
    });
  },
  
  // 处理支付成功
  handlePaymentSuccess(planInfo) {
    wx.showLoading({
      title: '处理订单中',
      mask: true
    });
    
    // 模拟服务器处理订单
    setTimeout(() => {
      wx.hideLoading();
      
      // 计算会员到期时间
      const now = new Date();
      const expireDate = new Date();
      
      // 根据套餐类型设置到期时间
      if (planInfo.id === 'monthly') {
        expireDate.setMonth(now.getMonth() + 1);
      } else if (planInfo.id === 'quarterly') {
        expireDate.setMonth(now.getMonth() + 3);
      } else if (planInfo.id === 'yearly') {
        expireDate.setFullYear(now.getFullYear() + 1);
      }
      
      // 更新全局会员状态
      const app = getApp();
      app.globalData.isMember = true;
      app.globalData.memberExpireDate = expireDate.toISOString();
      
      // 保存到本地存储
      wx.setStorageSync('isMember', true);
      wx.setStorageSync('memberExpireDate', expireDate.toISOString());
      
      // 更新页面状态
      const formattedDate = this.formatDate(expireDate);
      this.setData({
        isMember: true,
        memberExpireDate: expireDate.toISOString(),
        formattedExpireDate: formattedDate,
        showPayment: false
      });
      
      // 显示支付成功提示
      wx.showToast({
        title: '开通会员成功',
        icon: 'success',
        duration: 2000
      });
    }, 1500);
  },
})
