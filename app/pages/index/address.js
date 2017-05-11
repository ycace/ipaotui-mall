// pages/index/address.js
import {
  getPrevPage,
  getCurrentAddressList, setCurrentAddress,
  searchAddressList,
  splitByKeyword
} from '../../utils/util'
import debounce from '../../utils/debounce'

import {getUserAddrs} from '../../utils/apis'

var initReLocateLabel = '重新定位'
Page({
  data: {
    reLocateLabel: initReLocateLabel,
    addressList: [],

    poiList: [],

    showSearchList: false,
    searchKey: '',
    searchList: []
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.callback = options.callback || 'callback'
    this.initAddressList()
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
    var {id} = e.currentTarget
    var {searchList} = this.data
    var {
      title, address, location,
      city, district, adcode
    } = searchList[id]

    getPrevPage()[this.callback]({
      location, title, address,
      city, district,
      district_id: adcode.toString(),
      city_id: adcode.toString().replace(/\d{2}$/, '00')
    })
    wx.navigateBack()
  },
  onPoiItemTap(e) {
    var {id} = e.currentTarget
    var {poiList} = this.data
    getPrevPage()[this.callback](poiList[id])
    wx.navigateBack()
  },

  onAddressItemTap(e) {
    var {id} = e.currentTarget
    var {addressList} = this.data
    getPrevPage()[this.callback](addressList[id])
    wx.navigateBack()
  },

  initAddressList() {
    var that = this
    getApp().getLoginInfo(loginInfo => {
      if(loginInfo.is_login) {
        getUserAddrs({
          success(data) {
            that.setData({
              addressList: data
            })
          }
        })
      }
    })
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