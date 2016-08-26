var express = require('express');
var router = express.Router();
var moment = require("moment");
var multer = require("multer");
var path = require("path");
var crypto = require("crypto");
// require all modells
var blog = require('../models/blog');
var events = require('../models/events');
var cms = require('../models/cms');
var checkSession = require("../middlewares/checkSession.js");

router.get('/', checkSession, function(req, res) {
    res.render('backend/dashboard', {
        title: "möp!"
    });
});


// Blogpost
router.get('/newPost', checkSession, function(req, res, next) {
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
router.post('/newPost', checkSession, function(req, res, next) {
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
router.post('/updatePost', checkSession, function(req, res, next) {
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
router.post('/deletePost', checkSession, function(req, res, next) {
    blog.deletePost(req.body.postID, function() {
        res.render('home', {
            title: "Blogeintrag gelöscht!"
        });
    });
});

// Events
router.get('/newEvent', checkSession, function(req, res) {
    res.render('backend/newEvent', {
        title: "möp!"
    });
});

router.post('/newEvent', checkSession, function(req, res, next) {

    var timestamp = moment(req.body.hour + "-" + req.body.minute + "-" + req.body.day + "-" + req.body.month + "-" + req.body.year, "HH-mm-DD-MM-YYYY").unix();

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


// CMS
router.get('/newSite', checkSession, function(req, res, next) {
  res.render('backend/newSite', {
    title: "möp!"
  });
});

router.post('/newSite', checkSession, function(req, res, next) {
  cms.createSite(req.body.title, req.body.content, function() {
    res.render('backend/newSite', {
        title: "Submitted!"
    });
  });
});


// File Upload
var storage = multer.diskStorage({
  destination: __dirname + '/../public/upload/',
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) return cb(err)

      cb(null, raw.toString('hex') + path.extname(file.originalname))
    })
  }
})

var upload = multer({ storage: storage })

router.post('/upload', upload.single('file'), function(req, res) {
  console.log("File uploaded:");
  console.log(req.file);

  var fileUrl = "/upload/" + req.file.filename;
  res.json({ location: fileUrl });
})

module.exports = router;
