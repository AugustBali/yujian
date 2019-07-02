// pages/diyOrder/diyOrder.js
const util = require("../../utils/util.js")
const app = getApp()
Page({
  data: {
    tabBar:[
      { id: 1, title: '全部订单' },
      { id: 2, title: '待发货' },
      { id: 3, title: '已发货' },
      { id: 4, title: '已收货' }
    ],
    swiperIndex:0,
    tab: 0,
    stauts:0,
    orderList:[],

  },

  onLoad: function (options) {
    
  },
  onShow(){
    let that = this
    wx.request({
      url: util.yjUrl + 'order_data.php',
      data: {
        openid: app.globalData.openid,
      },

      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: "post",
      success: function (res) {
        console.log('order_data:',res)
        that.data.orderList[0] = res.data
        that.setData({
          orderList: that.data.orderList
        })
      }
    })
  },
  changeTab:function(e){
    var that = this;
    var swiperIndex = that.data.swiperIndex;
    var index = e.currentTarget.dataset.index
    that.setData({
      swiperIndex:index,
      tab:index
    })
  },
  swiperChange: function (t) {
    this.setData({
      tab: t.detail.current
    });
  },
  back:function(){
    wx.navigateBack()
  },
  toOrderInfo:function(e){
    console.log('e:',e)
    var openId = 0;
    var orderCode = 0;
    wx.navigateTo({
      url: '/pages/payOrderInfo/payOrderInfo',
    })
  },
  toPayOrderInfo:function(e){
    console.log('index:',e)
   
    var orderCode
    orderCode = e.currentTarget.dataset.ordercode 
    wx.navigateTo({
      url: '/pages/payOrderInfo/payOrderInfo?orderCode='+orderCode,
    })
  }
})