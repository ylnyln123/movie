const config = require('../config')
const Sequelize = require('sequelize')
const db = {}
const path = require('path')
const fs = require('fs')

const sequelize = new Sequelize(
  config.db.database,
  config.db.username,
  config.db.password,
  config.db.options
)

// eslint-disable-next-line no-path-concat
// const User = sequelize.import('./User.js')
// 遍历目录下所有除了index.js文件夹的文件，并且把所有的model存在db中，然后导出
fs.readdirSync(__dirname).filter(file => file !== 'index.js')
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

db.Sequelize = Sequelize
db.sequelize = sequelize

module.exports = db
