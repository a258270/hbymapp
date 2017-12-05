// pages/notice/notice.js
var util = require("../../utils/util")
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  toDto: function (list) {
    if (!list) return list;
    list.forEach(function (obj) {
      if (obj.IMGURL) {
        obj.IMGURL = util.setStaticUrl(obj.IMGURL);
      }
      if (obj.MODIFYTIME) {
        obj.MODIFYTIME = util.formatTime(new Date(obj.MODIFYTIME));
      }
      if (obj.CREATETIME){
        obj.CREATETIME = util.formatDate(new Date(obj.CREATETIME));
      }
    });
    return list;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    util.sendRequest('/wechat/applet/news/get', { NEWSTYPE: "1es852a5gv", pageSize: "1" }, 'POST', false, function (res) {
      console.log(res.data)
      that.setData({
        news: that.toDto(res.data.results)
      });
    })
    util.sendRequest('/wechat/applet/news/get', { NEWSTYPE: "1es852a5gv" }, 'POST', false, function (res) {
      console.log(res.data)
      that.setData({
        notices: that.toDto(res.data.results)
      });
    })
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})