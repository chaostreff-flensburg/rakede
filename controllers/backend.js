var express = require('express');
var router = express.Router();
var moment = require("moment");
var multer = require("multer");
var path = require("path");
var crypto = require("crypto");
var chron = require('async');
var slug = require('slug');
// require all modells
var blog = require('../models/blog');
var events = require('../models/events');
var cms = require('../models/cms');
var checkSession = require("../middlewares/checkSession.js");

router.get('/', checkSession, function(req, res) {
  var data = {layout: "../backend/backend"};

  chron.waterfall([
    (callback) => {
      blog.getAllPosts((posts) => {
        data.posts = posts;
        callback(null, data);
      });
    },
    (data, callback) => {
      events.getAllEvents((events) => {
        data.events = events;
        callback(null, data);
      });
    },
    (data, callback) => {
      cms.getAllSites((sites) => {
        data.sites = sites;
        callback(null, data);
      });
    }
  ], (err, result) => {
    if (err) res.sendStatus(500);
  res.render('backend/dashboard', data);
  });
});


/*------------------- BLOG  ---------------------------*/

router.get('/newPost', checkSession, function(req, res, next) {
    res.render('backend/newBlogPost', {
        author: req.session.userName
    });
});

router.get('/updatePost/:id', checkSession, function(req, res, next) {
  blog.getPostByID(req.params.id, (post) => {
      res.render('backend/newBlogPost', {post: post});
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
  var data = {layout: false};

  chron.waterfall([
    (callback) => {
      blog.createPost(req.body.author, req.body.content, req.body.title, req.body.category, (result) => {
        data.key = result.generated_keys[0];
        callback(null, data);
      });
    },
    (data, callback) => {
      cms.getMenu((menu) => {
        //create new menu entry
        var newMenuPoint = {
          id: data.key,
          title: req.body.title,
          url: "/blog/"+slug(req.body.title)
        };

        //add new entry to y at blog
        menu.x.forEach((e, i, a) => {
          if(e.title == "Blog") {
            e.y.push(newMenuPoint);
          }
        });
        data.menu = menu;
        callback(null, data);
      });
    },
    (data, callback) => {
      //update menu
      cms.updateMenu(data.menu, () => {
        callback(null, data);
      });
    }
  ], (err, result) => {
    if (err) res.sendStatus(500);
        res.redirect("/rakede");
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
  var data = {layout: false};

  chron.waterfall([
    (callback) => {
      blog.updatePost(req.body.postID, req.body.content, req.body.title, req.body.category, function() {
        callback(null, data);
      });
    },
    (data, callback) => {
      cms.getMenu((menu) => {

        //update menu entry
        menu.x.forEach((e, i, a) => {
          if(e.title == "Blog") {
            e.y.forEach((ele, ind, arr) => {
              if(ele.id == req.body.postID) {
                ele.title = req.body.title;
                ele.url = "/blog/"+slug(req.body.title);
              }
            });
          }
        });
        data.menu = menu;
        callback(null, data);
      });
    },
    (data, callback) => {
      //update menu
      cms.updateMenu(data.menu, () => {
        callback(null, data);
      });
    }
  ], (err, result) => {
    if (err) res.sendStatus(500);
        res.redirect("/rakede");
    });
});

/* Route: Delete Blog Post
Request:
postID: uuid

Response:
200: blogpost deleted,
404: deleting failed
*/
router.get('/deletePost/:id', checkSession, function(req, res, next) {
  var data = {layout: false};

  chron.waterfall([
    (callback) => {
    blog.deletePost(req.params.id, function() {
        callback(null, data);
      });
    },
    (data, callback) => {
      cms.getMenu((menu) => {
        //delete menu entry
        menu.x.forEach((e, i, a) => {
          if(e.title == "Blog") {
            e.y.forEach((ele, ind, arr) => {
              if(ele.id == req.params.id) {
                arr.splice(ind, 1);
              }
            });
          }
        });
        data.menu = menu;
        callback(null, data);
      });
    },
    (data, callback) => {
      //update menu
      cms.updateMenu(data.menu, () => {
        callback(null, data);
      });
    }
  ], (err, result) => {
        if (err) res.sendStatus(500);
        res.redirect('/rakede');
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
        res.redirect('/rakede');
    });
});


/*----------------  CMS ----------------------------------*/

router.get('/newSite', checkSession, function(req, res, next) {
  res.render('backend/newSite', {
    author: req.session.userName
  });
});

router.post('/newSite', checkSession, function(req, res, next) {
  var data = {layout: false};

  chron.waterfall([
    (callback) => {
    cms.createSite(req.body.title, req.body.content, function(result) {
        data.key = result.generated_keys[0];
        callback(null, data);
      });
    },
    (data, callback) => {
      cms.getMenu((menu) => {
        //create new menu entry
        var newMenuPoint = {
          id: data.key,
          title: req.body.title,
          url: "/site/"+slug(req.body.title)
        };

        //add new entry to y at sites
        menu.x.forEach((e, i, a) => {
          if(e.title == "Seiten") {
            e.y.push(newMenuPoint);
          }
        });
        data.menu = menu;
        callback(null, data);
      });
    },
    (data, callback) => {
      //update menu
      cms.updateMenu(data.menu, () => {
        callback(null, data);
      });
    }
  ], (err, result) => {
    if (err) res.sendStatus(500);
    res.redirect("/rakede");
  });
});

router.get('/updateSite/:id', checkSession, function(req, res, next) {
  cms.getSiteByID(req.params.id, (site) => {
    console.log(site);
    res.render('backend/newSite', {
      site: site
    });
  });
});

router.post('/updateSite', checkSession, function(req, res, next) {
  var data = {layout: false};

  chron.waterfall([
    (callback) => {
    cms.updateSite(req.body.siteID, req.body.title, req.body.content, function() {
        callback(null, data);
      });
    },
    (data, callback) => {
      cms.getMenu((menu) => {

        //update menu entry
        menu.x.forEach((e, i, a) => {
          if(e.title == "Seiten") {
            e.y.forEach((ele, ind, arr) => {
              if(ele.id == req.body.siteID) {
                ele.title = req.body.title;
                ele.url = "/site/"+slug(req.body.title);
              }
            });
          }
        });
        data.menu = menu;
        callback(null, data);
      });
    },
    (data, callback) => {
      //update menu
      cms.updateMenu(data.menu, () => {
        callback(null, data);
      });
    }
  ], (err, result) => {
    if (err) res.sendStatus(500);
    res.redirect("/rakede");
  });
});

/* Route: Delete Site
Request:
siteID: uuid

Response:
200: site deleted,
404: deleting failed
*/
router.get('/deleteSite/:id', checkSession, function(req, res, next) {
  var data = {layout: false};

  chron.waterfall([
    (callback) => {
  cms.deleteSite(req.params.id, function() {
        callback(null, data);
      });
    },
    (data, callback) => {
      cms.getMenu((menu) => {
        //delete menu entry
        menu.x.forEach((e, i, a) => {
          if(e.title == "Seiten") {
            e.y.forEach((ele, ind, arr) => {
              if(ele.id == req.params.id) {
                arr.splice(ind, 1);
              }
            });
          }
        });
        data.menu = menu;
        callback(null, data);
      });
    },
    (data, callback) => {
      //update menu
      cms.updateMenu(data.menu, () => {
        callback(null, data);
      });
    }
  ], (err, result) => {
        if (err) res.sendStatus(500);
        res.redirect('/rakede');
    });
});

/*-------------------------File Upload---------------------------------*/

var storage = multer.diskStorage({
  destination: __dirname + '/../public/upload/',
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) return cb(err);

      cb(null, raw.toString('hex') + path.extname(file.originalname));
    });
  }
});

var upload = multer({ storage: storage });

router.post('/upload', upload.single('file'), function(req, res) {
  console.log("File uploaded:");
  console.log(req.file);

  var fileUrl = "/upload/" + req.file.filename;
  res.json({ location: fileUrl });
});

module.exports = router;
