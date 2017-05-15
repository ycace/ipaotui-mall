// pages/index/category.js
import {
  getSellersByCategory
} from '../../utils/apis'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 0,
    hasMore: true,
    loading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.id = options.id || 1
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
    var {loading, hasMore} = this.data
    if (hasMore && !loading) {
      this.loadData()
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  loadData() {
    var that = this
    var {id: category_id} = this
    var {loading, page} = this.data
    if (loading) {
      return
    }
    that.setData({
      loading: true
    })

    getSellersByCategory({
      category_id, page,
      success(data) {
        var {list} = that.data
        var {
          list: list2, count, page
        } = data
        list2 = list2.map(item => {
          item['distanceFormat'] = (item.distance / 1000).toFixed(2)
          return item
        })
        that.setData({
          loading: false,
          list: list ? list.concat(list2) : list2,
          hasMore: count == 10,
          page: page + 1
        })
        wx.setNavigationBarTitle({
          title: data.title,
        })
      }
    })

  }
})