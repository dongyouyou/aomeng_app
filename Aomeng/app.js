// app.js
// 引入eslint配置，确保不存在无依赖文件
const eslintConfig = require('./.eslintrc.js');

App({
  globalData: {
    userInfo: null,
    token: null,
    isLogged: false,
    isMember: false,  // 是否是会员
    memberExpireDate: null, // 会员过期时间
    limitedHeroes: 8,  // 非会员可查看的奥特曼数量限制
    limitedSkills: 3,   // 非会员可查看的技能数量限制
    apiBaseUrl: 'https://wx.99coc.cn/ultraman-api'  // API基础URL
  },

  onLaunch() {
    // 检查本地存储中是否有用户信息和token
    const userInfo = wx.getStorageSync('userInfo');
    const token = wx.getStorageSync('token');
    const memberInfo = wx.getStorageSync('memberInfo');
    
    if (userInfo && token) {
      this.globalData.userInfo = userInfo;
      this.globalData.token = token;
      this.globalData.isLogged = true;
      
      // 验证token有效性
      this.checkSession();
    }
    
    // 检查会员状态
    if (memberInfo) {
      const expireDate = new Date(memberInfo.expireDate);
      const now = new Date();
      
      // 检查会员是否过期
      if (expireDate > now) {
        this.globalData.isMember = true;
        this.globalData.memberExpireDate = memberInfo.expireDate;
      } else {
        // 会员已过期，清除会员信息
        wx.removeStorageSync('memberInfo');
      }
    }
  },
  
  // 检查登录会话是否有效
  checkSession() {
    wx.request({
      url: `${this.globalData.apiBaseUrl}/api/me`,
      method: 'GET',
      header: {
        'Authorization': 'Bearer ' + this.globalData.token,
        'content-type': 'application/json'
      },
      success: (res) => {
        if (res.statusCode === 200) {
          // 更新用户信息
          this.globalData.userInfo = res.data;
          wx.setStorageSync('userInfo', res.data);
        } else {
          // token无效，清除登录状态
          this.clearLoginState();
        }
      },
      fail: () => {
        // 请求失败不处理，保留登录状态，可能是网络问题
        console.log('检查会话失败，可能是网络问题');
      }
    });
  },
  
  // 清除登录状态
  clearLoginState() {
    this.globalData.userInfo = null;
    this.globalData.token = null;
    this.globalData.isLogged = false;
    this.globalData.isMember = false;
    this.globalData.memberExpireDate = null;
    wx.removeStorageSync('userInfo');
    wx.removeStorageSync('token');
    wx.removeStorageSync('memberInfo');
  },
  
  // 更新会员状态
  updateMemberStatus(isMember, expireDate) {
    this.globalData.isMember = isMember;
    this.globalData.memberExpireDate = expireDate;
    
    if (isMember && expireDate) {
      wx.setStorageSync('memberInfo', {
        isMember: true,
        expireDate: expireDate
      });
    }
  }
})
