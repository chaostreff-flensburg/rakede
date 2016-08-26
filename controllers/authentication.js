var express = require('express');
var router = express.Router();
var passport        = require('passport'),
tokens = require('../config/tokens.json');
//passport configuration

router.use(passport.initialize());
router.use(passport.session());

var SlackStrategy = require('passport-slack-ponycode').SlackStrategy;
passport.use( 'slack', new SlackStrategy({
    clientID: tokens.clientID,
    clientSecret: tokens.clientSecret,
    callbackURL: tokens.callbackURL
}, function( token, tokenSecret, profile, cb ){
return cb(null, profile);
}));


passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

router.get('/',
  passport.authenticate('slack'));

router.get('/callback',
  passport.authenticate('slack', {failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/rakede');
  });

module.exports = router;
