// pages/intelligence/content/content.js
var util = require('../../../utils/util.js');
var sliderWidth = 96;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["冲", "稳", "保","垫"],
    activeIndex: 1,
    sliderOffset: 0,
    sliderLeft: 0,
    listChong: [],
    listWen: [],
    listBao: [],
    listDian: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });

    util.sendRequest("/wechat/applet/report/reporting", options, "POST", true, function(res){
      var listChong = res.listChong;
      var listWen = res.listWen;
      var listBao = res.listBao;
      var listDian = res.listDian;

      var listChongOut = that.groupBySchool(listChong);
      var listWenOut = that.groupBySchool(listWen);
      var listBaoOut = that.groupBySchool(listBao);
      var listDianOut = that.groupBySchool(listDian);

      that.setData({
        listChong: listChongOut,
        listWen: listWenOut,
        listBao: listBaoOut,
        listDian: listDianOut
      });
    });
  },
  groupBySchool: function(list) {
    var listOut = [];
    var setObj = new Set();
    list.forEach(function (element) {
      setObj.add(element.SCHOOL_ID);
    });

    setObj.forEach(function (element) {
      var school = {};
      school.NAME = element.NAME;
      school.SCHOOL_ID = element.SCHOOL_ID;
      school.majors = [];
      list.forEach(function (arrObj) {
        if (element.SCHOOL_ID == arrObj.SCHOOL_ID) {
          var major = {};
          major.MJNAME = arrObj.MJNAME;
          major.MAJOR_ID = arrObj.MAJOR_ID;
          school.majors.push(major);
        }
      });

      listOut.push(school);
    });

    return listOut;
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
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