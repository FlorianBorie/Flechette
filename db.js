const db = require('sqlite')
const donnee = require('express').Router()

db.open('api.db').then(() => {
    Promise.all([      
      db.run("CREATE TABLE IF NOT EXISTS Player (id INTEGER PRIMARY KEY AUTOINCREMENT, name varchar(255), email varchar(255), gamewin int, gamelost int, createdAt Datetime)"),
      db.run("CREATE TABLE IF NOT EXISTS Game (id INTEGER PRIMARY KEY AUTOINCREMENT, mode varchar(255) NOT NULL, name varchar(255) NOT NULL, currentPlayerId int, status varchar(255) DEFAULT 'draft',createdAt Datetime)"),
      db.run("CREATE TABLE IF NOT EXISTS GamePlayer (id INTEGER NOT NULL, playerId INTEGER NOT NULL, gameId INTEGER NOT NULL, remainingShots int, score int, rank int, ordre int, inGame bool, createdAt Datetime, PRIMARY KEY([id],[playerId],[gameId]))"),
      db.run("CREATE TABLE IF NOT EXISTS GameShot (id INTEGER PRIMARY KEY AUTOINCREMENT, gameId int, playerId int, multiplicator int, sector int, createdAt Datetime)"),
    ]).then(() => {
      console.log('Databases are ready')
    }).catch((err) => {
      console.log('Une erreur est survenue :', err)
    })
})

module.exports = donnee