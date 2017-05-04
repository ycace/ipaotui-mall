// pages/shop/show.js

import {makePhoneCall} from '../../utils/util'

var initOrder = {
  totalNum: 0,
  totalPrice: 0,
  totalGoodsPrice: 0,
  totalPackingFee: 0,
  goodsNums: {},
  goods: []
}

Page({
  data: {
    tabs: ["商品", "评价", "商家"],
    activeIndex: 1,

    activeMenuIndex: 0,
    showCart: false,

    showSubGoods: false,

    order: initOrder,

    review: {
      "list": [
        {
          "order_id": "1272",
          "user_id": "4",
          "seller_id": "1",
          "service": "5",
          "reach_time": "0",
          "quality": "5",
          "content": "",
          "pic_url": null,
          "time": "1488951898",
          "nick": "te***",
          "head_pic": null
        },
        {
          "order_id": "1271",
          "user_id": "4",
          "seller_id": "1",
          "service": "5",
          "reach_time": "0",
          "quality": "5",
          "content": "123455",
          "pic_url": null,
          "time": "1488944987",
          "nick": "te***",
          "head_pic": null
        },
        {
          "order_id": "1270",
          "user_id": "4",
          "seller_id": "1",
          "service": "4",
          "reach_time": "0",
          "quality": "4",
          "content": "hoohoo",
          "pic_url": null,
          "time": "1488944700",
          "nick": "te***",
          "head_pic": null
        },
        {
          "order_id": "1267",
          "user_id": "4",
          "seller_id": "1",
          "service": "5",
          "reach_time": "0",
          "quality": "5",
          "content": "hoho",
          "pic_url": null,
          "time": "1488936939",
          "nick": "te***",
          "head_pic": null
        },
        {
          "order_id": "1266",
          "user_id": "5",
          "seller_id": "1",
          "service": "5",
          "reach_time": "0",
          "quality": "5",
          "content": "",
          "pic_url": "",
          "time": "1488863802",
          "nick": "te***",
          "head_pic": null
        }
      ],
      "count": 10,
      "page": 0
    },

    info: {
      "seller_id": "2",
      "seller_name": "鲜极道",
      "state": "1",
      "city_id": "330300",
      "address": "温州龙湾区衢江路2011号",
      "pic_url": "http://mtest.ipaotui.com/Uploadfile/Img/seller/20170314/1489479032148947903230424.png",
      "pic_hd": "http://mtest.ipaotui.com/Uploadfile/Img/seller/20170314/hd_1489479032148947903230424.png",
      "longitude": "120.748973",
      "latitude": "27.984401",
      "phone": "88888888",
      "start_sell_time": "08:00:00",
      "end_sell_time": "09:00:00",
      "sell_time": "08:00-20:00,08:00-20:00",
      "is_rest": "0",
      "notice": "东池便当，好吃西",
      "reach_time": "30",
      "reserve_day": "0",
      "min_price": "5",
      "sales": "74",
      "service": "4.2",
      "quality": "3.5",
      "overall": "4.5",
      "distance": "20434",
      "delivery_fee": 45,
      "favorite": "0",
      "promotion": [
        {
          "pic_url": "http://mtest.ipaotui.com/Uploadfile/Img/seller_promotion/first_cut.png",
          "info": "新用户在线支付满15元减10元,满20元减13元"
        },
        {
          "pic_url": "http://mtest.ipaotui.com/Uploadfile/Img/seller_promotion/cut.png",
          "info": "在线支付满15元减5元,满20元减8元"
        }
      ],
      "menus": [
        {
          "menu_id": "10",
          "menu_name": "热销排行",
          "seller_id": "2",
          "sort": "0",
          "is_use": "1",
          "goods": "29,32,31,30,46",
          "goods2": [
            {
              "goods_id": "29",
              "goods_name": "鸡腿饭",
              "seller_id": "2",
              "pic_url": "http://mtest.ipaotui.com/Uploadfile/Img/seller_goods/1461034075146103407535640.jpg",
              "pic_hd1": "http://mtest.ipaotui.com/Uploadfile/Img/seller_goods/hd1_1461034075146103407535640.jpg",
              "pic_hd2": "http://mtest.ipaotui.com/Uploadfile/Img/seller_goods/hd2_1461034075146103407535640.jpg",
              "detail": "鸡腿饭 xx",
              "price": "22.00",
              "packing_fee": "2.00",
              "sales": "46",
              "praise": "0",
              "stock": "76",
              "sub_goods": [
                {
                  "sub_id": "50",
                  "sub_name": "大",
                  "price": "22.98",
                  "packing_fee": "2.00",
                  "stock": "74"
                },
                {
                  "sub_id": "51",
                  "sub_name": "小",
                  "price": "22.00",
                  "packing_fee": "2.00",
                  "stock": "76"
                }
              ]
            },
            {
              "goods_id": "32",
              "goods_name": "鸡翅饭",
              "seller_id": "2",
              "pic_url": null,
              "pic_hd1": null,
              "pic_hd2": null,
              "detail": "鸡翅饭 xx",
              "price": "20.00",
              "packing_fee": "2.00",
              "sales": "41",
              "praise": "0",
              "stock": "59",
              "sub_goods": []
            },
            {
              "goods_id": "31",
              "goods_name": "招牌饭",
              "seller_id": "2",
              "pic_url": "http://mtest.ipaotui.com/Uploadfile/Img/seller_goods/1461033463146103346359875.jpg",
              "pic_hd1": "http://mtest.ipaotui.com/Uploadfile/Img/seller_goods/hd1_1461033463146103346359875.jpg",
              "pic_hd2": "http://mtest.ipaotui.com/Uploadfile/Img/seller_goods/hd2_1461033463146103346359875.jpg",
              "detail": "招牌饭 xx",
              "price": "20.00",
              "packing_fee": "0.00",
              "sales": "14",
              "praise": "0",
              "stock": "86",
              "sub_goods": []
            },
            {
              "goods_id": "30",
              "goods_name": "排骨饭",
              "seller_id": "2",
              "pic_url": "http://mtest.ipaotui.com/Uploadfile/Img/seller_goods/1461034058146103405829482.jpg",
              "pic_hd1": "http://mtest.ipaotui.com/Uploadfile/Img/seller_goods/hd1_1461034058146103405829482.jpg",
              "pic_hd2": "http://mtest.ipaotui.com/Uploadfile/Img/seller_goods/hd2_1461034058146103405829482.jpg",
              "detail": "排骨饭 xx",
              "price": "20.00",
              "packing_fee": "0.00",
              "sales": "10",
              "praise": "0",
              "stock": "0",
              "sub_goods": []
            },
            {
              "goods_id": "46",
              "goods_name": "香肠2",
              "seller_id": "2",
              "pic_url": "http://mtest.ipaotui.com/Uploadfile/Img/seller_goods/1466411009146641100940750.jpg",
              "pic_hd1": "http://mtest.ipaotui.com/Uploadfile/Img/seller_goods/hd1_1466411009146641100940750.jpg",
              "pic_hd2": "http://mtest.ipaotui.com/Uploadfile/Img/seller_goods/hd2_1466411009146641100940750.jpg",
              "detail": "",
              "price": "2.00",
              "packing_fee": "0.00",
              "sales": "13",
              "praise": "0",
              "stock": "187",
              "sub_goods": []
            }
          ]
        },
        {
          "menu_id": "11",
          "menu_name": "便当",
          "seller_id": "2",
          "sort": "0",
          "is_use": "1",
          "goods": "29,33,32,31,30,46",
          "goods2": [
            {
              "goods_id": "29",
              "goods_name": "鸡腿饭",
              "seller_id": "2",
              "pic_url": "http://mtest.ipaotui.com/Uploadfile/Img/seller_goods/1461034075146103407535640.jpg",
              "pic_hd1": "http://mtest.ipaotui.com/Uploadfile/Img/seller_goods/hd1_1461034075146103407535640.jpg",
              "pic_hd2": "http://mtest.ipaotui.com/Uploadfile/Img/seller_goods/hd2_1461034075146103407535640.jpg",
              "detail": "鸡腿饭 xx",
              "price": "22.00",
              "packing_fee": "2.00",
              "sales": "46",
              "praise": "0",
              "stock": "76",
              "sub_goods": [
                {
                  "sub_id": "50",
                  "sub_name": "大",
                  "price": "22.98",
                  "packing_fee": "2.00",
                  "stock": "74"
                },
                {
                  "sub_id": "51",
                  "sub_name": "小",
                  "price": "22.00",
                  "packing_fee": "2.00",
                  "stock": "76"
                }
              ]
            },
            {
              "goods_id": "33",
              "goods_name": "香肠饭",
              "seller_id": "2",
              "pic_url": null,
              "pic_hd1": null,
              "pic_hd2": null,
              "detail": "香肠饭 xx",
              "price": "20.00",
              "packing_fee": "0.00",
              "sales": "0",
              "praise": "0",
              "stock": "100",
              "sub_goods": []
            },
            {
              "goods_id": "32",
              "goods_name": "鸡翅饭",
              "seller_id": "2",
              "pic_url": null,
              "pic_hd1": null,
              "pic_hd2": null,
              "detail": "鸡翅饭 xx",
              "price": "20.00",
              "packing_fee": "0.00",
              "sales": "41",
              "praise": "0",
              "stock": "59",
              "sub_goods": []
            },
            {
              "goods_id": "31",
              "goods_name": "招牌饭",
              "seller_id": "2",
              "pic_url": "http://mtest.ipaotui.com/Uploadfile/Img/seller_goods/1461033463146103346359875.jpg",
              "pic_hd1": "http://mtest.ipaotui.com/Uploadfile/Img/seller_goods/hd1_1461033463146103346359875.jpg",
              "pic_hd2": "http://mtest.ipaotui.com/Uploadfile/Img/seller_goods/hd2_1461033463146103346359875.jpg",
              "detail": "招牌饭 xx",
              "price": "20.00",
              "packing_fee": "0.00",
              "sales": "14",
              "praise": "0",
              "stock": "86",
              "sub_goods": []
            },
            {
              "goods_id": "30",
              "goods_name": "排骨饭",
              "seller_id": "2",
              "pic_url": "http://mtest.ipaotui.com/Uploadfile/Img/seller_goods/1461034058146103405829482.jpg",
              "pic_hd1": "http://mtest.ipaotui.com/Uploadfile/Img/seller_goods/hd1_1461034058146103405829482.jpg",
              "pic_hd2": "http://mtest.ipaotui.com/Uploadfile/Img/seller_goods/hd2_1461034058146103405829482.jpg",
              "detail": "排骨饭 xx",
              "price": "20.00",
              "packing_fee": "0.00",
              "sales": "10",
              "praise": "0",
              "stock": "0",
              "sub_goods": []
            },
            {
              "goods_id": "46",
              "goods_name": "香肠2",
              "seller_id": "2",
              "pic_url": "http://mtest.ipaotui.com/Uploadfile/Img/seller_goods/1466411009146641100940750.jpg",
              "pic_hd1": "http://mtest.ipaotui.com/Uploadfile/Img/seller_goods/hd1_1466411009146641100940750.jpg",
              "pic_hd2": "http://mtest.ipaotui.com/Uploadfile/Img/seller_goods/hd2_1466411009146641100940750.jpg",
              "detail": "",
              "price": "2.00",
              "packing_fee": "0.00",
              "sales": "13",
              "praise": "0",
              "stock": "187",
              "sub_goods": []
            }
          ]
        },
      ],
      "goods_map": {
        "29": {
          "goods_id": "29",
          "goods_name": "鸡腿饭",
          "seller_id": "2",
          "pic_url": "http://mtest.ipaotui.com/Uploadfile/Img/seller_goods/1461034075146103407535640.jpg",
          "pic_hd1": "http://mtest.ipaotui.com/Uploadfile/Img/seller_goods/hd1_1461034075146103407535640.jpg",
          "pic_hd2": "http://mtest.ipaotui.com/Uploadfile/Img/seller_goods/hd2_1461034075146103407535640.jpg",
          "detail": "鸡腿饭 xx",
          "price": "22.00",
          "packing_fee": "2.00",
          "sales": "46",
          "praise": "0",
          "stock": "76",
          "sub_goods": [
            {
              "sub_id": "50",
              "sub_name": "大",
              "price": "22.98",
              "packing_fee": "2.00",
              "stock": "74"
            },
            {
              "sub_id": "51",
              "sub_name": "小",
              "price": "22.00",
              "packing_fee": "2.00",
              "stock": "76"
            }
          ],
          "sub_goods_map": {
            "50": {
              "sub_id": "50",
              "sub_name": "大",
              "price": "22.98",
              "packing_fee": "2.00",
              "stock": "74"
            },
            "51": {
              "sub_id": "51",
              "sub_name": "小",
              "price": "22.00",
              "packing_fee": "2.00",
              "stock": "76"
            }
          }
        },
        "30": {
          "goods_id": "30",
          "goods_name": "排骨饭",
          "seller_id": "2",
          "pic_url": "http://mtest.ipaotui.com/Uploadfile/Img/seller_goods/1461034058146103405829482.jpg",
          "pic_hd1": "http://mtest.ipaotui.com/Uploadfile/Img/seller_goods/hd1_1461034058146103405829482.jpg",
          "pic_hd2": "http://mtest.ipaotui.com/Uploadfile/Img/seller_goods/hd2_1461034058146103405829482.jpg",
          "detail": "排骨饭 xx",
          "price": "20.00",
          "packing_fee": "0.00",
          "sales": "10",
          "praise": "0",
          "stock": "0",
          "sub_goods": [],
          "sub_goods_map": []
        },
        "31": {
          "goods_id": "31",
          "goods_name": "招牌饭",
          "seller_id": "2",
          "pic_url": "http://mtest.ipaotui.com/Uploadfile/Img/seller_goods/1461033463146103346359875.jpg",
          "pic_hd1": "http://mtest.ipaotui.com/Uploadfile/Img/seller_goods/hd1_1461033463146103346359875.jpg",
          "pic_hd2": "http://mtest.ipaotui.com/Uploadfile/Img/seller_goods/hd2_1461033463146103346359875.jpg",
          "detail": "招牌饭 xx",
          "price": "20.00",
          "packing_fee": "0.00",
          "sales": "15",
          "praise": "0",
          "stock": "85",
          "sub_goods": [],
          "sub_goods_map": []
        },
        "32": {
          "goods_id": "32",
          "goods_name": "鸡翅饭",
          "seller_id": "2",
          "pic_url": null,
          "pic_hd1": null,
          "pic_hd2": null,
          "detail": "鸡翅饭 xx",
          "price": "20.00",
          "packing_fee": "0.00",
          "sales": "43",
          "praise": "0",
          "stock": "57",
          "sub_goods": [],
          "sub_goods_map": []
        },
        "33": {
          "goods_id": "33",
          "goods_name": "香肠饭",
          "seller_id": "2",
          "pic_url": null,
          "pic_hd1": null,
          "pic_hd2": null,
          "detail": "香肠饭 xx",
          "price": "20.00",
          "packing_fee": "0.00",
          "sales": "0",
          "praise": "0",
          "stock": "100",
          "sub_goods": [],
          "sub_goods_map": []
        },
        "34": {
          "goods_id": "34",
          "goods_name": "咸蛋",
          "seller_id": "2",
          "pic_url": null,
          "pic_hd1": null,
          "pic_hd2": null,
          "detail": "咸蛋 xx",
          "price": "20.00",
          "packing_fee": "0.00",
          "sales": "0",
          "praise": "0",
          "stock": "100",
          "sub_goods": [],
          "sub_goods_map": []
        },
        "35": {
          "goods_id": "35",
          "goods_name": "可乐",
          "seller_id": "2",
          "pic_url": null,
          "pic_hd1": null,
          "pic_hd2": null,
          "detail": "可乐 xx",
          "price": "3.00",
          "packing_fee": "0.00",
          "sales": "0",
          "praise": "0",
          "stock": "100",
          "sub_goods": [],
          "sub_goods_map": []
        },
        "36": {
          "goods_id": "36",
          "goods_name": "雪碧",
          "seller_id": "2",
          "pic_url": null,
          "pic_hd1": null,
          "pic_hd2": null,
          "detail": "雪碧 xx",
          "price": "3.00",
          "packing_fee": "0.00",
          "sales": "0",
          "praise": "0",
          "stock": "100",
          "sub_goods": [],
          "sub_goods_map": []
        },
        "37": {
          "goods_id": "37",
          "goods_name": "香肠",
          "seller_id": "2",
          "pic_url": null,
          "pic_hd1": null,
          "pic_hd2": null,
          "detail": "香肠 xx",
          "price": "3.00",
          "packing_fee": "0.00",
          "sales": "0",
          "praise": "0",
          "stock": "100",
          "sub_goods": [],
          "sub_goods_map": []
        },
        "40": {
          "goods_id": "40",
          "goods_name": "香蕉",
          "seller_id": "2",
          "pic_url": "http://mtest.ipaotui.com/",
          "pic_hd1": null,
          "pic_hd2": null,
          "detail": "",
          "price": "6.00",
          "packing_fee": "0.00",
          "sales": "0",
          "praise": "0",
          "stock": "100",
          "sub_goods": [],
          "sub_goods_map": []
        },
        "41": {
          "goods_id": "41",
          "goods_name": "香蕉2",
          "seller_id": "2",
          "pic_url": "http://mtest.ipaotui.com/",
          "pic_hd1": null,
          "pic_hd2": null,
          "detail": "",
          "price": "6.00",
          "packing_fee": "0.00",
          "sales": "0",
          "praise": "0",
          "stock": "100",
          "sub_goods": [],
          "sub_goods_map": []
        },
        "42": {
          "goods_id": "42",
          "goods_name": "香蕉3",
          "seller_id": "2",
          "pic_url": "http://mtest.ipaotui.com/",
          "pic_hd1": null,
          "pic_hd2": null,
          "detail": "",
          "price": "6.00",
          "packing_fee": "0.00",
          "sales": "0",
          "praise": "0",
          "stock": "100",
          "sub_goods": [],
          "sub_goods_map": []
        },
        "43": {
          "goods_id": "43",
          "goods_name": "香蕉3",
          "seller_id": "2",
          "pic_url": "http://mtest.ipaotui.com/",
          "pic_hd1": null,
          "pic_hd2": null,
          "detail": "",
          "price": "6.00",
          "packing_fee": "0.00",
          "sales": "0",
          "praise": "0",
          "stock": "100",
          "sub_goods": [],
          "sub_goods_map": []
        },
        "44": {
          "goods_id": "44",
          "goods_name": "香蕉3",
          "seller_id": "2",
          "pic_url": "http://mtest.ipaotui.com/",
          "pic_hd1": null,
          "pic_hd2": null,
          "detail": "",
          "price": "6.00",
          "packing_fee": "0.00",
          "sales": "0",
          "praise": "0",
          "stock": "100",
          "sub_goods": [],
          "sub_goods_map": []
        },
        "46": {
          "goods_id": "46",
          "goods_name": "香肠2",
          "seller_id": "2",
          "pic_url": "http://mtest.ipaotui.com/Uploadfile/Img/seller_goods/1466411009146641100940750.jpg",
          "pic_hd1": "http://mtest.ipaotui.com/Uploadfile/Img/seller_goods/hd1_1466411009146641100940750.jpg",
          "pic_hd2": "http://mtest.ipaotui.com/Uploadfile/Img/seller_goods/hd2_1466411009146641100940750.jpg",
          "detail": "",
          "price": "2.00",
          "packing_fee": "0.00",
          "sales": "13",
          "praise": "0",
          "stock": "187",
          "sub_goods": [],
          "sub_goods_map": []
        }
      }

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
  },

  initTab: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },
  tabClick: function (e) {
    this.setData({
      activeIndex: e.currentTarget.id
    });
  },

  swiperChange(e) {
    var {current} = e.detail
    this.setData({
      activeIndex: current
    })
  },
  menuClick: function (e) {
    this.setData({
      activeMenuIndex: e.currentTarget.id
    })
  },

  addGoods(goods, item) {
    var {goods_id, sub_id, num} = item
    var itemIndex;
    if (sub_id) {
      itemIndex = goods.findIndex(item => {
        return item['goods_id'] == goods_id && item['sub_id'] == sub_id
      })
    } else {
      itemIndex = goods.findIndex(item => {
        return item['goods_id'] == goods_id
      })
    }
    if (itemIndex >= 0) {
      goods[itemIndex]['num'] += num
    } else {
      goods.push(item)
    }
    return goods
  },
  removeGoods(goods, item) {
    var {goods_id, sub_id, num} = item
    var itemIndex;
    if (sub_id) {
      itemIndex = goods.findIndex(item => {
        return item['goods_id'] == goods_id && item['sub_id'] == sub_id
      })
    } else {
      itemIndex = goods.findIndex(item => {
        return item['goods_id'] == goods_id
      })
    }
    if (itemIndex >= 0) {
      item = goods[itemIndex]
      if (item.num > num) {
        item.num -= num
      } else {
        goods.splice(itemIndex, 1)
      }
    }
    return goods
  },

  increase(e) {
    var {order, info: {goods_map}} = this.data;
    var {goodsId, subId} = e.currentTarget.dataset;
    var goods = goods_map[goodsId];
    var {goods_id, goods_name} = goods
    if (subId) {
      goods = goods.sub_goods_map[subId];
      var {sub_id, sub_name} = goods
    }
    order.totalNum += 1;
    order.totalGoodsPrice += +goods.price;
    order.totalPackingFee += +goods.packing_fee;
    order.totalPrice = +((order.totalGoodsPrice + order.totalPackingFee).toFixed(2));
    order.goods = this.addGoods(order.goods, {
      goods_id, goods_name,
      sub_id, sub_name,
      price: goods.price,
      packing_fee: goods.packing_fee,
      num: 1
    })
    order.goodsNums = this.calcGoodsNums(order.goods)

    this.setData({
      order
    })

    if (subId) {
      this.setData({
        activeSubGoods: Object.assign(this.data.activeSubGoods, {
          subNums: this.calcSubNums(order.goods, goodsId)
        })
      })
    }

  },
  decrease(e) {
    var {order, info: {goods_map}} = this.data;
    var {goodsId, subId} = e.currentTarget.dataset;

    var goods = goods_map[goodsId];
    if (subId) {
      goods = goods.sub_goods_map[subId];
    }
    order.totalNum -= 1;
    order.totalGoodsPrice -= +goods.price;
    order.totalPackingFee -= +goods.packing_fee;
    order.totalPrice = +((order.totalGoodsPrice + order.totalPackingFee).toFixed(2));
    order.goods = this.removeGoods(order.goods, {
      goods_id: goodsId,
      sub_id: subId,
      num: 1
    })
    order.goodsNums = this.calcGoodsNums(order.goods)
    this.setData({
      order
    })

    if (subId) {
      this.setData({
        activeSubGoods: Object.assign(this.data.activeSubGoods, {
          subNums: this.calcSubNums(order.goods, goodsId)
        })
      })
    }

    if (order.totalNum == 0) {
      this.hideCart()
    }
  },
  calcGoodsNums(goods) {
    var goodsNums = {}
    for (let i = 0, len = goods.length; i < len; i++) {
      let {goods_id, num} = goods[i]
      if (goodsNums[goods_id]) {
        goodsNums[goods_id] += num
      } else {
        goodsNums[goods_id] = num
      }
    }
    return goodsNums
  },
  calcSubNums(goods, goodsId) {
    var subNums = {}
    for (let i = 0, len = goods.length; i < len; i++) {
      let {goods_id, sub_id, num} = goods[i]
      if (goods_id == goodsId) {
        subNums[sub_id] = num
      }
    }
    return subNums
  },
  clearCart(e) {
    this.setData({
      order: initOrder,
      showCart: false
    })
  },
  hideCart(e) {
    this.setData({
      showCart: false
    })
  },
  toggleCart(e) {
    var {showCart, order: {totalNum}} = this.data

    if (totalNum <= 0) {
      return;
    }
    this.setData({
      showCart: !showCart
    })
  },

  showSubGoods(e) {
    var {info: {goods_map}, order} = this.data;
    var {goodsId} = e.currentTarget.dataset;
    var {goods_id, goods_name, sub_goods} = goods_map[goodsId];
    this.setData({
      showSubGoods: true,
      activeSubGoods: {
        goods_name, goods_id,
        sub_goods,
        activeIndex: 0,
        subNums: this.calcSubNums(order.goods, goodsId)
      }
    })
  },
  hideSubGoods(e) {
    this.setData({
      showSubGoods: false
    })
  },
  changeSubGoods(e) {
    var {subIndex} = e.currentTarget.dataset;
    var {activeSubGoods} = this.data;
    activeSubGoods['activeIndex'] = subIndex
    this.setData({
      activeSubGoods
    })
  },
  onPhoneTap(e) {
    var {phone} = e.currentTarget.dataset
    makePhoneCall(phone)
  }
})