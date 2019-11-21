import {
  getArea,
  searhMerInfo,
  getNearMer
} from '../../api/api.js'
const app = getApp()
Page({
  data: {
    markers: [],
    longitude: '',
    latitude: '',
    multiIndex: [-1, -1, -1],
    multiArray: [],
    area: [],
    stores: [],
    activeStore: null
  },
  toDetail(e) {
    app.globalData.tempStore = this.data.stores[e.currentTarget.dataset.index]
    wx.navigateTo({
      url: '../detail/index'
    })
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
  },
  getPare: function(arr) {
    const para = {
      provice: this.data.multiArray[0][arr[0]].code,
      city: this.data.multiArray[1][arr[1]] ? (this.data.multiArray[1][arr[1]].code || '') : '',
      dict: this.data.multiArray[2][arr[2]] ? (this.data.multiArray[2][arr[2]].code || '') : '',
    }
    return para
  },
  bindMultiPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    if (this.data.multiIndex[0] == -1) return
    this.search(e.detail.value)
  },
  search(value) {
    const that = this
    searhMerInfo(this.getPare(value)).then(res => {
      if (res.message == '000000') {
        that.setData({
          stores: res.data,
          markers: []
        })
      }
    })
  },
  getCity: function(index) {
    let arr = []
    const area = this.data.area
    arr = area[index].child.map((item) => {
      return {
        name: item.name,
        code: item.code,
      }
    })
    return arr
  },
  getDict: function(index) {
    const proviceIndex = this.data.multiIndex[0]
    let arr = []
    const area = this.data.area
    arr = area[proviceIndex].child[index].child.map((item) => {
      return {
        name: item.name,
        code: item.code,
      }
    })
    return arr
  },
  bindMultiPickerColumnChange: function(e) {
    // if (e.detail.column !== 0 && this.data.multiIndex[0] == -1) {
    //   this.data.multiIndex[0] = 0
    // }
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    var area = this.data.area
    switch (e.detail.column) {
      case 0:
        const activeCity = this.getCity(e.detail.value)

        data.multiArray[1] = activeCity
        let _activeDict = area[e.detail.value].child[0].child
        if (_activeDict.length > 0) {

        } else {
          _activeDict = [{
            name: ''
          }]
        }
        data.multiArray[2] = _activeDict

        data.multiIndex = [e.detail.value, -1, -1]
        break;
      case 1:
        let activeDict = this.getDict(e.detail.value)
        if (activeDict.length == 0) {
          activeDict = [{
            name: ''
          }]
        }
        data.multiArray[2] = activeDict
        data.multiIndex[1] = e.detail.value
        data.multiIndex[2] = -1
        break;
      case 2:
        data.multiIndex[2] = e.detail.value

        break;

    }
    this.setData(data)
  },
  getArea: function() {
    var that = this
    wx.getStorage({
      key: 'area',
      success(res) {
        const data = res.data
        const activeProvice = []
        const activeDict = [];
        data.forEach((item, index) => {
          activeProvice.push({
            name: item.name,
            code: item.code,
          })
        })
        that.setData({
          area: res.data
        })
        const activeCity = that.getCity(0)
        that.setData({
          multiArray: [
            activeProvice, activeCity, [{
              name: ''
            }]
          ]
        })
      },
      fail(err) {
        getArea().then(res => {
          if (res.message == '000000') {
            const data = res.data
            wx.setStorage({
              key: "area",
              data: res.data
            })

            const activeProvice = []
            const activeDict = [];
            data.forEach((item, index) => {
              activeProvice.push({
                name: item.name,
                code: item.code,
              })
            })
            that.setData({
              area: res.data
            })
            const activeCity = that.getCity(0)
            that.setData({
              multiArray: [
                activeProvice, activeCity, [{
                  name: ''
                }]
              ]
            })
          }
        })
      }
    })
  },
  onLoad: function(option) {
    var that = this
    this.getArea()
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
              that.search(that.data.multiIndex)
              return
            }
            that.setData({
              stores: res.data,
              multiIndex: [-1, -1, -1]
            })
            var markers = []
            res.data.forEach(function(item, index) {
              markers.push({
                iconPath: "../images/weiz.png",
                id: index,
                latitude: item.latitude,
                longitude: item.longitude,
                width: 30,
                height: 30
              })
            })
            that.setData({
              markers: markers
            })
          }
        })
      }
    })
  }
})