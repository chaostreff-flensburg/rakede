var express = require('express');
var router = express.Router();

router.use("/blog", require("./blog"));
router.use("/events", require("./events"));

router.get('/', function(req, res) {

  var object = {
    events: [], // event objects in this array
    posts: []   // blog post objects in this array
  };

  res.render('home', object);
});

module.exports = router;
