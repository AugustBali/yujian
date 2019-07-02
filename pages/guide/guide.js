// pages/guide/guide.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   isCheck:false,
   isShow:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onShow:function(){
    
  },
  tpIndex(e){
    var isCheck = this.data.isCheck; 
    var that = this;
    if (!isCheck){
      that.setData({
        isShow: true
      })
      setTimeout(()=>{
        that.setData({
          isShow:false
        })
      },1500)
    }else{
      wx.navigateTo({
        url: '/pages/custom/custom',
      })
    }
  },
  cheackChange(e){
    var that =this;
    var isCheck = this.data.isCheck;
    if (!isCheck){
      isCheck=true;
      that.setData({
        isCheck:isCheck
      })
    }else{
      isCheck = false;
      that.setData({
        isCheck: isCheck
      })
    }
  },
  toDesc:function(){
    wx.navigateTo({
      url: '/pages/description/description',
    })
  },
  toHelp(){
    wx.navigateTo({
      url: '/pages/help/help',
    })
  },
  toOrder() {
    wx.navigateTo({
      url: '/pages/myOrder/myOrder',
    })
  }
})