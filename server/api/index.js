const router = require('express').Router()

//Routes
router.use('/match/', require('./match'))

//404 handling
router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

module.exports = router
