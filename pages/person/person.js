// pages/person/person.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //用户头像
    logo:"../../images/touxiang.png",
    //信息完整度
    completeCount: 0,
    //高考分数
    examScore: 0,
    //账户余额
    valiablePocket: 0,
    //昵称
    nickname: "",
    //是否为vip
    isVip: false,
    //用户身份
    role: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  chooseImageTap: function () {
    let _this = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#f7982a",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            _this.chooseWxImage('album')
          } else if (res.tapIndex == 1) {
            _this.chooseWxImage('camera')
          }
        }
      }
    })

  },
  chooseWxImage:function (type) {
    var that = this;
    wx.chooseImage({
      sizeType: ['compressed'],
      sourceType: [type],
      success: function (res) {
        console.log(res);

        util.uploadFile("/wechat/applet/user/uploadhead", res.tempFilePaths[0], "HEADURL", {}, true, function(result){
          that.getUserInfo();
        });
      }
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
  onShow: function() {
    this.getUserInfo();
  },
  /**
   * 获取用户基本信息
   */
  getUserInfo: function() {
    var that = this;
    util.sendRequest("/wechat/applet/user/getrole", {}, "POST", false, function (res)     {
      var role=res.data
      if(role==1){
        util.sendRequest("/wechat/applet/user/basic_student", {}, "POST", false, function (res) {
          that.setData({
            logo: util.setStaticUrl(res.complete.HEADURL),
            completeCount: res.completeCount,
            nickname: res.complete.NICKNAME ? res.complete.NICKNAME : "暂无",
            examScore: res.examinee.EXAMSCORE ? res.examinee.EXAMSCORE : 0,
            valiablePocket: res.pocket.BALANCE ? res.pocket.BALANCE : 0
          });
        });
      }
      if(role==2){
        util.sendRequest("/wechat/applet/user/getteachercomplete", {}, "POST", false, function (res) {
          console.log(res.data)
          that.setData({
            logo2: util.setStaticUrl(res.complete.HEADURL),
            completeCount2: res.completeCount,
            nickname2: res.complete.NICKNAME ? res.complete.NICKNAME : "暂无"
          })
        })
      }
    util.sendRequest("/wechat/applet/user/getrole",{},"POST",false,function(res){
        that.setData({
          role:res.data
        })
      })
    })
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
  
  },
  toExaminee: function() {
    util.navigateTo("/pages/person/information/information");
  },
  toPocket: function() {
    util.navigateTo("/pages/person/goods/goods");
  }
})