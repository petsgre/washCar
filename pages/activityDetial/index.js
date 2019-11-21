const app = getApp()
import {
  showYhjList,
  wxPay
} from '../../api/api.js'
const api = require('../../api/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {}
  },
  pay: function(e) {
    const proId = this.data.info.typeId
    wxPay({
      proId: proId
    }).then(res => {
      const param = res.data;
      wx.requestPayment({
        timeStamp: param.timeStamp, // timeStamp一定要是字符串类型的
        nonceStr: param.nonceStr,
        package: param.package,
        signType: 'MD5',
        paySign: param.paySign,
        success: function(event) {
          wx.showToast({
            title: '支付成功',
            icon: 'success',
            duration: 2000
          });
          setTimeout(function() {
            wx.navigateTo({
              url: '../yhq/index'
            })
          }, 2000)
        },
        fail: function(error) {},
        complete: function() {
          // 支付完成
        }
      });
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const info = app.globalData.tempActivity
    this.setData({
      info: info
    })
    delete app.globalData.tempActivity
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})