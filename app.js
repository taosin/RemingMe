//app.js
const AV = require('./libs/av-weapp-min.js')
AV.init({
    appId: '8C2cEWNPQbpYsME2gbaHTG44-gzGzoHsz',
    appKey: 'uI6Rub7agp6C5pSSfEmvGYuK',
});
App({
    onLaunch: function() {
        // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

        // 判断当前用户是否登录
        if (!AV.User.current()) {
            wx.login({
                success: res => {
                    AV.User.loginWithWeapp()
                }
            })
        }
        // 登录并将用户添加到leancloud
    },
    globalData: {
        userInfo: null
    }
})