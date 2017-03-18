var router = require('express').Router();
var fs = require('fs');
var marked = require('marked');

/* GET article by slug. */
router.get('/wiki/:slug', function (req, res, next) {
  fs.readFile(__dirname + '/../content/' + req.params.slug + '.md', 'utf8', (err, data) => {
    if (err) res.sendStatus(404);
    else {
      var article = {
        content: marked(data)
      }
      res.json(article);
    }
  });
})

module.exports = router