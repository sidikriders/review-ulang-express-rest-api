var router = require('express').Router()

var models = require('../models')
var Group = models.group
var Person = models.person
var GroupPerson = models.group_person

router.get('/', (req, res, next) => {
  res.status(200).send('try: /people or /groups')
})

router.get('/group', (req, res, next) => {
  Group.findAll({
    include: 'memberList'
  })
  .then(groups => res.status(200).send(groups))
  .catch(err => {
    console.log(err)
    res.status(401).send(err)
  })
})

router.post('/group', (req, res, next) => {
  Group.create({
    name: req.body.name
  })
  .then(group => res.status(200).send(group))
  .catch(err => {
    console.log(err)
    res.status(401).send(err)
  })
})

router.get('/person', (req, res, next) => {
  Person.findAll({
    include: ['group']
  })
  .then(groups => res.status(200).send(groups))
  .catch(err => {
    console.log(err)
    res.status(401).send(err)
  })
})

router.post('/person', (req, res, next) => {
  if (req.body.group && req.body.group.length > 0) {
    Person.create({
      name: req.body.name
    })
    .then(person => {
      console.log(person.id)
      Promise.all(
        req.body.group.map(_group => {
          GroupPerson.create({
            personId: person.id,
            groupId: _group.id,
            role: _group.role
          })
        })
      )
      .then(() => res.status(200).send('success'))
      .catch(err => {
        console.log(err)
        res.status(401).send(err)
      })
    })
    .catch(err => {
      console.log(err)
      res.status(401).send(err)
    })
  } else {
    res.status(500).send('need group id')
  }
})

router.get('/join', (req, res) => {
  GroupPerson.findAll()
  .then( data => res.send(data))
  .catch(err => {
    console.log(err)
    res.send(err)
  })
})
module.exports = router