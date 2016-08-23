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

/* Route: /(slug)
Request:
  slug: slug-string
Response:
200: {blogpost},
404: no post/ fetching post failed
*/
router.get('/:slug', function(req, res) {
  blog.getPost(req.params.slug, function(result) {
    res.render('blogpost', {
      post: result[0]
    });
  });
});

module.exports = router;
