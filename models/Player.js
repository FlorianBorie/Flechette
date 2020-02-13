const db = require('sqlite')

module.exports = {
    getAllPlayers() {
        return db.all("SELECT rowid AS id, * FROM Player")
    },

    findOnePlayers(id) {
        return db.get("SELECT rowid AS id, * FROM Player WHERE rowid = ?", id)
    },

    async insertPlayers(body) {
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
        const { lastID } = await db.run("INSERT INTO Player (name, email, gamewin, gamelost, createdAt) VALUES(?, ?, ?, ?, date('now'))", [body.name, body.email, body.gamewin, body.gamelost])
    
        return this.findOneUser(lastID)   
    },
    
    deletePlayers(id) {
        return db.run("DELETE FROM Player WHERE rowid = ?", id)
    },
    async updatePlayers(body) {
        console.log(body)
      const { changesInformation } = await db.run("UPDATE Player SET name = ?, email = ?, gamewin = ?, gamelost = ? WHERE rowid = ?", body)
      
      if (changesInformation !== 0) {
        return this.findOnePlayers(req.params.id)
      } else {
        return Promise.reject({ message: "Je ne trouve pas l'id que vous voulez mettre à jour" })
      }
    },
}