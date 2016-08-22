var express = require('express');
var router = express.Router();
var moment = require("moment");
// require all modells
var blog = require('../models/blog');
var events = require('../models/events');

router.get('/', function(req, res) {
  res.render('backend/dashboard', {
    title: "möp!"
  });
});


// Blogpost
router.get('/newPost', function(req, res) {
  res.render('backend/newBlogPost', {
    title: "möp!"
  });
});

router.post('/newPost', function(req, res) {
  var post = {
    author: "dev",
    title: req.body.title,
    content: req.body.content
  };

  blog.createPost(post.author, post.content, post.title);

  res.render('backend/newBlogPost', {
    title: "Submitted!"
  });
});


// Events
router.get('/newEvent', function(req, res) {
  res.render('backend/newEvent', {
    title: "möp!"
  });
});

router.post('/newEvent', function(req, res) {

  var timestamp = moment(req.body.hour+"-"+req.body.minute+"-"+req.body.day+"-"+req.body.month+"-"+req.body.year, "HH-mm-DD-MM-YYYY").unix();

  var postedEvent = {
    author: "dev",
    title: req.body.title,
    content: req.body.content,
    date: timestamp,
    maxParticipants: req.body.maxParticipants
  };

  events.createEvent(postedEvent.title, postedEvent.author, postedEvent.content, postedEvent.date, postedEvent.maxParticipants, function() {
    res.render('backend/newEvent', {
      title: "Submitted!"
    });
  });

});


module.exports = router;
