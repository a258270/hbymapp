// pages/consult/consult.js
var util = require('../../utils/util.js');
var widthTimer = null;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    src:"../../images/regions.png",
    src1:"../../images/batchs.png",
    src2: "../../images/types.png",
    src3: "../../images/attributes.png",
    srcs:"../../images/screen.png",
    showView: false,
    showView1: false,
    showView2: false,
    hidden:true,
    myhidden:true,
    width:0
  },
  openTm: function(){
    var that = this;
    this.setData({
      width: that.data.width + 4
    });
    if(that.data.width > 79) {
      clearInterval(widthTimer);
      widthTimer = null;
    }
    
  },
  closeTm: function () {
    var that = this;
    this.setData({
      width: that.data.width - 4
    });
    if (that.data.width <1) {
      clearInterval(widthTimer);
      widthTimer = null;
    }

  },
  start:function(){
    util.navigateTo("cousultlist/cousultlist");
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    showView: (options.showView == "true" ? true : false);
    showView1: (options.showView1 == "true" ? true : false);
    showView2: (options.showView2== "true" ? true : false) 
  },
  onChangeShowState: function () {
    var that = this;
    that.setData({
      showView: (!that.data.showView)
    })
  },
  onChangeShowStates: function () {
    var that = this;
    that.setData({
      showView1: (!that.data.showView1)
    })
  },
  onChangeShowStatess: function () {
    var that = this;
    that.setData({
      showView2: (!that.data.showView2)
    })
  },
  tap_ch:function(){
    
    if(widthTimer != null) {
      clearInterval(widthTimer);
      this.setData({
        width: 0
      });
    }
    
    widthTimer = setInterval(this.openTm, 10)

    this.setData({
      hidden: !this.data.hidden,
      myhidden: !this.data.hidden,
    })
  },
  close_ch:function(){
    widthTimer = setInterval(this.closeTm, 10)
    this.setData({
      myhidden: !this.data.hidden,
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