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
      // 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
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
  teacher:function(){
    utils.navigateTo("../teacher/teacher")
  },
  analog:function(){
    utils.sendRequest("/wechat/applet/user/isvip", {}, "POST", true, function(res){
      if(res.data) {//是vip
        utils.sendRequest("/wechat/applet/user/isexamed", {}, "POST", true, function(result) {
          if (result.data) {
            //完成考生信息的完善
            utils.navigateTo("/pages/analog/analogs/analogs");
          }
          else{
            utils.showError("请完善考生信息");
          }
        });
      }
      else{
        utils.showError("请先激活黄金会员权限");
      }
    });
  },
  intelligence:function(){
    utils.sendRequest("/wechat/applet/user/isvip", {}, "POST", true, function (res) {
      if (res.data) {//是vip
        utils.sendRequest("/wechat/applet/user/isexamed", {}, "POST", true, function (result) {
          if (result.data) {
            //完成考生信息的完善
            utils.navigateTo("/pages/intelligence/intelligence");
          }
          else {
            utils.showError("请完善考生信息");
          }
        });
      }
      else {
        utils.showError("请先激活黄金会员权限");
      }
    });
    
  },
  school:function(){
    utils.navigateTo("../school/school")
  },
  major:function(){
    utils.navigateTo("../major/major")
  },
  noticemore:function(){
    utils.navigateTo("../notice/notice")
  },
  newsmore:function(){
    utils.navigateTo("../news/news")
  },
  activitymore:function(){
    utils.navigateTo("../activity/activity")
  },
  news:function(e){
    var a = e.currentTarget.dataset.id;
    utils.navigateTo('../news/newscontent/newscontent', { a: a })
  },
  activity:function(e){
    var a = e.currentTarget.dataset.id;
    utils.navigateTo('../activity/content/content', { a: a })
  },
  toDto: function (list) {
    if (!list) return list;
    list.forEach(function (obj) {
      if (obj.IMGURL) {
        obj.IMGURL = utils.setStaticUrl(obj.IMGURL);
      }
        if (obj.MODIFYTIME){
          obj.MODIFYTIME = utils.formatTime(new Date(obj.MODIFYTIME));
        }
    });
    return list;
  },
  onLoad:function(e) {
    var that=this;
    utils.sendRequest('/wechat/applet/news/get', { NEWSTYPE: "1es852a5gv", pageSize: "5" }, 'POST', false, function (res) {
      that.setData({
        notice: that.toDto(res.data.results)
      });
    })
    utils.sendRequest('/wechat/applet/news/get', { NEWSTYPE: "opsmpn8psb", pageSize:"5"}, 'POST', false, function (res) {
      that.setData({ 
        news: that.toDto(res.data.results)
      });
    })
    utils.sendRequest('/wechat/applet/news/get', { NEWSTYPE: "23wtostpu8", pageSize: "6" }, 'POST', false, function (res) {
      that.setData({
        activity: that.toDto(res.data.results)
      });
    })
  },
})
