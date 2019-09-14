Component({
  properties: {
    resultData: {
      type: Number
    },
    imgUrl: {
      type: String
    }
  },
  data: {
    flag: true
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
    }
  }
});