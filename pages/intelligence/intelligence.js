// pages/intelligence/intelligence.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    batch:['本一','本二'],
    index:0
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  result:function(){
    util.navigateTo("/pages/intelligence/result/result")
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    util.sendRequest('/wechat/applet/dictionary/get', { code: 'PROVINCE' }, 'POST', false, function (res) {
      that.setData({
        region: res.data
      })
    })
    util.sendRequest('/wechat/applet/dictionary/get', { code: 'SUBJECTTYPE' }, 'POST', false, function (res) {
      that.setData({
        style: res.data
      })
    })
    util.sendRequest('/wechat/applet/dictionary/get', { code: 'SCPROPERTY' }, 'POST', false, function (res) {
      that.setData({
        types: res.data
      })
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