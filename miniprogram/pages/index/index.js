//index.js
//获取应用实例
const app = getApp()

/***************增加转发分享功能 
 * onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },
 * 
 * 
*/
Page({
  data: {
    jump: false,
  },
  onLoad: async function (options) {
    //wx.cloud.init()
    /*let imgList = new Array(11).fill('').map((file, v) => {
      return `cloud://headimage-hust-o3pyd.6865-headimage-hust-o3pyd-1300324954/gh${
        v + 1
      }.png`
    })

    imgList = imgList.concat(
      new Array(4).fill('').map((file, v) => {
        return `cloud://headimage-hust-o3pyd.6865-headimage-hust-o3pyd-1300324954/zh${
          v + 1
        }.png`
      })
    )
    const res = await wx.cloud.getTempFileURL({
      fileList: imgList,
    })
    const fileList = res.fileList
    console.log('fileList', fileList)
   
    fileList.forEach(async (file, v) => {
      let res = await wx.cloud.downloadFile({
        fileID: file.fileID,
      })
      app.globalData.images[`img${v}`] = res.tempFilePath
    })*/
    /*let imgList = new Array(11).fill('').map((file, v) => {
      return `cloud://headimage-hust-o3pyd.6865-headimage-hust-o3pyd-1300324954/gh${
        v + 1
      }.png`
    })

    imgList = imgList.concat(
      new Array(4).fill('').map((file, v) => {
        return `cloud://headimage-hust-o3pyd.6865-headimage-hust-o3pyd-1300324954/zh${
          v + 1
        }.png`
      })
    )

    const res = await wx.cloud.getTempFileURL({
      fileList: imgList,
    })
    const fileList = res.fileList
    console.log('fileList', fileList)
    wx.showLoading({
      title: '加载资源中',
      icon: 'loading',
    })
    for (let i = 0; i < fileList.length; i++) {
      let res = await wx.cloud.downloadFile({
        fileID: fileList[i].fileID,
      })
      app.globalData.images[`img${i}`] = res.tempFilePath
    }
    wx.hideLoading()
    this.setData({
      jump: true,
    })
    console.log('云图片', app.globalData)*/
  },
  toselect() {
    /*if (this.data.jump) {
      wx.navigateTo({
        url: '../madeph/madeph',
      })
    }*/
    wx.navigateTo({
      url: '../madeph/madeph',
    })
  },
})
