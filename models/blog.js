var r = require('rethinkdb');

var connection = null;
r.connect( {host: 'localhost', port: 28015}, function(err, conn) {
    if (err) throw err;
    connection = conn;
});

/*----------------crud controller for blog entries----------*/

exports.createBlogEntry = function(user, data, title, callback) {
  //create blog object
  var blogEntry = {
    author:   user,
    data:   data,
    title: title,
    timestamp:  new Date()
  };

  //insert blog object into db
    r.db('rakede').table('blog').insert(blogEntry).run(connection, function(err, result) {
      if (err) throw err;
      console.log(JSON.stringify(result, null, 2));
      callback();
  });
};

//get all blog entries
exports.getAllBlogs = function(callback) {
    r.db('rakede').table('blog').run(connection, function(err, cursor) {
      if (err) throw err;
      cursor.toArray(function(err, result) {
          if (err) throw err;
          console.log(JSON.stringify(result, null, 2));
          callback(result);
      });
  });
};
