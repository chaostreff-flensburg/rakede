
// ===============
// Dependencies
// ===============

var express         = require("express"),
    app             = express(),
    server          = require('http').createServer(app),
    bodyParser      = require('body-parser'),
    errorHandler    = require('errorhandler'),
    methodOverride  = require('method-override'),
    hostname        = process.env.HOSTNAME || 'localhost',
    PORT            = process.env.PORT || 8081,
    publicDir       = process.argv[2] || __dirname + '/public',
    path            = require('path'),
    //r               = require('rethinkdb'),
    sockio          = require("socket.io"),
    Client          = require('node-rest-client').Client,
    client          = new Client(),
    exphbs          = require('express-handlebars');

// ====================
// Models
// ====================

var blog = require('./models/blog');

// ====================
// Express Config
// ====================

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.set('port', PORT);
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(publicDir));
app.use(errorHandler({
    dumpExceptions: true,
    showStack: true
}));

app.start = app.listen = function(){
    return server.listen.apply(server, arguments);
};

// ====================
// Controller
// ====================

app.get('/', function(req, res) {
  res.render('home', {
    title: "Hello World! Me no know git."
  });
});

app.get('/blog', function(req, res) {
  blog.getAllBlogs(function(result) {
    res.render('blog', {
      blogs: result
    });
  });
});

app.post('/createBlogEntry', function(req, res) {
  blog.createBlogEntry("Torben der Frameworkterrorist", "Feather.js oder warum wir unsere Zeit öfters mal verschwenden sollten!", function() {
    res.render('home', {
      title: "Blogeintrag angelegt!"
    });
  });
});

app.start(PORT);
console.log("Server showing %s listening at http://%s:%s", publicDir, hostname, PORT);
