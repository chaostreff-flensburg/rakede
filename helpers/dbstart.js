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
      events: ['events']
    },
    delimiter: '_'
  };

  var check = 0;

  for (category in db.tables) {
    for (table in db.tables[category]) {
      ++check;
    }
  }

  r.connect( dbconf, (err, conn) => {
    if (err) console.log('ERR: No database connection!');

    connection = conn;

    r.dbList().contains(db.name).do(exists => {

      return r.branch(exists,true,r.dbCreate(db.name));

    }).run(connection, () => {

      connection.use(db.name);

      var timeout = false;

      for (category in db.tables) {

        for (table in db.tables[category]) {

          r.db(db.name).tableList().contains(category + db.delimiter + db.tables[category][table]).do(exists => {

            return r.branch(exists,true,r.tableCreate(category + db.delimiter + db.tables[category][table]));

          }).run(connection);

        }
      }

    });
  });
}
