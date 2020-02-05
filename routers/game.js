const router = require('express').Router()

router.get('/', (req, res, next) => {
  res.render("../views/games.hbs")
})

router.get('/:id', (req, res, next) => {
  res.send(req.url)
})

// router.post('/players', (req, res, next) => {
//   res.render("../views/player.js")
// })

module.exports = router