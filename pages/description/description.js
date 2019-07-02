// pages/description/description.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollTop:0,
    isCheck:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  //文本滚动
  topScroll:function(e){
    if (this.data.scrollTop==400){
      this.setData({
        scrollTop: null
      })
    }else{
      this.setData({
        scrollTop: 40+this.data.scrollTop
      })
    }
  },
  //跳转guide页面
  toGuide:function(){
    let pages = getCurrentPages();  //获取当前页面js里面的pages里的所有信息。
    console.log(pages)
    let prevPage = pages[pages.length - 2];  
    var isCheck = true;
    prevPage.setData({
      isCheck: isCheck
    })
    wx.navigateBack({
      delta: 1,
    })
  }
})