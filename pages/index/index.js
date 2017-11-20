// index.js
// 获取应用实例
const AV = require('./../../libs/av-weapp-min')
const app = getApp()

Page({
    /**
     * 页面的初始数据
     */
    data: {
        motto: 'Hello World',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        datas: [],
        showAddInput:true,
        isFocus:false
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function() {
       this.getTodoLists()
    },
    onPullDownRefresh: function () {
        this.getTodoLists();
    },
    /**
     * 获取用户数据
     */
    getUserInfo: function(e) {
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    },
    
    /**
     * 获取数据列表
     */
    getTodoLists:function () {
        var this_ = this;
        var query = new AV.Query('Todo');
        query.descending('createdAt');
        query.equalTo('user', AV.User.current().id);
        query.find().then(function (results) {
            this_.setData({
                datas: results
            })
            wx.stopPullDownRefresh()
        }, function (error) { });
    },

    /**
     * 点击添加按钮
     */
    createTodo:function () {
        this.setData({
            showAddInput:false,
            isFocus:true
        })
    },

    /**
     * 提交todo数据
     */
    handlerSubmit:function () {
        var Todo = AV.Object.extend('Todo');
        var todo = new Todo();
        var this_ = this;
        todo.set('content',this_.data.txtInput);
        todo.set('state','1');
        todo.set('user', AV.User.current().id);
        todo.save().then(function (result) {
            if(result.id){
                this_.getTodoLists(0,20)
                this_.setData({
                    txtInput:'',
                    showAddInput:true
                })
            }
        }, function (error) {
            console.error(error);
        });
    },

    /**
    * 隐藏input
    */
    setShow:function(){
        this.setData({
            showAddInput: true
        })
    },

    txtInput:function(e){
        this.setData({
            txtInput:e.detail.value
         })
    }
})