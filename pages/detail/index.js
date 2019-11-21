// pages/detail/index.js
const app = getApp()
const api = require('../../api/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {},
    items: [{
        name: '1',
        value: '固定位洗',
        checked: 'true'
      },
      {
        name: '2',
        value: '车位洗'
      }
    ],
    radio: 1
  },
  warn(){
    wx.navigateTo({
      url: '../warn/index?merId=' + this.data.info.cooperMerId
    })
  },
  radioChange: function(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.setData({
      radio: e.detail.value
    })
  },
  toYuyue() {
    const that = this
    app.globalData.tempStore = this.data.info
    wx.navigateTo({
      url: '../yuyue/index?m=1' + '&t=' + that.data.radio
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let store = app.globalData.tempStore
    if (options.id) {
      api.getMerInfoById({
        merId: options.id
      }).then(res => {
        if (res.message == '000000') {
          store = res.data
          this.setData({
            info: store
          })
          delete app.globalData.tempStore
        }
      })
      return
    }
    this.setData({
      info: store
    })
    delete app.globalData.tempStore
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