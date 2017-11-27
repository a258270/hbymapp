//index.js
//获取应用实例
var order = ['red', 'yellow', 'blue', 'green', 'red']
const app = getApp()
var utils = require('../../utils/util.js')
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    // 首页轮播图 开始
    imgUrls: [
      '../../img/banner.jpg',
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 2000,
    duration: 1000
    // 首页轮播图 开始

    // 公告 开始

    // 公告 结束

  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onReady: function () {
    //utils.showSuccess();
  },
  consultation:function(){
    utils.navigateTo("../consult/consult")
  },
  onLoad(e) {
    console.log(e.title)
    this.setData({
      msgList: [
        { url: "url", title: "公告：多地首套房贷利率上浮 热点城市渐迎零折扣时代" },
        { url: "url", title: "公告：悦如公寓三周年生日趴邀你免费吃喝欢唱" },
        { url: "url", title: "公告：你想和一群有志青年一起过生日嘛？" }]
    });

  },
})
