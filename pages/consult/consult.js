// pages/consult/consult.js
var util = require('../../utils/util.js');
var widthTimer = null;
var id;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    src:"../../images/regions.png",
    src1:"../../images/batchs.png",
    src2: "../../images/types.png",
    src3: "../../images/attributes.png",
    srcs:"../../images/arrow.png",
    showView: false,
    showView1: false,
    showView2: false,
    hidden:true,
    myhidden:true,
    width:0,
    checked:false
    // bath: [
    //   { name: '不限', value: '0', checked: true },
    //   { name: '双一流', value: '1', checked: false },
    //   { name: '985', value: '2', checked: false },
    //   { name: '211', value: '3', checked: false },
    // ], 
  },
  upper: function (e) {
  },
  lower: function (e) {
  },
  scroll: function (e) {
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
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
  toDto: function(list) {
    if(!list) return list;
    list.forEach(function(obj){
      if(obj.HEADURL){
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
    showView: (options.showView == "true" ? true : false);
    showView1: (options.showView1 == "true" ? true : false);
    showView2: (options.showView2== "true" ? true : false);
    util.sendRequest('/wechat/applet/school/gethasteachers', {}, 'POST',false, function (res) {
      that.setData({
        zhihu: that.toDto(res.data.results)
      });
    })
    
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
  tap_ch:function(e){
    var that = this;
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
    util.sendRequest('/wechat/applet/dictionary/get', { code: 'ARRANGMENT' }, 'POST', false, function (res) {   
      that.setData({
        bath: res.data
      })
    });
    util.sendRequest('/wechat/applet/dictionary/get', { code: 'SCPROPERTY' }, 'POST', false, function (res) {
      that.setData({
        property: res.data
      })
    })
  },
  close_ch:function(){
    widthTimer = setInterval(this.closeTm, 10)
    this.setData({
    myhidden: !this.data.hidden,
    })
  },
  // add:function(e){
  //   var id = e.currentTarget.dataset.id;  //获取自定义的ID值  
  //   this.setData({
  //     id:id
  //   })  
  // },
  serviceValChange: function (e) {
    var bath = this.data.bath;
    var checkArr = e.detail.value;
    for (var i = 0; i < bath.length; i++) {
      if (checkArr.indexOf(i + "") != -1) {
        bath[i].checked = true;
      } else {
        bath[i].checked = false;
      }
    }
    this.setData({
      bath: bath
    })
  }, 
  serviceValChange1: function (e) {
    var property = this.data.property;
    var checkArr = e.detail.value;
      for (var i = 0; i < property.length; i++) {
        if (checkArr.indexOf(i + "") != -1) {
          property[i].checked = true;
        } else {
          property[i].checked = false;
        }
      }
    this.setData({
      property: property
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