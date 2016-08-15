const r = require('rethinkdb');

module.exports = () => {

  var connection = null;

  var dbconf = {
    host: 'localhost',
    port: 28015
  };

  var db = {
    name: 'rakede',
    tables: {
      blog: ['posts', 'categories'],
      cms: ['sites', 'menu'],
      events: ['participant', 'event', 'user']
    }
  };

  r.connect( dbconf, (err, conn) => {
      if (err) throw err;
      connection = conn;

      r.dbList().contains(db.name).do( (exists) => {
        if (!exists) r.dbCreate('rakede');
      }).run();

      

      for (category of tables) {

        for (table of category) {

          r.tableList().contains('rakede').do( (exists) => {
            if (!exists) r.dbCreate('rakede');
          }).run();

        }

      }
  });
}
