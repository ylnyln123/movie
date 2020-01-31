// 路由，数据的增删改查
const UserControllers = require('./controllers/UserControllers')

module.exports = (app) => {
  app.get('/api', (req, res) => {
    res.send({
      msg: 'Hello node'
    })
  })

  app.post('/users', UserControllers.register)
  app.get('/users/:id', UserControllers.getUserById)
  app.put('/users/:id', UserControllers.update)
  app.delete('/users/:id', UserControllers.delete)
}
