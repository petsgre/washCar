import {
  baseUrl
} from '../config';

const request = (url, options) => {
  return new Promise((resolve, reject) => {
    let data = options.data || {};
    if (!data.openId) {
      // wx.showToast({
      //   title: 'no openId',
      // })
    }
    wx.request({
      url: `${baseUrl}${url}`,
      method: options.method,
      data: data,
      header: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
      success(request) {
        if (request.statusCode == 500) {
          wx.showToast({
            title: '抱歉，服务器异常，请联系管理员',
            icon: 'none',
            duration: 2000
          })
          reject(request.data);
          return
        }
        if (request.statusCode == 401 || request.data.message == '400001') {
          wx.showToast({
            title: '请授权登录',
            icon: 'none',
            duration: 2000
          })
          setTimeout(() => {
            wx.switchTab({
              url: '../personal/index'
            });
          }, 2000)
          return
        }
        resolve(request.data);
      },
      fail(error) {
        reject(error.data);
      }
    });
  });
};

const get = (url, op = {}) => {
  return request(url, {
    method: 'GET',
    data: op
  });
};

const post = (url, op) => {
  return request(url, {
    method: 'POST',
    data: op
  });
};


module.exports = {
  get,
  post
};