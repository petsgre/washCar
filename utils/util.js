import {
  login,
  login2
} from '../api/api.js'
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function _login1() {
  return new Promise((resolve, reject) => {
    wx.login({
      success: res => {
        resolve(res)
      },
      fail: () => {
        reject('微信登录失败');
      }
    })
  })
}

function _login2() {
  return new Promise((resolve, reject) => {
    wx.getUserInfo({
      success: res => {
        resolve(res)
      },
      fail: () => {
        reject('授权被拒绝');
      }
    });
  })
}

function invokelogin(info) {
  let keys = null
  return new Promise((resolve, reject) => {
    _login1().then(res1 => {
      const p = login(res1)
      p.then(res => {
        if (!JSON.parse(res).openid) {
          wx.showToast({
            title: '授权失败，请重试',
            icon: 'none'
          })
          reject(res)
        }
      })
      return p
    }).then(res2 => {
      res2 = JSON.parse(res2)
      keys = res2.session_key
      return _login2()
    }).then(res3 => {
      const encryptedData = res3.encryptedData;
      const iv = res3.iv;
      return login2({
        encryptedData: encryptedData,
        iv: iv,
        keys: keys
      })
    }).then(res4 => {
      resolve(res4)
    }).catch(err => {
      console.log(err)
      reject(err)
    })

  })
}

const deepExtend = function(out) {
  out = out || {};

  for (var i = 1; i < arguments.length; i++) {
    var obj = arguments[i];

    if (!obj)
      continue;

    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === 'object')
          out[key] = deepExtend(out[key], obj[key]);
        else
          out[key] = obj[key];
      }
    }
  }

  return out;
};
const isNull = function(value) {
  return value == undefined || value == null
}

function formatDate(date) {
  let year = date.getFullYear()
  let month = date.getMonth()
  let day = date.getDate()
  let hours = date.getHours()
  let minute = date.getMinutes()
  let second = date.getSeconds()
  return `${year}-${prefixInteger(month)}-${prefixInteger(day)} ${prefixInteger(hours)}:${prefixInteger(minute)}:${prefixInteger(second)}`
}

function prefixInteger(num, length) {
  length = length || 2
  return ("0000000000000000" + num).substr(-length);
}

function throttle(fn, wait) {
  var time = null;
  var counter = null
  return function() {
    if (time == null) {
      time = 1
      fn()
      counter = setTimeout(function() {
        time = null
      }, wait)
    } else {
      return
    }
  }
}

const checkLoginStatus = () => {
  const app = getApp()
  console.log(app)
  if (!app.globalData.userInfo) {
    wx.showToast({
      title: '您尚未登录，请登录后再预定',
      icon: 'none',
      duration: 2000,
      complete: function() {
        setTimeout(function() {
          wx.switchTab({
            url: '/pages/personal/index',
          })
        }, 2000)
      }
    })

    return false
  }
  return true
}
module.exports = {
  formatTime,
  invokelogin,
  deepExtend,
  isNull,
  formatDate,
  throttle,
  checkLoginStatus
}