// mock配置文件
const ENV = require('../env');
// 请求域名
let API_HOST = ENV.host;
// 判断是否在开发状态，切换数据入口（Mock或http）
let DEBUG = API_HOST == '' || API_HOST == null;
var Mock = require('mock');
//获取应用实例
const app = getApp();
const AJAXCONFIG = require('./ajaxConfig');

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
            if (res && res.success) {
                // 直接将res.data传给回调函数，减少调用链条长度
                fn(res.data);
            } else {
                wx.showToast({
                    title: res.msg ? res.msg : '网络错误',
                    icon: 'none',
                    duration: 1500,
                    mask: true,
                });
            }
        },
        fail: function(error) {
            wx.showToast({
                title: error.data.msg ? error.data.msg : '网络错误',
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
            if (res && res.success) {
                // 直接将res.data传给回调函数，减少调用链条长度
                fn(res.data);
            } else {
                wx.showToast({
                    title: res.msg ? res.msg : '网络错误',
                    icon: 'none',
                    duration: 1500,
                    mask: true,
                });
            }
        },
        fail: function(error) {
            wx.showToast({
                title: error.data.msg ? error.data.msg : '网络错误',
                icon: 'none',
                duration: 1500,
                mask: true,
            });
        }
    });
}

function test(data = '', fn, method = 'get', header = {}) {
    if (!DEBUG) {
        requestWithNoCookie(AJAXCONFIG.TEST, data, fn, method, header);
    } else {
        // 模拟数据
        var res = Mock.mock({
            code: 200,
            msg: '请求成功',
            success: true,
            'data|10': [{
                'id|+1': 1,
                'img': '@image("200x100", "#4A7BF7","#fff","pic")',
                'title': '@ctitle(3,8)',
                'city': '@county(true)',
                'stock_num': '@integer(0,100)', //库存数量  
                'marketing_start': '@datetime()',
                'marketing_stop': '@now()',
                'price': '@integer(100,2000)', //现价，单位：分  
                'original_price': '@integer(100,3000)'
            }],
            pageDto: {
                pageNum: 1,
                pageSize: 10,
                totalSize: 2,
            }
        });
        // 输出结果
        // console.log(JSON.stringify(res, null, 2));
        fn(res);
    }
}

module.exports = {
    test,
};