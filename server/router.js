// 路由，数据的增删改查
const UserControllers = require('./controllers/UserControllers')
const AuthenticatePolicy = require('./policies/AuthenticatePolicy')

module.exports = (app) => {
  app.post('/users/login', UserControllers.login)
  app.post('/users', UserControllers.register)
  app.get('/users/:id',
    AuthenticatePolicy.isValidToken,
    UserControllers.getUserById
  )
  app.put('/users/:id', UserControllers.update)
  app.delete('/users/:id', UserControllers.delete)
}
