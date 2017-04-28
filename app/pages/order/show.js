// pages/order/show.js
Page({
  data: {
    info: {
      "order_id": "1370",
      "order_no": "2017042815510158201158862546",
      "day_sn": "1",
      "seller_id": "2",
      "user_id": "4",
      "state": "5",
      "add_time": "1493365861",
      "order_price": "42.98",
      "pay_price": "34.98",
      "goods_price": "22.98",
      "cut_money": "8.00",
      "coupon_money": "0.00",
      "packing_fee": "2.00",
      "delivery_fee": "18.00",
      "receiver": "test4",
      "receiver_addr": "龙华大厦",
      "receiver_gps": "120.69101,28.002974",
      "receiver_phone": "13000000005",
      "receive_time": "1493369461",
      "distance": "7.177",
      "remark": null,
      "is_reviews": "0",
      "is_delete": "0",
      "delivery_order_id": "0",
      "title": "鸡腿饭(大)",
      "receiver_city": "330300",
      "take_time": null,
      "remind_time": "0",
      "pay_type": null,
      "sys_settle_no": null,
      "settle_no": null,
      "commision": "0.00",
      "user_coupon_id": null,
      "real_delivery_fee": "18.00",
      "cut_delivery_fee": "0.00",
      "service_money": "0.00",
      "seller_name": "鲜极道",
      "seller_phone": "88888888",
      "delivery_phone": "13906641410",
      "goods": [
        {
          "goods_id": "29",
          "sub_id": "50",
          "seller_id": "2",
          "detail": "鸡腿饭 xx",
          "sales": "46",
          "praise": "0",
          "state": "1",
          "commision": "3.00",
          "goods_name": "鸡腿饭(大)",
          "price": "22.98",
          "packing_fee": "2.00",
          "stock": "74",
          "is_delete": "0",
          "pic_url": "http://test.storesystem.cn/Uploadfile/Img/seller_goods/1461034075146103407535640.jpg",
          "num": "1",
          "price_sum": "22.98"
        }
      ],
      "expire_time": 0,
      "left_time": 0,
      "flow": [
        {
          "time": "1493365861",
          "state": "1",
          "status": "订单提交成功，待支付",
          "remark": ""
        },
        {
          "time": "1493366164",
          "state": "5",
          "status": "订单已取消",
          "remark": ""
        }
      ],
      "localphone": "13906641410"
    }

  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
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
  }
})