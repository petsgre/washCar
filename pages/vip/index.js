// pages/vip/index.js
const app = getApp()
import {
  switchTab
} from '../../utils/router.js'
import {
  getVipInfo,
  wxPay
} from '../../api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {},
    showBtn:false
  },
  handleBuy(e) {
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
        success: function(event) {
          wx.showToast({
            title: '支付成功',
            icon: 'success',
            duration: 2000
          });
          this.getVipInfo()
        },
        fail: function(error) {},
        complete: function() {
          // 支付完成
        }
      });
    })
  },
  getVipInfo(){
    const that = this
    getVipInfo().then(res => {
      if (res.message == '000000') {
        const begin = new Date(res.data.createTime1)
        const end = new Date(res.data.end_time1)
        res.data.time = begin.getMonth() + '月' + begin.getDay() + '日' + '-' + end.getMonth() + '月' + end.getDay() + '日'
        that.setData({
          info: res.data,
          showBtn:!res.data
        })
      }else{
        that.getNoBuyVipInfo().then(res =>{
          const begin = new Date(res.data.createTime1)
          const end = new Date(res.data.end_time1)
          res.data.time = begin.getMonth() + '月' + begin.getDay() + '日' + '-' + end.getMonth() + '月' + end.getDay() + '日'
          that.setData({
            info: res.data,
            showBtn: true
          })
        })
      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getVipInfo()
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