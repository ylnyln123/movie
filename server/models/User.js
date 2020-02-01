const Sequelize = require('sequelize')
const MD5 = require('crypto-js/md5')

// 密码使用MD5加密，通过crypto-js实现
function hashPassword (user, option) {
  if (user.changed('password')) {
    user.password = MD5(user.password).toString()
  }
}

module.exports = (sequelize, DataTypes) => {
  class Model extends Sequelize.Model {
    comparePassword (password) {
      return this.password === MD5(password).toString()// 将前端传来的密码和数据库中的密码比对是否一致
    }
  }

  Model.init({
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: [8, 16]
      }
    }
  },
  {
    hooks: {
      afterValidate: hashPassword
    },
    sequelize,
    modelName: 'User'
  })
  return Model
}
