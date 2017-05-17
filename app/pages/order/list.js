// pages/order/list.js
import { ORDER_STATES } from './constant'
import {
  getOrders, getPayment
} from '../../utils/apis'

import {
  datetimeFormat, requestPayment
} from '../../utils/util'

var initData = {
  page: 0,
  hasMore: true,
  loading: false,
  list: null
}

Page({
  data: {
    ORDER_STATES,
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    console.log('onLoad')
    var that = this
    getApp().getLoginInfo(loginInfo => {
      that.setData({
        loginInfo: loginInfo
      })
      if (loginInfo.is_login) {
        that.initData()
      }
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    var that = this
    getApp().getLoginInfo(loginInfo => {
      that.setData({
        loginInfo: loginInfo
      })
    })
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  initData(cb) {
    this.setData(initData)
    this.loadData(cb)
  },
  loadData(cb) {
    var that = this
    var {
      loading, page
    } = this.data
    if (loading) {
      return
    }

    this.setData({
      loading: true
    })
    getOrders({
      page,
      success(data) {
        var {list} = that.data
        var {list: list2, count, page} = data
        list2 = list2.map(item => {
          item['add_time_format'] = datetimeFormat(item.add_time)
          return item
        })
        that.setData({
          loading: false,
          list: list ? list.concat(list2) : list2,
          hasMore: count == 10,
          page: page + 1
        })

        cb && cb()

      }
    })
  },
  onPayTap(e) {
    var {id} = e.currentTarget
    var that = this
    var {list, loading} = this.data
    if (loading) {
      return;
    }

    this.setData({
      loading: true
    })
    var {order_id} = list[id]
    getPayment({
      order_id,
      success(data) {
        requestPayment({
          data,
          success(data) {
            that.initData()
          },
          complete() {
            that.setData({
              loading: false
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
  },
  onReachBottom(e) {
    var {
      loginInfo: {is_login},
      hasMore, loading
    } = this.data
    if (is_login && hasMore && !loading) {
      this.loadData()
    }
  },
  onPullDownRefresh() {
    var {loginInfo: {is_login}} = this.data
    if (is_login) {
      wx.showNavigationBarLoading()
      this.initData(() => {
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
      })
    } else {
      wx.stopPullDownRefresh()
    }
  },

  callback(loginInfo) {
    if (this.data.list) {
      this.onLoad()
    }
  },
  onShareAppMessage() {
    return {
      title: '我的订单',
      path: '/pages/order/list'
    }
  }
})