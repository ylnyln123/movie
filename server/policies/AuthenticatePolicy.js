// jwt用户校验
const config = require('../config')
const Jwt = require('jsonwebtoken')

function tokenVerify (token) {
  try {
    Jwt.verify(token, config.token.secretOrPrivateKey)
    return true
  } catch (error) {
    return false
  }
}

module.exports = {
  isValidToken (req, res, next) {
    const bearerToken = req.headers.authorization
    try {
      const token = bearerToken.split(' ')[1]
      if (tokenVerify(token)) {
        next()
      } else {
        res.status(403).send({
          code: 403,
          error: '登陆凭证无效请尝试重新登陆'
        })
      }
    } catch (error) {
      res.status(401).send({
        status: 401,
        error: '请登陆后再访问'
      })
    }
  }
}
