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

/* Route: Create Blog Post
Request:
author: uuid,
content: string,
title: string,
category: int (id)

Response:
200: blogpost created,
404: creating failed
*/
router.post('/newPost', function(req, res) {
  blog.createPost(req.body.author, req.body.content, req.body.title, req.body.category, function() {
    res.render('backend/newBlogPost', {
      title: "Submitted!"
    });
  });
});

/* Route: Update Blog Post
Request:
postID: int,
content: string,
title: string,
category: int (id)

Response:
200: blogpost updated,
404: updating failed
*/
router.post('/updatePost', function(req, res) {
  blog.updatePost(req.body.postID, req.body.content, req.body.title, req.body.category, function() {
    res.render('home', {
      title: "Blogeintrag aktualisiert!"
    });
  });
});

/* Route: Delete Blog Post
Request:
postID: uuid

Response:
200: blogpost deleted,
404: deleting failed
*/
router.post('/deletePost', function(req, res) {
  blog.deletePost(req.body.postID, function() {
    res.render('home', {
      title: "Blogeintrag gelöscht!"
    });
  });
});


module.exports = router;
