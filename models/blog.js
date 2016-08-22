var r = require('rethinkdb');
var slug = require('slug');

var connection = null;

// database connection is still open

r.connect( {host: 'localhost', port: 28015, db: 'rakede'}, function(err, conn) {
    if (err) throw err;
    connection = conn;
});

/*  DEFINITION blogEntry

{
  user_id:  uuid,
  slug: slug string,
  timestamp: date,
  title: string,
  content:  string,
  category: [uuid]
}

*/

/*      DEFINITION category

{
  title:  string
}

*/

/*  TABLES

'blog_posts' =  Blogeinträge
'blog_categories'  = Kategorien

*/

/*----------------crud controller for blog entries----------*/

exports.createPost = function(user, content, title, category, callback) {
  //create blog object
  var blogPost = {
    author:   user,
    content:   content,
    title: title,
    slug: slug(title),
    category: category ? category : null,
    timestamp:  r.now()
  };
  //insert blog object into db
    r.table('blog_posts').insert([blogPost]).run(connection, function(err, result) {
      if (err) throw err;
      console.log(JSON.stringify(result, null, 2));
      callback();
  });
};

//get all blog entries
exports.getAllPosts = function(callback) {
    r.table('blog_posts').run(connection, function(err, cursor) {
      if (err) throw err;
      cursor.toArray(function(err, result) {
          if (err) throw err;
          //convert time to unixEpoch
          result.forEach((e, i, a) => {
            e.timestamp = r.toEpochTime(e.timestamp) / 1000;
          });
          console.log(JSON.stringify(result, null, 2));
          callback(result);
      });
  });
};

//get specific blog post via slug
exports.getPost = function(slug, callback) {
    r.table('blog_posts').filter(r.row('slug').eq(slug)).run(connection, function(err, result) {
      if (err) throw err;
      //convert timestamp to unixEpoch
      result.timestamp = r.toEpochTime(result.timestamp) / 1000;
      console.log(JSON.stringify(result, null, 2));
      callback(result);
  });
};

//get post by the following criteria: amount and age, order by age
exports.getNewPosts = function(amount, callback) {
  amount = amount || 1;
  r.table('blog_posts').get(amount).orderBy('timestamp').run(connection, function(err, cursor) {
    if (err) throw err;
    cursor.toArray(function(err, result) {
        if (err) throw err;
        //convert time to unixEpoch
        result.forEach((e, i, a) => {
          e.timestamp = r.toEpochTime(e.timestamp) / 1000;
        });
        console.log(JSON.stringify(result, null, 2));
        callback(result);
    });
  });
};
//update blog post
exports.updatePost = function(uuid, content, title, category, callback) {
  r.table('blog_posts').get(uuid).update({content: content, title: title, category: category, slug: slug(title)}).run(connection, function(err, result) {
    if (err) throw err;
    console.log(JSON.stringify(result, null, 2));
    callback();
  });
};

//delete blog post
exports.deletePost = function(uuid, callback) {
  r.table('blog_posts').get(uuid).delete().run(connection, function(err, result) {
    if (err) throw err;
    console.log(JSON.stringify(result, null, 2));
    callback();
  });
};

/*----------------crud controller for categories----------*/

exports.createCategory = function(title, callback) {
  //create category object
  var category = {
    title:  title
  };

  //insert category object
  r.table('blog_categories').insert(category).run(connection, function(err, result) {
    if (err) throw err;
    console.log(JSON.stringify(result, null, 2));
    callback();
  });
};

//get all categories
exports.getAllCategories = function(callback) {
    r.table('blog_categories').run(connection, function(err, cursor) {
      if (err) throw err;
      cursor.toArray(function(err, result) {
          if (err) throw err;
          console.log(JSON.stringify(result, null, 2));
          callback(result);
      });
  });
};
