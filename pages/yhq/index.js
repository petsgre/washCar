// pages/tab/index.js
const app = getApp()
import {
  getCoupons
} from '../../api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },
  toDetail(e) {
    app.globalData.tempCoupon = this.data.list[e.currentTarget.dataset.index]
    wx.navigateTo({
      url: '../coupon/index'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    const that = this
    getCoupons().then(res => {
      if (res.message == '000000') {
        res.data.forEach(function(item) {
          const begin = new Date(item.startDate)
          const end = new Date(item.endDate)
          item.time = begin.getMonth() + '月' + begin.getDay() + '日' + '-' + end.getMonth() + '月' + end.getDay() + '日'
        })
        that.setData({
          list: res.data
        })
      }
    })

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