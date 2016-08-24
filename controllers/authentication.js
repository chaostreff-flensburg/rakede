var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/',
  passport.authorize('slack'));

router.get('/callback',
  passport.authorize('slack', { failureRedirect: '/wululu' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/rakede');
  });

module.exports = router;
