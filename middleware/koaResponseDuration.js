// 计算服务器消耗时长的中间件

module.exports = async (ctx, next) => {
  const start = Date.now() // 记录开始时间
  await next()
  const end = Date.now() // 记录结束时间
  const duration = end - start // 计算消耗时长
  ctx.set('X-Response-Time', duration + 'ms') // 设置响应头
}
