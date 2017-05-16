// pages/index/search.js
import debounce from '../../utils/debounce'
import {
  search
} from '../../utils/apis'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: "",
    page: 0,
    hasMore: true,
    loading: false
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    var {value} = e.detail
    this.setData({
      inputVal: value,
      page: 0,
      hasMore: true,
      loading: false
    });
    if (value) {
      this.loadData()
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.inputTyping = debounce(this.inputTyping, 300)
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
    var {
      loading, page,
      inputVal: keyword
    } = this.data
    if (loading) {
      return
    }
    that.setData({
      loading: true
    })

    search({
      keyword, page,
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
          page: +page + 1
        })
      }
    })

  }
})