//app.js
App({
  //当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
  onLaunch: function () {
    var that = this
    //从本地缓存中异步获取指定 key 的内容
    that.globalData.openid = wx.getStorageSync('userInfo');

    if (that.globalData.openid) {
      //session_key 未过期，并且在本生命周期一直有效
      // console.log("success")
      that.globalData.islogin = true

      that.globalData.openid = wx.getStorageSync('userInfo');
      // console.log(that.globalData.openid)

    } else {
      // console.log("fail")
      wx.clearStorageSync('userInfo')
      // session_key 已经失效，需要重新执行登录流程
      //登录
      wx.login({
        success: res => {

          
          wx.request({
            url: that.globalData.wx_url_1 + res.code + that.globalData.wx_url_2,
            success: function (e) {
              var value = wx.getStorageSync('userInfo'); //wx.getStorageSync(key)，获取本地缓存
              var openId = e.data.openid
              wx.setStorageSync('userInfo', openId);
              console.log("openid:",e)
              that.globalData.openid = e.data.openid;
            }
          })


        }
      })
    }

  },
  test:'test',
  globalData: {
    userInfo: null,
    islogin: false,
    openid: 0, 
    wx_url_1: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx9665dbcab865a13f&secret=80e5571299bcea924bf265d9a33f42a2&js_code=',
    wx_url_2: '&grant_type=authorization_code'
  },
  type:'master提交'
})
