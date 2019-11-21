// pages/tab/index.js
import {
  getCarModel,
  modifyCar
} from '../../api/api.js'
var app = getApp()
import {
  isNull
} from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['轿车', 'SUV'],
    cew: ['A', 'B', 'C', 'D', 'E', 'F'],
    xiaoq: ['东方技校', '养老院'],
    xqq: 0,
    index: 0,
    cewindex: 0,
    brandIndex: 0,
    modelIndex: 0,
    piId: ''
  },
  bindPickerChange(e) {
    this.setData({
      index: e.detail.value
    })
  },
  brandPickerChange(e) {
    this.setData({
      brandIndex: e.detail.value,
      modelArray: this.data.brandArray[e.detail.value].child,
      modelIndex: 0
    })
  },
  modelPickerChange(e) {
    this.setData({
      modelIndex: e.detail.value
    })
  },
  cewPickerChange(e) {
    this.setData({
      cewindex: e.detail.value
    })
  },
  xiaoqPickerChange(e) {
    this.setData({
      xqq: e.detail.value
    })
  },
  bindKeyInput: function(e) {
    const key = e.currentTarget.dataset.key
    const data = {}
    data[key] = e.detail.value
    this.setData(data)
  },
  save() {
    if (isNull(this.data.contacts)) {
      wx.showToast({
        title: '请填写联系人',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (isNull(this.data.contactPhone)) {
      wx.showToast({
        title: '请填写联系人电话',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (isNull(this.data.carNum)) {
      wx.showToast({
        title: '请填写车牌',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (!this.data.contactPhone.match(/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/)) {
      wx.showToast({
        title: '手机号格式不正确',
        icon: 'none',
        duration: 2000
      })
      return
    }
    const req = {
      carType: this.data.index == 1 ? 2 : 1,
      contacts: this.data.contacts || '',
      contactPhone: this.data.contactPhone || '',
      carNum: this.data.carNum || '',
      villageId: 1,
      carSpaceNum: this.data.cew[this.data.cewindex] + (this.data.num || ''),
      piId: this.data.piId,
      brand: this.data.brandArray[this.data.brandIndex].cmId,
      model: this.data.modelArray[this.data.modelIndex].cmId
    }
    modifyCar(req).then(res => {
      console.log(res)
      if (res.message == '000000') {
        wx.navigateBack({
          delta: 1
        })
      }
    })
  },
  init(tempCarInfo) {
    const that = this
    this.data.brandArray.forEach(function(item, index) {
      if (item.cmId == tempCarInfo.carBrand) {
        that.setData({
          brandIndex: index,
          modelArray: item.child,
        })
        item.child.forEach(function(item, index) {
          if (item.cmId == tempCarInfo.carModel) {
            that.setData({
              modelIndex: index
            })
          }
        })
      }
    })
    this.data.cew.forEach(function(item, index) {
      if (item == tempCarInfo.carSpaceNum[0]) {
        that.setData({
          cewindex: index,
          num: tempCarInfo.carSpaceNum.substring(1) || ""
        })
      }
    })

    this.setData({
      contacts: tempCarInfo.contacts,
      contactPhone: tempCarInfo.contactsPhone,
      carNum: tempCarInfo.carNum,
      index: tempCarInfo.carType == 1 ? 0 : 1,
      piId: tempCarInfo.piId
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const tempCarInfo = app.globalData.tempCarInfo
    delete app.globalData.tempCarInfo
    const that = this
    getCarModel().then(res => {
      if (res.message == '000000') {
        that.setData({
          brandArray: res.data,
          modelArray: res.data[0].child
        })
        tempCarInfo && that.init(tempCarInfo)
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