const db = require('sqlite')

module.exports = {
    getAllGames() {
        return db.all("SELECT rowid AS id, * FROM Game")
    },

    findOneGames(id) {
        return db.get("SELECT rowid AS id, * FROM Game WHERE rowid = ?", id)
    },

    async insertGames(body) {
        // db.run("INSERT INTO Player (name, email, gamewin, gamelost, createdAt) VALUES(?, ?, ?, ?, ?)", 
        //     [body.name, body.email, body.gamewin, body.gamelost, Date.now()],
        //     console.log('toto')
        //     .then((body) => {
        //         Console.log(body)
        //         db.get("SELECT last_insert_rowid() as id", function (err, row) {
        //             console.log('Last inserted id is: ' + row['id']);
        //             return this.insertPlayers(body)
        //         })
        //     }).catch((err) => {
        //         console.log(err)
        //     })     
        // )   
        const { lastID } = await db.run("INSERT INTO users VALUES(?, ?, ?, ?, ?, date('now'), date('now'))", body)
    
        return this.findOneUser(lastID)   
    },
    
    deletePlayers(id) {
        return db.run("DELETE FROM Player WHERE rowid = ?", id)
    },
    async updatePlayers(params) {
      let string = ''
  
      for (k in params) {
        if (k !== 'id') {
          string += k + ' = ?,'
        }
      }
  
      const { changes } = await db.run("UPDATE Player SET " + string + " updatedAt = date('now') WHERE rowid = ?", params)
      
      if (changes !== 0) {
        return this.findOnePlayers(params.id)
      } else {
        return Promise.reject({ message: "Je ne trouve pas l'id que vous voulez mettre à jour" })
      }
    },
}