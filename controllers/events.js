var express = require('express');
var router = express.Router();
var events = require('../models/events');
var nodemailer = require('nodemailer');

/* Route: / (fetch all events)
Request:

Response:
200: {events},
404: no posts/ fetching events failed
*/
router.get('/', function(req, res) {
  events.getAllEvents(function(result) {
    res.render('home', {
      posts: result
    });
  });
});

/* Route: / (fetch all events)
Request:

Response:
200: {events},
404: no posts/ fetching events failed
*/
router.get('/createEvent', function(req, res) {
  events.getAllEvents(function(result) {
    res.render('home', {
      posts: result
    });
  });
});

/* Route: /signup
Request:
email: string,
name: string,
event: uuid

Response:
200: signed up,
404: signup failed
*/
router.post('/signup', function(req, res) {
  //check if user is already participating
  var userFound = false;
  //get event
  events.getEvents(req.body.uuid, function(event) {
    //if event has not been found, send 404
    if(!event) res.end(404);
    //check if user has already signed up before
      event.participants.forEach(function(participant) {
        if(participant.email == req.body.email) {
          userFound = true;
        }
      });
      //if user has not signed up before, start signup process, else return 404
      if(!userFound) {
        //send verification mail

        //save new participant
      } else {
        //user signed up beforehand

        if(!event) res.end(404);
      }
    });
});

module.exports = router;
