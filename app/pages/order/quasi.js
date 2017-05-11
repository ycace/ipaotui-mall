// pages/order/quasi.js
import {
  getQuasiOrderInfo, updateOrderAddr,
  addOrder
} from '../../utils/apis'
Page({
  data: {
    
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.id = options.id || '2725'
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
  loadData() {
    var that = this
    var {id} = this
    var {loading} = this.data
    if(loading) {
      return
    }
    this.setData({
      loading: true
    })
    wx.showNavigationBarLoading()
    getQuasiOrderInfo({
      quasi_order_id: id,
      success(data) {
        that.setData({
          info: data,
          loading: false
        })
        wx.hideNavigationBarLoading()
      },
      error() {
        wx.hideNavigationBarLoading()
      }
    })
    
  },
  callbackAddress(addr_id) {
    var that = this
    var {id} = this
    var {loading} = this.data
    if (loading) {
      return
    }
    this.setData({
      loading: true
    })
    wx.showNavigationBarLoading()
    updateOrderAddr({
      quasi_order_id: id,
      addr_id,
      success(data) {
        that.setData({
          info: data,
          loading: false
        })
        wx.hideNavigationBarLoading()
      },
      error() {
        that.setData({
          loading: false
        })
        wx.hideNavigationBarLoading()
      }
    })
  },
  onAddOrder(e) {
    var that = this
    var {id} = this
    var {loading} = this.data
    if (loading) {
      return
    }
    this.setData({
      loading: true
    })
    addOrder({
      quasi_order_id: id,
      success(data) {
        that.setData({
          loading: false
        })
      },
      error() {
        that.setData({
          loading: false
        })
      }
    })
  }
})