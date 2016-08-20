var express = require('express');
var router = express.Router();
// require all modells
var blog = require('../models/blog');
var events = require('../models/events');

router.get('/', function(req, res) {
  res.render('backend/dashboard', {
    title: "möp!"
  });
});

router.get('/newPost', function(req, res) {
  res.render('backend/newBlogPost', {
    title: "möp!"
  });
});

router.post('/newPost', function(req, res) {
  var post = {
    
  };

  res.render('backend/newBlogPost', {
    title: "Submitted!"
  });
});

module.exports = router;
