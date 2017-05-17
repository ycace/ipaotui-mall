/**
 * 小程序配置文件
 */

// var host = "apitest.ipaotui.com"
var host = "api.ipaotui.com"
const debug = wx.getStorageSync('debug')
if (debug) {
    host = "apitest.ipaotui.com"
}


module.exports = {
    host, 
    qqmapKey: 'FPOBZ-UT2K2-ZFYUC-CX67E-IOOYS-7XFQ6'
}
