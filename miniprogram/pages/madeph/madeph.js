// pages/madeph/madeph.js
const app = getApp()

/**
 * 大概两部分：
 * 1、先把用户上传的头像画出来
 * 2、把前一个页面传过来的头像框（中间透明）再画上去
 */
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgSrc: '',
    width: 250, //宽度
    height: 250, //高度
    condition: true,
    CropperStyle: 'none',
  },

  //选择用户自己头像图片
  upload() {
    wx.navigateTo({
      url: '../cropper/cropper',
    })
  },

  //生成头像，即先画图像再画图像框
  generate() {
    var self = this
    var contex = wx.createCanvasContext('ahaucanvas') //ttcanvas为该canvas的ID
    //var contex = ctx.getContext('2d');
    var avatarurl_width = 840 //这个是画布宽
    var avatarurl_heigth = 840 //这个是高
    // var avatarurl_x = 50;
    // var avatarurl_y = 50;
    // contex.arc(avatarurl_width / 2 + avatarurl_x, avatarurl_heigth / 2 + avatarurl_y, avatarurl_width / 2, 0, Math.PI * 2, false);//这个地方我画了个头像的圆
    // contex.clip();
    if (self.data.bgcss == 'h1') {
      contex.drawImage(self.data.src, 62, 90, 700, 700)
    } else if (self.data.bgcss == 'h2') {
      contex.drawImage(self.data.src, 60, 60, 735, 735)
    } else if (self.data.bgcss == 'h3' || self.data.bgcss == 'h4') {
      contex.drawImage(self.data.src, 100, 130, 615, 615)
    } else if (self.data.bgcss == 'h5') {
      contex.drawImage(self.data.src, 60, 60, 735, 735)
    } else if (self.data.bgcss == 'h6') {
      contex.drawImage(self.data.src, 40, 40, 777, 777)
    } else if (self.data.bgcss == 'h7' || self.data.bgcss == 'h8') {
      contex.drawImage(self.data.src, 80, 112, 645, 645)
    } else if (self.data.bgcss == 'h9' || self.data.bgcss == 'h10') {
      contex.drawImage(self.data.src, 82, 114, 645, 645)
    } else if (self.data.bgcss == 'h11') {
      contex.drawImage(self.data.src, 30, 30, 780, 780)
    } else if (self.data.bgcss == 'h12') {
      contex.drawImage(self.data.src, 20, 80, 780, 780)
    } else {
      contex.drawImage(self.data.src, 0, 0, avatarurl_width, avatarurl_heigth)
    }
    contex.restore()
    contex.save()
    contex.beginPath() //开始绘制
    // contex.arc(150, 50, 30, 0, Math.PI * 2, false);
    // contex.clip();
    //contex.arc(25, 25, 25, Math.PI * 2, false);
    //contex.clip();
    contex.drawImage(self.data.bgsrc, 0, 0, avatarurl_width, avatarurl_heigth) // 这是背景
    contex.restore()
    contex.save()
    contex.beginPath() //开始绘制

    contex.draw(
      true,
      setTimeout(function () {
        wx.canvasToTempFilePath(
          {
            //导出图片
            width: 840,
            height: 840,
            destWidth: 840,
            destHeight: 840,
            canvasId: 'ahaucanvas',
            success: (res) => {
              wx.saveImageToPhotosAlbum({
                filePath: res.tempFilePath,
                success: function (data) {
                  // console.log(data);
                  wx.showToast({
                    title: '保存成功',
                    icon: 'success',
                    duration: 2000,
                  })
                },
                fail: function (err) {
                  // console.log(err);
                  // console.log("用户一开始拒绝了，我想再次发起授权")
                  // console.log('打开设置窗口')
                  wx.openSetting({
                    success(settingdata) {
                      console.log(settingdata)
                      if (settingdata.authSetting['scope.writePhotosAlbum']) {
                        // console.log('获取权限成功，给出再次点击图片保存到相册的提示。')
                        wx.showToast({
                          title: '请再次保存',
                          icon: 'success',
                          duration: 2000,
                        })
                      } else {
                        // console.log('获取权限失败，给出不给权限就无法正常使用的提示')
                        wx.showToast({
                          title: '获取权限失败，可能导致保存图片无法正常使用',
                          icon: 'none',
                          duration: 2000,
                        })
                      }
                    },
                  })
                },
              })
            },
          },
          this
        )
      }, 100)
    )
  },
  jump() {
    if (app.globalData.cutImage) {
      wx.navigateTo({
        url: '../product/product',
      })
    } else {
      wx.showToast({
        title: '请先上传图片',
        icon: 'none', //如果要纯文本，不要icon，将值设为'none'
        duration: 2000,
      })
    }
  },
  onShow() {
    //开始裁剪
    let imgSrc
    if (!app.globalData.cutImage) {
      imgSrc = ''
    } else {
      imgSrc = app.globalData.cutImage
    }

    console.log('src', imgSrc)
    this.setData({
      imgSrc: imgSrc,
    })
    console.log('onshow', imgSrc, this.imgSrc)
  },
})
