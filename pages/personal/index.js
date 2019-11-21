// pages/tab/index.js
const app = getApp()
const api = require('../../api/api.js')

import {
  invokelogin,
  deepExtend
} from '../../utils/util.js'
import {
  getUserByOpenId,
  getInfo
} from '../../api/api.js'

function formatData(data) {
  data.forEach(function(item) {
    let date = new Date(item.orderDate)
    const month = date.getMonth()
    const day = date.getDay()
    const hours = date.getHours()
    item.time = month + "月" + day + "日" + hours + "时"
  })
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: {},
    list1: [],
    list2: [],
    list3: [],
  },
  _getUserInfo(e) {
    this.ongetUserInfo(e.detail)
  },
  _tapOnAuth(e) {
    this.setData({
      show: false
    });
  },
  ongetUserInfo: function(e) {
    const that = this
    if (e.userInfo) {
      // 登录
      invokelogin(e.userInfo).then(res => {
        if (res.message == '000000') {
          that.extendUserInfo(res.data)
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },
  extendUserInfo: function(userInfo) {
    const that = this
    getUserByOpenId({
      openId: userInfo.openId
    }).then(res => {
      if (res.message == '000000') {
        deepExtend(userInfo, res.data)
        wx.setStorageSync('userInfo', userInfo)
        app.globalData.userInfo = userInfo
        that.onLoad()
        that.getInfo()
      }
    })
  },
  init() {
    const that = this
    for (let i = 1; i < 4; i++) {
      api.showPersonStatusOrder({
        status: i
      }).then(res => {
        if (res.message == '000000') {
          formatData(res.data)
          const obj = {}
          obj['list' + i] = res.data
          that.setData(obj)
        }
      })
    }
  },
  getLocation() {
    const that = this
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        wx.request({
          url: `https://apis.map.qq.com/ws/geocoder/v1/?location=${latitude},${longitude}&key=RMLBZ-QBKWI-DHNGL-5D3OM-AFCB5-7JFWN&get_poi=1`,
          method: 'get',
          success(res) {
            if (res.data.status == 0) {
              const user = that.data.user
              user._city = res.data.result.ad_info.city
              that.setData({
                user: user
              })
            }
          },
          fail(error) {
            // reject(error.data);
          }
        });
      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const that = this
    this.setData({
      user: app.globalData.userInfo
    })
    if (!this.data.user) {
      return
    }
    this.getLocation()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  getInfo() {
    const that = this
    getInfo({
      id: app.globalData.userInfo.id
    }).then(res => {
      if (res.message == '000000') {
        const status = {}
        for (let i = 0; i < res.data.statusList.length; i++) {
          status[res.data.statusList[i].status] = res.data.statusList[i].count
        }
        that.setData({
          status: status
        })
      }
    })

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    const that = this
    if (!this.data.user) {
      return
    }
    this.getInfo()
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