var express = require('express');
var router = express.Router();
var chron = require('async');
var cms = require('../models/cms');
var blogs = require('../models/blog');
var events = require('../models/events');

router.use("/blog", require("./blog"));
router.use("/events", require("./events"));
router.use("/auth", require("./authentication"));
router.use("/rakede", require("./backend"));

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
      blogs.getNewPosts(1, (posts) => {
        data.posts = posts;
        callback(null, data);
      });
    },
    (data, callback) => {
      events.getNewEvents(3, (events) => {
        data.events = events;
        callback(null, data);
      });
    }
  ], (err, result) => {
    if (err) res.end(500);

    res.render('home', data);

  });

});

module.exports = router;
