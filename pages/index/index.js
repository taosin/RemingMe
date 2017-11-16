// index.js
// 获取应用实例
const app = getApp()

Page({
    data: {
        motto: 'Hello World',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        dates: [
            { title: '七牛云抽奖', state: '1', group: '工作', date: '11/10 18:30' },
            { title: '七牛云抽奖', state: '1', group: '工作', date: '11/10 18:30' },
            { title: '七牛云抽奖', state: '1', group: '工作', date: '11/10 18:30' },
            { title: '七牛云抽奖', state: '1', group: '工作', date: '11/10 18:30' },
            { title: '七牛云抽奖', state: '1', group: '工作', date: '11/10 18:30' },
            { title: '七牛云抽奖', state: '1', group: '工作', date: '11/10 18:30' },
            { title: '七牛云抽奖', state: '1', group: '工作', date: '11/10 18:30' },
            { title: '七牛云抽奖', state: '1', group: '工作', date: '11/10 18:30' },
            { title: '七牛云抽奖', state: '1', group: '工作', date: '11/10 18:30' },
            { title: '七牛云抽奖', state: '1', group: '工作', date: '11/10 18:30' },
            { title: '七牛云抽奖', state: '1', group: '工作', date: '11/10 18:30' },
            { title: '七牛云抽奖', state: '1', group: '工作', date: '11/10 18:30' },
            { title: '七牛云抽奖', state: '1', group: '工作', date: '11/10 18:30' },
            { title: '七牛云抽奖', state: '1', group: '工作', date: '11/10 18:30' },
            { title: '七牛云抽奖', state: '1', group: '工作', date: '11/10 18:30' }
        ]
    },
    // 事件处理函数
    bindViewTap: function() {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    onLoad: function() {
        wx.login({
            success: function(res) {
                if (res.code) {
                } else {
                    console.log('获取用户登录态失败！' + res.errMsg)
                }
            }
        })
    },
    getUserInfo: function(e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    }
})