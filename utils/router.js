/*
*   支持如下调用：
*   router.push({
*       path: 'ddd',
*       query: {
*           name: 'hello'
*       }
*   });
* */
function param2String(data) {
    if (data == null) {
        return '';
    }
    if (typeof data !== 'object') {
        return String(data);
    }
    let str = '';
    for (const i in data) {
        if (data.hasOwnProperty(i)) {
            str += `&${i}=${data[i]}`;
        }
    }
    return str ? str.slice(1) : '';
}

function string2Param(str) {
    if (typeof str !== 'string') {
        return {};
    }
    if (str[0] === '?') {
        str = str.slice(1);
    }
    let data = {};
    const sop = str.split('&');
    for (const i in sop) {
        if (sop[i]) {
            let items = sop[i].split('=');
            if (items.length == 2) {
                data[items[0]] = items[1];
            }
        }
    }
    return data;
}

function getRouteData(data) {
    if (typeof data == 'string') {
        return data;
    }
    let ret = param2String(data.query);
    return data.path + (ret ? '?' + ret : '');
}


function push(data) {
    wx.navigateTo({
        url: getRouteData(data)
    });
}

function back(num) {
    wx.navigateBack(num || 1);
}

function replace(data) {
    wx.redirectTo({
        url: getRouteData(data)
    });
}

function switchTab(data) {
    wx.switchTab({
        url: getRouteData(data, true)
    });
}

function replaceAll(data) {
    wx.reLaunch({
        url: getRouteData(data)
    });
}

module.exports = {
    back, // 返回 等同于navigateBack
    push, // 跳转到页面 等同于navigateTo
    replace, // 替换当前页面 等同于redirectTo
    replaceAll, // 替换所有页面 等同于reLaunch
    switchTab, // 跳转到tabbar页面  等同于switchTab
    string2Param, // url string 转换成 object
    param2String //  object 转换成 url string
};
