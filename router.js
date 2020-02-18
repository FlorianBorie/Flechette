const gameRouter = require('./routers/game')
const router = require('express').Router()
const Joueur = require('./models/Player')
const Partie = require('./models/Game')


// Routes
//router.use('/games', gameRouter)

// Redirection
router.all('/', (req, res, next) => {
    res.format({
        html : () => {
            res.redirect(301, '/games')    
        },
        json : () => {
            res.status(406).send('API_NOT_AVAILABLE')
        }
    })
})

// Affiche le tableau pour création du joueur
router.get('/players/new', (req, res, next) => {
    res.format({
        html : () => {
            res.render("tab_player", {
                formTitle: "Ajoute un joueur"
            })
        },
        json : () => {
            res.status(406).json('NOT_API_AVAILABLE')
        }
    })
})

router.get('/players/:id/edit', (req, res, next) => {
      Joueur.findOnePlayers(req.params.id)
      .then((Joueur) => {
        if (!Joueur) {
          return next(new Error("404 NOT FOUND"))
        }
        res.render("tab_player_update", {
            title: "Update joueur",
            formTitle: "Update joueur n°" + req.params.id,
            Joueur: Joueur
        })
      }).catch((err) => {
        return next(err)
      })
})

// Mettre à jour les joueurs
router.post('/players/:id', (req, res, next) => {

      let changesInformation = {}

      if (req.body.name) {
        changesInformation.name = req.body.name
      }
      if (req.body.email) {
        changesInformation.email = req.body.email
      }
      if (req.body.gamewin) {
        changesInformation.gamewin = req.body.gamewin
      }
      if (req.body.gamelost) {
        changesInformation.gamelost = req.body.gamelost
      }    

      changesInformation.id = req.body.id

    Joueur.updatePlayers(changesInformation)
    .then((Joueur) => {
        res.format({
            html: () => {
                res.redirect('/players')
            },
            json: () => {
                res.status(200).json({message : 'sucess'})
            }
        })
    }).catch((err) => {
        console.log(err)
        return next(err)
    })
})  

// Affiche un joueur selon le joueur et l'ID 

router.get('/players/:id', (req, res, next) => {
    Joueur.findOnePlayers(req.params.id)
    .then((Joueur) => {
        res.format({
            html : () => {
                res.redirect('/players/'+ Joueur.id +'/edit')    
            },
            json : () => {
                res.json(Joueur)
            }
        })
    }).catch((err) => {
        return next(err)
    })
    
})

// Affiche tous les players
router.get('/players', (req, res, next) => {
    Joueur.getAllPlayers()
    .then((Joueur) => {  
        res.format({
            html: () => { // Prepare content
              let content = '<table class="table"><tr><th>ID</th><th>Name</th><th>Email</th><th>GameWin</th><th>GameLost</th><th>createdAt</th></tr>'
              
              Joueur.forEach((Joueur) => {
                content += '<tr>'
                content += '<td>' + Joueur['id'] + '</td>'
                content += '<td>' + Joueur['name'] + '</td>'
                content += '<td>' + Joueur['email'] + '</td>'
                content += '<td>' + Joueur['gamewin'] + '</td>'
                content += '<td>' + Joueur['gamelost'] + '</td>'
                content += '<td>' + Joueur['createdAt'] + '</td>'
                content += '<td> <form action="/players/'+Joueur['id']+'/?_method=GET", method="GET"> <button type="submit" class="btn btn-success"><i class="fa fa-pencil fa-lg mr-2"></i>Edit</button> </form> </td>'
                // content += '<td> <form action="/players/'+player['id']+'/?_method=GET", method="GET"> <button type="submit" class="btn btn-info"><i class="fa fa-eye fa-lg mr-2"></i>See</button> </form> </td>'
                content += '<td> <form action="/players/delete/'+Joueur['id']+'/?_method=POST", method="POST"> <button type="submit" class="btn btn-danger"><i class="fa fa-trash-o fa-lg mr-2"></i>Remove</button> </form> </td>'
                content += '</tr>'
              })
              
              content += '</table>'
      
              res.render("list_players", {
                  content: content
              })
            },
            json: () => {
                res.json(Joueur)
            }
          })
        }).catch((err) => {
        console.log('LE CATCH')
        return next(err)
    })
})

// Ajoute un joueur
router.post('/players', (req, res, next) => {
    Joueur.insertPlayers(req.body)
    .then((Joueur) => { 
        res.format({
            html : () => {
                res.redirect(301, '/players/' + Joueur.id)    
            },
            json : () => {
                res.status(201).json(Joueur)
            }
        })
    }).catch((err) => {
        return next(err)
    })
})

// Supprimer un player
router.post('/players/delete/:id', (req, res, next) => {
    Joueur.deletePlayers(req.params.id)
    .then((Joueur) => {
      res.format({
        html: () => {
            res.redirect('/players')
        },
        json: () => {
            res.status(204).json(Joueur)
        }
      })
    }).catch((err) => {
        console.log(err)
        return next(err)
    })
})

// Affiche le tableau pour création d'une partie
router.get('/games/new', (req, res, next) => {
    res.format({
        html : () => {
                res.render("tab_game", {
                formTitle: "Création d'une partie"
            })
        },
        json : () => {
            res.status(406).json('NOT_API_AVAILABLE')
        }
    })
})

router.get('/games/:id/edit', (req, res, next) => {
      Partie.findOneGames(req.params.id)
      .then((Partie) => {
        if (!Partie) {
          return next(new Error("404 NOT FOUND"))
        }
        res.render("tab_game_update", {
            title: "Update partie",
            formTitle: "Update partie n°" + req.params.id,
            Partie: Partie
        })
      }).catch((err) => {
        return next(err)
      })
})

// Mettre à jour les Parties
router.post('/games/:id', (req, res, next) => {

      let changesInformation = {}

      if (req.body.mode) {
        changesInformation.mode = req.body.mode
      }
      if (req.body.name) {
        changesInformation.name = req.body.name
      }
      if (req.body.currentPlayerId) {
        changesInformation.currentPlayerId = req.body.currentPlayerId
      } 

      changesInformation.id = req.body.id

    Partie.updateGames(changesInformation)
    .then((Partie) => {
        res.format({
            html: () => {
                res.redirect('/games')
            },
            json: () => {
                res.status(200).json({message : 'sucess'})
            }
        })
    }).catch((err) => {
        console.log(err)
        return next(err)
    })
})  

// Affiche un joueur selon le joueur et l'ID 
router.get('/games/:id', (req, res, next) => {
    Partie.findOneGames(req.params.id)
    .then((Partie) => {
        res.format({
            html : () => {
                res.redirect('/games/'+ Partie.id +'/edit')    
            },
            json : () => {
                res.json(Partie)
            }
        })
    }).catch((err) => {
        return next(err)
    })
    
})

// Afficher la liste des parties
router.get('/games', (req, res, next) => {
    Partie.getAllGames()
    .then((parties) => {  
        res.format({
            html: () => { // Prepare content
              let content = '<table class="table"><tr><th>ID</th><th>Mode</th><th>Name</th><th>currentPlayerId</th><th>createdAt</th></tr>'
              
              parties.forEach((partie) => {
                content += '<tr>'
                content += '<td>' + partie['id'] + '</td>'
                content += '<td>' + partie['mode'] + '</td>'
                content += '<td>' + partie['name'] + '</td>'
                content += '<td>' + partie['currentPlayerId'] + '</td>'
                content += '<td>' + partie['createdAt'] + '</td>'
                content += '<td> <form action="/games/'+partie['id']+'/?_method=GET", method="GET"> <button type="submit" class="btn btn-success"><i class="fa fa-pencil fa-lg mr-2"></i>Edit</button> </form> </td>'
                content += '<td> <form action="/players/?_method=GET", method="GET"> <button type="submit" class="btn btn-info"><i class="fa fa-eye fa-lg mr-2"></i>See</button> </form> </td>'
                content += '<td> <form action="/games/delete/'+partie['id']+'/?_method=DELETE", method="POST"> <button type="submit" class="btn btn-danger"><i class="fa fa-trash-o fa-lg mr-2"></i>Remove</button> </form> </td>'
                content += '</tr>'
              })
              
              content += '</table>'
      
              res.render("list_games", {
                  content: content
              })
            },
            json: () => {
                res.json(games)
            }
          })
        }).catch((err) => {
        console.log('LE CATCH')
        return next(err)
    })
})

// Ajoute une Partie
router.post('/games', (req, res, next) => {
    Partie.insertGames(req.body)
    .then((Partie) => { 
        res.format({
            html : () => {
                res.redirect(301, '/games' )    
            },
            json : () => {
                res.status(201).json(Partie)
            }
        })
    }).catch((err) => {
        return next(err)
    })
})

// Supprimer une partie
router.post('/games/delete/:id', (req, res, next) => {
    Partie.deleteGames(req.params.id)
    .then((Partie) => {
      res.format({
        html: () => {
            res.redirect('/games')
        },
        json: () => {
            res.status(204).json(Partie)
        }
      })
    }).catch((err) => {
        console.log(err)
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