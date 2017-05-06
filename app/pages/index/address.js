// pages/index/address.js
import {
  getCurrentAddressList,
  searchAddressList,
  splitByKeyword
} from '../../utils/util'
import debounce from '../../utils/debounce'



var initReLocateLabel = '重新定位'
Page({
  data: {
    reLocateLabel: initReLocateLabel,
    addressList: [
      {
        "addr_id": "170",
        "user_id": "4",
        "city_id": "330300",
        "district_id": null,
        "addr": "龙华大厦",
        "detail": "",
        "longitude": "120.69101",
        "latitude": "28.002974",
        "receiver": "test4",
        "phone": "13000000005",
        "create_time": "2017-02-20 10:38:11",
        "delete": "0",
        "district_name": "",
        "city_name": "温州市"
      },
      {
        "addr_id": "160",
        "user_id": "4",
        "city_id": "330300",
        "district_id": null,
        "addr": "电商大厦",
        "detail": "",
        "longitude": "120.737561",
        "latitude": "27.979617",
        "receiver": "test4",
        "phone": "13000000004",
        "create_time": "2016-12-16 13:37:10",
        "delete": "0",
        "district_name": "",
        "city_name": "温州市"
      }
    ],

    poiList: [],

    showSearchList: false,
    searchKey: '',
    searchList: []
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.initPoiList()
    this.onSearchInput = debounce(this.onSearchInput, 300)
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

  reLocate(e) {
    this.initPoiList()
  },

  onSearchInput(e) {
    var that = this
    var {value} = e.detail
    this.setData({
      searchKey: value,
      showSearchList: !!value
    })

    if (value) {
      searchAddressList({
        keyword: value,
        success(data) {
          data = data.map(item => {
             item['titleSplit'] = splitByKeyword(item.title, value)
             return item
          })
          that.setData({
            searchList: data
          })
        }
      })
    }
  },
  clearSearchKey(e) {
    this.setData({
      searchKey: '',
      showSearchList: false
    })
  },
  onSearchItemTap(e) {
    console.log(e)
  },

  initPoiList() {
    var that = this
    this.setData({
      reLocateLabel: '定位中...'
    })
    getCurrentAddressList({
      success(addressList) {
        that.setData({
          poiList: addressList,
          reLocateLabel: initReLocateLabel
        })
      }
    })
  }
})