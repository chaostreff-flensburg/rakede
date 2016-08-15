var express = require('express');
var router = express.Router();
var blog = require('../models/blog');

router.get('/', function(req, res) {
  blog.getAllPosts(function(result) {
    res.render('blog', {
      posts: result
    });
  });
});

router.post('/createBlogPost', function(req, res) {
  blog.createBlogPost(req.body.author, req.body.content, req.body.title, req.body.category, function() {
    res.render('home', {
      title: "Blogeintrag angelegt!"
    });
  });
});

module.exports = router;
