import {
  fetch, coordFormat,
  alert, confirm
} from './util'

// 获取商店列表
export function getSellers(options) {
  var {
    page, address,
    success
  } = options
  page = page || 0
  var location = coordFormat(address.location)
  fetch({
    url: 'index.php?m=Mall&c=Seller&a=getSellers',
    data: {
      page,
      city_name: address.city,
      city_id: address.city_id,
      district_name: address.district,
      district_id: address.district_id,
      longitude: location.longitude,
      latitude: location.latitude
    },
    success
  })
}

// 获取商店详情
export function getSellerInfo(options) {
  var {
    seller_id, address,
    success, complete
  } = options
  var location = coordFormat(address.location)
  fetch({
    url: 'index.php?m=Mall&c=Seller&a=getSellerInfo',
    data: {
      seller_id,
      longitude: location.longitude,
      latitude: location.latitude
    },
    success, complete
  })
}

// 获取商店评论
export function getReviews(options) {
  var {
    seller_id, page,
    success
  } = options
  page = page || 0
  fetch({
    url: 'index.php?m=Mall&c=Seller&a=getReviews',
    data: {
      seller_id, page
    },
    success
  })
}

// 短信验证码
export function getCode(options) {
  const {
    phone, success, error
  } = options
  fetch({
    url: "index.php?m=Api&c=Common&a=checkMSG",
    data: {
      phone,
      key: 'fast_login'
    },
    success, error
  })
}

// 登录
export function login(options) {
  const {
    phone, code,
    success, error
  } = options
  wx.login({
    success(res) {
      fetch({
        url: 'index.php?m=Api&c=WeixinMall&a=login',
        data: {
          phone, code,
          wx_code: res['code'],
          session_3rd: wx.getStorageSync('session_3rd')
        },
        success, error
      })
    },
    error(res) {
      alert(res['errMsg'])
      error && error(res['errMsg'])
    }
  })

}
// 退出账号
export function logout(options) {
  const {
    phone, 
    success, error
  } = options
  fetch({
    url: 'index.php?m=Api&c=WeixinMall&a=logout',
    data: {
      phone
    },
    success, error
  })
}

// 获取登录信息
export function getLoginInfo(options) {
  const {
    success, error
  } = options
  wx.login({
    success(res) {
      fetch({
        url: 'index.php?m=Api&c=WeixinMall&a=getLoginInfo',
        data: {
          wx_code: res['code'],
          session_3rd: wx.getStorageSync('session_3rd')
        },
        success, error
      })
    },
    error(res) {
      alert(res['errMsg'])
      error && error(res['errMsg'])
    }
  })
}

