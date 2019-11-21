//app.js
import {
  invokelogin
} from './utils/util.js'
App({
  onLaunch: function() {
    const that = this
    // 小程序坑爹，真机调试缓存无法清除，只能代码清理
    // wx.clearStorage()

    // 获取用户授权信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          const userInfo = wx.getStorageSync('userInfo')
          if(!userInfo){
            // wx.showModal({
            //   title: '提示',
            //   content: '当前状态未登录，请重新授权登录',
            //   showCancel: false,
            //   success(res) {
            //     if (res.confirm) {
            //       wx.redirectTo({
            //         url: '/pages/auth/index'
            //       })
            //     }
            //   }
            // })
          }
          that.globalData.userInfo = userInfo

        } else {
          // wx.showModal({
          //   title: '提示',
          //   content: '需要授权才能使用小程序',
          //   showCancel: false,
          //   success(res) {
          //     if (res.confirm) {
          //       wx.redirectTo({
          //         url: '/pages/auth/index'
          //       })
          //     }
          //   }
          // })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})