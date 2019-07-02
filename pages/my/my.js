// my.js
const util = require("../../utils/util.js")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    nickName:'',
    avatarUrl:'',
    openId:'',
    login_button_show:true

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //从本地缓存中异步获取指定 key 的内容
    var num = wx.getStorageSync('userInfo')
    // console.log(num)
    this.setData({
      openId: num
    })
    // 查看是否授权
    wx.getSetting({
      //获取用户的当前设置
      success: function (res) {
        //getSetting成功回调里有authSetting对象，对象里有scope.userInfo属性
        if (res.authSetting['scope.userInfo']) {
          //获取用户信息
          wx.getUserInfo({
            success: function (res) {
              console.log(res)
              that.setData({
                login_button_show:false
              })
              //从数据库获取用户信息
              that.queryUsreInfo();
              //用户已经授权过
              wx.navigateTo({
                // url: '/pages/my/my'
                url: '/pages/guide/guide'

              })
            }
          });
        }
      }
    })
  },
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      this.setData({
        login_button_show: false
      })
      //插入登录的用户的相关信息到数据库
      wx.request({
        url: util.yjUrl + 'user.php',
        data: {
          openid: getApp().globalData.openid,
          nickName: e.detail.userInfo.nickName,
          avatarUrl: e.detail.userInfo.avatarUrl,
          province: e.detail.userInfo.province,
          city: e.detail.userInfo.city
        },
        method: "post",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          //从数据库获取用户信息
          that.queryUsreInfo();
          console.log("插入小程序登录用户信息成功！");
        }
      });
      //授权成功后，跳转进入小程序首页
      wx.navigateTo({
        // url: '/pages/my/my'
        url: '/pages/guide/guide'
        
      })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  },
  //获取用户信息接口
  queryUsreInfo: function () {
    var that = this
    wx.request({
      url: util.yjUrl + 'user.php',
      data: {
        openid: getApp().globalData.openid
        // openid: that.data.openId
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: "post",
      success: function (res) {
        console.log(res);
        // getApp().globalData.userInfo = res.data;
        that.setData({
          nickName: res.data[0].uname,
          avatarUrl: res.data[0].face,
        })

      }
    }) ;
  },
})