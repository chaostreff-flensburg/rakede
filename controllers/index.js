var express = require('express');
var router = express.Router();
var passport = require('passport');

router.use("/blog", require("./blog"));
router.use("/events", require("./events"));

router.get('/', function(req, res) {
  res.render('home', {
    title: "Hello World! Me no know git."
  });
});

router.get('/login',
  passport.authorize('slack'));

  router.get('/login/callback',
    passport.authorize('slack', { failureRedirect: '/login' }),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect('/');
});

module.exports = router;
