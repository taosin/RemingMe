// index.js
// 获取应用实例
const AV = require('./../../libs/av-weapp-min')
const app = getApp()

Page({
    data: {
        motto: 'Hello World',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        datas: [],
        showAddInput:true,
        isFocus:false
    },
    // 事件处理函数
    bindViewTap: function() {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    onLoad: function() {
       this.getTodoLists()
    },
    getUserInfo: function(e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    },
    getTodoLists:function (start, limit) {
        var this_ = this;
        var query = new AV.Query('Todo');
        query.descending('createdAt');
        query.find().then(function (results) {
            this_.setData({
                datas: results
            })
        }, function (error) { });
    },
    createTodo:function () {
        this.setData({
            showAddInput:false,
            isFocus:true
        })
    },
    handlerSubmit:function () {
        var Todo = AV.Object.extend('Todo');
        var todo = new Todo();
        var this_ = this;
        todo.set('title','工程师周会');
        todo.set('content','每周工程师会议，周一下午2点');
        todo.set('state','1');
        todo.set('user', AV.User.current().id);
        todo.save().then(function (result) {
            if(result.id){
                wx.showToast({
                    title: '添加成功',
                    icon: 'success'
                })
                this_.getTodoLists(0,20)
            }
        }, function (error) {
            console.error(error);
        });
    },
    setShow:function(){
        this.setData({
            showAddInput: true
        })
    }
})