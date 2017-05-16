// pages/order/review.js
import {
  getOrderInfo, reviewsOrder
} from '../../utils/apis'

import dateFormat from '../../utils/dateformat'

import {
  datetimeFormat,
  alert, getPrevPage
} from '../../utils/util'

var RATE_LABELS = {
  1: '非常差',
  2: '很差',
  3: '一般',
  4: '很好',
  5: '非常好'
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    RATE_LABELS,
    limitLength: 8,
    content: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.id = options.id || 1468
    this.loadData()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },
  loadData() {
    var that = this
    var order_id = this.id
    wx.showNavigationBarLoading()
    this.setData({
      loading: true
    })
    getOrderInfo({
      order_id,
      success(data) {
        var [reach_date, reach_time] = datetimeFormat(data.receive_time).split(' ')
        that.setData({
          reach_date, reach_time,
          info: data,
          loading: false,
        })
        wx.hideNavigationBarLoading()
      },
      error() {
        that.setData({
          loading: false
        })
        wx.hideNavigationBarLoading()
      }
    })
  },
  onChangeTime(e) {
    var reach_time = e.detail.value
    this.setData({
      reach_time
    })
  },
  onServiceChange(e) {
    var {id: service} = e.currentTarget
    this.setData({
      service
    })
  },
  onQualityChange(e) {
    var {id: quality} = e.currentTarget
    this.setData({
      quality
    })
  },
  onContentInput(e) {
    var {value: content} = e.detail
    this.setData({
      content
    })
  },
  onSubmit(e) {
    var that = this
    var {id: order_id} = this
    var {
      limitLength,
      service, quality, content,
      info: {receive_time}
    } = this.data
    if (!service) {
      return alert('请为配送打分')
    }

    if (!quality) {
      return alert('请为商家打分')
    }

    if (content.length < limitLength) {
      return alert(`评论内容不能小于${limitLength}个字`)
    }

    // var reach_date = dateFormat(new Date(receive_time * 1000), "yyyy-mm-dd")

    this.setData({
      loading: true
    })
    reviewsOrder({
      order_id,
      service, quality, content,
      // reach_time: `${reach_date} ${reach_time}`,
      success(data) {
        that.setData({
          loading: false
        })
        alert('评论成功', function () {
          var callback = getPrevPage()['callback']
          callback && callback()
          wx.navigateBack()
        })
      },
      error(data) {
        that.setData({
          loading: false
        })
      }
    })
  }
})