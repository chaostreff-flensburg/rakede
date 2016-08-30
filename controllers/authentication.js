var express = require('express');
var router = express.Router();
var passport = require('passport');
var users = require('../models/user.js');


router.get('/',
  passport.authenticate('slack', {failureRedirect: '/' }));

  router.get('/logout', function(req, res) {
    //destroy session
    req.session.destroy();
    //send user to main page
    res.redirect('/');
  });

//callback route for token negotiation (has to be defined in passport config and slack app!)
router.get('/callback',
  passport.authenticate('slack', {failureRedirect: '/' }),
  function(req, res) {
    // only allow users from specified slack-team
    if (req.user.teamId != 'T03JL4VF6') {
      req.session.destroy();
      res.redirect('/');
    }
    else {
      // Successful authentication
      //set session cookie
      req.session.name = req.user.id;
      //create user if he does not exist yet
      users.createUser(req.user.id, req.user.username, function(err, res) {
      });
      //redirect to backend.
      res.redirect('/rakede');
    }

  });

module.exports = router;
