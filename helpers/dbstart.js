const r = require('rethinkdb');
const chron = require('async');
const path = require('path');

var dbconfig = require(path.resolve('./config/dbconfig.json'));
var dbstructure = require(path.resolve('./config/dbstructure.json'));

module.exports = () => {

  var connection = null;

  r.connect( dbconfig, (err, conn) => {
    if (err) console.log('ERR: No database connection!');

    connection = conn;

    r.dbList().contains(dbstructure.name).do(exists => {

      return r.branch(exists,true,r.dbCreate(dbstructure.name));

    }).run(connection, () => {

      connection.use(dbstructure.name);

      chron.forEachOf(dbstructure.tables, (tables, category, callback) => {

        chron.forEachOf(tables, (table, index, callback) => {

          r.db(dbstructure.name).tableList().contains(category + dbstructure.delimiter + table).do(exists => {

            return r.branch(exists,true,r.tableCreate(category + dbstructure.delimiter + table));

          }).run(connection, () => {
              callback();
          });

        }, function(err) {
          if (err) {
            console.log('ERR: Database setup failed!');
          } else {
            callback();
          }
        });

      }, function(err) {
        if (err) {
          console.log('ERR: Database setup failed!');
        } else {
          console.log('Database ready!');
          connection.close();
        }
      });
    });
  });
}
