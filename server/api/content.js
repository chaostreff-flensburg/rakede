const util = require('util');
const fs = require('fs')
const path = require('path')
const marked = require('marked')
const matter = require('gray-matter')

const read = util.promisify(fs.readFile);
const readDir = util.promisify(fs.readdir);


export async function get(pathToMarkdown) {
  let file = await read(pathToMarkdown, 'UTF8');
  let article = await parseArticle(file);
  return article;
}

export async function getFeatured(pathToFeaturedFolder) {
  let data = await read(pathToFeaturedFolder + 'featured.json', 'UTF8');
  let selection = await JSON.parse(data);
  let articles = await Promise.all(selection.featured.map(async (slug) => {
    let file = await read(pathToFeaturedFolder + slug + '.md', 'UTF8');
    let article = await parseArticle(file, slug);
    return article;
  }));
  return articles;
}

// @TODO: use markdown-it for plugins & async-components nuxtent style
async function parseArticle(markdown, slug) {
  let rawArticle = await matter(markdown);
  let article = {
    title: rawArticle.data.title,
    slug: slug,
    cat: rawArticle.data.cat,
    img: rawArticle.data.img,
    redirect: rawArticle.redirect,
    content: rawArticle.content,
    html: await marked(rawArticle.content)
  }
  return article;
}
