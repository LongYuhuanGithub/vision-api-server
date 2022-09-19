// 读取文件的工具模块

const fs = require('fs')

module.exports.getFileJsonData = filePath => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (error, data) => {
      if (error) reject(error)
      else resolve(JSON.parse(data))
    })
  })
}
