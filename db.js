const db = require('sqlite')
const donnee = require('express').Router()

db.open('api.db').then(() => {
    Promise.all([
      db.run("CREATE TABLE IF NOT EXISTS Player (id int PRIMARY KEY, name varchar(255), email varchar(255), gamewin int, gamelost int, createdAt Datetime)"),
      db.run("CREATE TABLE IF NOT EXISTS Game (id int PRIMARY KEY, mode varchar(255), name varchar(255), currentPlayerId int, createdAt Datetime)"),
      db.run("CREATE TABLE IF NOT EXISTS GamePlayer (id int PRIMARY KEY, playerId int, gameId int, remainingShots int, score int, rank int, ordre int, inGame bool, createdAt Datetime)"),
      db.run("CREATE TABLE IF NOT EXISTS GameShot (id int PRIMARY KEY, gameId int, playerId int, multiplicator int, sector int, createdAt Datetime)"),
    ]).then(() => {
      console.log('Databases are ready')
    }).catch((err) => {
      console.log('Une erreur est survenue :', err)
    })
})

module.exports = donnee