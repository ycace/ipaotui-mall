//app.js
import {getLoginInfo} from './utils/apis'
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
  },
  getLoginInfo:function(cb){
    var that = this
    if (this.globalData.loginInfo){
      cb && cb(this.globalData.loginInfo)
    }else{
      //调用登录接口
      getLoginInfo({
        success(data) {
          that.setLoginInfo(data)
          cb && cb(data)
        }
      })
    }
  },
  setLoginInfo(loginInfo) {
    if (loginInfo.session_3rd) {
      wx.setStorageSync('session_3rd', loginInfo.session_3rd)
    }
    this.globalData.loginInfo = loginInfo
  },
  globalData:{
    loginInfo:null
  }
})