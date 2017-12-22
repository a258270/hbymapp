var util = require('../../utils/util.js');

var RecordStatus = {
  SHOW: 0,
  HIDE: 1,
  HOLD: 2,
  SWIPE: 3,
  RELEASE: 4
}

var RecordDesc = {
  0: '长按开始录音',
  2: '向上滑动取消',
  3: '松开手取消',
}

Page({
  data: {
    ruser_id: "",
    chatRecords: [],
    suser_id: "",
    complete_tea: {},

    emoji: util.Emoji,
    emojiObj: util.EmojiObj,

    chatMsg: [],
    emojiStr: '',
    yourname: '',
    myName: '',
    sendInfo: '',
    userMessage: '',
    inputMessage: '',
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    show: 'emoji_list',
    view: 'scroll_view',
    toView: '',
    msgView: {},
    RecordStatus: RecordStatus,
    RecordDesc: RecordDesc,
    recordStatus: RecordStatus.HIDE,
  },
  onLoad: function (options) {
    var that = this;
    that.setData({
      ruser_id: options.user_id,
      suser_id: util.getInfoFromStorage("user_id")
    });
    
    util.sendRequest("/wechat/applet/chat/getchatrecs", {USER_ID: options.user_id}, "POST", true, function(res){
      if(res.chatRecords) {
        res.chatRecords.forEach(function(element){
          if(element.SUSER_ID == that.data.suser_id) {
            element.style = 'self';
          }
          else{
            element.style = 'msg';
          }
          if(element.CONTENT) {
            element.CONTENT = util.parseEmoji(element.CONTENT);
          }
        });
      }
      console.log(res.chatRecords);
      that.setData({
        complete_tea: res.complete_tea,
        chatRecords: res.chatRecords
      });
      var socket = getApp().globalData.globalSocket;
      socket.onMessage(function(e){
        console.log("chat:" + e.data);
        var recArr = e.data.split("----");
        if(recArr.length == 2) {
          if(that.data.ruser_id == recArr[0]) {
            var record = {
              REC_ID: util.getUUID(),
              SUSER_ID: that.data.suser_id,
              RUSER_ID: that.data.ruser_id,
              ISREAD: true,
              CREATETIME: util.getCurrentTimestamp(),
              style: "msg"
            }

            record.CONTENT = util.parseEmoji(recArr[1]);

            var chatRecords = that.data.chatRecords;
            chatRecords.push(record);

            that.setData({
              chatRecords: chatRecords
            });

            util.sendRequest("/wechat/applet/chat/setread", {SUSER_ID: that.data.ruser_id}, "POST", false);
          }
        }
      })
    });
  },
  onUnload: function() {
  },
  onShow: function () {
    /*var that = this
    this.setData({
      inputMessage: ''
    })*/
  },
  bindMessage: function (e) {
    this.setData({
      userMessage: e.detail.value
    })
  },
  cleanInput: function () {
    var that = this
    var setUserMessage = {
      sendInfo: that.data.userMessage
    }
    that.setData(setUserMessage)
  },
  //***************** 录音 end ***************************
  sendMessage: function () {

    if (!this.data.userMessage.trim()) {
      util.showError("消息不能为空");
      return;
    }

    var that = this;
    console.log(that.data.userMessage);
    util.sendRequest("/wechat/applet/chat/sendMessage", {USER_ID: that.data.ruser_id, MESSAGE: that.data.userMessage}, "POST", true, function(res){
      var record = {
        REC_ID: util.getUUID(),
        SUSER_ID: that.data.suser_id,
        RUSER_ID: that.data.ruser_id,
        ISREAD: true,
        CREATETIME: util.getCurrentTimestamp(),
        style: "self"
      }

      record.CONTENT = util.parseEmoji(that.data.userMessage);
      var chatRecords = that.data.chatRecords;
      chatRecords.push(record);

      that.setData({
        chatRecords: chatRecords,
        inputMessage: '',
        userMessage: ''
      });
    });
  },
  openEmoji: function () {
    this.setData({
      show: 'showEmoji',
      view: 'scroll_view_change'
    })
  },
  sendEmoji: function (event) {
    var that = this
    var emoji = event.target.dataset.emoji
    var msglen = that.data.userMessage.length - 1
    if (emoji && emoji != '[del]') {
      var str = that.data.userMessage + emoji
    } else if (emoji == '[del]') {
      var start = that.data.userMessage.lastIndexOf('[')
      var end = that.data.userMessage.lastIndexOf(']')
      var len = end - start
      if (end != -1 && end == msglen && len >= 3 && len <= 4) {
        var str = that.data.userMessage.slice(0, start)
      } else {
        var str = that.data.userMessage.slice(0, msglen)
      }
    }
    this.setData({
      userMessage: str,
      inputMessage: str
    })
  },
  cancelEmoji: function () {
    this.setData({
      show: 'emoji_list',
      view: 'scroll_view'
    })
  }
})

















