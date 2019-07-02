// pages/detail/detail.js
import Card from '../../palette/customized';
const util = require("../../utils/util.js")
const app = getApp()
Page({
  data: {
    price: 0.01,
    info:{},
    toltalPrice: 0,
    num: 1,
    img_src: {},
    title_word: "",
    word_content: "",
    firstname: "",
    content: "",
    address_id:0,
    oneImg: "",
    shop_id:0,
    twoImg: "", 
    alcohol_num:'',
    net_content_num:'',
    alcohol_pure_num:'',
    mask:false,
    animationData: {},
    imgUrl:"",
    descAddr:[
      
      ],
    status:0,
    addr:'',
  },
  onShow(){
    let that = this
    wx.request({
      url: util.yjUrl + 'adress.php',
      data: {
        openid: app.globalData.openid,
      },

      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: "post",
      success: function (res) {
         that.setData({
           descAddr:res.data
         })
        //  console.log(res)
      }
    })
    
  },
  onLoad: function(options) {
    var that = this;
  

    wx.request({
      url: util.yjUrl + 'getyujian_info.php',
      data: {
        openid: app.globalData.openid,
        net_content_num: options.net_content_num
      },

      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: "post",
      success: function (res) {  
        var an = options.alcohol_num 
        var alcohol_pure_num =an.replace('°', '')
        // console.log(alcohol_pure_num)
        console.log('123', res)
        that.setData({
          price: res.data.price,
          info: res.data,
          toltalPrice: res.data.price * that.data.num,
          oneImg: options.oneImg,
          twoImg: options.twoImg,
          title_word: options.title,
          word_content: options.word_content,
          firstname: options.firstname,
          shop_id: options.shop_id,
          content: options.content,
          alcohol_num: options.alcohol_num,
          net_content_num: options.net_content_num,
          alcohol_pure_num: alcohol_pure_num
        })
      }
    })
  },
  
  addNum() {
    var num = ++this.data.num;
    var price = this.data.price;
    this.setData({
      num: num,
      toltalPrice: price * num
    })

  },
  minusNum() {
    var that = this;
    var price = this.data.price;
    var num = this.data.num; 
    if (num > 1) {
      num--;
      that.setData({
        num: num,
        toltalPrice: price * num
      })
    }
  },
  //绘制好的图片路径
  onImgOK(e) {
    this.imagePath = e.detail.path;
    this.setData({
      imgUrl: this.imagePath
    })
  },
  onReady: function() {
    var oneImg = this.data.oneImg           
    var twoImg = this.data.twoImg           
    var title_word = this.data.title_word   
    var word_content = this.data.word_content
    var firstname = this.data.firstname
    var content = this.data.content
    var text = this.data.text;
    var alcohol_num = this.data.alcohol_num;
    var net_content_num = this.data.net_content_num;
    this.setData({
      template: new Card().palette(oneImg, twoImg, title_word, word_content, firstname, content, alcohol_num, net_content_num,'730rpx','400rpx'),
    });
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
    that.data.descAddr.forEach(item=>{
      item.status = 0;
    })
    that.data.descAddr[status].status=1;
    that.setData({
      descAddr: that.data.descAddr,
      addr: that.data.descAddr[status],
      address_id: id,
      mask:false
    })
  },
  //跳转到address页面
  toAddress:function(){
    wx.navigateTo({
      url: '/pages/address/address',
    })
  },
  //加入购物车
  // cart(){
  //   if (this.data.address_id == 0) {
  //     wx.showToast({
  //       title: '收货地址不能为空！',
  //       icon: 'none'
  //     })
  //     return
  //   }
  //   wx.request({
  //     url: util.yjUrl + 'order_data.php',
  //     data:{
  //       openid:app.globalData.openid,
  //       shop_id:this.data.shop_id,
  //       address_id:this.data.address_id,
  //       num:this.data.num,
  //       price:this.data.toltalPrice
  //     },
  //     header:{
  //       'content-type': 'application/x-www-form-urlencoded'
  //     },
  //     method:"post",
  //     success:function(res){

  //     }
  //   })
  // },
  //支付
  pay(){ 
    if (this.data.address_id ==  0) {
      wx.showToast({
        title: '收货地址不能为空！',
        icon: 'none'
      })
      return
    }

  // 调起数据签名
    wx.request({
      url: util.apiUrl + 'weixin/pay',
      data: {
        uid: 1,
        m_type: 'diy',
        openid: app.globalData.openid,
        friend_uid: this.data.shop_id,
        address_id: this.data.address_id,
        num:this.data.num,
        price: this.data.toltalPrice
      },
     
      header:{
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: "post",
      success: function (res) {
        var params = JSON.parse(res.data.params)
        var oid = res.data.oid

        console.log(params)
        // 发起支付
        wx.requestPayment({
          'timeStamp': params.timeStamp,
          'nonceStr': params.nonceStr,
          'package': params.package,
          'signType': params.signType,
          'paySign': params.paySign,
          'success': function (res) {
            console.log(res)
 
                wx.showToast({
                  title: '支付成功！',
                  icon: 'success',
                  duration: 3000
                })
           

          }


        })

      }
    })
  }
})