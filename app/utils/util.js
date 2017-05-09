'use strict';
import timeago from './timeago.min'
import QQMapWX from './qqmap-wx-jssdk.min'
import { gcj02tobd09 } from './coordtransform'
import { host, qqmapKey } from '../config'

const qqmap = new QQMapWX({
    key: qqmapKey
});

function resolveAdInfo(adInfo) {
    const {city, district, adcode} = adInfo
    return {
        city, district,
        district_id: adcode,
        city_id: adcode.replace(/\d{2}$/, '00')
    }
}

// 解析地址
export function reverseGeocoder(options) {
    const {
        location, success, complete
    } = options
    qqmap.reverseGeocoder({
        location,
        success: function (res) {
            var address = resolveAdInfo(res.result.ad_info)
            success && success(address)
        },
        fail: function (err) {
            console.log(err)
        },
        complete
    })
}

// 获取当前地理位置
export function getCurrentAddressList(options) {
    const {
        success, complete
    } = options
    wx.getLocation({
        type: 'gcj02',
        success(res) {
            getAddressFromLocation({
                location: {
                    latitude: res.latitude,
                    longitude: res.longitude,
                },
                success, complete
            })
        },
        fail(e) {
            console.log(res.errMsg)
            alert('获取用户地址失败')
        }
    })
}

// 地点搜索
export function searchAddressList(options) {
    const {
        keyword, success
    } = options
    getCurrentCity(function (cityName) {
        qqmap.getSuggestion({
            region: cityName,
            keyword,
            success(res) {
                success && success(res.data)
            }
        })
    })
}

// 获取当期地址
var currentAddress;
export function getCurrentAddress(callback) {
    if(currentAddress) {
        return callback && callback(currentAddress) 
    }

    getCurrentAddressList({
        success(addressList) {
            if(addressList.length > 0) {
                currentAddress = addressList[0]
                callback(currentAddress)
            }
        }
    })
}

export function setCurrentAddress(address) {
    currentAddress = address
}


// 获取当前城市
var cityName;
export function getCurrentCity(callback) {
    if (cityName) {
        return callback && callback(cityName)
    }
    wx.getLocation({
        type: 'gcj02',
        success(res) {
            qqmap.reverseGeocoder({
                location: {
                    longitude: res.longitude,
                    latitude: res.latitude
                },
                success: function (res) {
                    cityName = res.result.address_component.city
                    callback && callback(cityName)
                }
            })
        },
        fail(res) {
            console.log(res.errMsg)
            alert('获取用户地址失败')
        }
    })
}


// 根据坐标获取地址信息
export function getAddressFromLocation(options) {
    const {location, success} = options
    getPois({
        location,
        success(pois) {
            var addressList = []
            pois.forEach(poi => {
                var {
                    title, location,
                    address, ad_info
                } = poi
                addressList.push(Object.assign({
                    title, location, address
                }, resolveAdInfo(ad_info)))
            })
            success && success(addressList)
        }
    })
}

// 获取兴趣点
export function getPois(options) {
    const {
        location, success, complete
    } = options
    qqmap.reverseGeocoder({
        location,
        get_poi: 1,
        success: function (res) {
            success && success(res.result.pois)
        },
        fail: function (err) {
            console.log(err)
        },
        complete
    })
}

export function getPrevPage() {
    const pages = getCurrentPages()
    return pages[pages.length - 2]
}

export function fetch(options) {
    wx.request({
        url: `https://${host}/${options.url}`,
        data: Object.assign(options.data, {
            'app_v': 'ipaotui_mall'
        }),
        method: options.method || 'POST',
        header: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
            const data = res.data
            if (data.State == 'Success') {
                options.success && options.success(data.data)
            } else {
                alert(data.info)
                options.error && options.error(data.info)
            }
            options.complete && options.complete()
        }
    })
}

// 提示框
export function alert(content, callback) {
    wx.showModal({
        title: '提示',
        content: content,
        showCancel: false,
        success: callback
    })
}
// 确认框
export function confirm(options) {
    var {
        content, confirmText,
        ok,
    } = options
    confirmText = confirmText || '确定'
    wx.showModal({
        content,
        confirmText,
        cancelText: '关闭',
        success(res) {
            if (res.confirm) {
                ok && ok()
            }
        }
    })
}

// 拨打电话
export function makePhoneCall(phoneNum) {
    confirm({
        content: `是否拨打电话 ${phoneNum}`,
        confirmText: '拨打',
        ok() {
            wx.makePhoneCall({
                phoneNumber: phoneNum,
            })
        }
    })
}

// 加载提示
export function showLoading() {
    wx.showToast({
        icon: 'loading',
        duration: 10000,
        title: '加载中...',
        mask: true,
    })
}
export function hideLoading() {
    wx.hideToast()
}

// 时间格式化
export function datetimeFormat(unix_timestamp) {
    return new timeago().format(new Date(unix_timestamp * 1000), 'zh_CN');
}

// 坐标格式化
export function coordFormat(location) {
    if(location.lat && location.lng) {
        location = {
            longitude: location.lng,
            latitude: location.lat
        }
    }
    // gcj02 转 bd09
    var location =  gcj02tobd09(location.longitude, location.latitude)
    return {
        longitude: location[0],
        latitude: location[1]
    }
}

// 倒计时格式化
export function countdownFormat(count) {
    var seconds = count % 60
    count = Math.floor(count / 60)
    var minutes = count % 60
    return `${minutes}分钟${seconds}秒`
}

// 字符串关键字分组

export function splitByKeyword(text, keyword) {
    if (!text) {
        return []
    }
    var arr = text.split(keyword)
    var res = []
    res.push({
        text: arr[0],
        isKeyword: false
    })
    for (let i = 1, len = arr.length; i < len; i++) {
        res.push({
            text: keyword,
            isKeyword: true
        }, {
                text: arr[i],
                isKeyword: false
            })
    }
    return res
}

var userInfo
export function getUserInfo(cb) {
  if(userInfo) {
    return cb(userInfo)
  } else {
    wx.getUserInfo({
      success(res) {
        userInfo = res.userInfo
        cb(userInfo)
      },
      fail(res) {
        console.log(res)
        alert('获取用户信息失败')
      }
    })
  }
}