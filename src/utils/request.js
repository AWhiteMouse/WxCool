// mock配置文件
const ENV = require('../env');
// 请求域名
let API_HOST = ENV.host;
//获取应用实例
const app = getApp();

function requestWithCookie(url = '', data = '', fn, method = 'get', header = {}) {
    wx.request({
        url: API_HOST + url,
        method: method ? method : 'get',
        data: data,
        header: header ? header : {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cookie': 'ticket=' + app.globalData.ticket
        },
        success: function (res) {
            if (res && res.data.success) {
                // 直接将res.data.data传给回调函数，减少调用链条长度
                fn(res.data.data);
            } else {
                wx.showToast({
                    title: res.data.msg ? res.data.msg : '网络错误',
                    icon: 'none',
                    duration: 1500,
                    mask: true,
                });
            }
        },
        fail: function(error) {
            wx.showToast({
                title: error.errMsg ? error.errMsg : '网络错误',
                icon: 'none',
                duration: 1500,
                mask: true,
            });
        }
    });
}

function requestWithNoCookie(url = '', data = '', fn, method = 'get', header = {}) {
    wx.request({
        url: API_HOST + url,
        method: method ? method : 'get',
        data: data,
        header: header ? header : {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
            if (res && res.data.success) {
                // 直接将res.data.data传给回调函数，减少调用链条长度
                fn(res.data.data);
            } else {
                wx.showToast({
                    title: res.data.msg ? res.data.msg : '网络错误',
                    icon: 'none',
                    duration: 1500,
                    mask: true,
                });
            }
        },
        fail: function(error) {
            wx.showToast({
                title: error.errMsg ? error.errMsg : '网络错误',
                icon: 'none',
                duration: 1500,
                mask: true,
            });
        }
    });
}

module.exports = {
    requestWithCookie,
    requestWithNoCookie
};