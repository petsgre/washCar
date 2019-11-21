import util from '../../utils/util';

Component({
    options: {},
    /**
     * 组件的属性列表
     * 用于组件自定义设置
     */
    properties: {
        show: {
            type: Boolean,
            value: false,
            observer(newVal, oldVal, changedPath) {
                // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
                // 通常 newVal 就是新设置的数据， oldVal 是旧数据
                console.log(2);
            }
        }
    },

    /**
     * 私有数据,组件的初始数据
     * 可用于模版渲染
     */
    data: {
        platform: ''
    },
    /**
     * 组件的方法列表
     * 更新属性和数据的方法与更新页面数据的方法类似
     */
    lifetimes: {
        attached() {
            // 在组件实例进入页面节点树时执行
            wx.getSystemInfo({
                success: res => {
                    this.platform = res.platform;
                },
                fail: res => {
                    console.log('获取失败');
                }
            });
        }
    },
    attached() {
        // 在组件实例进入页面节点树时执行
        wx.getSystemInfo({
            success: res => {
                this.platform = res.platform;
            },
            fail: res => {
                console.log('获取失败');
            }
        });
    },
    methods: {
        _getUserInfo(e) {
            this.triggerEvent('onHidePop', e.detail);
        },
        tapCopyWeixin(e) {
            util.copyWords('baopinger2');
        },
        tapHidePop() {
            this.setData({
                show: false
            });
        }
    }
});
