const express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')

const app = express()

app.use(logger('dev'))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res, next) => {
  res.send('Hello World!')
})

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