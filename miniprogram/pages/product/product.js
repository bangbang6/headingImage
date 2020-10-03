// miniprogram/pages/product/product.js
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    theme: 'guoqing',
    imageList: [],
    color: '#ee4e33',
    leftClass: 'leftBlock',
    rightClass: 'rightNone',
    cutImage: '',
    avtImage: '',
    width: 300,
    height: 300,
    left: 0,
    top: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function () {
    const img = app.globalData.cutImage
    console.log('guoqing', app.globalData.images.guoqing)

    let imgList = new Array(11).fill('').map((file, v) => {
      return `cloud://heading-image-j932v.6865-heading-image-j932v-1303838338/gh${v+1}.png`
    })

    imgList = imgList.concat(
      new Array(4).fill('').map((file, v) => {
        return `cloud://heading-image-j932v.6865-heading-image-j932v-1303838338/zh${v+1}.png`
      })
    )
    this.imageList = imgList
    /*
      
    const res = await wx.cloud.getTempFileURL({
      fileList: imgList,
    })
    const fileList = res.fileList
    console.log('fileList', fileList)
    this.imageList = []

    for (let i = 0; i < fileList.length; i++) {
      wx.cloud.downloadFile({
        fileID: fileList[i].fileID,
        success: function (res) {
      app.globalData.images[`img${i}`] = res.tempFilePath

        },
      })
    }*/
    /*this.imageList = []

    for (let i = 0; i < 15; i++) {
      this.imageList.push(app.globalData.images[`img${i}`])
    }*/
    this.setData({
      cutImage: app.globalData.cutImage,
      //imageList: this.imageList.slice(0, 11),
      imageList: this.imageList.slice(0, 11),
    })
    console.log('imageList', this.data.imageList)
    const that = this
    const query = wx.createSelectorQuery()
    const ctx = wx.createCanvasContext('myCanvas')
    this.ctx = ctx
    query
      .select('#myCanvas')
      .boundingClientRect(function (res) {
        that.canvasWidth = res.width
        that.canvasHeight = res.height
        /* that.ctx.drawImage(
          that.data.cutImage,
          0,
          0,
          that.canvasWidth,
          that.canvasHeight
        )*/
      })
      .exec()
    console.log('cutImage', this.data.cutImage)
  },
  changeToGuo() {
    this.setData({
      theme: 'guoqing',
      leftClass: 'leftBlock',
      rightClass: 'rightNone',
      color: '#ee4e33',
      imageList: this.imageList.slice(0, 11),
    })
  },
  changeToZhong() {
    this.setData({
      theme: 'zhongqiu',
      leftClass: 'leftNone',
      rightClass: 'rightBlock',
      color: '#ffaa3e',
      imageList: this.imageList.slice(11),
    })
  },
  back() {
    wx.navigateTo({
      url: '../madeph/madeph',
    })
  },
  async save() {
    let that = this
    let arr = []
    arr.push(this.data.avtImage)
    wx.showLoading({
      title: '图片校验中',
      icon: 'loading',
    })
    const res = await wx.cloud.getTempFileURL({
      fileList: arr,
    })
    let res1 = await wx.cloud.downloadFile({
      fileID: res.fileList[0].fileID,
    })
    let pic = res1.tempFilePath
    that.ctx.drawImage(
      that.data.cutImage,
      0,
      0,
      that.canvasWidth,
      that.canvasHeight
    )
    that.ctx.drawImage(pic, 0, 0, this.canvasWidth, this.canvasHeight)
    console.log('origin', this.canvasHeight)
    this.ctx.draw(
      true,
      setTimeout(function () {
        wx.canvasToTempFilePath({
          x: 0,
          y: 0,
          width: 50,
          height: 50,
          destWidth: 50,
          destHeight: 50,
          quality: 0,
          fileType: 'png',
          canvasId: 'myCanvas',
          success: function (res) {
            that.security(res)
          },
        })
      }, 300)
    )
  },
  security: function (res) {
    let that = this
    wx.getFileSystemManager().readFile({
      filePath: res.tempFilePath,
      success: (buffer) => {
        console.log('buffer2', buffer.data)
        wx.cloud
          .callFunction({
            name: 'msgCheck',
            data: {
              value: buffer.data,
              //value: obj.url,
            },
          })
          .then((imgRes) => {
            if (imgRes.result.errCode == '87014') {
              wx.showToast({
                title: '图片含有违法违规内容',
                icon: 'none',
                loading: 2000,
                success: function () {
                  wx.hideLoading()
                },
              })
              return
            } else {
              console.log('安全图片')
              wx.hideLoading()
              wx.showLoading({
                title: '保存中…',
                icon: 'loading',
              })
              that.ctx.draw(
                true,
                setTimeout(function () {
                  wx.canvasToTempFilePath({
                    x: 0,
                    y: 0,
                    width: this.canvasWidth,
                    height: this.canvasHeight,
                    destWidth: this.canvasWidth,
                    destHeight: this.canvasHeight,

                    fileType: 'jpg',
                    canvasId: 'myCanvas',
                    success: function (res) {
                      console.log('res.pic', res.tempFilePath)

                      wx.saveImageToPhotosAlbum({
                        filePath: res.tempFilePath,
                        success: function (data) {
                          wx.hideLoading()
                          wx.showToast({
                            title: '保存成功',
                            icon: 'success',
                            duration: 2000,
                            success() {},
                          })
                        },
                      })
                      that.ctx.draw(false) //清空画布
                    },
                  })
                }, 300)
              )
            }
          })
      },
      fail: (err) => {
        wx.showToast({
          title: '函数出错',
          icon: 'none',
          loading: 2000,
        })
        console.log(err)
      },
    })
  },
  choosePic(e) {
    console.log('index', e.currentTarget.dataset.index)
    /* this.ctx.drawImage(
      this.data.imageList[index],
      0,
      0,
      this.canvasWidth,
      this.canvasHeight
    ) */
    const index = parseInt(e.currentTarget.dataset.index)

    this.setData({
      avtImage: this.data.imageList[index],
    })
  },
})
