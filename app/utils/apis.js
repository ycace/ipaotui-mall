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

// 获取用户地址列表
export function getUserAddrs(options) {
  const {
    success, error
  } = options

  getApp().getLoginInfo(loginInfo => {
    if (!loginInfo.user_info) {
      return alert('用户未登录')
    }
    var {user_id, user_token} = loginInfo.user_info
    fetch({
      url: 'index.php?m=Mall&c=User&a=getUserAddrs',
      data: {
        user_id, user_token
      },
      success, error
    })

  })
}
// 获取用户地址
export function getUserAddr(options) {
  const {
    addr_id,
    success, error
  } = options

  getApp().getLoginInfo(loginInfo => {
    if (!loginInfo.user_info) {
      return alert('用户未登录')
    }
    var {user_id, user_token} = loginInfo.user_info
    fetch({
      url: 'index.php?m=Mall&c=User&a=getUserAddr',
      data: {
        user_id, user_token,
        addr_id
      },
      success, error
    })

  })
}

// 新增用户地址
export function addUserAddr(options) {
  if(options.addr_id) {
    return updateUserAddr(options)
  }
  const {
    receiver, phone, detail, address,
    success, error
  } = options
  getApp().getLoginInfo(loginInfo => {
    if (!loginInfo.user_info) {
      return alert('用户未登录')
    }
    var {user_id, user_token} = loginInfo.user_info
    var gps = address.gps
    if(!gps) {
      var location = coordFormat(address.location)
      gps = `${location.longitude},${location.latitude}`
    }
    fetch({
      url: 'index.php?m=Mall&c=User&a=addUserAddr',
      data: {
        user_id, user_token,
        receiver, phone, detail,
        gps, 
        addr: address.title,
        city_id: address.city_id,
        city_name: address.city,
        district_id: address.district_id,
        district_name: address.district,
      },
      success, error
    })

  })
}

// 修改地址
export function updateUserAddr(options) {
  const {
    receiver, phone, detail, address,
    addr_id,
    success, error
  } = options
  getApp().getLoginInfo(loginInfo => {
    if (!loginInfo.user_info) {
      return alert('用户未登录')
    }
    var {user_id, user_token} = loginInfo.user_info
    var gps = address.gps
    if(!gps) {
      var location = coordFormat(address.location)
      gps = `${location.longitude},${location.latitude}`
    }
    fetch({
      url: 'index.php?m=Mall&c=User&a=updateUserAddr',
      data: {
        user_id, user_token,
        receiver, phone, detail,
        gps, addr_id,
        addr: address.title,
        city_id: address.city_id,
        city_name: address.city,
        district_id: address.district_id,
        district_name: address.district_name,
      },
      success, error
    })

  })
}

// 删除地址
export function deleteUserAddr(options) {
  const {
    addr_id,
    success, error
  } = options
  getApp().getLoginInfo(loginInfo => {
    if (!loginInfo.user_info) {
      return alert('用户未登录')
    }
    var {user_id, user_token} = loginInfo.user_info
    fetch({
      url: 'index.php?m=Mall&c=User&a=deleteUserAddr',
      data: {
        user_id, user_token,
        addr_id
      },
      success, error
    })

  })
}