Component({
    properties: {
        innerText: {
            type: String
        }
    },
    data: {
        flag: true
    },
    methods: {
        hidePopup () {
            this.setData({
                flag: true
            });
        },
          
        showPopup () {
            this.setData({
                flag: false
            });
        }
    }
});