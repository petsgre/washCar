// pages/tab/index.js
import {
  getCars,
  deleteCar
} from '../../api/api.js'
var app = getApp()
const {
  $Toast
} = require('../../iview/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    visible: false
  },
  modify(e) {
    app.globalData.tempCarInfo = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '../addinfor/index'
    })
  },
  askDeleteCar(e) {
    this.setData({
      activeIndex: e.currentTarget.dataset.index,
      visible: true
    })
  },
  handleClose() {
    this.setData({
      visible: false
    })
  },
  deleteCar(e) {
    const that = this
    const item = this.data.list[this.data.activeIndex]
    deleteCar({
      piId: item.piId
    }).then(res => {
      let list = that.data.list
      if (res.message == '000000') {
        list.splice(that.data.activeIndex, 1)
        that.setData({
          list: list,
          visible: false
        })
        $Toast({
          content: '删除成功',
          type: 'success'
        });
      }
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
    getCars().then(res => {
      if (res.message == '000000') {
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