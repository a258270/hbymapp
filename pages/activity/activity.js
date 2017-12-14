// pages/activity/activity.js
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
    });
    return list;
  },
  activity:function(e){
    var a = e.currentTarget.dataset.id
    util.navigateTo('../activity/content/content', { a: a })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    util.sendRequest('/wechat/applet/news/get', {NEWSTYPE: "23wtostpu8"}, 'POST', false, function (res) {
      var contents = that.toDto(res.data.results);
      var imgReg = new RegExp("<img.*src\\s*=\\s*(.*?)[^>]*?>", "ig");
      var srcReg = new RegExp("src\\s*=\\s*\"?(.*?)(\"|>|\\s+)", "ig");
      for (var i = 0; i < contents.length; i++) {
        var content = contents[i].CONTENT;
        var images = new Array();
        var arr;
        while (arr = imgReg.exec(content)) {
          if (!arr[0]) {
            continue;
          }
          images.push(util.setStaticUrl(srcReg.exec(arr[0])[1]));
          srcReg.lastIndex = 0;
          if (images.length == 3) {
            break;
          }
        }

        contents[i].images = images;
      }
      that.setData({
        activity: contents
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