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
      unique: {
        msg: '该邮箱已被注册'
      },
      validate: {
        isEmail: {
          msg: '请输入正确的邮箱地址'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          min: 8,
          max: 16,
          msg: '密码长度必须在8-16位之间'
        }
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
