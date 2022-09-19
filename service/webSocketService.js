const WebSocket = require('ws')
const path = require('path')
const fileUtils = require('../utils/fileUtils')

const wss = new WebSocket.Server({ port: 9999 })


/*
服务端接收数据字段约定：
  {
    "action": "getData", // 代表某项行为，可选值有：getData 代表获取图表数据、fullScreen 代表产生了全屏事件、themeChange 代表产生了主题切换的事件
    "socketType": "trendData", // 代表业务模块类型，前端响应函数的标识，可选值有：trendData、sellerData、mapData、rankData、hotproductData、stockData、fullScreen、themeChange
    "chartName": "trend", // 代表图表名称：可选值有：trend、seller、map、rank、hotproduct、stock，如果是主题切换事件，可不传此值
    "value": "" // 代表具体的数据值，如果是全屏事件，true 代表全屏 false 代表非全屏，如果是主题切换事件，可选值有 chalk 或者 vintage
  }
*/
module.exports.listen = () => {
  wss.on('connection', client => {
    client.on('message', async msg => {
      const msgJson = JSON.parse(msg)
      if (msgJson.action === 'getData') {
        try {
          // 根据 msgJson.chartName 读取文件，并添加到新增的 data 节点上，再将数据发给客户端
          msgJson.data = {
            msg: '读取文件内容成功！',
            status: 200,
            data: await fileUtils.getFileJsonData(path.join(__dirname, `../data/${msgJson.chartName}.json`))
          }
          client.send(JSON.stringify(msgJson))
        } catch (e) {
          msgJson.data = {
            msg: '读取文件内容失败，文件内容不存在！',
            status: 404
          }
          client.send(JSON.stringify(msgJson))
        }
      } else {
        // 全屏事件或主题切换事件
        // 原封不动将所接收到的数据转发给每一个处于连接状态的客户端
        // wss.clients：所有客户端的连接
        wss.clients.forEach(client => client.send(msg))
      }
    })
  })
}
