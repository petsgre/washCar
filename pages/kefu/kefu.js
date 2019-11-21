import config from '../../config';
import util from '../../utils/util';
import api from '../../api/api';
import router from '../../utils/router';

const app = getApp();

Page({
	data: {
		activeIndex: 1,
		customerData: undefined, // 数据
		pageAction: '', // 页面动作
		pageParams: undefined // 页面携带的参数
	},
	onLoad: function (options) {
		// 打印
		util.log('请求域名：', config.baseUrl);
		util.log('业务域名：', config.webviewBaseUrl);


		wx.hideTabBar(); // 隐藏tabbar

		//this.generateJumpData(options);
	},
	onShow: function (options) {
		 //wx.hideTabBar(); // 隐藏tabbar

		/*util.isAuthed().then(() => {
			if (app.globalData.isLogined) {
				this.handleData();
			} else {
				this.login();
			}
		}, () => {
			router.replaceAll('/pages/auth/auth');
		});*/
	},
	/*login: function(params) {
		wx.showLoading({
			title: '正在加载'
		});
		util.login(params).then(() => {
			wx.hideLoading();
			// 需要跳转
			util.getUserInfo(() => {
				this.handleData();
			});
		}, (code) => {
			let tips = '';
			if (code === -1001) {
				tips = '微信登录失败';
			} else if (code === -1003) {
				tips = '服务器鉴权失败';
			} else {
				tips = '登录失败';
			}
			wx.hideLoading();
			wx.showToast({
				title: tips,
				icon: 'none'
			});
		});
	},*/
	pickTime:function(ev){
		var idx = ev.currentTarget.dataset.idx;
		this.setData({
			activeIndex: idx
		});
	},
	orderInfo:function(Object){
		console.log(Object);
	}

	/*onShareAppMessage(object) {
		// 这个参数结构如下
		if (object.from === 'button') {
			config.quesShareData.path = '/pages/customer/customer?action=answer_question&shareid=' + wx.getStorageSync('sessionid');
			return config.quesShareData;
		}
		return getApp().appShare();
	}*/
});
