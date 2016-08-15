var r = require('rethinkdb');

var connection = null;
r.connect( {host: 'localhost', port: 28015, db: 'rakede'}, function(err, conn) {
    if (err) throw err;
    connection = conn;
});

/*      DEFINITION event

{
      name: string,
      creator: uuid,
      description: string,
      time: date,
      maxParticipants: int,
      participants: []
  }
}

*/

/*      DEFINITION participant

{
  name: string,
  email:  string,
  email_sent: boolean,
  verified: boolean,
  signup: date
}

*/

/*----------------crud controller for events----------*/

/*----------------crud controller for signups----------*/
