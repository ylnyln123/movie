/* eslint-disable prefer-const */
/* eslint-disable standard/no-callback-literal */
/* eslint-disable no-path-concat */
const bodyParser = require('body-parser')
// eslint-disable-next-line no-unused-vars
const morgan = require('morgan')
// eslint-disable-next-line no-unused-vars
const sequelize = require('./models')
const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io').listen(server).sockets

app.use('/static', express.static('video_resources'))
app.use(bodyParser.json())
app.use(morgan('combined'))
require('./router')(app)
app.post('/users', (req, res) => {
  res.send({
    code: 200,
    data: req.body
  })
})

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})
// 当前聊天室成员

let connectedUser = []
let connectedId = []
io.on('connection', socket => {
  console.log('a user connected')
  updateUserName()
  let UserName = ''
  let Userid = ''
  socket.on('check_id', (id, name) => {
    if (connectedId.indexOf(id) >= 0) {
      let repetitionid = true
      connectedId.push(id)
      connectedUser.push(name)
      socket.emit('RepetitionId', repetitionid)
    } else {
      Userid = id
      connectedId.push(Userid)
    }
  })
  socket.on('login', (name, callback) => {
    if (connectedUser.indexOf(name) >= 0) {
      const exits = true
      socket.emit('repetition', exits)
      return false
    } else {
      UserName = name
      connectedUser.push(UserName)
      callback(true)
      updateUserName()
    }
    // console.log(connectedUser)
  })

  socket.on('chat message', msg => {
    // console.log(msg)
    io.emit('output', {
      name: UserName,
      msg: msg
    })
  })

  // 用户退出聊天室之后的操作
  socket.on('disconnect', () => {
    console.log('user disconnected')
    connectedUser.splice(connectedUser.lastIndexOf(UserName), 1)
    connectedId.splice(connectedId.lastIndexOf(Userid), 1)
    updateUserName()
  })
  // 用户列表
  function updateUserName () {
    io.emit('loadUser', connectedUser)
  }
})
const port = 8081
server.listen(port, () => console.log(`SERVER RUNNING ON PORT ${port}`))

sequelize.sequelize.sync()
  .then(() => {
    console.log('Connection has been established successfully')
    app.listen(3000, () => console.log('Server has been started on port 3000'))
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })
