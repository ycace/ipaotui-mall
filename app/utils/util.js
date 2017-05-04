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
export function getCurrentAddress(options) {
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
        }
    })
}

// 根据坐标获取地址信息
export function getAddressFromLocation(options) {
    const {location, success} = options
    getPois({
        location,
        success(pois) {
            var poi = pois[0]
            if (poi) {
                var address = Object.assign({
                    address_name: poi.title,
                    location,
                }, resolveAdInfo(poi.ad_info))

                success && success(address)
            }
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
            'app_v': 'ipaotui_mini'
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
    const {
        content, confirmText,
        ok,
    } = options
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
    // gcj02 转 bd09
    return gcj02tobd09(location.longitude, location.latitude).join(',')
}

// 倒计时格式化
export function countdownFormat(count) {
    var seconds = count % 60
    count = Math.floor(count / 60)
    var minutes = count % 60
    return `${minutes}分钟${seconds}秒`
}