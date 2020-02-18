const db = require('sqlite')

module.exports = {
    getAllGames() {
        return db.all("SELECT rowid AS id, * FROM Game LIMIT 3")
    },

    findOneGames(id) {
        return db.get("SELECT rowid AS id, * FROM Game WHERE rowid = ?", id)
    },

    async insertGames(body) {
        
        const { lastID } = await db.run("INSERT INTO Game (mode, name, currentPlayerId, createdAt) VALUES(?, ?, ?, date('now'))", [body.mode, body.name, body.currentPlayerId])
    
        return this.findOneGames(lastID)   
    },
    
    deleteGames(id) {
        return db.run("DELETE FROM Game WHERE rowid = ?", id)
    },
    async updateGames(params) {
      let string = ''
  
      for (k in params) {
        if (k !== 'id') {
          string += k + ' = ?,'
        }
      }
  
      const { changes } = await db.run("UPDATE Game SET " + string + " updatedAt = date('now') WHERE rowid = ?", params)
      
      if (changes !== 0) {
        return this.findOneGames(params.id)
      } else {
        return Promise.reject({ message: "Je ne trouve pas l'id que vous voulez mettre à jour" })
      }
    },
}