// pages/tab/index.js
const api = require('../../api/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    visible: false

  },
  handleClose() {
    this.setData({
      visible: false
    })
  },
  cancelDialog(e) {
    this.setData({
      activeIndex: e.currentTarget.dataset.index,
      visible: true
    })
  },
  cancel(e) {
    const that = this
    const index = this.data.activeIndex
    const oId = this.data.list[index].oId
    api.wxRefund({
      'amount': 1,
      'incrementId': outTradeNo,
      'orderId': orderId,
      'productId': productId,
      'amount': amount,
      'sku': sku,
      'name': name
    }).then(res => {
      api.cancleOrder({
        oId: oId
      }).then(res => {
        const list = that.data.list
        list.splice(index, 1)
        that.setData({
          list: list,
        })
        that.handleClose()
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const that = this
    api.showPersonStatusOrder({
      status: 1
    }).then(res => {
      if (res.message == '000000') {
        res.data.forEach(function(item) {
          let date = new Date(item.orderDate)
          const month = date.getMonth()
          const day = date.getDay()
          const hours = date.getHours()
          item.time = month + "月" + day + "日" + hours + "时"
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