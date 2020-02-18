const router = require('express').Router()

router.get('/:id', (req, res, next) => {
  res.send(req.url)
})

module.exports = router