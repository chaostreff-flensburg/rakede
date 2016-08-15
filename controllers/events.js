var express = require('express');
var router = express.Router();
var blog = require('../models/events');

router.get('/', function(req, res) {
  blog.getAllPosts(function(result) {
    res.render('home', {
      posts: result
    });
  });
});



module.exports = router;
