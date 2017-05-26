// pages/order/show.js
import Countdown from '../../utils/countdown'
import {
  countdownFormat, datetimeFormat,
  makePhoneCall, requestPayment, confirm, alert
} from '../../utils/util'
import {
  getOrderInfo, getPayment,
  cancelOrder
} from '../../utils/apis'
Page({
  data: {
    activeNavIndex: 0,
    tabNavs: ['订单状态', '订单详情'],
    statusImgs: {
      '1': '/images/status/order_status_money_icon_current@2x.png',
      '2': '/images/status/order_status_shop_icon_current@2x.png',
      '3': '/images/status/order_status_rider_icon_current@2x.png',
      '4': '/images/status/order_status_service_icon_current@2x.png',
      '5': '/images/status/order_status_service_icon_fail_current@2x.png',
      '6': '/images/status/order_status_service_icon_fail_current@2x.png',
      '7': '/images/status/order_status_service_icon_fail_current@2x.png'
    },
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.id = options.id || 1497
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
    if (this.countdown) {
      this.countdown.stop()
    }
  },
  tabChange(e) {
    var {current} = e.detail
    this.setData({
      activeNavIndex: current
    })
  },
  navChange(e) {
    var {id} = e.currentTarget
    this.setData({
      activeNavIndex: id
    })
  },

  initCountdown(count) {
    var that = this
    this.setData({
      count
    })
    var countdown = new Countdown(this, 'count')
    countdown.start((count) => {
      this.setData({
        countLabel: countdownFormat(count)
      })
    }, () => {
      console.log('complete')
      that.loadData()
    })
    this.countdown = countdown
  },

  loadData(cb) {
    var that = this
    var order_id = this.id
    wx.showNavigationBarLoading()
    getOrderInfo({
      order_id,
      success(data) {
        data['add_time_format'] = datetimeFormat(data.add_time)
        data['cut_money_total'] = +data.cut_money + +data.coupon_money
        data['flow'] = data.flow.map(item => {
          item['time_format'] = datetimeFormat(item.time)
          return item
        })
        that.setData({
          info: data
        })
        wx.setNavigationBarTitle({
          title: data['seller_name'],
        })
        if (that.countdown) {
          that.countdown.stop()
        }
        if (data.left_time > 0) {
          that.initCountdown(+data.left_time)
        }
        wx.hideNavigationBarLoading()
        cb && cb()
      },
      error() {
        wx.hideNavigationBarLoading()
      }
    })
  },

  onPhoneTap(e) {
    var that = this
    var {info: {seller_phone, localphone, runner_phone}} = this.data
    var phones = [
      `商家电话: ${seller_phone}`,
      `客服电话: ${localphone}`
    ]
    if (runner_phone) {
      phones.push(`跑腿电话: ${runner_phone}`)
    }
    wx.showActionSheet({
      itemList: phones,
      success: function (res) {
        var {tapIndex} = res
        if (tapIndex == 0) {
          makePhoneCall(seller_phone)
        } else if (tapIndex == 1) {
          makePhoneCall(localphone)
        } else if(tapIndex == 2) {
          makePhoneCall(runner_phone)
        }
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  onPayTap(e) {
    var that = this
    var {info: {order_id}, loading} = this.data
    if (loading) {
      return;
    }

    this.setData({
      loading: true
    })
    getPayment({
      order_id,
      success(data) {
        requestPayment({
          data,
          success(data) {
            that.loadData()
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
  onCancelTap(e) {
    var that = this;
    var {info: {order_id, title}} = this.data
    confirm({
      content: `是否取消订单 ${title}`,
      confirmText: '取消订单',
      ok() {
        cancelOrder({
          order_id,
          success(data) {
            alert('取消订单成功')
            that.loadData()
          }
        })
      }
    })
  },
  onPullDownRefresh() {
    this.loadData(function () {
      wx.stopPullDownRefresh()
    })
  },

  callback() {
    this.loadData()
  }

})