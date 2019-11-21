//index.js
//获取应用实例
const app = getApp()
import {
  getBanner, searhMerInfo,
  getUserByOpenId
} from '../../api/api.js';
import {
  invokelogin,
  checkAuth,
  deepExtend
} from '../../utils/util.js'
Page({
  data: {
    imgUrls: [],
    sorts: [{
      title: '预约',
      url: '../images/index_icon1.png',
      pageUrl: '../yuyue/index'
    }, {
      title: '门店',
      url: '../images/index_icon2.png',
      pageUrl: '../store/index'

    }, {
      title: '套餐',
      url: '../images/index_icon3.png',
      pageUrl: '../package/index'

    }, {
      title: '最新活动',
      url: '../images/index_icon4.png',
      pageUrl: '../activity/index'

    }],
    stores: []
  },
  toPage: function(e) {
    var pageName = e.currentTarget.dataset.page
    wx.navigateTo({
      url: pageName
    })
  },
  toDetail(e) {
    app.globalData.tempStore = this.data.stores[e.currentTarget.dataset.index]
    wx.navigateTo({
      url: '../detail/index'
    })
  },
  onLoad: function() {
    const that = this
    getBanner().then(function(data) {
      if (data.code == 200) {
        that.setData({
          imgUrls: data.data
        })
      }
    })
    searhMerInfo().then(res => {
      if (res.message == '000000') {
        that.setData({
          stores: res.data
        })
      }
    })
  }
})