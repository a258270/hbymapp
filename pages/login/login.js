//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: [],
    username:'',
    password:''
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  },
  start:function(){
    util.navigateTo("../register/register");
  },
  bindUsername: function(e) {
    this.setData({
      username: e.detail.value
    });
  },
  bindPassword: function (e) {
    this.setData({
      password: e.detail.value
    });
  },
  showTopTips:function(){
    util.sendRequest('/wechat/applet/api/relation', { USERNAME: this.data.username, PASSWORD: this.data.password }, "POST", function (){
      util.login();
      
    })
    util.redirectTo("../index/index");
  }
})
