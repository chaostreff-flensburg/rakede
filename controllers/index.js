var express = require('express');
var router = express.Router();

router.use("/blog", require("./blog"));
router.use("/events", require("./events"));

router.get('/', function(req, res) {
  res.render('home', {
    title: "Hello World!"
  });
});

module.exports = router;
