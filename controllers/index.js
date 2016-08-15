var express = require('express');
var router = express.Router();

//router.use('/comments', require('./comments'))
//router.use('/users', require('./users'))
router.use("/blog", require("./blog"));

router.get('/', function(req, res) {
  res.render('home', {
    title: "Hello World! Me no know git."
  });
});

module.exports = router;
