// 设置响应头的中间件

module.exports = async (ctx, next) => {
  // 响应数据格式
  ctx.set('Content-Type', 'application/json;charset=utf-8')
  // 允许跨域
  ctx.set('Access-Control-Allow-Origin', '*')
  ctx.set('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE')
  await next()
}
