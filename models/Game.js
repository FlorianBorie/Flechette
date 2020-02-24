const db = require('sqlite')

module.exports = {
    getAllGames(params) {
      req_sql = "SELECT rowid AS id, * FROM Game"
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

    findOneGames(id) {
        return db.get("SELECT rowid AS id, * FROM Game WHERE rowid = ?", id)
    },

    async insertGames(body) {
        
        const { lastID } = await db.run("INSERT INTO Game (mode, name, status, createdAt) VALUES(?, ?, 'draft', date('now'))", [body.mode, body.name])
    
        return this.findOneGames(lastID)   
    },
    
    deleteGames(id) {
        return db.run("DELETE FROM Game WHERE rowid = ?", id)
    },
    async updateGames(body) {
      const { changesInformation } = await db.run("UPDATE Game SET mode = ?, name = ? WHERE rowid = ?", [body.mode, body.name, body.id])
      
      if (changesInformation !== 0) {
        return this.findOneGames(body.id)
      } else {
        return Promise.reject({ message: "Je ne trouve pas l'id que vous voulez mettre à jour" })
      }
    },
}