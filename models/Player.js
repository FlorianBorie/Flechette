const db = require('sqlite')

module.exports = {
    getAllPlayers(params) {
      req_sql = "SELECT rowid AS id, * FROM Player"
      if (typeof params.limit !== 'undefined' && params.limit > 20) {
        console.log('vous devez mettre une limite inférieure ou égale à 20')       
      }
        else if( typeof params.limit !== 'undefined' ) {
          // the variable is defined
          var_limit = ' LIMIT ' + params.limit
        }
              else{
                var_limit = ' LIMIT ' + 10
              }
          
      if (typeof params.page !== 'undefined') {
        // the variable is defined
        max = 10 * params.page
        min = max - 9
        var_page = ' WHERE id BETWEEN ' + "'"+ min + "'" + ' AND ' + "'"+ max + "'"
      }
        else {
          var_page = ''
        }

      if (typeof params.sort !== 'undefined') {
        // the variable is defined
        var_sort = ' ORDER BY ' + params.sort
          if (typeof params.reverse !== 'undefined') {
              var_sort = var_sort + ' DESC'
          }
      }
        else {
          var_sort = ''
        }

      req_sql = req_sql + var_page + var_sort + var_limit

      return db.all(req_sql)
  },

    findOnePlayers(id) {
        return db.get("SELECT rowid AS id, * FROM Player WHERE rowid = ?", id)
    },

    async insertPlayers(body) { 
        const { lastID } = await db.run("INSERT INTO Player (name, email, gamewin, gamelost, createdAt) VALUES(?, ?, ?, ?, date('now'))", [body.name, body.email, body.gamewin, body.gamelost])
    
        return this.findOnePlayers(lastID)   
    },
    
    deletePlayers(id) {
      if(findOnePlayers = null){
        return 410
      }
        else{
          return db.run("DELETE FROM Player WHERE rowid = ?", id)
        }
        
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