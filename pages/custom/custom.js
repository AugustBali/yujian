//pages/custom/custom
const app = getApp()
const util = require("../../utils/util.js")
Page({
  data: {
    side_choice: true, //正反字的切换
    content_choice: true, //正反内容的切换
    touch_down_upload: '', //上传按钮动画
    touch_down_submit: '', //提交按钮动画
    touch_down_alcohol:'',//选择酒精度按钮动画
    touch_down_net_content:'',//选择净含量按钮动画
    img_src: {
      one: "",
      two: ""
    }, //图片路径
    title_word: '', //标题
    word_content: '', //文字内容
    firstname:'',
    content:'',
    choosePic: false,
    mask: false,
    shop_id:0,
    // url:"https://www.bslxx.com/",
    array_img:[],//默认图片数组
    // word_content_one:'',//文字内容1
    // word_content_two: '',//文字内容2
    // word_content_three: '',//文字内容3
    // end_id:null,//返回的id
    alcohol_num:'38°',
    net_content_num:'128ml',
  },
  onLoad:function(){
    let that = this
    wx.request({
      url: util.yjUrl + 'defaultImg.php',
      // data:{
      //   'defaultImg':1
      // },
      // header:{
      //   'content-type': 'application/x-www-form-urlencoded'
      // },
      method:'POST',
      success:function(res){
       // console.log(res.data)
        that.data.img_src.one = res.data[0]
        that.data.img_src.two = res.data[0]
        that.setData({
          array_img: res.data,
          img_src: that.data.img_src
        })
      }
    })
  },
  //提交
  all_submit: function() {
    console.log('123231',this.data.net_content_num)
    if (this.data.img_src.one == "") {
      wx.showModal({
        title: '稍等一下',
        content: '亲，请先上传一张正面图片喔~',
        showCancel: false,
        confirmText: '好的'
      })
      return
    } else if (this.data.img_src.two == "") {
      wx.showModal({
        title: '稍等一下',
        content: '亲，请先上传一张反面图片喔~',
        showCancel: false,
        confirmText: '好的'
      })
      return
    } else if (this.data.title_word == "") {
      wx.showModal({
        title: '稍等一下',
        content: '亲，请先填写标题喔~',
        showCancel: false,
        confirmText: '好的'
      })
      return
    } else if (this.data.word_content == "") {
      wx.showModal({
        title: '稍等一下',
        content: '亲，请先填写想说的话喔~',
        showCancel: false,
        confirmText: '好的'
      })
      return
    }
    var that = this
    var obj_img = this.data.img_src
    // console.log(obj_img)
    //将对象转成数组
    var array_img = []
    for (let i in obj_img) {
      array_img.push(obj_img[i])
    } 
    //如果是默认图片则不需要把图片传后台，否则要传给后台
    if (array_img[0].indexOf('defaultImg')>0){
      //当第一张图片是默认图片时
      wx.request({
        url: util.yjUrl + 'pdo.php',
        method:"post",
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
          'num': 0,
          'title_word': this.data.title_word,
          'defaultImg': array_img[0],
          'body_word': this.data.word_content,
          'has_photo':false,
          'alcohol_num': this.data.alcohol_num,
          'net_content_num': this.data.net_content_num
        },
        success: function (res) {
          // console.log(res)
          that.uploadTwo(res.data[0].id, array_img)
        }
      })
    }else{
      //当第一张图片不是默认的图片时
      wx.uploadFile({
        url: util.yjUrl + 'pdo.php',
        filePath: array_img[0],
        name: 'img_file',
        formData: {
          'num': 0,
          'defaultImg': '',
          'title_word': this.data.title_word,
          'body_word': this.data.word_content,
          'has_photo': true,
          'alcohol_num': this.data.alcohol_num,
          'net_content_num': this.data.net_content_num
        },
        success: function (res) {
          that.uploadTwo(JSON.parse(res.data)[0].id, array_img)
          // wx.uploadFile({
          //   url: that.data.url + 'pdo.php',
          //   filePath: array_img[1],
          //   name: 'img_file',
          //   formData: {
          //     'num': 1,
          //     'end_id': JSON.parse(res.data)[0].id
          //   },
          //   success: function (res) {
          //     wx.showToast({
          //       title: '提交成功',
          //     })
          //     wx.navigateTo({
          //       url: '/pages/webview/webview',
          //     })
          //   }
          // })
        }
      })
    }
   
  },
  uploadTwo(id, array_img){

    var title = this.data.firstname;
    var word_content = this.data.content;
    this.setData({
      shop_id: id
    })
    let that = this
    if (array_img[1].indexOf("defaultImg")>0){
      //当第二张图片是默认图片时
        wx.request({
          url: util.yjUrl + 'pdo.php',
          method: "post",
          data: {
            'openid': app.globalData.openid,
            'num': 1,
            'end_id': id,
            'title_word': title,
            'body_word': word_content,
            'defaultImg': array_img[1],
            'has_photo': false
          },
          header: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            wx.showToast({
              title: '提交成功',
            })
            that.tijiao()
            // wx.navigateTo({
            //   url: '/pages/webview/webview',
            // })
          }
        })
    }else{
      //当第二张图片不是默认图片时
      wx.uploadFile({
        url: util.yjUrl + 'pdo.php',
        filePath: array_img[1],
        name: 'img_file',
        formData: {
          'openid': app.globalData.openid,
          'num': 1,
          'defaultImg': '',
          'title_word': title,
          'body_word': word_content,
          'end_id': id,
          'has_photo': true
        },
        success: function (res) {
          wx.showToast({
            title: '提交成功',
          })
          // wx.navigateTo({
          //   url: '/pages/webview/webview',
          // })
          that.tijiao()
        }
      })
    }
  
  },
  //正反面切换
  side_change: function() {
    this.setData({
      side_choice: !this.data.side_choice,
      content_choice: !this.data.content_choice
    })
  },
  //点击上传图片按钮
  upload_img: function() {
    this.setData({
      choosePic: true,
      mask: true
    })
  },
  //点击选择酒精度按钮
  alcohol:function(){
    var that = this
    wx.showActionSheet({
      itemList: ['38°', '45°', '52°'],
      success(res) {
        if (res.tapIndex== 0){
          that.setData({
            alcohol_num: '38°'
          })
        } else if (res.tapIndex == 1){
          that.setData({
            alcohol_num: '45°'
          })
        } else if (res.tapIndex == 2){
          that.setData({
            alcohol_num: '52°'
          })
        }
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },
  //点击选择净含量按钮
  net_content:function(){
    var that = this
    wx.showActionSheet({
      itemList: ['128ml', '250ml', '425ml'],
      success(res) {
        if(res.tapIndex==0){
          that.setData({
            net_content_num: '125ml'
          })
        } else if (res.tapIndex == 1){
          that.setData({
            net_content_num: '250ml'
          })
        } else if (res.tapIndex == 2){
          that.setData({
            net_content_num: '425ml'
          })
        }
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },
  //上传图片
  uploadPic: function() {
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      success: function(res) {
        let file_path = res.tempFilePaths[0]
        // console.log(res.tempFilePaths[0])
        if (that.data.side_choice) {
          that.data.img_src.one = file_path
        } else {
          that.data.img_src.two = file_path
        }
        that.setData({
          img_src: that.data.img_src
        })
        // wx.getFileSystemManager().readFile({
        //   filePath: res.tempFilePaths[0],
        //   encoding: 'base64',
        //   success:function(res){
        //     that.setData({
        //       img_src: res.data
        //     })
        //     console.log(res)
        //   }
        // })

      },
    })
  },
  //缩小上传图片按钮
  narrow: function() {
    var animation = wx.createAnimation({
      duration: 50
    })
    animation.scale(0.97).step()
    this.setData({
      touch_down_upload: animation.export()
    })

  },
  //缩小选择酒精度按钮
  narrow_alcohol:function(){
    var animation = wx.createAnimation({
      duration: 50
    })
    animation.scale(0.97).step()
    this.setData({
      touch_down_alcohol: animation.export()
    })
  },
  //放大上传图片按钮
  enlarge: function() {
    var animation = wx.createAnimation({
      duration: 50
    })
    animation.scale(1).step()
    this.setData({
      touch_down_upload: animation.export()
    })
  },
  enlarge_alcohol:function(){
    var animation = wx.createAnimation({
      duration: 50
    })
    animation.scale(1).step()
    this.setData({
      touch_down_alcohol: animation.export()
    })
  },
  //缩小提交按钮
  narrow_submit: function() {
    var animation = wx.createAnimation({
      duration: 50
    })
    animation.scale(0.97).step()
    this.setData({
      touch_down_submit: animation.export()
    })
  },
  //缩小选择净含量按钮
  narrow_net_content:function(){
    var animation = wx.createAnimation({
      duration: 50
    })
    animation.scale(0.97).step()
    this.setData({
      touch_down_net_content: animation.export()
    })
  },
  //放大提交按钮
  enlarge_submit: function() {
    var animation = wx.createAnimation({
      duration: 50
    })
    animation.scale(1).step()
    this.setData({
      touch_down_submit: animation.export()
    })
  },
  //放大选择净含量按钮
  enlarge_net_content:function(){
    var animation = wx.createAnimation({
      duration: 50
    })
    animation.scale(1).step()
    this.setData({
      touch_down_net_content: animation.export()
    })
  },
  //监听textarea的文字输入
  write_word: function(event) {
    //console.log(event.detail.value)
    // let all_word = event.detail.value
    // console.log(all_word.length)
    // if (all_word.length<=6){
    //   this.setData({
    //     word_content_one: event.detail.value
    //   })
    // }else if(all_word.length<=12){
    //   let str_one = all_word.substring(0,6)
    //   let str_two = all_word.substring(6)
    //   this.setData({
    //     word_content_one: str_one,
    //     word_content_two: str_two
    //   })
    // }else{
    //   let str_one = all_word.substring(0, 6)
    //   let str_two = all_word.substring(6,12)
    //   let str_three = all_word.substring(12)
    //   this.setData({
    //     word_content_one: str_one,
    //     word_content_two: str_two,
    //     word_content_three: str_three
    //   })
    // }
    this.setData({
      word_content: event.detail.value
    })
  },
  //获取标题内容
  write_title: function(event) {
    this.setData({
      title_word: event.detail.value
    })
  },
  firstname:function(e){
    this.setData({
      firstname: e.detail.value
    })
  },
  content:function(e){
    this.setData({
      content: e.detail.value
    })
  },
  //遮罩层
  closed_mask: function() {
    this.setData({
      choosePic: false,
      mask: false
    })
  },
  //保存按钮
  save_choose_pic: function () {
    this.setData({
      choosePic: false,
      mask: false
    })
  },
  choose_fault_pic:function(event){
    // console.log(event.currentTarget.dataset.index)
    //获取下标
    let index = event.currentTarget.dataset.index
    //获取当前点击的图片
    let current_img = this.data.array_img[index]
    if(this.data.side_choice){
      this.data.img_src.one = current_img
    }else{
      this.data.img_src.two = current_img
    }
    this.setData({
      img_src: this.data.img_src
      })
  },
  tijiao(){
    var firstname= this.data.title_word;
    var content= this.data.word_content;
    var title = this.data.firstname;
    var  word_content= this.data.content;
    var oneImg = this.data.img_src.one;
    var twoImg = this.data.img_src.two;
    var alcohol_num = this.data.alcohol_num;
    var net_content_num = this.data.net_content_num;
    wx.navigateTo({
      url: '/pages/detail/detail?oneImg=' + oneImg +
        '&twoImg=' + twoImg +
        '&title=' + title +
        '&word_content=' + word_content +
        '&firstname=' + firstname +
        '&shop_id=' + this.data.shop_id +
        '&content=' + content + 
        '&alcohol_num=' + alcohol_num +
        '&net_content_num=' + net_content_num + '',
    })
    
  }
})