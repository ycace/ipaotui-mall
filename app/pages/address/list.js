// pages/address/list.js
import {
  getUserAddrs, deleteUserAddr
} from '../../utils/apis'
import {
  confirm
} from '../../utils/util'
Page({
  data: {

  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.loadData()
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  onPullDownRefresh(){
    this.loadData(function() {
      wx.stopPullDownRefresh()
    })
  },
  loadData(cb) {
    var that = this
    var {loading} = this.data
    if(loading) {
      return
    }
    this.setData({
      loading: true
    })
    wx.showNavigationBarLoading()
    getUserAddrs({
      success(data) {
        that.setData({
          list: data,
          loading: false
        })
        wx.hideNavigationBarLoading()
        cb && cb()
      },
      error() {
        that.setData({
          loading: false
        })
        wx.hideNavigationBarLoading()
        cb && cb()
      }
    })
  },
  callback() {
    this.loadData()
  },
  onDelete(e) {
    var that = this
    var {id} = e.currentTarget
    var address = this.data.list[id]
    confirm({
      content: `是否删除地址 ${address.addr} ${address.detail}`,
      confirmText: '删除',
      ok() {
        deleteUserAddr({
          addr_id: address.addr_id,
          success(data) {
            that.loadData()
          }
        })
      }
    })
  }
})