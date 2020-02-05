const gameRouter = require('./routers/game')
const router = require('express').Router()
const Player = require('./models/Player')


// Routes
router.use('/games', gameRouter)


// Affiche le tableau pour création du joueur
router.get('/players/new', (req, res, next) => {
    res.format({
        html : () => {
            res.render("tab_player", {
                formTitle: "Ajoute un joueur",
                idAndMethod: "/?_method=POST"
            })
        },
        json : () => {
            res.status(406).json('NOT_API_AVAILABLE')
        }
    })
})

router.get('/players/:id/edit', (req, res, next) => {
      Player.findOnePlayers(req.params.id)
      .then((players) => {
        if (!players) {
          return next(new Error("404 NOT FOUND"))
        }
        res.render("tab_player", {
          title: "Update joueur",
          formTitle: "Edit joueur n°" + req.params.id,
          players: players,
          idAndMethod: "/" + req.params.id + "?_method=PATCH"
        })
      }).catch((err) => {
        return next(err)
      })
})


// Redirection
router.all('/', (req, res, next) => {
    res.format({
        html : () => {
            res.redirect(301, '/games')    
        },
        json : () => {
            res.status(404).send('API_NOT_AVAILABLE')
        }
    })
})

router.get('/players/:id', (req, res, next) => {
    Player.findOnePlayers(req.params.id)
    .then((player) => {
        res.format({
            html : () => {
                res.redirect('/players/'+ player.id +'/edit')    
            },
            json : () => {
                res.json(player)
            }
        })
    }).catch((err) => {
        return next(err)
    })
    
})

// Affiche tous les players
router.get('/players', (req, res, next) => {
    Player.getAllPlayers()
    .then((players) => {  
        res.format({
            html: () => { // Prepare content
              let content = '<table class="table"><tr><th>ID</th><th>Name</th><th>Email</th><th>GameWin</th><th>GameLost</th><th>createdAt</th></tr>'
              
              players.forEach((player) => {
                content += '<tr>'
                content += '<td>' + player['id'] + '</td>'
                content += '<td>' + player['name'] + '</td>'
                content += '<td>' + player['email'] + '</td>'
                content += '<td>' + player['gamewin'] + '</td>'
                content += '<td>' + player['gamelost'] + '</td>'
                content += '<td>' + player['createdAt'] + '</td>'
                content += '<td> <form action="/players/'+player['id']+'/edit/?_method=GET", method="GET"> <button type="submit" class="btn btn-success"><i class="fa fa-pencil fa-lg mr-2"></i>Edit</button> </form> </td>'
                // content += '<td> <form action="/players/'+player['id']+'/?_method=GET", method="GET"> <button type="submit" class="btn btn-info"><i class="fa fa-eye fa-lg mr-2"></i>See</button> </form> </td>'
                content += '<td> <form action="/players/'+player['id']+'/?_method=DELETE", method="DELETE"> <button type="submit" class="btn btn-danger"><i class="fa fa-trash-o fa-lg mr-2"></i>Remove</button> </form> </td>'
                content += '</tr>'
              })
              
              content += '</table>'
      
              res.render("list_players", {
                  content: content
              })
            },
            json: () => {
                res.json(players)
            }
          })
        }).catch((err) => {
        console.log('LE CATCH')
        return next(err)
    })
})



// Ajoute un joueur
router.post('/players', (req, res, next) => {
    Player.insertPlayers(req.body)
    .then((player) => { 
        res.format({
            html : () => {
                res.redirect(301, '/players/' + player.id)    
            },
            json : () => {
                res.status(201).json(player)
            }
        })
    }).catch((err) => {
        return next(err)
    })
})

// Gestion des errreurs
router.use((err, req, res, next) => {
    res.format({
        html: () => {
            res.render('error', {
                error: err
            })
        },
        json : () => {
            res.status(404).json(err)
        }
    })
})
   
module.exports = router