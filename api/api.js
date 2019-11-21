import request from 'request';
import config from '../config';
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
const transJson = (data) => {
  let json = null;
  try {
    json = JSON.parse(data);
  } catch (e) {
    json = {};
  }
  return json;
};
const getBasePara = function() {
  const para = {}
  try {
    var value = wx.getStorageSync('userInfo')
    if (value) {
      para.openId = value.openId
    }
  } catch (e) {}
  return para
}
module.exports = {
  warnStore: (params = {}, succ, fail) => {
    return request.get('/xcx/user/insertComplaintRecord', deepExtend({}, params, getBasePara()));
  },
  getCoupons: (params = {}, succ, fail) => {
    return request.get('/xcx/yhj/showAcivityMer', deepExtend({}, params, getBasePara()));
  },
  getMerInfoById: (params = {}, succ, fail) => {
    return request.get('/xcx/order/getMerInfoById', deepExtend({}, params, getBasePara()));
  },
  comment: (params = {}, succ, fail) => {
    return request.get('/xcx/user/insertOrderEvalua', deepExtend({}, params, getBasePara()));
  },
  getMerInfoById: (params = {}, succ, fail) => {
    return request.get('/xcx/order/getMerInfoById', deepExtend({}, params, getBasePara()));
  },
  wxRefund: (params = {}, succ, fail) => {
    return request.get('/xcx/wxRefund', deepExtend({}, params, getBasePara()));
  },
  getComment: (params = {}, succ, fail) => {
    return request.get('/xcx/user/showOrderEvaluaList', deepExtend({}, params, getBasePara()));
  },
  cancleOrder: (params = {}, succ, fail) => {
    return request.get('/xcx/user/cancleOrderInfo', deepExtend({}, params, getBasePara()));
  },
  showPersonStatusOrder: (params = {}, succ, fail) => {
    return request.get('/xcx/user/showPersonStatusOrder', deepExtend({}, params, getBasePara()));
  },
  getVipInfo: (params = {}, succ, fail) => {
    return request.get('/xcx/xcxIndex/showVipInfo', deepExtend({}, params, getBasePara()));
  },
  orderDate: (params = {}, succ, fail) => {
    return request.get('/xcx/order/orderDate', deepExtend({}, params, getBasePara()));
  },
  getDate: (params = {}, succ, fail) => {
    return request.get('/xcx/order/getDate', deepExtend({}, params, getBasePara()));
  },
  getInfo: (params = {}, succ, fail) => {
    return request.get('/xcx/user/getInfo', deepExtend({}, params, getBasePara()));
  },
  getUserByOpenId: (params = {}, succ, fail) => {
    return request.get('/xcx/user/getUserByOpenId', deepExtend({}, params, getBasePara()));
  },
  getCarModel: (params = {}, succ, fail) => {
    return request.get('/xcx/carManager/showCarModel', deepExtend({}, params, getBasePara()));
  },
  deleteCar: (params = {}, succ, fail) => {
    return request.get('/xcx/carManager/deleteParkInfo', deepExtend({}, params, getBasePara()));
  },
  modifyCar: (params = {}, succ, fail) => {
    return request.get('/xcx/carManager/modifyParkInfo', deepExtend({}, params, getBasePara()));
  },
  getCars: (params = {}, succ, fail) => {
    return request.get('/xcx/carManager/showPersonCarList', deepExtend({}, params, getBasePara()));
  },
  wxPay: (params = {}, succ, fail) => {
    return request.get('/xcx/wxPay', deepExtend({}, params, getBasePara()));
  },
  getArea: (params = {}, succ, fail) => {
    return request.get('/xcx/order/getArea', deepExtend({}, params, getBasePara()));
  },
  showYhjList: (params = {}, succ, fail) => {
    return request.get('/xcx/yhj/showYhjList', deepExtend({}, params, getBasePara()));
  },
  showMyYhjList: (params = {}, succ, fail) => {
    return request.get('/xcx/yhj/showMyYhjList', deepExtend({}, params, getBasePara()));
  },
  searhMerInfo: (params = {}, succ, fail) => {
    return request.get('/xcx/xcxIndex/searhMerInfo', deepExtend({}, params, getBasePara()));
  },
  getNearMer: (params = {}, succ, fail) => {
    return request.get('/xcx/position/getNearMer', deepExtend({}, params, getBasePara()));
  },
  login: (params = {}, succ, fail) => {
    return request.get('/xcx/login', deepExtend({}, params, getBasePara()));
  },
  login2: (params = {}, succ, fail) => {
    return request.get('/xcx/login2', deepExtend({}, params, getBasePara()));
  },
  // 首页数据接口
  getIndexData: (params = {}, succ, fail) => {
    return request.get('/user/getCustomInfo', deepExtend({}, params, getBasePara()));
  },
  getCustomInfo: (params = {}, succ, fail) => {
    return request.get('/user/getCustomInfo');
  },
  getBanner: (params = {}, succ, fail) => {
    return request.get('/xcx/xcxIndex/showBannerInfo', deepExtend({}, params, getBasePara()));
  },
  /* 阅读文件 */
  setQuestionareRead: (params = {}, succ, fail) => {
    return request.get('/question/updateIsRead', deepExtend({}, params, getBasePara()));
  },
  /* 修改个人信息 */
  modifyUserInfo: (params = {}, succ, fail) => {
    return request.get('/user/updateUserInfo', deepExtend({}, params, getBasePara()));
  },
  /* 查询我的问卷 */
  getUserQues: (params = {}, succ, fail) => {
    return request.get('/user/showMyQuestion', deepExtend({}, params, getBasePara()));
  },
  /* 获得数据 */
  getMyAnswer: (params = {}) => {
    return request.get('/question/showMyAnwer', deepExtend({}, params, getBasePara()));
  },
  /* 发送开始定制方案的请求 */
  beginPlan: (params = {}) => {
    return request.get('/plan/clickBeginPlan', deepExtend({}, params, getBasePara()));
  },
  /* 获得方案信息 */
  getPlanListInfo: (params = {}) => {
    return request.get('/plan/clickAddProductBtn', deepExtend({}, params, getBasePara()));
  },
  /* 查看产品是不是已经存在 */
  checkProductExists: (params = {}) => {
    return request.get('/plan/juageProductIsOk', deepExtend({}, params, getBasePara()));
  },
  /* 获得产品需要填写的信息 */
  getPlanNeedFillInfo: (params = {}) => {
    return request.get('/plan/uiIsNeedAnswerView', deepExtend({}, params, getBasePara()));
  },
  /* 填写信息 */
  addPlanProductFillInfo: (params = {}) => {
    return request.get('/plan/addProductDetail', deepExtend({}, params, getBasePara()));
  },
  /* 刷新plan */
  showSelectedPlan: (params = {}) => {
    return request.get('/plan/showPlanDetail', deepExtend({}, params, getBasePara()));
  },
  /* 删除某个方案 */
  deleteSelectedPlan: (params = {}) => {
    return request.get('/plan/deletePlanProduct', deepExtend({}, params, getBasePara()));
  },
  /* 生成解读方案 */
  postPlanData: (params = {}) => {
    return request.post('/plan/clickBtngeneratePlanView', deepExtend({}, params, getBasePara()));
  },
  /* 查看方案里的产品详情 */
  getPlanProductData: (params = {}) => {
    return request.get('/plan/showOnePersonProductDetail', deepExtend({}, params, getBasePara()));
  },
  /* 上传文件 */
  uploadFile: (params = {}) => {
    return new Promise((resolve, reject) => {
      const formData = deepExtend({}, {
        file: params.tempFilePaths[0]
      }, getBasePara())
      wx.uploadFile({
        url: config.baseUrl + '/xcx/xcxIndex/uploadPic',
        filePath: params.tempFilePaths[0],
        name: 'file',
        formData: formData,
        header: {
          'Content-Type': 'application/json; charset=UTF-8'
        },
        success(res) {
          resolve(res.data)
        }
      })
    });
  },
  /* 支付接口 */
  requestPay: (params = {}) => {
    return new Promise((resolve, reject) => {
      params.openid = wx.getStorageSync('sessionid');
      wx.request({
        url: config.baseUrl + '/xcx/wxPay',
        method: 'GET',
        data: deepExtend({}, params, getBasePara()),
        success(res) {
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
              resolve();
            },
            fail: function(error) {
              reject(error);
            },
            complete: function() {
              // 支付完成
            }
          });
        },
        fail(error) {
          reject(error);
        }
      });
    });
  }
};