const Koa = require('koa')
const koaResponseDuration = require('./middleware/koaResponseDuration') // 导入计算服务器消耗时长的中间件
const koaResponseHeader = require('./middleware/koaResponseHeader') // 导入设置响应头的中间件
const koaResponseData = require('./middleware/koaResponseData') // 导入设置响应头的中间件
const webSocketService = require('./service/webSocketService')

const app = new Koa()

// 第1层中间件
app.use(koaResponseDuration)
// 第2层中间件
app.use(koaResponseHeader)
// 第3层中间件
app.use(koaResponseData)

app.listen(3000, () => console.log('http://localhost:3000'))

webSocketService.listen()
