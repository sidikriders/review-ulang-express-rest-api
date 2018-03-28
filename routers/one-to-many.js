var router = require('express').Router()
var sequelize = require('sequelize')

var models = require('../models')
var Batch = models.batch
var Student = models.student

router.get('/', (req, res, next) => {
  res.status(200).send('try: /students or /classes')
})

router.get('/batch', (req, res, next) => {
  Batch.findAll({
    include: [{
      model: Student,
      attributes: ['id', 'name']
    }],
    attributes: ['id', 'name']
  })
    .then(batches => res.status(200).send(batches))
    .catch(err => {
      console.log(err)
      res.status(401).send({ msg: 'ERROR Sequelize', data: err })
    })
})

router.post('/batch', (req, res, next) => {
  Batch.create({
    name: req.body.name
  })
    .then(batch => res.status(200).send(batch))
    .catch(err => res.status(401).send({ msg: 'ERROR Sequelize', data: err }))
})

router.get('/student', (req, res, next) => {
  Student.findAll({
    include: {
      model: Batch,
      attributes: ['id', 'name']
    },
    attributes: ['id', 'name']
  })
    .then(students => res.status(200).send(students))
    .catch(err => res.status(401).send({ msg: 'ERROR Sequelize', data: err }))
})

router.post('/student', (req, res, next) => {
  Student.create({
    name: req.body.name,
    batchId: req.body.batchId
  })
    .then(student => res.status(200).send(student))
    .catch(err => res.status(401).send({ msg: 'ERROR Sequelize', data: err }))
})

module.exports = router