Page({
  data: {
    winWidth: 0,
    winHeight: 0,
    currentTab: 0,
    imgUrls: '',
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    circular: true,
    image: "../../image/404.png",
    dataList: [{
        title: '僵尸带着武器来咯',
        img: '../../image/1.jpg',
        type: '类型：僵尸',
        time: '1'
      },
      {
        title: '僵尸很懊恼',
        img: '../../image/2.jpg',
        type: '类型：僵尸',
        time: '2'
      },
      {
        title: '僵尸有疑问',
        img: '../../image/3.jpg',
        type: '类型：僵尸',
        time: '3'
      },
      {
        title: '僵尸带着崇拜看着你',
        img: '../../image/4.jpg',
        type: '类型：僵尸',
        time: '4'
      },
      {
        title: '僵尸在画圈圈',
        img: '../../image/5.jpg',
        type: '类型：僵尸',
        time: '5'
      },
      {
        title: '僵尸很惊讶',
        img: '../../image/6.jpg',
        type: '类型：僵尸',
        time: '6'
      },
    ],

    she: [{
      title: '吃货僵来咯',
      img: '../../image/1.png',
      type: '类型：吃僵尸',
      time: '1'
    },
    {
      title: '吃货僵来咯',
      img: '../../image/9.jpg',
      type: '类型：吃僵尸',
      time: '2'
    },
    {
      title: '吃货僵',
      img: '../../image/10.jpg',
      type: '类型：吃僵尸',
      time: '3'
    },
    ],

    battle: [{
      title: '吃货僵来咯',
      img: '../../image/1.png',
      type: '类型：吃僵尸',
      time: '1'
    },
    {
      title: '吃货僵来咯',
      img: '../../image/9.jpg',
      type: '类型：吃僵尸',
      time: '2'
    },
    {
      title: '吃货僵',
      img: '../../image/10.jpg',
      type: '类型：吃僵尸',
      time: '3'
    },
    ]
  },
  onLoad: function(options) {
    const ghId = 'gh_3d2d48bf21a0'
    var _this = this;
    wx.request({
      url: 'https://www.haitong.site/back/auth/yy/xcx/banner/get/public',
      data: {
        ghId: ghId
      },
      method: 'POST',
      header: {
        'content-type': 'application/json;charset=UTF-8',
        'userid': 'yangfang'
      },
      success(res) {
        console.log("轮播图", res.data)
        if (res.data.code == 100) {
          _this.setData({
            imgUrls: res.data.data,
          });
        }

      }
    })

    var xcxList = wx.getStorageSync('xcxList')
    console.log("allgame", xcxList)
    _this.setData({
      xcxList: xcxList,
    });
  },
  onReady: function() {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        var windowWidth = res.windowWidth
        var windowHeight = res.windowHeight
        console.log('windowHeight', windowHeight)
        that.setData({
          winWidth: res.windowWidth,
          winHeight: 2150,
        });
      }
    });
  },
  // 滑动切换tab
  bindChange: function(e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  // 点击tab切换
  swichNav: function(e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  onShow: function() {

  },
  onHide: function() {

  },
  onUnload: function() {

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
})