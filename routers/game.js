const router = require('express').Router()

router.get('/', (req, res, next) => {
  res.render("../views/games.hbs")
})

router.get('/:id', (req, res, next) => {
  res.send(req.url)
})

module.exports = router