// pages/mine/coupon.js
import {
  getShareUserList
} from '../../utils/apis'

import {
  getPrevPage
} from '../../utils/util'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 0,
    hasMore: true,
    loading: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.id = options.id || 30
    this.callback = options.callback || 'callback'
    this.setData({
      selectedId: this.id
    })
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
  onReachBottom(e) {
    var {
      hasMore, loading
    } = this.data
    if (hasMore && !loading) {
      this.loadData()
    }
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
    var {
      loading, page
    } = this.data
    if (loading) {
      return
    }
    this.setData({
      loading: true
    })
    getShareUserList({
      page,
      success(data) {
        var {list} = that.data
        var {list: list2, has_more, page} = data
        list2 = list2.map(item => {
          item['deadline_time_format'] = item.deadline_time.split(' ')[0]
          return item
        })
        that.setData({
          loading: false,
          list: list ? list.concat(list2) : list2,
          hasMore: has_more,
          page: page + 1
        })
      }
    })
  },
  onItemTap(e) {
    var {id} = e.currentTarget
    var {selectedId} = this.data
    if (id == selectedId) {
      return;
    }
    var callback = getPrevPage()[this.callback]
    callback && callback(id)
    wx.navigateBack()
  }
})