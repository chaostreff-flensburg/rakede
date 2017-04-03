var router = require('express').Router()
var fs = require('fs')
var path = require('path')
var marked = require('marked')
var chokidar = require('chokidar')

var contentFolder = path.resolve(__dirname + '/../content/')

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


/* file watcher */
var watcher = chokidar.watch(contentFolder, {
  ignored: /(^|[\/\\])\../,
  persistent: true
});

watcher
  .on('add', path => console.log(`File ${path} has been added`))
  .on('change', path => console.log(`File ${path} has been changed`))
  .on('unlink', path => console.log(`File ${path} has been removed`))


module.exports = router
