//index.js
//获取应用实例
const app = getApp();
const IMGCONFIG = require('../../utils/imgConfig');
const AJAXCONFIG = require('../../utils/ajaxConfig');
const REQUEST = require('../../utils/request');

Page({
    data: {
        testImage: IMGCONFIG.TEST,
    },

    onLoad: function () {
        // 👇这里是发送请求的示例
        REQUEST.request(
            AJAXCONFIG.TEST,
            {},
            function(res) {
                console.info(res);
            }
        );

        // 👇以下为微信小程序自动生成代码，可根据实际情况进行操作
        if(app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            });
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                });
            };
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo;
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    });
                }
            });
        }
    },

    getUserInfo: function (e) {
        app.globalData.userInfo = e.detail.userInfo;
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        });
    }
});
