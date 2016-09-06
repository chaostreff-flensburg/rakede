var express = require('express');
var router = express.Router();
var cms = require('../models/cms');
var chron = require('async');

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
  cms.getSite(req.params.slug, (err, site) => {
    data.site = site[0];
    callback(null, data);
  });
}
], (err, data) => {
if (err) res.sendStatus(500);

  console.log(data);
    res.render('site', data);
  });
});

module.exports = router;
