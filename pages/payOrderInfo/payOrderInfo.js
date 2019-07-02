// pages/payOrderInfo/payOrderInfo.js
import Card from '../../palette/customized';
const util = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // descAddr:[
    //   { id: 1, firstname: '李嘉俊', address:'广东省广州市天河区龙洞',phone:'18862818668'}
    // ],
    scrollLeft: 0,
    info_id:"",
    info_data:{},
    orderCode:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log('info_id:',options)
    if (options.orderCode == null){
      wx.showToast({
        title: '查询信息有误',
      })
      return 
    }
    wx.request({
      url: util.yjUrl + 'order_data.php',
      data:{
        orderCode:options.orderCode
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: "post",
      success:function(res){
        console.log('res:',res)
        that.setData({
          info_data:res.data[0],
          orderCode:options.orderCode,
        })
      }
    })
  },
  onReady:function(){
    var oneImg = this.data.info_data.oneImg
    var twoImg = this.data.info_data.twoImg
    var title_word = this.data.info_data.title_word
    var word_content = this.data.info_data.body_word
    var firstname = this.data.info_data.title_2
    var content = this.data.info_data.content_2
    var alcohol_num = this.data.alcohol_num
    var net_content_num = this.data.net_content_num
    this.setData({
      template: new Card().palette(oneImg, twoImg, title_word, word_content, firstname, content, alcohol_num,net_content_num,'730rpx','400rpx'),
    })
  },
  alertMask() {
    var that = this;
    that.setData({
      mask: true
    })

  },
  closed_mask() {
    var that = this;
    setTimeout(function () {
      that.setData({
        mask: false
      })
    }, 500)
  },
  //选择地址
  check(e) {
    var that = this;
    var status = e.currentTarget.dataset.index
    var id = e.currentTarget.dataset.id
    that.data.descAddr.forEach(item => {
      item.status = 0;
    })
    that.data.descAddr[status].status = 1;
    that.setData({
      descAddr: that.data.descAddr,
      addr: that.data.descAddr[status],
      address_id: id,
      mask: false
    })
  },
  //跳转到address页面
  toAddress: function () {
    wx.navigateTo({
      url: '/pages/address/address',
    })
  },
  toModifyDiy:function(){
    wx.navigateTo({
      url: '/pages/modifyDiy/modifyDiy',
    })
  }
})