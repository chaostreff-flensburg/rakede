var express = require('express');
var router = express.Router();
var cms = require('../models/cms');

/* Route: /(slug)
Request:
  slug: slug-string
Response:
200: {blogpost},
404: no post/ fetching post failed
*/
router.get('/:slug', function(req, res) {
  cms.getSite(req.params.slug, function(err, result) {
    if(err) res.end(404);
    res.render('site', {
      site: result[0]
    });
  });
});

module.exports = router;
