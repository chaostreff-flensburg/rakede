import { Router } from 'express'

const router = Router()
const fs = require('fs')
const path = require('path')
const marked = require('marked')
const matter = require('gray-matter')

const contentFolder = path.resolve(__dirname + '/../../content')


/* GET article by slug. */
router.get('/wiki/:slug', function (req, res, next) {
  fs.readFile(contentFolder + '/' + req.params.slug + '.md', 'utf8', (err, data) => {
    if (err) res.sendStatus(404)
    else {
      var article = {
        content: marked(data)
      }
      res.json(article);
    }
  });
})

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

export default router
