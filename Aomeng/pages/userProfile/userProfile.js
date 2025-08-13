Page({
  data: {
    userInfo: null,
    region: ['广东省', '广州市', '海珠区'],
    nickname: '',
    gender: 1
  },

  // API配置
  apiConfig: {
    baseUrl: 'https://wx.99coc.cn/ultraman-api'
  },

  onLoad(options) {
    // 获取用户信息
    const app = getApp();
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      });

      // 设置地区
      if (app.globalData.userInfo.country || app.globalData.userInfo.province || app.globalData.userInfo.city) {
        this.setData({
          region: [
            app.globalData.userInfo.province || '广东省',
            app.globalData.userInfo.city || '广州市',
            ''
          ]
        });
      }

      // 设置性别
      if (app.globalData.userInfo.gender) {
        this.setData({
          gender: app.globalData.userInfo.gender
        });
      }

      // 设置昵称
      if (app.globalData.userInfo.nickname || app.globalData.userInfo.nickName) {
        this.setData({
          nickname: app.globalData.userInfo.nickname || app.globalData.userInfo.nickName
        });
      }
    } else {
      // 如果没有用户信息，返回上一页
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        success: () => {
          setTimeout(() => {
            wx.navigateBack();
          }, 1500);
        }
      });
    }
  },

  // 处理昵称输入
  handleNicknameInput(e) {
    this.setData({
      nickname: e.detail.value
    });
  },

  // 处理性别选择
  handleGenderChange(e) {
    this.setData({
      gender: parseInt(e.detail.value)
    });
  },

  // 处理地区选择
  handleRegionChange(e) {
    this.setData({
      region: e.detail.value
    });
  },

  // 保存用户信息
  saveUserProfile() {
    const token = wx.getStorageSync('token');
    if (!token) {
      wx.showToast({
        title: '登录状态异常，请重新登录',
        icon: 'none'
      });
      return;
    }

    wx.showLoading({
      title: '保存中...',
    });

    // 构建更新请求的数据
    const userInfoToUpdate = {
      nickName: this.data.nickname,
      gender: this.data.gender,
      province: this.data.region[0],
      city: this.data.region[1],
      country: 'China'
    };

    // 发送更新请求
    wx.request({
      url: `${this.apiConfig.baseUrl}/update_profile`,
      method: 'POST',
      header: {
        'Authorization': 'Bearer ' + token,
        'content-type': 'application/json'
      },
      data: {
        userInfo: userInfoToUpdate
      },
      success: (res) => {
        if (res.statusCode === 200) {
          // 更新本地缓存和全局状态
          const updatedUserInfo = res.data;
          wx.setStorageSync('userInfo', updatedUserInfo);
          
          const app = getApp();
          app.globalData.userInfo = updatedUserInfo;

          wx.showToast({
            title: '保存成功',
            icon: 'success',
            success: () => {
              setTimeout(() => {
                wx.navigateBack();
              }, 1500);
            }
          });
        } else {
          wx.showToast({
            title: '保存失败，请重试',
            icon: 'none'
          });
        }
      },
      fail: (err) => {
        console.error('更新用户信息失败:', err);
        wx.showToast({
          title: '网络错误，请重试',
          icon: 'none'
        });
      },
      complete: () => {
        wx.hideLoading();
      }
    });
  }
});
