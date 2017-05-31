//app.js
import {
  getLoginInfo, getUserAddrs
} from './utils/apis'
import {
  getCurrentAddress,
  coordFormat
} from './utils/util'
import {
  gcj02tobd09
} from './utils/coordtransform'
import distance from './utils/distance'
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
  },
  getLoginInfo: function (cb) {
    var that = this
    if (this.globalData.loginInfo) {
      cb && cb(this.globalData.loginInfo)
    } else {
      //调用登录接口
      getLoginInfo({
        success(data) {
          that.setLoginInfo(data)
          cb && cb(data)
        }
      })
    }
  },
  setLoginInfo(loginInfo) {
    if (loginInfo.session_3rd) {
      wx.setStorageSync('session_3rd', loginInfo.session_3rd)
    }
    this.globalData.loginInfo = loginInfo
  },

  // 获取当前地址
  getCurrentAddress(cb) {
    var that = this
    if (this.globalData.currentAddress) {
      return cb && cb(this.globalData.currentAddress)
    }

    getCurrentAddress(address => {
      address = that.setCurrentAddress(address)
      cb(address)
      this.getLoginInfo(loginInfo => {
        if (loginInfo.is_login) {
          this.findNearbyUserAddr(userAddress => {
            if (!userAddress) {
              return
            }
            that.setCurrentAddress(userAddress)
          })
        }
      })
    })
  },
  setCurrentAddress(address) {
    if(address.addr_id) {
      address.title = `${address.addr} ${address.detail}`
      address.city = address.city_name
      address.district = address.district_name
      address.location = {
        longitude: address.longitude,
        latitude: address.latitude
      }
    } else {
      address.location = coordFormat(address.location)
    }
    this.globalData.currentAddress = address
    return address
  },

  findNearbyUserAddr(cb, radius = 100) {
    radius /= 100
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        var [lng1, lat1] = gcj02tobd09(res.longitude, res.latitude)
        getUserAddrs({
          success(addressList) {
            for (let i = 0, len = addressList.length; i < len; i++) {
              var address = addressList[i]
              var {
                longitude: lng2,
                latitude: lat2
              } = address
              if (distance(lat1, lng1, lat2, lng2) <= radius) {
                return cb(address)
              }
            }
            return cb()
          }
        })
      },
      fail(res) {
        console.log(res.errMsg)
        alert('获取用户地址失败')
      }
    })
  },

  globalData: {
    loginInfo: null,
    currentAddress: null
  }
})