// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

exports.main = async (event, context) => {
  const { value } = event
  console.log('value', value)
  try {
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
  } catch (err) {
    return err
  }
}