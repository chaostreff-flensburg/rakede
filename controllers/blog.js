var express = require('express');
var router = express.Router();
var blog = require('../models/blog');
var cms = require('../models/cms');
var chron = require('async');

/* Route: / (fetch all blog posts)
Request:

Response:
200: {blogposts},
404: no posts/ fetching posts failed
*/
router.get('/', function(req, res) {
  var data = {};

chron.waterfall([
  (callback) => {
    cms.getMenu((menu) => {
      data.menu = menu;
      callback(null, data);
    });
  },
  (data, callback) => {
    blog.getAllPosts((posts) => {
      data.posts = posts;
      callback(null, data);
    });
  }
], (err, result) => {
  if (err) res.sendStatus(500);
    res.render('blog', {
      data: data
    });
  });
});

/* Route: /(slug)
Request:
  slug: slug-string
Response:
200: {blogpost},
404: no post/ fetching post failed
*/
router.get('/:slug', function(req, res) {
var data = {layout: "main"};

chron.waterfall([
  (callback) => {
    cms.getMenu((menu) => {
      data.menu = menu;
      callback(null, data);
    });
  },
  (data, callback) => {
    blog.getPost(req.params.slug, (post) => {
      data.post = post[0];
      callback(null, data);
    });
  }
], (err, result) => {
  if (err) res.sendStatus(500);
    res.render('blogpost', data);
  });
});

module.exports = router;
