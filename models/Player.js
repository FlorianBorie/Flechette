const db = require('sqlite')

module.exports = {
    getAllPlayers() {
        return db.all("SELECT rowid AS id, * FROM Player LIMIT 10")
    },

    findOnePlayers(id) {
        return db.get("SELECT rowid AS id, * FROM Player WHERE rowid = ?", id)
    },

    async insertPlayers(body) { 
        const { lastID } = await db.run("INSERT INTO Player (name, email, gamewin, gamelost, createdAt) VALUES(?, ?, ?, ?, date('now'))", [body.name, body.email, body.gamewin, body.gamelost])
    
        return this.findOnePlayers(lastID)   
    },
    
    deletePlayers(id) {
        return db.run("DELETE FROM Player WHERE rowid = ?", id)
    },
    async updatePlayers(body) {
      const { changesInformation } = await db.run("UPDATE Player SET name = ?, email = ?, gamewin = ?, gamelost = ? WHERE rowid = ?", [body.name, body.email, body.gamewin, body.gamelost, body.id])
      
      if (changesInformation !== 0) {
        return this.findOnePlayers(body.id)
      } else {
        return Promise.reject({ message: "Je ne trouve pas l'id que vous voulez mettre à jour" })
      }
    },
}