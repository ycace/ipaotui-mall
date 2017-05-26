// pages/order/quasi.js
import {
  getQuasiOrderInfo, updateOrderAddr, updateOrderCoupon,
  addOrder, getPayment
} from '../../utils/apis'

import {
  requestPayment, getCurrentPage
} from '../../utils/util'
Page({
  data: {
    content: ''
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.id = options.id || '2843'
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
        data['cut_money_total'] = +data.cut_money + +data.coupon_money

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
        data['cut_money_total'] = +data.cut_money + +data.coupon_money
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
  callbackCoupon(user_coupon_id) {
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
    updateOrderCoupon({
      quasi_order_id: id,
      user_coupon_id,
      success(data) {
        data['cut_money_total'] = +data.cut_money + +data.coupon_money
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
  callbackContent(content) {
    this.setData({
      content
    })
  },
  onAddOrder(e) {
    var that = this
    var {id} = this
    var {loading, content} = this.data
    if (loading) {
      return
    }
    this.setData({
      loading: true
    })
    addOrder({
      remark: content,
      quasi_order_id: id,
      success(data) {
        var order_id = data['order']['order_id']
        getPayment({
          order_id,
          success(data) {
            requestPayment({
              data,
              complete() {
                that.setData({
                  loading: false
                })
                wx.switchTab({
                  url: '/pages/order/list',
                  success(res) {
                    var {callback} = getCurrentPage()
                    callback && callback()
                  }
                })
              }
            })
          },
          error() {
            that.setData({
              loading: false
            })
          }
        })
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