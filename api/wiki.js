const router = require('express').Router()
const fs = require('fs')
const path = require('path')
const nedb = require('nedb')
const marked = require('marked')
const matter = require('gray-matter')
const chokidar = require('chokidar')

const contentFolder = path.resolve(__dirname + '/../content/')

var db = new nedb({ filename: __dirname + '/../db/content', autoload: true, timestampData: true })


/* GET article by slug. */
router.get('/wiki/:slug', function (req, res, next) {
  fs.readFile(__dirname + '/../content/' + req.params.slug + '.md', 'utf8', (err, data) => {
    if (err) res.sendStatus(404)
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
  .on('add', path => {
    console.log(`File ${path} has been added`)
    read(path)
      .then(markdown => console.log('wululu'))
  })
  .on('change', path => console.log(`File ${path} has been changed`))
  .on('unlink', path => console.log(`File ${path} has been removed`))


/* markdown parsing */
async function parse(markdown, path) {
  rawArticle = await matter(markdown)
  article = {
    title: rawArticle.data.title,
    path: path,
    cat: rawArticle.data.cat,
    img: rawArticle.data.img,
    content: rawArticle.content,
    html: await marked(rawArticle.content)
  }
  return article
}

// wrap file reading in promise, b/c i can not be asked to use callbacks
function read(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, markdown) => {
      resolve(markdown)
    })
  })
}

module.exports = router
