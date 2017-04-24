//index.js
//获取应用实例

function countdown(that) {
  var second = that.data.second
  if (second <= 0) {
    return
  }
  var time = setTimeout(function () {
    console.log(second)
    that.setData({
      second: second - 1
    });
    countdown(that);
  }, 1000)
}
var app = getApp()
Page({
  data: {
    category: [
      {
        "category_id": "1",
        "title": "本地特产",
        "icon": "/images/category/1.png"
      },
      {
        "category_id": "2",
        "title": "美食外卖",
        "icon": "/images/category/2.png"
      },
      {
        "category_id": "3",
        "title": "甜品蛋糕",
        "icon": "/images/category/3.png"
      },
      {
        "category_id": "4",
        "title": "果蔬生鲜",
        "icon": "/images/category/4.png"
      },
      {
        "category_id": "5",
        "title": "超市便利",
        "icon": "/images/category/5.png"
      },
      {
        "category_id": "6",
        "title": "进口产品",
        "icon": "/images/category/6.png"
      },
      {
        "category_id": "7",
        "title": "优惠活动",
        "icon": "/images/category/7.png"
      },
      {
        "category_id": "8",
        "title": "全部分类",
        "icon": "/images/category/8.png"
      }
    ],
    shop: [
      {
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
        "sales": "73",
        "service": "0.0",
        "quality": "0.0",
        "overall": "0.0",
        "distance": "11",
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
        ]
      },
      {
        "seller_id": "24",
        "seller_name": "测试",
        "state": "1",
        "city_id": "330300",
        "address": "skldfjhkls",
        "pic_url": "http://mtest.ipaotui.com/Uploadfile/Img/seller/1468462647146846264750782.jpg",
        "pic_hd": "http://mtest.ipaotui.com/Uploadfile/Img/seller/hd_1468462647146846264750782.jpg",
        "longitude": "120.70507",
        "latitude": "28.003041",
        "phone": "13900000000",
        "start_sell_time": "08:00:00",
        "end_sell_time": "22:00:00",
        "sell_time": "08:00-22:00",
        "is_rest": "0",
        "notice": null,
        "reach_time": "30",
        "reserve_day": "0",
        "min_price": "5",
        "sales": "0",
        "service": "0.0",
        "quality": "0.0",
        "overall": "0.0",
        "distance": "4784",
        "favorite": "0",
        "promotion": []
      },
    ]
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  }
})
