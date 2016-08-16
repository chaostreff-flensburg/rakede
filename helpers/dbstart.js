const r = require('rethinkdb');
const chron = require('async');

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

      chron.forEachOf(db.tables, (tables, category, callback) => {

        chron.forEachOf(tables, (table, index, callback) => {

          r.db(db.name).tableList().contains(category + db.delimiter + table).do(exists => {

            return r.branch(exists,true,r.tableCreate(category + db.delimiter + table));

          }).run(connection, () => {
              callback();
          });

        }, function(err) {
          if (err) {
            console.log('Database setup failed!');
          } else {
            callback();
          }
        });

      }, function(err) {
        if (err) {
          console.log('Database setup failed!');
        } else {
          console.log('Database ready!');
          connection.close();
        }
      });
    });
  });
}
