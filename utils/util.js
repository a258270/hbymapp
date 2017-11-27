var baseurl = require('baseurl.js')
/**
 * 格式化日期 yyyy-MM-dd
 */
const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-');
}

/**
 * 格式化时间 yyyy-MM-dd HH:mm:ss
 */
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

/**
 * 格式化数字，单数字格式为：0X
 */
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 未登录状态码
 */
const noLoginCode = "-1";

/**
 * 未完善信息状态码
 */
const noCompleteCode = "-2";

/**
 * 缺少参数状态码
 */
const notAcceptCode = "406";
/**
 * 登录操作
 */
var login = function () {
  wx.login({
    success: function (res) {
      if (res.code) {
        //发起网络请求
        sendRequest("/wechat/applet/api/login", { code: res.code }, "POST", true, function (res) {
          //存储session_id
          setInfoToStorage('session_id', res.thirdSessionId);
          if (!res.isCompleted) {
            toComplete();
          }
        });
      } else {
        showError("获取用户信息失败，请重试！");
      }
    }
  });
}

/**
 * 完善信息操作
 */
var toComplete = function () {
  console.log("需要完善信息");
}

/**
 * 获取sessionId
 */
var getSessionId = function () {
  return getInfoFromStorage("session_id");
}

/**
 * 存储至本地缓存
 */
var setInfoToStorage = function (key, value) {
  wx.setStorageSync(key, value);
}

/**
 * 获取本地缓存内容
 */
var getInfoFromStorage = function (key) {
  try {
    return wx.getStorageSync(key);
  }
  catch (e) {
    console.log("获取" + key + "失败");
  }

  return undefined;
}

/**
 * 获取基础url
 */
var getBaseUrl = function () {
  return baseurl.content;
}

/**
 * url: 填写子url即可，例如：完整url为：http://xx.com/api/demo，则url填写为/api/demo即可，baseUrl参见util.js -> baseUrl
 * param: 请求参数
 * sendType: （需大写）有效值：OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
 * loadingType (选填)为true则显示loading，反之不显示
 * successFn: （选填）成功处理函数，若返回出错，则不执行该函数，由本方法自行处理
 * errorFn: （选填）失败处理函数，如：超时等问题，本方法已处理提示操作 
 */
var sendRequest = function (url, param, sendType, loadingType, successFn, errorFn) {
  wx.checkSession({
    success: function () {
      var session_id = getSessionId();//本地取存储的sessionID
      if (session_id) {
        var header = { 'content-type': 'application/x-www-form-urlencoded', 'Cookie': 'new.cookie.id=' + session_id };
      }
      else {
        var header = { 'content-type': 'application/x-www-form-urlencoded' };
      }
      if (url.indexOf(getBaseUrl()) < 0) {
        if (url.indexOf("/") == 0) {
          url = getBaseUrl() + url;
        }
        else {
          url = getBaseUrl() + "/" + url;
        }
      }
      if (url.indexOf("?") > 0) {
        url += "&ajax=true";
      }
      else {
        url += "?ajax=true";
      }
      if (loadingType) {
        wx.showLoading({
          title: "请稍后",
          mask: true
        });
      }
      wx.request({
        url: url,
        data: param,
        method: sendType,
        header: header,
        success: function (res) {
          if (loadingType) {
            wx.hideLoading();
          }
          if (res.hasErrors) {
            //需要登录，详情查看后台LoginIntercetor
            if (res.errorCode == noLoginCode)
              login();
            else if (res.errorCode == noCompleteCode)
              toComplete();
            else if (res.errorCode == notAcceptCode)
              console.error("接口：" + url + "缺少参数");
            else
              showError(res.errorMessage);

            return false;
          }
          if (successFn)
            successFn(res);
        },
        fail: function (res) {
          if (loadingType) {
            wx.hideLoading();
          }
          showError("网络连接错误，请稍后重试");
          if (errorFn)
            errorFn(res);
        }
      })
    },
    fail: function () {
      login();
    }
  })
}

/**
 * 错误提示框
 * msg: 提示内容
 */
var showError = function (msg) {
  console.log("showError");
  wx.showModal({
    title: '提示',
    content: msg,
    showCancel: false
  })
}

/**
 * 成功提示框
 */
var showSuccess = function () {
  wx.showToast({
    title: '成功',
    icon: 'success',
    duration: 2000
  })
}

/**
 * 页面跳转
 * url：跳转页面url
 * param： 请求参数
 * successFn: 成功处理函数（选填）
 * failFn: 失败处理函数（选填）
 * completeFn: 完成处理函数（选填）
 */
var navigateTo = function (url, param, successFn, failFn, completeFn) {
  if (param) {
    var attrArr = Object.keys(param);
    if (attrArr) {
      attrArr.forEach(function (value) {
        if (url.indexOf("?") >= 0)
          url += "&" + value + "=" + param[value];
        else
          url += "?" + value + "=" + param[value];
      });
    }
  }
  wx.navigateTo({
    url: url,
    success: function () {
      if (successFn)
        successFn();
    },
    fail: function () {
      showError("网络请求超时，请稍后再试");
      if (failFn)
        failFn();
    },
    complete: function () {
      if (completeFn)
        completeFn();
    }
  });
}

var redirect = function () {

}

module.exports = {
  formatDate: formatDate,
  formatTime: formatTime,
  formatNumber: formatNumber,
  showError: showError,
  sendRequest: sendRequest,
  showSuccess: showSuccess,
  login: login,
  getInfoFromStorage: getInfoFromStorage,
  setInfoToStorage: setInfoToStorage,
  toComplete: toComplete,
  navigateTo: navigateTo
}