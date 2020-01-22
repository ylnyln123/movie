const express = require('express')
// eslint-disable-next-line no-unused-vars
const bodyParser = require('body-parser')
// eslint-disable-next-line no-unused-vars
const morgan = require('morgan')

// eslint-disable-next-line no-unused-vars
const app = express()
app.use(bodyParser.json())
app.use(morgan('combined'))

app.get('/api', (req, res) => {
  res.send({
    msg: 'Hello node'
  })
})

app.post('/users', (req, res) => {
  console.log(req.body)
  res.send({
    code: 200,
    data: req.body
  })
})
app.listen(3000, () => console.log('Server has been started on port 3000'))
