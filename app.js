const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const bodyParser = require('body-parser')

const oneToMany = require('./routers/one-to-many.js')
const manyToMany = require('./routers/many-to-many.js')

const app = express()

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res, next) => {
  res.send('Hello World!')
})

app.use('/1-n', oneToMany)
app.use('/n-n', manyToMany)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found')
  err.status = 404;
  next(err)
})

// error handler
app.use((err, req, res, next) => {
  // render the error page
  res.status(err.status || 500)
  res.send({
    status: false,
    data: err
  })
})

module.exports = app