var express = require('express');
var router = express.Router();
var blog = require('../models/blog');

router.get('/', function(req, res) {
  blog.getAllBlogs(function(result) {
    res.render('blog', {
      blogs: result
    });
  });
});

router.post('/createBlogEntry', function(req, res) {
  blog.createBlogEntry("Thorben der Frameworkterrorist", "Feather.js oder warum wir unsere Zeit öfters mal verschwenden sollten!", function() {
    res.render('home', {
      title: "Blogeintrag angelegt!"
    });
  });
});

module.exports = router;
