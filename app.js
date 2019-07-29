//app.js
App({
  onLaunch: function () {
    wx.login({
      success: res => {
        console.log("app.js->", res.code, res)
        const code = res.code
        const ghId = 'gh_3d2d48bf21a0'
        wx.request({
          url: 'https://www.haitong.site/xcx/strategy/isCheck',
          data: {
            ghId: ghId,
            code: code
          },
          method: 'POST',
          success(res) {
            // if(res.data.data == 1) {
            //   wx.navigateTo({
            //     url: '/pages/allgame/allgame',
            //   })

            // }
            wx.setStorage({
              key: 'data',
              data: res.data.data,
            })
            wx.request({
              url: 'https://www.haitong.site/xcx/count/add',
              data: {
                ghId: ghId,
                code: code
              },
              method: 'POST',
              success(res) {
                const openId = res.data.data.openId
                console.log('openId', res.data.data.openId)
                wx.setStorage({
                  key: 'openId',
                  data: openId,
                })

                wx.request({
                  url: 'https://www.haitong.site/v3/xcx/jump/get/all',
                  data: {
                    ghId: ghId,
                    openId: openId
                  },
                  method: 'POST',
                  success(res) {
                    console.log(res.data.data.xcxList)
                    wx.setStorage({
                      key: 'xcxList',
                      data: res.data.data.xcxList,
                    })
                    var data = res.data.data.xcxList[0].lists[0]
                    wx.setStorage({
                      key: 'jumpAppId',
                      data: data.jumpAppId,
                    })
                    wx.setStorage({
                      key: 'jumpUrl',
                      data: data.jumpUrl,
                    })
                    wx.setStorage({
                      key: 'jumpId',
                      data: data.jumpId,
                    })

                  }
                })

                console.log(res.data)
              }
            })

            console.log(res.data)
          }
        })
        wx.hideLoading()
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    // 获取小程序更新机制兼容
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function (res) {
        // 请求完新版本信息的回调
        if (res.hasUpdate) {
          updateManager.onUpdateReady(function () {
            wx.showModal({
              title: '更新提示',
              content: '新版本已经准备好，是否重启应用？',
              success: function (res) {
                if (res.confirm) {
                  // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                  updateManager.applyUpdate()
                }
              }
            })
          })
          updateManager.onUpdateFailed(function () {
            // 新的版本下载失败
            wx.showModal({
              title: '已经有新版本了哟~',
              content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
            })
          })
        }
      })
    } else {
      // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
    
  },
  globalData: {
    userInfo: null
  }
})