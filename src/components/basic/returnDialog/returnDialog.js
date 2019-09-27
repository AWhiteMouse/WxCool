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
