import {
  fetch, coordFormat,
  alert, confirm,
} from './util'

// 获取商店列表
export function getSellers(options) {
  var {
    page,
    success
  } = options
  page = page || 0
  getApp().getCurrentAddress(address => {
    var location = address.location
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
  })
}

// 获取商店详情
export function getSellerInfo(options) {
  var {
    seller_id,
    success, complete
  } = options
  getApp().getCurrentAddress(address => {
    var location = address.location
    fetch({
      url: 'index.php?m=Mall&c=Seller&a=getSellerInfo',
      data: {
        seller_id,
        longitude: location.longitude,
        latitude: location.latitude
      },
      success, complete
    })
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
      getApp().getCurrentAddress(address => {
        fetch({
          url: 'index.php?m=Api&c=WeixinMall&a=login',
          data: {
            phone, code,
            wx_code: res['code'],
            session_3rd: wx.getStorageSync('session_3rd'),
            city_id: address.city_id,
            city_name: address.city,
            district_id: address.district_id,
            district_name: address.district,
          },
          success, error
        })
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
  if (options.addr_id) {
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
    if (!gps) {
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
    if (!gps) {
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
        district_name: address.district,
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

// 添加准订单
export function addQuasiOrder(options) {
  const {
    seller_id,
    goods,
    success, error
  } = options
  getApp().getCurrentAddress(address => {
    var data = {
      seller_id,
      goods: JSON.stringify(goods)
    }
    if (address.addr_id) {
      data = Object.assign({
        addr_id: address.addr_id
      }, data)
    } else {
      var location = address.location
      data = Object.assign({
        city_id: address.city_id,
        city_name: address.city,
        district_id: address.district_id,
        district_name: address.district,
        longitude: location.longitude,
        latitude: location.latitude
      }, data)
    }
    getApp().getLoginInfo(loginInfo => {
      if (!loginInfo.user_info) {
        return alert('用户未登录')
      }
      var {user_id, user_token} = loginInfo.user_info
      fetch({
        url: 'index.php?m=Mall&c=Order&a=addQuasiOrder',
        data: Object.assign({
          user_id, user_token,
        }, data),
        success, error
      })

    })
  })
}

// 获取准订单
export function getQuasiOrderInfo(options) {
  var {
    quasi_order_id,
    success, error
  } = options
  getApp().getLoginInfo(loginInfo => {
    if (!loginInfo.user_info) {
      return alert('用户未登录')
    }
    var {user_id, user_token} = loginInfo.user_info
    fetch({
      url: 'index.php?m=Mall&c=Order&a=getQuasiOrderInfo',
      data: {
        user_id, user_token,
        quasi_order_id
      },
      success, error
    })

  })
}

// 更新准订单地址
export function updateOrderAddr(options) {
  var {
    quasi_order_id, addr_id,
    success, error
  } = options
  getApp().getLoginInfo(loginInfo => {
    if (!loginInfo.user_info) {
      return alert('用户未登录')
    }
    var {user_id, user_token} = loginInfo.user_info
    fetch({
      url: 'index.php?m=Mall&c=Order&a=updateOrderAddr',
      data: {
        user_id, user_token,
        quasi_order_id, addr_id
      },
      success, error
    })

  })
}
// 更新准订单红包
export function updateOrderCoupon(options) {
  var {
    quasi_order_id, user_coupon_id,
    success, error
  } = options
  getApp().getLoginInfo(loginInfo => {
    if (!loginInfo.user_info) {
      return alert('用户未登录')
    }
    var {user_id, user_token} = loginInfo.user_info
    fetch({
      url: 'index.php?m=Mall&c=Order&a=updateOrderCoupon',
      data: {
        user_id, user_token,
        quasi_order_id, user_coupon_id
      },
      success, error
    })

  })
}

// 添加订单
export function addOrder(options) {
  var {
    quasi_order_id, remark,
    success, error
  } = options
  getApp().getLoginInfo(loginInfo => {
    if (!loginInfo.user_info) {
      return alert('用户未登录')
    }
    var {user_id, user_token} = loginInfo.user_info
    fetch({
      url: 'index.php?m=Mall&c=Order&a=addOrder',
      data: {
        user_id, user_token,
        quasi_order_id, remark
      },
      success, error
    })

  })
}

// 取消订单
export function cancelOrder(options) {
  var {
    order_id,
    success, error
  } = options
  getApp().getLoginInfo(loginInfo => {
    if (!loginInfo.user_info) {
      return alert('用户未登录')
    }
    var {user_id, user_token} = loginInfo.user_info
    fetch({
      url: 'index.php?m=Mall&c=Order&a=cancelOrder',
      data: {
        user_id, user_token,
        order_id
      },
      success, error
    })

  })
}

// 获取订单列表
export function getOrders(options) {
  var {
    page,
    success, error
  } = options
  getApp().getLoginInfo(loginInfo => {
    if (!loginInfo.user_info) {
      return alert('用户未登录')
    }
    var {user_id, user_token} = loginInfo.user_info
    fetch({
      url: 'index.php?m=Mall&c=Order&a=getOrders',
      data: {
        user_id, user_token,
        page
      },
      success, error
    })

  })
}

// 获取订单详情
export function getOrderInfo(options) {
  var {
    order_id,
    success, error
  } = options
  getApp().getLoginInfo(loginInfo => {
    if (!loginInfo.user_info) {
      return alert('用户未登录')
    }
    var {user_id, user_token} = loginInfo.user_info
    fetch({
      url: 'index.php?m=Mall&c=Order&a=getOrderInfo',
      data: {
        user_id, user_token,
        order_id
      },
      success, error
    })

  })
}

// 订单评论
export function reviewsOrder(options) {
  var {
    order_id,
    service, quality, content,
    reach_time,
    success, error
  } = options
  getApp().getLoginInfo(loginInfo => {
    if (!loginInfo.user_info) {
      return alert('用户未登录')
    }
    var {user_id, user_token} = loginInfo.user_info
    fetch({
      url: 'index.php?m=Mall&c=Order&a=reviewsOrder',
      data: {
        user_id, user_token,
        order_id,
        service, quality, content,
        reach_time
      },
      success, error
    })

  })
}

// 获取支付参数
export function getPayment(options) {
  var {
    order_id,
    success, error
  } = options
  getApp().getLoginInfo(loginInfo => {
    if (!loginInfo.user_info) {
      return alert('用户未登录')
    }
    var {user_id, user_token} = loginInfo.user_info
    fetch({
      url: 'index.php?m=Mall&c=WeixinMall&a=getPayment',
      data: {
        user_id, user_token,
        order_id
      },
      success, error
    })

  })
}


// 获取分组列表
export function getSellersByCategory(options) {
  var {
    category_id, page,
    success, error
  } = options
  page = page || 0
  getApp().getCurrentAddress(address => {
    var {
      location,
      city_id,
      city: city_name,
      district_id,
      district: district_name
    } = address
    fetch({
      url: 'index.php?m=Mall&c=Seller&a=getSellersByCategory',
      data: {
        category_id,
        city_id, city_name,
        district_id, district_name,
        page,
        gps: `${location.longitude},${location.latitude}`,
      },
      success, error
    })

  })
}

// 搜索商家和商品
export function search(options) {
  var {
    keyword, page,
    success, error
  } = options
  page = page || 0
  getApp().getCurrentAddress(address => {
    var {
      location: {longitude, latitude},
      city_id,
      city: city_name,
      district_id,
      district: district_name
    } = address
    fetch({
      url: 'index.php?m=Mall&c=Seller&a=search',
      data: {
        keyword,
        city_id, city_name,
        district_id, district_name,
        page,
        longitude, latitude
      },
      success, error
    })

  })
}


// 获取用户红包列表
export function getShareUserList(options) {
  var {
    page,
    success, error
  } = options
  page = page || 0
  getApp().getLoginInfo(loginInfo => {
    if (!loginInfo.user_info) {
      return alert('用户未登录')
    }
    var {user_id, user_token} = loginInfo.user_info
    fetch({
      url: 'index.php?m=Mall&c=Coupon&a=getShareUserList',
      data: {
        user_id, user_token,
        page
      },
      success, error
    })

  })
}