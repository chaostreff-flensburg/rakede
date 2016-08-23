var r = require('rethinkdb');
var slug = require('slug');

var connection = null;
r.connect( {host: 'localhost', port: 28015, db: 'rakede'}, function(err, conn) {
    if (err) throw err;
    connection = conn;
});

/*  DEFINITION site

{
  title:  string,
  slug: slug-string,
  content:  string
}

*/

/*      DEFINITION menu

{
  title: string,
  url: string.
  x:  int,
  y:  int
}

*/

/*  TABLES

'cms_sites' =  html-pages
'cms_menu'  = dropdown-menu with submenus

*/

/*----------------crud controller sites----------*/

exports.createSite = function(title, content, callback) {
  //create site object
  var site = {
    title:   title,
    content:   content,
    slug: slug(title)
  };

  //insert blog object into db
    r.table('cms_sites').insert([site]).run(connection, function(err, result) {
      if (err) throw err;
      console.log(JSON.stringify(result, null, 2));
      callback();
  });
};

//get specific site via slug
exports.getSite = function(slug, callback) {
    r.table('cms_sites').get(slug).run(connection, function(err, result) {
      if (err) throw err;
      console.log(JSON.stringify(result, null, 2));
      callback(result);
  });
};

//update site
exports.updatePost = function(slug, title, content, callback) {
  r.table('cms_sites').get(slug).update({content: content, title: title, slug: slug(title)}).run(connection, function(err, result) {
    if (err) throw err;
    console.log(JSON.stringify(result, null, 2));
    callback();
  });
};

//delete site
exports.deleteSite = function(slug, callback) {
  r.table('cms_sites').get(slug).delete().run(connection, function(err, result) {
    if (err) throw err;
    console.log(JSON.stringify(result, null, 2));
    callback();
  });
};

/*----------------crud controller for dropdown-menu----------*/

exports.createMenuPoint = function(title, url, x, y, callback) {
  //create menupoint object
  var menu = {
    title:  title,
    url:  url,
    x:  x,
    y:  y
  };

  //insert menu object
  r.table('cms_menu').insert(menu).run(connection, function(err, result) {
    if (err) throw err;
    console.log(JSON.stringify(result, null, 2));
    callback();
  });
};

exports.updateMenuPoint = function(uuid, title, url, x, y, callback) {
  //create menupoint object
  var menu = {
    title:  title,
    url:  url,
    x:  x,
    y:  y
  };

  //update menu object
  r.table('cms_menu').get(uuid).update(menu).run(connection, function(err, result) {
    if (err) throw err;
    console.log(JSON.stringify(result, null, 2));
    callback();
  });
};

//delete single menu point
exports.deleteMenuPoint = function(uuid, callback) {
  //delete menu object
  r.table('cms_menu').get(uuid).delete().run(connection, function(err, result) {
    if (err) throw err;
    console.log(JSON.stringify(result, null, 2));
    callback();
  });
};

//get all menu points
exports.getMenu = function(callback) {
    r.table('cms_menu').run(connection, function(err, cursor) {
      if (err) throw err;
      cursor.toArray(function(err, result) {
          if (err) throw err;
          console.log(JSON.stringify(result, null, 2));
          callback(result);
      });
  });
};
