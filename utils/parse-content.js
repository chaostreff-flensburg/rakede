const fs = require('fs');
const path = require('path');
const util = require('util');
const read = require('fs-readdir-recursive');
const matter = require('gray-matter');
const marked = require('marked');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const contentPath = path.resolve(__dirname + '/../content/');

// number of characters in abstract
const abstractLength = 200;


async function parseContent() {
  let files = await read(contentPath);
  // filter out non-markdown files
  let markdownFiles = files.filter(file => file.match(/^.*\.(md)$/i))
  markdownFiles.forEach(async (markdownFile) => {
    // remove file extension
    let filePath = path.resolve(contentPath + '/' + markdownFile.replace(/(\.\w+$)/i, ''));
    let md = path.resolve(contentPath + '/' + markdownFile);
    let buffer = await readFile(md, 'UTF8');
    let article = await matter(buffer);
    article.content = await marked(article.content);
    delete article.orig;
    let jsonPath = path.resolve(contentPath + '/json/' + markdownFile.replace(/(\.\w+$)/i, '.json'));
    ensureDirectoryExistence(jsonPath);
    writeFile(jsonPath, JSON.stringify(article), 'utf8')
  })
}

function ensureDirectoryExistence(filePath) {
  // https://stackoverflow.com/a/34509653
  var dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}

parseContent();
