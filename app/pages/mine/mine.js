// pages/mine/mine.js
import { getUserInfo, makePhoneCall } from '../../utils/util'
import { logout } from '../../utils/apis'

const app = getApp()
Page({
  data:{},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    getUserInfo(userInfo => {
      this.setData({
        userInfo
      })
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
    var that = this
    app.getLoginInfo(loginInfo => {
      that.setData({
        loginInfo: loginInfo.user_info
      })
    })
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  onPhoneTap(e) {
    makePhoneCall(e.currentTarget.dataset.phone)
  },
  onLogout(e) {
    var that = this
    var {loginInfo: {phone}, loading} = this.data
    if(loading) {
      return
    }
    this.setData({
      loading: true
    })
    logout({
      phone,
      success(data) {
        app.setLoginInfo(data)
        that.setData({
          loginInfo: null,
          loading: false
        })
      }
    })
  },
  callback(loginInfo) {
    this.setData({
      loginInfo: loginInfo.user_info
    })
  },
  onShareAppMessage() {
    return {
      title: '我的信息',
      path: '/pages/mine/mine'
    }
  }
})