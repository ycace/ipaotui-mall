// pages/order/list.js
import { ORDER_STATES } from './constant'
import {
  getOrders
} from '../../utils/apis'

import {
  datetimeFormat
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
      var {list} = that.data
      if (loginInfo.is_login && !list) {
        that.initData()
      }
    })
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  initData(cb) {
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
    this.setData(initData)
  }
})