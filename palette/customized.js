export default class Customized {
  palette(oneImg, twoImg, title_word, word_content, firstname, content, alcohol_num, net_content_num,w,h) {
    return ({
     
      width: w,
      height: h,
      background: '#eee',
      views: [
        {
          type: 'image',
          url: '../../images/detail_bg4.jpg',
          css: {
            top: '0rpx',
            left: '0rpx',
            width: w,
            height: h,
            mode: 'scaleToFill',
          },
        },
        {
          type: 'image',
          url: oneImg,
          css: {
            top: '36rpx',
            left: '21rpx',
            width: '214rpx',
            height: '190rpx',
            mode: 'scaleToFill',
          },
        },
        {
          type: 'image',
          url: twoImg,
          css: {
            top: '36rpx',
            left: '386rpx',
            width: '214rpx',
            height: '190rpx',
            mode: 'scaleToFill',
          },
        },
        {
          type: 'text',
          text: firstname,
          css: {
            top: '246rpx',
            left: '30rpx',
            width: '205rpx',
            fontSize: '16rpx',
            color: '#000',
            height: '210rpx',
          },
        },
        {
          type: 'text',
          text: content,
          css: {
            top: '270rpx',
            left: '30rpx',
            width: '140rpx',
            maxLines:"4",
            fontSize: '14rpx',
            color: '#000',
            height: '210rpx',
          },
        },
        {
          type: 'image',
          url: '/images/erweima.jpg',
          css: {
            top: '255rpx',
            left: '180rpx',
            width: '50rpx',
            height: '50rpx',
            mode: 'scaleToFill',
          },
        },
        {
          type: 'text',
          text: title_word,
          css: {
            top: '246rpx',
            left: '395rpx',
            width: '205rpx',
            fontSize: '16rpx',
            color: '#000',
            height: '210rpx',
          },
        },
        {
          type: 'text',
          text: word_content,
          css: {
            top: '270rpx',
            left: '395rpx',
            width: '140rpx',
            maxLines: "4",
            fontSize: '14rpx',
            color: '#000',
            height: '210rpx',
          },
        },
        {
          type:'text',
          text: alcohol_num,
          css:{
            top:'265rpx',
            left:'560rpx',
            width:'140rpx',
            height:'210rpx',
            fontSize:'14rpx',
            color:'#af1e23',
          }
        },
        {
          type:'text',
          text: net_content_num,
          css:{
            top:'282rpx',
            left:'560rpx',
            width:'140rpx',
            height:'210rpx',
            fontSize:'14rpx',
            color:'#af1e23',
          }
        }
        // {
        //   type: 'image',
        //   url: '/images/erweima.jpg',
        //   css: {
        //     top: '255rpx',
        //     left: '545rpx',
        //     width: '50rpx',
        //     height: '50rpx',
        //     mode: 'scaleToFill',
        //   },
        // },
      ],
    });
  }
}