# 换头像小程序

# 融合国庆和中秋元素制作你专属的头像

## 云开发 quickstart

这是云开发的快速启动指引，其中演示了如何上手使用云开发的三大基础能力：

- 数据库：一个既可在小程序前端操作，也能在云函数中读写的 JSON 文档型数据库
- 文件存储：在小程序前端直接上传/下载云端文件，在云开发控制台可视化管理
- 云函数：在云端运行的代码，微信私有协议天然鉴权，开发者只需编写业务逻辑代码

## 参考文档

- [云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)

## 功能

#### 一：上传图片功能：

使用 wx.chooseImage 接口实现本地上传图片

```javascript
wx.chooseImage({
  count: 1,
  sizeType: ['original', 'compressed'],
  sourceType: ['album', 'camera'],
  success(res) {
    wx.showLoading({
      title: '加载中',
    })
    const tempFilePaths = res.tempFilePaths[0]
    console.log('tempFilePath', tempFilePaths)
    that.cropper.imgReset()

    that.setData({
      src: tempFilePaths,
    })
    //重置图片角度、缩放、位置
  },
})
```

#### 二：图片裁剪功能

使用微信小程序 image-cropper 插件,项目地址：https://github.com/wx-plugin/image-cropper

#### 三：小程序生成本地图片

采用微信小程序内置 canvas 来生成本地图片,第一次绘制背景图

```javascript
that.ctx.drawImage(
  that.data.cutImage,
  0,
  0,
  that.canvasWidth,
  that.canvasHeight
)
```

第二次绘制头像框

```javascript
that.ctx.drawImage(pic, 0, 0, this.canvasWidth, this.canvasHeight)
```

第三次生成整体图像并保存到本地

```javascript
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
```

#### 四：图片安全接口

​ 由于微信审核对图片有较高的审核要求，详情见下方链接

[微信官方api ]: https://developers.weixin.qq.com/miniprogram/dev/framework/msg_security.html

##### 功能实现

第一步编写安全接口云函数

​

```javascript
const res = await cloud.openapi.security.imgSecCheck({
  media: {
    /*header: {
          'Content-Type': 'application/octet-stream',
        },*/
    contentType: 'image/png',
    value: Buffer.from(value),
  },
})
return res
```

第二步本地调用云函数

```javascript
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
          wx.navigateBack({
            delta: -1,
          })
        },
      })
      return
    } else {
      console.log('安全图片')
      wx.hideLoading()
      app.globalData.cutImage = that.originPic

      wx.navigateBack({
        delta: -1,
      })
    }
  })
```

注意：接口有图片大小的要求，传入图片诺过大要进行压缩处理

#### 五:图片压缩

​ 采用 canvas 生成本地图片方法，调用 wx.canvasToTempFilePath 指定 quality 生成对应质量的图片达到压缩处理

```javascript
ctx.clearRect(0, 0, canvasWidth, canvasHeight)
ctx.drawImage(tempFilePath, 0, 0, canvasWidth, canvasHeight)
ctx.draw(
  false,
  setTimeout(function () {
    wx.canvasToTempFilePath({
      canvasId: 'attendCanvasId',
      fileType: 'jpg',
      quality: 0,
      success: function success(res) {
        callback && callback(res)
      },
      fail: function (e) {
        wx.showToast({
          title: '图片上传失败，请重新上传！',
          icon: 'none',
        })
      },
    })
  }),
  100
)
```

# 觉得本小程序有对你有帮助的欢迎点击 star

# 感谢您的小星星！
