// 路由，数据的增删改查
const UserControllers = require('./controllers/UserControllers')
const MovieControllers = require('./controllers/MovieControllers')
const AuthenticatePolicy = require('./policies/AuthenticatePolicy')

module.exports = (app) => {
  // 用户路由
  app.post('/users/login', UserControllers.login)
  app.post('/users', UserControllers.register)
  app.get('/users/:id',
    AuthenticatePolicy.isValidToken,
    UserControllers.getUserById
  )
  app.put('/users/:id', UserControllers.update)
  app.delete('/users/:id', UserControllers.delete)

  // 列表路由
  app.post('/movies',
    AuthenticatePolicy.isValidToken, MovieControllers.create
  )
  app.put('/movies/:id',
    AuthenticatePolicy.isValidToken, MovieControllers.update
  )
  app.get('/movies/:id',
    MovieControllers.getById
  )
  app.get('/movies',
    MovieControllers.getAll
  )
}
