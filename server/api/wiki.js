import { Router } from 'express'

const router = Router()
const fs = require('fs')
const path = require('path')
const marked = require('marked')
const matter = require('gray-matter')

const contentFolder = path.resolve(__dirname + '/../../content')


/* GET article by slug. */
router.get('/wiki/:slug', function (req, res, next) {
  getArticle(req.params.slug)
    .then((article) => {
      res.json(article);
    })
    .catch((err) => {
      res.sendStatus(404);
    })
})



async function getArticle(slug) {
  let data = await read(contentFolder + '/' + slug + '.md');
  let rawArticle = await matter(data);
  let article = {
    title: rawArticle.data.title,
    cat: rawArticle.data.cat,
    img: rawArticle.data.img,
    content: rawArticle.content,
    html: await marked(rawArticle.content)
  }
  return article;
}

// wrap file reading in promise, b/c i can not be asked to use callbacks
// @TODO: use util.promisify() as we are on node 8 anyway
function read(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      resolve(data)
    })
  })
}

export default router
