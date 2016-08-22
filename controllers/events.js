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
    events.getEvents(req.body.event, function(event) {
        //if event has not been found, send 404
        if (!event) res.end(404);
        //check if user has already signed up before
        event.participants.forEach(function(participant) {
            if (participant.email == req.body.email) {
                userFound = true;
            }
        });
        //if user has not signed up before, start signup process, else return 404
        if (!userFound) {
            //add user to event
            events.addParticipantToEvent(req.body.event, req.body.name, req.body.email, false, function(uuid) {
                //send verification mail
                var transporter = nodemailer.createTransport({
                    // if you do not provide the reverse resolved hostname
                    // then the recipients server might reject the connection
                    name: 'google.de',
                    // use direct sending
                    direct: true
                });
                //verififizierungs-link
                var verifyLink = "192.168.0.52:3002/verifySignup?userid=" + uuid + "&eventid=" + event.id;
                //bestätigung eventteilnahme
                var mailOptions = {
                    from: '"Chaostreff Flensburg" <events@chaostreff-flensburg.de>', // sender address
                    to: participant.email, // list of receivers
                    subject: 'Teilnahme an ' + event.name, // Subject line
                    text: 'Hallo ' + participant.name + '!', // plaintext body
                    html: '<b>Hallo ' + participant.name + '! Um deine Teilnahme am Event ' + event.name + ' zu bestätigen, klicke auf diesen <a href=' + verifyLink + '>Link:</a>.</b>' // html body
                };

                // send mail with defined transport object
                transporter.sendMail(mailOptions, function(error, info) {
                    if (error) {
                        console.log(error);
                        var mail_sent = true;
                    }
                    else {
                      mail_sent = true;
                    }

                });
            });
            //save new participant
        } else {
            //user signed up beforehand
            res.end(404);
        }
    });
});

module.exports = router;
