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
  blog.createPost(req.body.author, req.body.content, req.body.title, req.body.category, function() {
    res.render('home', {
      title: "Blogeintrag angelegt!"
    });
  });
});

router.post('/updateBlogPost', function(req, res) {
  blog.updatePost(req.body.postID, req.body.content, req.body.title, req.body.category, function() {
    res.render('home', {
      title: "Blogeintrag aktualisiert!"
    });
  });
});

module.exports = router;
