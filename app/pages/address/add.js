// pages/address/add.js
import WxValidate from '../../utils/WxValidate'
import {
  addUserAddr, getUserAddr
} from '../../utils/apis'
import {
  alert,
  getCurrentAddress, reverseGeocoder,
  getPrevPage
} from '../../utils/util'
Page({
  data: {
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.id = options.id
    this.callback = options.callback || 'callback'
    this.initValidate()
    if (this.id) {
      this.loadData()
    } else {
      this.initAddress()
    }
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
  initValidate() {
    this.validate = new WxValidate({
      receiver: {
        required: true,
      },
      phone: {
        required: true,
        tel: true,
      },
    }, {
        receiver: {
          required: '请输入您的姓名'
        },
        phone: {
          required: '请输入手机号',
          tel: '请输入有效手机号码'
        },
      })
  },
  initAddress() {
    var that = this
    getCurrentAddress(address => {
      that.setData({
        address
      })
    })
  },
  onChooseLocation(e) {
    var that = this
    that.setData({
      disabled: true
    })
    wx.chooseLocation({
      success: function (res) {
        var {
          name: title, address,
          longitude, latitude
        } = res
        var location = {
          longitude, latitude
        }
        reverseGeocoder({
          location,
          success(data) {
            that.setData({
              address: Object.assign({
                title, address, location
              }, data),
              disabled: false,
            })
          }
        })
      },
    })
  },
  loadData() {
    var that = this
    var addr_id = this.id
    wx.showNavigationBarLoading()
    getUserAddr({
      addr_id,
      success(data) {
        that.setData({
          receiver: data.receiver,
          phone: data.phone,
          detail: data.detail,
          address: {
            title: data.addr,
            city: data.city_name,
            district: data.district_name,
            city_id: data.city_id,
            district_id: data.district_id,
            gps: `${data.longitude},${data.latitude}`
          }
        })
        wx.hideNavigationBarLoading()
      },
      error() {
        wx.hideNavigationBarLoading()
      }
    })
  },
  formSubmit(e) {
    var that = this
    var {loading, address} = this.data
    if (loading) {
      return
    }

    if (!address) {
      return alert('请选择收货地址')
    }

    if (!this.validate.checkForm(e)) {
      const error = this.validate.errorList[0]
      return alert(error.msg)
    }
    this.setData({
      loading: true
    })
    var {
      receiver, phone, detail
    } = e.detail.value
    addUserAddr({
      receiver, phone, detail,
      address,
      addr_id: that.id,
      success(data) {
        that.setData({
          loading: false
        })
        getPrevPage()[that.callback]()
        wx.navigateBack()
      },
      error() {
        that.setData({
          loading: false
        })
      }
    })
  },
})