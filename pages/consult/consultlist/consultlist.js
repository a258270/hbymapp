// pages/consult/consultlist/consultlist.js
var util=require("../../../utils/util")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src1:"/images/school-banner.png",
    logo: "/images/10.png",
    name: "",
    region: "",
    types: ""
  },
  toDto: function (list) {
    if (!list) return list;
    list.forEach(function (obj) {
      if (obj.HEADURL) {
        obj.HEADURL = util.setStaticUrl(obj.HEADURL);
      }
      if (obj.LHEADURL) {
        obj.LHEADURL = util.setStaticUrl(obj.LHEADURL);
      }
    });
    return list;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var id = options.a
    util.sendRequest("/wechat/applet/complete_tea/get",{SCHOOL_ID:id},"POST",true,function(res){
      that.setData({
        teacher:that.toDto(res.data)
      })
    })
    util.sendRequest("/wechat/applet/school/getschoolinfo", { SCHOOL_ID: id},"POST",true,function(res){
      that.setData({
        logo: util.setStaticUrl(res.HEADURL),
        name:res.NAME,
        region: res.PROVINCE_VALUE,
        types: res.SCTYPE_VALUE

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