// pages/order/index.js
const api = require('../../api/api.js')
import { formatDate} from '../../utils/util.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: 1,
    visible: false,
    list: []
  },
  toMen(e){
    const id = this.data.list[e.currentTarget.dataset.index].coorMerId
    wx.navigateTo({
      url: '../detail/index?id='+id
    })
  },
  toComment(e){
    app.globalData.tempOrder = this.data.list[e.currentTarget.dataset.index]
    wx.navigateTo({
      url: '../comment/index'
    })
  },
  again(e) {
    const that = this
    const merId = this.data.list[e.currentTarget.dataset.index].coorMerId
    api.getMerInfoById({
      merId: merId
    }).then(res => {
      if (res.message == '000000') {
        app.globalData.tempStore = res.data
        wx.navigateTo({
          url: '../yuyue/index?m=1'
        })
      }
    })
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
    const payOrderNo = this.data.list[index].payOrderNo
    api.wxRefund({
      'amount': 1,
      'incrementId': payOrderNo,
      'productId': 1,
      'amount': 1,
      'sku': 1,
      'name': 1
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
        wx.showToast({
          title: '取消成功',
          icon: 'none',
          duration: 2000
        });
      })
    })
  },
  toDetail(e) {
    app.globalData.tempOrder = this.data.list[e.currentTarget.dataset.index]
    wx.navigateTo({
      url: '../orderDetail/index'
    })
  },
  getList() {
    const that = this
    api.showPersonStatusOrder({
      status: this.data.status
    }).then(res => {
      if (res.message == '000000') {
        res.data.forEach(function(item) {
          let time = item.orderDate
          if (that.data.status == 3){
            time = item.cancelTime
          }
          if (that.data.status == 2){
            time = item.operatorEndtime
          }
          let date = new Date(time)
          item.time = formatDate(date)
        })
        that.setData({
          list: res.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      status: options.s || '1'
    })
    switch (this.data.status) {
      case '1':
        wx.setNavigationBarTitle({
          title: '正在预约'
        })
        break;
      case '2':
        wx.setNavigationBarTitle({
          title: '已完成'
        })
        break;
      case '3':
        wx.setNavigationBarTitle({
          title: '已取消'
        })
        break;
    }
    this.getList()
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