// pages/comment/index.js
const api = require('../../api/api.js')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    list: []
  },
  delDialog(e) {
    const index = e.currentTarget.dataset.index
    const that = this
    wx.showModal({
      title: '提示',
      content: '要删除图片吗',
      success(res) {
        if (res.confirm) {
          let list = that.data.list
          list.splice(index, 1)
          that.setData({
            list: list
          })
        }
      }
    })
  },
  handleInput(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  warnStore() {
    const that = this
    api.warnStore({
      merId: that.data.merId,
      phone: that.data.phone,
      picUrl: that.data.list.toString()
    }).then(res => {
      if (res.message == '000000') {
        wx.showToast({
          title: '提交成功',
          icon: 'none',
          duration: 2000
        })
        setTimeout(function() {
          wx.navigateBack({
            delta: 1
          })
        }, 2000)
      }
    })
  },
  choose() {
    const that = this
    wx.chooseImage({
      count: 1,
      success(res) {
        const tempFilePaths = res.tempFilePaths
        api.uploadFile({
          tempFilePaths: tempFilePaths
        }).then(res => {
          res = JSON.parse(res)
          if (res.message == '000000') {
            let list = that.data.list
            list.push(res.data)
            that.setData({
              list: list
            })
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      merId: options.merId
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