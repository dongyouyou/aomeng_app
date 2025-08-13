Page({
    data: {
      userInfo: null,
      hasUserInfo: false,
      canIUseGetUserProfile: false,
      isLogged: false,
      isMember: false,
      memberExpireDate: null,
      formattedExpireDate: '',
      showLogin: false // 控制登录模态框显示
    },
  
    // API配置
    apiConfig: {
      // 生产环境使用HTTPS域名
      baseUrl: 'https://wx.99coc.cn/ultraman-api'
    },
  
    onLoad() {
      // 检查是否支持getUserProfile
      if (wx.getUserProfile) {
        this.setData({
          canIUseGetUserProfile: true
        });
      }
      
      // 获取全局登录状态
      const app = getApp();
      if (app.globalData.isLogged && app.globalData.userInfo) {
        this.setData({
          userInfo: app.globalData.userInfo,
          hasUserInfo: true,
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
        }
        
        // 添加调试信息
        console.log('全局用户信息:', app.globalData.userInfo);
      } else {
        // 检查本地存储中是否有用户信息
        const userInfo = wx.getStorageSync('userInfo');
        const token = wx.getStorageSync('token');
        if (userInfo && token) {
          this.setData({
            userInfo: userInfo,
            hasUserInfo: true,
            isLogged: true
          });
          
          // 更新全局数据
          app.globalData.userInfo = userInfo;
          app.globalData.token = token;
          app.globalData.isLogged = true;
          
          // 添加调试信息
          console.log('本地存储用户信息:', userInfo);
        }
      }
    },
  
    // 显示登录模态框
    showLoginModal() {
      this.setData({
        showLogin: true
      });
    },
  
    // 隐藏登录模态框
    hideLoginModal() {
      this.setData({
        showLogin: false
      });
    },
  
    // 阻止事件冒泡
    stopPropagation(e) {
      // 阻止事件冒泡
      return false;
    },
  
    // 退出登录
    logout() {
      wx.showModal({
        title: '提示',
        content: '确定要退出登录吗？',
        success: (res) => {
          if (res.confirm) {
            // 清除全局状态和本地存储
            const app = getApp();
            app.clearLoginState();
            
            this.setData({
              userInfo: null,
              hasUserInfo: false,
              isLogged: false
            });
            
            wx.showToast({
              title: '已退出登录',
              icon: 'success'
            });
          }
        }
      });
    },
    
    // 微信一键登录
    wxLogin() {
      // 关闭登录模态框
      this.hideLoginModal();

      // 先获取用户信息
      wx.getUserProfile({
        desc: '用于完善用户资料',
        success: (userProfileRes) => {
          console.log('获取用户信息成功：', userProfileRes);
          
          wx.showLoading({
            title: '登录中',
          });

          // 获取登录code
          wx.login({
            success: (loginRes) => {
              if (loginRes.code) {
                console.log('登录成功，code:', loginRes.code);
                
                // 调试信息
                const apiUrl = `${this.apiConfig.baseUrl}/login`;
                console.log('请求API:', apiUrl);
                
                // 明确指定需要的字段
                const userInfoToSend = {
                  nickName: userProfileRes.userInfo.nickName || '',
                  avatarUrl: userProfileRes.userInfo.avatarUrl || '',
                  gender: userProfileRes.userInfo.gender || 0,
                  country: userProfileRes.userInfo.country || '',
                  province: userProfileRes.userInfo.province || '',
                  city: userProfileRes.userInfo.city || ''
                };
                
                // 调用实际API进行登录
                console.log('准备发送登录请求，数据:', {
                  code: loginRes.code,
                  userInfo: userInfoToSend
                });

                wx.request({
                  url: apiUrl,
                  method: 'POST',
                  header: {
                    'content-type': 'application/json'
                  },
                  data: {
                    code: loginRes.code,
                    userInfo: userInfoToSend  // 使用处理过的用户信息
                  },
                  success: (res) => {
                    console.log('完整登录响应:', JSON.stringify(res));  // 打印完整响应

                    // 检查HTTP状态码
                    if (res.statusCode !== 200) {
                      wx.hideLoading();
                      const errorDetail = res.data && res.data.detail ? `: ${res.data.detail}` : '';
                      wx.showToast({
                        title: `服务器错误: ${res.statusCode}${errorDetail}`,
                        icon: 'none',
                        duration: 3000
                      });
                      return;
                    }
                    
                    if (res.data && res.data.access_token) {
                      // 保存token
                      wx.setStorageSync('token', res.data.access_token);
                      
                      // 获取用户信息
                      wx.request({
                        url: `${this.apiConfig.baseUrl}/me`,
                        method: 'GET',
                        header: {
                          'Authorization': 'Bearer ' + res.data.access_token,
                          'content-type': 'application/json'
                        },
                        success: (userRes) => {
                          console.log('用户信息响应：', userRes);
                          
                          // 检查HTTP状态码
                          if (userRes.statusCode !== 200) {
                            wx.hideLoading();
                            wx.showToast({
                              title: `获取用户信息失败: ${userRes.statusCode}`,
                              icon: 'none',
                              duration: 3000
                            });
                            return;
                          }
                          
                          if (userRes.data) {
                            // 保存用户信息
                            wx.setStorageSync('userInfo', userRes.data);
                            
                            this.setData({
                              userInfo: userRes.data,
                              hasUserInfo: true,
                              isLogged: true
                            });
                            
                            wx.showToast({
                              title: '登录成功',
                              icon: 'success'
                            });
                          }
                        },
                        fail: (err) => {
                          console.error('获取用户信息失败：', err);
                          wx.showToast({
                            title: '获取用户信息失败: ' + JSON.stringify(err).substring(0, 50),
                            icon: 'none',
                            duration: 3000
                          });
                        },
                        complete: () => {
                          wx.hideLoading();
                        }
                      });
                    } else {
                      wx.hideLoading();
                      let errorMsg = '登录失败';
                      if (res.data && res.data.detail) {
                        errorMsg = res.data.detail;
                      }
                      wx.showToast({
                        title: errorMsg,
                        icon: 'none',
                        duration: 3000
                      });
                    }
                  },
                  fail: (err) => {
                    console.error('登录请求失败详情:', JSON.stringify(err));  // 打印详细错误
                    wx.hideLoading();
                    // 处理特定错误码
                    if (err.errMsg.includes('600002')) {
                      wx.showToast({
                        title: '请在微信开发者工具中开启"不校验合法域名"选项',
                        icon: 'none',
                        duration: 5000
                      });
                    } else {
                      wx.showToast({
                        title: '网络错误: ' + err.errMsg,
                        icon: 'none',
                        duration: 3000
                      });
                    }
                  }
                });
              } else {
                console.error('获取不到登录code:', loginRes);
                wx.hideLoading();
                wx.showToast({
                  title: '获取登录凭证失败',
                  icon: 'none'
                });
              }
            },
            fail: (loginErr) => {
              console.error('获取登录code失败：', loginErr);
              wx.hideLoading();
              wx.showToast({
                title: '登录失败: ' + JSON.stringify(loginErr).substring(0, 50),
                icon: 'none',
                duration: 3000
              });
            }
          });
        },
        fail: (err) => {
          console.log('获取用户信息失败：', err);
          wx.showToast({
            title: '您已取消登录',
            icon: 'none'
          });
        }
      });
    },
  
    // 查看收藏
    viewFavorites() {
      if (!this.data.isLogged) {
        this.showLoginModal();
        return;
      }
      
      wx.showToast({
        title: '收藏功能即将上线',
        icon: 'none'
      });
    },
  
    // 查看打卡历史
    viewCheckinHistory() {
      if (!this.data.isLogged) {
        this.showLoginModal();
        return;
      }
      
      const checkinHistory = wx.getStorageSync('checkinHistory') || [];
      if (checkinHistory.length === 0) {
        wx.showToast({
          title: '暂无打卡记录',
          icon: 'none'
        });
        return;
      }
      
      // 实现查看打卡记录的页面导航逻辑
      wx.showToast({
        title: '打卡历史功能即将上线',
        icon: 'none'
      });
    },
  
    // 关于我们
    aboutUs() {
      wx.showModal({
        title: '关于我们',
        content: '奥特曼图鉴是一款为奥特曼迷打造的小程序，提供奥特曼角色资料、战力排行、对战模拟等功能。',
        showCancel: false
      });
    },
  
    // 联系客服
    contactService() {
      // 微信小程序中可以使用客服消息功能
      wx.showToast({
        title: '正在连接客服...',
        icon: 'loading',
        duration: 1500
      });
    },
  
    // 在onShow中添加刷新用户信息的逻辑
    onShow() {
      if (this.data.isLogged) {
        this.refreshUserInfo();
        this.checkMemberStatus();
      }
    },
    
    // 刷新用户信息
    refreshUserInfo() {
      const token = wx.getStorageSync('token');
      if (!token) return;
      
      console.log('刷新用户信息');
      wx.request({
        url: `${this.apiConfig.baseUrl}/me`,
        method: 'GET',
        header: {
          'Authorization': 'Bearer ' + token,
          'content-type': 'application/json'
        },
        success: (res) => {
          console.log('刷新用户信息响应:', res);
          if (res.statusCode === 200 && res.data) {
            // 更新本地存储和显示
            wx.setStorageSync('userInfo', res.data);
            this.setData({
              userInfo: res.data
            });
            
            // 更新全局数据
            const app = getApp();
            app.globalData.userInfo = res.data;
            
            // 添加调试输出，更清晰地查看获取到的用户信息
            console.log('刷新后的用户详情:', {
              id: res.data.id,
              openid: res.data.openid ? res.data.openid.substring(0, 5) + '***' : 'null',
              nickname: res.data.nickname,
              avatar_url: res.data.avatar_url ? res.data.avatar_url.substring(0, 30) + '...' : 'null'
            });
          }
        },
        fail: (err) => {
          console.error('刷新用户信息失败:', err);
        }
      });
    },
  
    // 添加更新用户资料功能
    updateUserProfile() {
      if (!this.data.isLogged) {
        this.showLoginModal();
        return;
      }
      
      console.log('跳转到个人信息编辑页面');
      
      // 导航到个人资料编辑页面
      wx.navigateTo({
        url: '/pages/userProfile/userProfile'
      });
    },
    
    // 跳转到会员中心
    viewMembership() {
      if (!this.data.isLogged) {
        this.showLoginModal();
        return;
      }
      
      wx.navigateTo({
        url: '/pages/membership/membership'
      });
    },
    
    // 查看云游戏充值
    viewCloudGame() {
      if (!this.data.isLogged) {
        this.showLoginModal();
        return;
      }
      
      wx.showToast({
        title: '云游戏即将上线',
        icon: 'none'
      });
    },
    
    // 查看我的资产
    viewAssets() {
      if (!this.data.isLogged) {
        this.showLoginModal();
        return;
      }
      
      wx.showToast({
        title: '我的资产功能即将上线',
        icon: 'none'
      });
    },
    
    // 兑换码功能
    viewRedeemCode() {
      if (!this.data.isLogged) {
        this.showLoginModal();
        return;
      }
      
      wx.showToast({
        title: '兑换码功能即将上线',
        icon: 'none'
      });
    },
    
    // 格式化日期
    formatDate(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
    
    // 检查会员状态
    checkMemberStatus() {
      const app = getApp();
      
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
    }
  });
  