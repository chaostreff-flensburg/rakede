var r = require('rethinkdb');

var connection = null;

// database connection is still open

r.connect( {host: 'localhost', port: 28015, db: 'rakede'}, function(err, conn) {
    if (err) throw err;
    connection = conn;
});

/*  DEFINITION User

{
  id:  uuid,
  name : string,
  time: date
}

*/
/*  TABLES

'user_user' =  All editors

*/

/*----------------crud controller for blog entries----------*/

exports.createUser = function(id, name, callback) {
  //create user object
  var user = {
    id:   id,
    name: name,
    time: r.now()
  };
  //insert user in db or update him if he already exists
    r.table('rakede_users').insert(user, {conflict: "replace"}).run(connection, function(err, result) {
      if (err) throw err;
      console.log(JSON.stringify(result, null, 2));
      callback(err, result);
  });
};

//get specific blog post via slug
exports.getUser = function(id, callback) {
    r.table('rakede_users').get(id).merge({time:r.row('time').toEpochTime()}).run(connection, function(err, result) {
    if (err) throw err;
    callback(err, result);
  });
};
