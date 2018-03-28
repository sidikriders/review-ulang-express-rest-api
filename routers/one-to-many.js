var router = require('express').Router()

router.get('/', (req, res, next) => {
  res.status(200).send('try: /students or /classes')
})

module.exports = router