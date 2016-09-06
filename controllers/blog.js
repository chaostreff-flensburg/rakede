var express = require('express');
var router = express.Router();
var blog = require('../models/blog');
var cms = require('../models/cms');
var chron = require('async');

// Function to shorten long paragraphs
// http://stackoverflow.com/a/1199420/6217283
String.prototype.trunc =
     function( n, useWordBoundary ){
         var isTooLong = this.length > n,
             s_ = isTooLong ? this.substr(0,n-1) : this;
         s_ = (useWordBoundary && isTooLong) ? s_.substr(0,s_.lastIndexOf(' ')) : s_;
         return  isTooLong ? s_ + '&hellip;' : s_;
      };
      
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
      //truncate posts
      data.posts.forEach((e, i, a) => {
        if(typeof e !== 'undefined') {
          e.content = e.content.trunc(500, true);
        }
      });
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
var data = {};

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
  console.log(data);
    res.render('blogpost', data);
  });
});

module.exports = router;
