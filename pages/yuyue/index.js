//index.js
//获取应用实例
const app = getApp()
const api = require('../../api/api.js')
import {
  getNearMer
} from '../../api/api.js'

import {
  checkLoginStatus
} from '../../utils/util.js'
Page({
  data: {
    visible1: false,
    current_scroll: 'tab0',
    currentTab: 0,
    info: {},
    times: [],
    list: [],
    active: {},
    isMen: 0
  },
  handleChangeScroll({
    detail
  }) {
    this.setData({
      current_scroll: detail.key
    });
  },
  handleClose1() {
    this.setData({
      visible1: false
    });
  },
  handlequed() {
    const that = this
    const days = this.data.currentTab
    const time = this.data.list[this.data.active].time.split('-')[0].split(':')[0]
    wx.navigateTo({
      url: '/pages/about/index?days=' + days + '&time=' + time + '&m=' + that.data.isMen + '&t=' + that.data.type,
    })
    this.setData({
      visible1: false
    });
  },
  setList(nowHour) {
    nowHour = parseInt(nowHour)
    const list = []
    if (this.data.currentTab == 0) {
      let i = nowHour
      while (i < 24) {
        let obj = {
          time: `${i}:00-${i == 23 ? 0 : i + 1}:00`
        }
        list.push(obj)
        i++
      }
    } else {
      for (let i = 0; i < 24; i++) {
        let obj = {
          time: `${i}:00-${i == 23 ? 0 : i + 1}:00`
        }
        list.push(obj)
      }
    }
    this.setData({
      list: list
    })
  },
  init() {
    api.getDate().then(res => {
      if (res.message == '000000') {
        const arr = []
        for (let i = 1; i < Object.keys(res.next_week).length; i++) {
          const temp = Object.keys(res.next_week[i])
          let obj = {
            date: res.next_week[i][temp[0]],
            day: temp[0]
          }
          if (i == 1) obj.active = true
          arr.push(obj)
        }
        this.setData({
          times: arr,
          nowHour: res.nowHour
        })
        this.setList(this.data.nowHour)
      }
    })
  },
  onLoad: function(options) {
    this.setData({
      isMen: options.m == 1 ? 1 : 0,
      type: options.t || ''
    })
    const store = app.globalData.tempStore
    const userInfo = app.globalData.userInfo
    this.setData({
      info: store || {},
      userInfo: userInfo
    })
    this.init()
    var that = this
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        that.setData({
          latitude: latitude,
          longitude: longitude
        })
        getNearMer({
          latitude: latitude,
          longitude: longitude
        }).then(res => {
          if (res.message == '000000') {
            if (!res.data[0]) {
              that.setData({
                hasNer: false
              })
            } else {
              that.setData({
                hasNer: true
              })
              app.globalData.nearStore = res.data
            }
          }
        })
      }
    })
  },
  //点击切换
  clickTab: function(e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      })
    }
    this.setList(this.data.nowHour)
  },
  clickYuY: function(e) {
    if (!checkLoginStatus()) {
      return
    }
    let index = e.currentTarget.dataset.index
    if (!this.data.hasNer && !this.data.isMen) {
      wx.showToast({
        title: '附近暂无门店',
        icon: 'none',
        duration: 2000
      })
      return
    }
    this.setData({
      active: index,
      visible1: true
    });
  }
})