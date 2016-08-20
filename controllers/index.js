var express = require('express');
var router = express.Router();

router.use("/blog", require("./blog"));
router.use("/events", require("./events"));
router.use("/rakede", require("./backend"));

router.get('/', function(req, res) {
  res.render('home', {
    title: "Hello World!"
  });
});

module.exports = router;
