
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
    exphbs          = require('express-handlebars');


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
// require Routes in ./controllers
app.use(require('./controllers'));

app.start = app.listen = function(){
    return server.listen.apply(server, arguments);
};


// ====================
// Start the Rakede
// 3...
// 2...
// 1..
// ====================

app.start(PORT);
console.log("Server showing %s listening at http://%s:%s", publicDir, hostname, PORT);
