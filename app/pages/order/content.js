// pages/order/content.js
import {
  getPrevPage
} from '../../utils/util'
const limit = 50
Page({

  /**
   * 页面的初始数据
   */
  data: {
    limit,
    content: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.callback = options.callback || 'callback'
    var {content} = options
    if (content) {
      this.setData({
        content
      })
    }
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

  onContentInput(e) {
    var {value} = e.detail
    var {content} = this.data
    if (value.length <= limit) {
      this.setData({
        content: value
      })
    } else {
      this.setData({
        content
      })
    }
  },
  onSaveTap(e) {
    var {content} = this.data
    var cb = getPrevPage()[this.callback]
    cb && cb(content)
    wx.navigateBack({
      delta: 1,
    })
  }
})