// pages/tab/index.js
const api = require('../../api/api.js')
import {
  getCars,
  deleteCar,
  wxPay
} from '../../api/api.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    cepai: 0,
    xq: 0,
    userInfo: {},
    addNowDay: 0,
    hour: 0
  },
  orderDate() {
    const addNowDay = this.data.addNowDay
    const hour = this.data.hour
    const carId = this.data.list[this.data.cepai].piId
    const bak3 = this.data.bak3
    const that = this
    wxPay({
      proId: 2
    }).then(res => {
      const param = res.data;
      wx.requestPayment({
        timeStamp: param.timeStamp, // timeStamp一定要是字符串类型的
        nonceStr: param.nonceStr,
        package: param.package,
        signType: 'MD5',
        paySign: param.paySign,
        success: function (event) {
          const cooperMerId = that.data.nearStore[that.data.xq].cooperMerId
          api.orderDate({
            addNowDay: addNowDay,
            payOrderNo: param.pay_order_no,
            hour: hour,
            coorMerId: cooperMerId,
            feePrice: '',
            isClean: '',
            carId: carId,
            bak3: bak3
          }).then(res => {
            if (res.message == '000000') {
              wx.showToast({
                title: '支付成功',
                icon: 'success',
                duration: 2000
              });
              setTimeout(function () {
                wx.navigateTo({
                  url: '/pages/order/index?s=1',
                })
              }, 2000);
            }
          })
        },
        fail: function (error) { },
        complete: function () { }
      });
    })
  },
  bindPickerChange(e) {
    this.setData({
      cepai: e.detail.value
    })
  },
  cvbPickerChange(e) {
    this.setData({
      xq: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    const isMen = options.m == 1 ? 1 : 0
    const bak3 = options.t || ''
    let nearStore = app.globalData.nearStore
    if (isMen) {
      nearStore = []
      nearStore.push(app.globalData.tempStore)
    }
    this.setData({
      userInfo: app.globalData.userInfo,
      nearStore: nearStore,
      addNowDay: options.days,
      hour: options.time,
      bak3: bak3
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
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
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }

})