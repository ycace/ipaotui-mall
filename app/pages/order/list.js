// pages/order/list.js
import { ORDER_STATES } from './constant'

Page({
  data: {
    login: true,
    ORDER_STATES,
    list: [
      {
        "order_id": "1370",
        "order_no": "2017042815510158201158862546",
        "seller_id": "2",
        "seller_name": "鲜极道",
        "title": "鸡腿饭(大)",
        "add_time": "1493365861",
        "order_price": "42.98",
        "pay_price": "34.98",
        "state": "1",
        "is_reviews": "0",
        "pic_url": "http://mtest.ipaotui.com/Uploadfile/Img/seller_goods/1461034075146103407535640.jpg"
      },
      {
        "order_id": "1347",
        "order_no": "2017040708540884666377388205",
        "seller_id": "2",
        "seller_name": "鲜极道",
        "title": "鸡翅饭",
        "add_time": "1491526448",
        "order_price": "36.00",
        "pay_price": "28.00",
        "state": "4",
        "is_reviews": "0",
        "pic_url": "http://mtest.ipaotui.com/"
      },
      {
        "order_id": "1345",
        "order_no": "2017033115480943749489684006",
        "seller_id": "2",
        "seller_name": "鲜极道",
        "title": "香肠饭 等2件商品",
        "add_time": "1490946489",
        "order_price": "48.00",
        "pay_price": "39.00",
        "state": "5",
        "is_reviews": "0",
        "pic_url": "http://mtest.ipaotui.com/"
      },
      {
        "order_id": "1344",
        "order_no": "2017033016225869845172165968",
        "seller_id": "2",
        "seller_name": "鲜极道",
        "title": "鸡翅饭",
        "add_time": "1490862178",
        "order_price": "36.00",
        "pay_price": "26.00",
        "state": "5",
        "is_reviews": "0",
        "pic_url": "http://mtest.ipaotui.com/"
      },
      {
        "order_id": "1343",
        "order_no": "2017033016045232046206634491",
        "seller_id": "2",
        "seller_name": "鲜极道",
        "title": "鸡翅饭",
        "add_time": "1490861092",
        "order_price": "36.00",
        "pay_price": "25.00",
        "state": "5",
        "is_reviews": "0",
        "pic_url": "http://mtest.ipaotui.com/"
      },
      {
        "order_id": "1342",
        "order_no": "2017033014434386598425245711",
        "seller_id": "2",
        "seller_name": "鲜极道",
        "title": "鸡腿饭",
        "add_time": "1490856223",
        "order_price": "40.98",
        "pay_price": "30.98",
        "state": "5",
        "is_reviews": "0",
        "pic_url": "http://mtest.ipaotui.com/Uploadfile/Img/seller_goods/1461034075146103407535640.jpg"
      },
    ]
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