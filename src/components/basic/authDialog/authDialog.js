const IMGCONFIG = require('../../utils/imgConfig');
const app = getApp();
Component({
  properties: {
    innerText: {
      type: String
    },
    buttonText: {
      type: String,
      value: '返回'
    }
  },
  data: {
    flag: true,
    defaultImg : IMGCONFIG.imgConfig
  },
  methods: {
    hidePopup() {
      this.setData({
        flag: true
      });
    },

    showPopup() {
      this.setData({
        flag: false
      });
    },
    cancel() {
      this.setData({
        flag: true
      });
    },
    next() {
      this.triggerEvent('next');
    },
    getUserInfo(e) {
      const me = this;
      const userInfo = e.detail.userInfo;
      app.globalData.userInfo = userInfo;
      if(userInfo) {
        wx.setStorageSync('USERINFO', userInfo);
      }
    }
  }
});
