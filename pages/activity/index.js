// pages/activity/index.js
const app = getApp()
import {
  showMyYhjList,
  wxPay
} from '../../api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },
  toDetail(e) {
    app.globalData.tempActivity = this.data.list[e.currentTarget.dataset.index]
    wx.navigateTo({
      url: '../activityDetial/index'
    })
  },
  handleBuy(e) {
    const index = e.currentTarget.dataset.index
    const proId = this.data.list[index].typeId
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
    const that = this
    showMyYhjList().then(res => {
      if (res.message == '000000') {
        res.data.forEach(function(item) {
          const begin = new Date(item.createTime1)
          const end = new Date(item.end_time1)
          item.time = begin.getMonth() + '月' + begin.getDay() + '日' + '-' + end.getMonth() + '月' + end.getDay() + '日'
        })
        that.setData({
          list: res.data
        })
      }
    })
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