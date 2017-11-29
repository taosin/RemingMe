// index.js
// 获取应用实例
const AV = require('./../../libs/av-weapp-min')
const util = require('./../../utils/util.js')
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
        showAddInput: true,
        isFocus: false,
        txtInput: ''
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function() {
        this.getTodoLists()
    },
    onPullDownRefresh: function() {
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
    getTodoLists: function() {
        var this_ = this;
        var query = new AV.Query('Todo');
        query.descending('createdAt');
        query.equalTo('user', AV.User.current().id);
        query.find().then(function(results) {
            this_.setData({
                datas: results
            })
            wx.stopPullDownRefresh()
        }, function(error) {});
    },

    /**
     * 点击添加按钮
     */
    createTodo: function() {
        const self = this;
        self.setData({
            showAddInput: false,
            isFocus: true,
            txtInput: ''
        })
    },

    /**
     * 提交todo数据
     */
    handlerSubmit: function() {
        var Todo = AV.Object.extend('Todo');
        var todo = new Todo();
        var this_ = this;
        if (this_.data.txtInput && this_.data.txtInput.trim()) {

        } else {
            return
        }
        todo.set('content', this_.data.txtInput);
        todo.set('state', '1');
        todo.set('user', AV.User.current().id);
        todo.save().then(function(result) {
            if (result.id) {
                this_.getTodoLists(0, 20)
                this_.setData({
                    txtInput: '',
                    showAddInput: true
                })
            }
        }, function(error) {
            console.error(error);
        });
    },

    /**
     * 隐藏input
     */
    setShow: function() {
        this.setData({
            showAddInput: true
        })
    },

    txtInput: function(e) {
        this.setData({
            txtInput: e.detail.value
        })
    },

    // 标记为已完成
    markTodolist(e){
      var todo = AV.Object.createWithoutData('Todo', e.currentTarget.dataset.objectid);
      const state = e.currentTarget.dataset.state;
      // 修改属性
      todo.set('state', state==='1'?'0':'1');
      // 保存到云端
      todo.save().then((todo)=>{
        this.getTodoLists();
      })
    },

    formatTime(e){
      debugger
    }
})