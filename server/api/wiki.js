import { Router } from 'express'
import * as content from './content.js'

const router = Router()
const path = require('path')

const contentFolder = path.resolve(__dirname + '/../../content')


/* GET featured articles */
router.get('/wiki/featured', (req, res, next) => {
  content.getFeatured(contentFolder + '/wiki/')
    .then((articles) => {
      res.json(articles);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    })
})

/* GET article by slug. */
router.get('/wiki/:slug', async (req, res, next) => {
  content.get(contentFolder + '/wiki/' + req.params.slug + '.md')
    .then((article) => {
      res.json(article);
    })
    .catch((err) => {
      res.sendStatus(404);
    })
})


export default router
