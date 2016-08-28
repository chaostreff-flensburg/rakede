var express = require('express');
var router = express.Router();
var chron = require('async');
var cms = require('../models/cms');
var blogs = require('../models/blog');
var events = require('../models/events');
var tokens = require('../config/tokens.json');

router.use("/blog", require("./blog"));
router.use("/events", require("./events"));
router.use("/login", require("./authentication"));
router.use("/rakede", require("./backend"));
router.use("/site", require("./cms"));

router.get('/', function(req, res) {
  var data = {layout:false,
    slackButton: "<a href='https://slack.com/oauth/authorize?scope=identity.basic,identity.team&client_id="+tokens.clientID+"&redirect_uri="+tokens.callbackURL+"'><img alt='Sign in with Slack' height='40' width='172' src='https://platform.slack-edge.com/img/sign_in_with_slack.png' srcset='https://platform.slack-edge.com/img/sign_in_with_slack.png 1x, https://platform.slack-edge.com/img/sign_in_with_slack@2x.png 2x' /></a>"
  };

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
    if (err) res.sendStatus(500);
    //slack button

    res.render('home', data);
  });
});

// To-Do: remove test-route when data is implemented on home site
router.get('/test', function(req, res) {
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
    if (err) res.sendStatus(500);
    res.render('test_home', data);
  });
});

module.exports = router;
