// 处理业务逻辑的中间件，读取某个 json 文件的中间件

const path = require('path')
const fileUtils = require('../utils/fileUtils')

module.exports = async (ctx, next) => {
  // 假如路径为 http://localhost:3000/api/seller
  const url = ctx.request.url.replace('/api/', '') // seller
  const filePath = path.join(__dirname, `../data/${url}.json`) // ../data/seller.json
  // 读取文件并响应数据
  try {
    ctx.response.body = {
      msg: '读取文件内容成功！',
      status: 200,
      data: await fileUtils.getFileJsonData(filePath)
    }
  } catch (e) {
    ctx.response.body = {
      msg: '读取文件内容失败，文件内容不存在！',
      status: 404
    }
  }
  await next()
}
