// pages/address/address.js
var apk = ''
const util = require("../../utils/util.js")
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    multiIndex: [0, 0, 0],
    region: [],
    currentCity: "",
    firstname: "",
    phone: "",
    descAddr: '',
    address: "",
    status: 0,
    changed: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // this.getLocation()
  },

  getLocation: function() {
    var page = this
    wx.getLocation({
      type: 'wgs84', //默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标 
      success: function(res) {
        var longitude = res.longitude
        var latitude = res.latitude
        page.loadCity(longitude, latitude)
      }
    })
  },
  loadCity: function(longitude, latitude) {
    var that = this
    wx.request({
      url: 'https://api.map.baidu.com/geocoder/v2/?ak=' + apk + '&location=' + latitude + ',' + longitude + '&output=json',
      data: {},
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        var city = res.data.result.addressComponent.city;
        var district = res.data.result.addressComponent.district;
        var province = res.data.result.addressComponent.province;
        that.data.region.push(province)
        that.data.region.push(city)
        that.data.region.push(district)
        that.setData({
          region: that.data.region
        });
    console.log(res)
      },
      fail: function() {
        that.setData({
          currentCity: "获取定位失败"
        });
      },
    })
  },
  //选择地址
  bindRegionChange(e) {
    this.setData({
      region: e.detail.value
    })
  },
  firstname: function(e) {
    this.setData({
      firstname: e.detail.value
    })
  },
  phone: function(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  descAddr: function(e) {
    var addr = this.data.region[0] + this.data.region[1] + this.data.region[2]
    var descAddr = e.detail.value
    this.setData({
      address: addr + descAddr,
      descAddr: descAddr
    })
  },
  saveAddr: function() {
    var that = this;
    var firstname = that.data.firstname;
    var phone = that.data.phone;
    var descAddr = that.data.descAddr;
    var address = that.data.address;
    var staus = that.data.status;
    var reg = /^1[3|4|5|7|8][0-9]{9}$/;
    if (firstname == "") {
      wx.showToast({
        title: '名字不能为空！',
        icon: 'none'
      })
    } else if (phone == "") {
      wx.showToast({
        title: '手机号码不能为空！',
        icon: 'none'
      })
    } else if (!reg.test(phone)) {
      wx.showToast({
        title: '手机号码格式有误！',
        icon: 'none'
      })
    } else if (descAddr == "") {
      wx.showToast({
        title: '详细地址不能为空！',
        icon: 'none'
      })
    } else {
      wx.request({
        url: util.yjUrl + 'adress.php',
        data: {
          firstname: firstname,
          openid: app.globalData.openid,
          phone,
          descAddr,
          address,
          staus
        },

        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: "post",
        success: function(res) {
          wx.navigateBack()
        }
      })
    }



  },
  cheackChange: function() {
    var that = this;
    var isCheck = this.data.isCheck;
    if (!isCheck) {
      isCheck = true;
      that.setData({
        isCheck: isCheck,
        status: 1
      })
    } else {
      isCheck = false;
      that.setData({
        isCheck: isCheck,
        status: 0
      })
    }
  },

})