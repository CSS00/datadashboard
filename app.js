var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var User = require('./models/User.js');

var app = express();

// Configuring Passport
var flash    = require('connect-flash');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var expressSession = require('express-session');
app.use(expressSession({ secret: 'mySecretKey' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

var chartData = require('./models/ChartData.js');
require('./conf/passport')(passport);
require('./conf/server');
require('./conf/client');

//passport.use(new LocalStrategy(
//    function(username, password, done) {
//      User.findOne({ username: username }, function (err, user) {
//        if (err) { return done(err); }
//        if (!user) {
//          return done(null, false, { message: 'Incorrect username.' });
//        }
//        if (!user.validPassword(password)) {
//          return done(null, false, { message: 'Incorrect password.' });
//        }
//        return done(null, user);
//      });
//    }
//));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

/* Handle Login POST */
app.post('/login', passport.authenticate('local',
    { successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: true}));

module.exports = app;
