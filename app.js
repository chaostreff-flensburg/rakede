
// ===============
// Dependencies
// ===============

var express         = require("express"),
    app             = express(),
    server          = require('http').createServer(app),
    bodyParser      = require('body-parser'),
    cookieParser    = require('cookie-parser'),
    errorHandler    = require('errorhandler'),
    tokens          = require('./config/tokens.json'),
    methodOverride  = require('method-override'),
    hostname        = process.env.HOSTNAME || 'localhost',
    PORT            = process.env.PORT || 8081,
    publicDir       = process.argv[2] || __dirname + '/public',
    path            = require('path'),
    passport        = require('passport'),
    sockio          = require("socket.io"),
    exphbs          = require('express-handlebars'),
    session         = require('express-session'),
    dbstart         = require('./helpers/dbstart.js');



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
app.use(session({ secret: tokens.clientSecret, resave: false, saveUninitialized: true }));
//passport configuration

app.use(passport.initialize());
app.use(passport.session());

var SlackStrategy = require('passport-slack-ponycode').SlackStrategy;
passport.use( 'slack', new SlackStrategy({
    clientID: tokens.clientID,
    clientSecret: tokens.clientSecret,
    callbackURL: tokens.callbackURL,
    slackTeam: "T03JL4VF6"
}, function( token, tokenSecret, profile, cb ){
return cb(null, profile);
}));


passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});
// require Routes in ./controllers
app.use(require('./controllers'));

app.start = app.listen = function(){
    return server.listen.apply(server, arguments);
};

// Helpers
dbstart();

// ====================
// Start the Rakede
// 3...
// 2...
// 1..
// ====================

app.start(PORT);
console.log("Server showing %s listening at http://%s:%s", publicDir, hostname, PORT);
