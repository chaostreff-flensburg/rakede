var express = require('express');
var router = express.Router();
var blog = require('../models/blog');

/* Route: / (fetch all blog posts)
Request:

Response:
200: {blogposts},
404: no posts/ fetching posts failed
*/
router.get('/', function(req, res) {
  blog.getAllPosts(function(result) {
    res.render('blog', {
      posts: result
    });
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
router.post('/createBlogPost', function(req, res) {
  blog.createPost(req.body.author, req.body.content, req.body.title, req.body.category, function() {
    res.render('home', {
      title: "Blogeintrag angelegt!"
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
router.post('/updateBlogPost', function(req, res) {
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
router.post('/deleteBlogPost', function(req, res) {
  blog.deletePost(req.body.postID, function() {
    res.render('home', {
      title: "Blogeintrag gelöscht!"
    });
  });
});

module.exports = router;
