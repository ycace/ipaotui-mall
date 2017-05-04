// pages/order/show.js
import Countdown from '../../utils/countdown'
import { countdownFormat } from '../../utils/util'
Page({
  data: {
    activeNavIndex: 1,
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
    info: {
      "order_id": "1375",
      "order_no": "2017050316304632448020041071",
      "day_sn": "4",
      "seller_id": "2",
      "user_id": "4",
      "state": "3",
      "add_time": "1493800246",
      "order_price": "30.00",
      "pay_price": "22.00",
      "goods_price": "20.00",
      "cut_money": "8.00",
      "coupon_money": "0.00",
      "packing_fee": "0.00",
      "delivery_fee": "10.00",
      "receiver": "test4",
      "receiver_addr": "电商大厦",
      "receiver_gps": "120.737561,27.979617",
      "receiver_phone": "13000000004",
      "receive_time": "1493803846",
      "distance": "1.707",
      "remark": "",
      "is_reviews": "0",
      "is_delete": "0",
      "delivery_order_id": "0",
      "title": "鸡翅饭",
      "receiver_city": "330300",
      "take_time": "1493800254",
      "remind_time": "0",
      "pay_type": "3",
      "sys_settle_no": null,
      "settle_no": null,
      "commision": "0.00",
      "user_coupon_id": null,
      "real_delivery_fee": "10.00",
      "cut_delivery_fee": "0.00",
      "service_money": "0.00",
      "seller_name": "鲜极道",
      "seller_phone": "88888888",
      "delivery_phone": "13906641410",
      "goods": [
        {
          "goods_id": "32",
          "sub_id": "0",
          "seller_id": "2",
          "detail": "鸡翅饭 xx",
          "sales": "43",
          "praise": "0",
          "state": "1",
          "commision": null,
          "goods_name": "鸡翅饭",
          "price": "20.00",
          "packing_fee": "0.00",
          "stock": "54",
          "is_delete": "0",
          "pic_url": null,
          "num": "1",
          "price_sum": "20.00"
        }
      ],
      "expire_time": 0,
      "left_time": 0,
      "flow": [
        {
          "time": "1493800246",
          "state": "1",
          "status": "订单提交成功，待支付",
          "remark": ""
        },
        {
          "time": "1493800252",
          "state": "2",
          "status": "支付成功，等待商家接单",
          "remark": ""
        },
        {
          "time": "1493800254",
          "state": "3",
          "status": "商家已接单",
          "remark": ""
        }
      ],
      "run_order_id": "6408",
      "localphone": "13906641410"
    },
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.initCountdown(287)
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
    this.setData({
      count
    })
    var countdown = new Countdown(this, 'count')
    countdown.start((count) => {
      this.setData({
        countLabel: countdownFormat(count)
      })
    })
    this.countdown = countdown
  }

})