import { Router } from 'express'

const router = Router()
const util = require('util');
const fs = require('fs')
const path = require('path')
const marked = require('marked')
const matter = require('gray-matter')

const read = util.promisify(fs.readFile);
const readDir = util.promisify(fs.readdir);

const contentFolder = path.resolve(__dirname + '/../../content')


/* GET featured articles */
// @TODO: fetured.json on same fs-level
router.get('/wiki/featured', (req, res, next) => {
  readDir(contentFolder + '/')
    .then(async (files) => {
      let articles = await Promise.all(files.map(async (file) => {
        let markdown = await read(contentFolder + '/' + file, 'UTF8');
        return await parseArticle(markdown);
      }));
      res.json(articles);
    })
    .catch((err) => {
      res.sendStatus(500);
    })
})

/* GET article by slug. */
router.get('/wiki/:slug', async (req, res, next) => {
  let file = await read(contentFolder + '/' + req.params.slug + '.md', 'UTF8')
    .catch((err) => {});
  parseArticle(file)
    .then((article) => {
      res.json(article);
    })
    .catch((err) => {
      res.sendStatus(404);
    })
})



async function parseArticle(markdown) {
  let rawArticle = await matter(markdown);
  let article = {
    title: rawArticle.data.title,
    cat: rawArticle.data.cat,
    img: rawArticle.data.img,
    content: rawArticle.content,
    html: await marked(rawArticle.content)
  }
  return article;
}


export default router
