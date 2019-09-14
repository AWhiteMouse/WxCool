Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 滚动数据列表
    dataList: {
      type: Array,
    },
    // 是否展示图片
    showImage: {
      type: Boolean,
      value: false
    },
    // 公共话术
    publicMsg: {
      type: String,
      value: ''
    },
    // 最大宽度
    maxWidth: {
      type: Number,
      value: 300
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      // 强制将数据条目数切换为10条
      // let dataList = this.properties.dataList;
      // const length = dataList.length;
      // if (10 == length) {
      //   dataList.push(dataList[0]);
      // } else if (10 > dataList) {

      // } else {

      // }
      // this.setProperties({
      //   dataList
      // });
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
});