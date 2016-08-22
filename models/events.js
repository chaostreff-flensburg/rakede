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
  id:   uuid (to be added manually!),
  name: string,
  email:  string,
  email_sent: boolean,
  verified: boolean,
  signup: date
}

*/

/*  TABLES

'events_events'

*/

/*----------------crud interface for events----------*/

exports.createEvent = function(name, creator, description, time, maxParticipants, callback) {
  //hange time to reql date
  time = r.epochTime(time*1000);

  //create event object
  var eventObject = {
        name: name,
        creator: creator,
        description: description,
        time: time,
        maxParticipants: maxParticipants,
        participants: []
    };

  //insert event object into db
    r.table('events_events').insert(eventObject).run(connection, function(err, result) {
      if (err) throw err;
      console.log(JSON.stringify(result, null, 2));
      callback();
  });
};

exports.updateEvent = function(uuid, title, creator, description, time, maxParticipants, callback) {
  //hange time to reql date
  time = r.epochTime(time*1000);

  r.table('events_events').get(uuid).update({
        name: name,
        creator: creator,
        description: description,
        time: time,
        maxParticipants: maxParticipants
    }).run(connection, function(err, result) {
      if (err) throw err;
      console.log(JSON.stringify(result, null, 2));
      callback();
    });
};

exports.getEvent = function(uuid, callback) {
  r.table('events_events').get(uuid).run(connection, function(err, result) {
    if (err) throw err;
    //convert time to unixEpoch
    result.timestamp = result.toEpochTime(e.timestamp) / 1000;
    console.log(JSON.stringify(result, null, 2));
    callback(result);
  });
};

exports.getAllEvents = function(callback) {
  r.table('events_events').run(connection, function(err, cursor) {
    if (err) throw err;
    cursor.toArray(function(err, result) {
        if (err) throw err;
        //convert time to unixEpoch
        result.forEach((e, i, a) => {
          e.timestamp = r.toEpochTime(e.timestamp) / 1000;
        });
        console.log(JSON.stringify(result, null, 2));
        callback(result);
    });
  });
};

exports.deleteEvent = function(uuid, callback) {
  r.table('events_events').get(uuid).delete().run(connection, function(err, result) {
    if (err) throw err;
    console.log(JSON.stringify(result, null, 2));
    callback();
  });
};

/*-------------crud interface for participants------------------*/

exports.getParticipantsOfEvent = function(uuid, callback) {
  r.table('events_events').get(uuid).run(connection, function(err, result) {
    if (err) throw err;
    console.log(JSON.stringify(result, null, 2));
    callback(result.participants);
  });
};

//add a new participant with name and email, also flag if email for verification has been sent
exports.addParticipantToEvent = function(uuid, name, email, email_sent) {
  //create participant object
  var participant = {
      id: r.uuid(),
      name: name,
      email:  email,
      signup: r.now(),
      email_sent: email_sent,
      verified: false
  };

  r.table('events_events').get(uuid)('participants').append(participant).run(connection, function(err, result) {
    if (err) throw err;
    console.log(JSON.stringify(result, null, 2));
    callback();
  });
};
