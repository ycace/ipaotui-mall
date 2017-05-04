export default class Countdown {
    constructor(page, prop) {
        this.page = page
        this.prop = prop
    }

    start(cb) {
        var that = this;
        var {page, prop} = that
        var second = page.data[prop]
        if (second <= 0) {
            return
        }
        cb && cb(second)
        that.timer = setTimeout(function () {
            page.setData({
                [prop]: second - 1
            });
            that.start(cb);
        }, 1000)
    }

    stop() {
        clearTimeout(this.timer)
    }
}