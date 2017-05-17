//index.js
//获取应用实例
import {
  getSellers
} from '../../utils/apis'

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
    page: 0,
    hasMore: true,
    loading: false
  },
  onLoad: function () {
    this.initAddress()
  },

  initAddress() {
    var that = this
    this.invalidateData()
    getApp().getCurrentAddress(function (address) {
      if (address.addr_id) {
        address['title'] = `${address.addr} ${address.detail}`
      }
      that.setData({
        currentAddress: address
      })
      that.loadData()
    })
  },

  loadData() {
    if (this.data.loading) {
      return;
    }
    var that = this
    var {
      page,
    } = this.data

    this.setData({
      loading: true
    })
    getSellers({
      page,
      success(data) {
        var {
          shopList
        } = that.data

        var list = data.list.map(item => {
          item['distanceFormat'] = (item.distance / 1000).toFixed(2)
          return item
        })
        that.setData({
          shopList: shopList ? shopList.concat(list) : list,
          page: page + 1,
          hasMore: data.count == 10,
          loading: false
        })
      }
    })
  },
  invalidateData() {
    this.setData({
      page: 0,
      hasMore: true,
      loading: false,
      shopList: null
    })
  },
  onReachBottom(e) {
    if (this.data.hasMore && !this.data.loading) {
      this.loadData()
    }
  },
  callback(address) {
    getApp().setCurrentAddress(address)
    this.initAddress()
  },
  onShareAppMessage() {
    return {
      title: '首页',
      path: '/pages/index/index'
    }
  }
})
