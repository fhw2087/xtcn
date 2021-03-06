var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require("express-session");
var bodyParser = require('body-parser');

var index = require('./routes/index');
var login = require('./routes/loginCtr');
var register = require('./routes/register');
var changePassword = require('./routes/changePassword');
var report = require('./routes/report');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine( '.html', require( 'ejs' ).__express );

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: 'this is the secret for cookie',
    resave: false,
    saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));

app.use(function (req, res, next) {
   console.log('time: ',new Date().toLocaleTimeString());
   console.log('query:',req.query);
   console.log('你个傻逼');
   console.log('body:',req.body);
   console.log('sessionsign:',req.session.sign);
    next();
});

app.use('/', index);
app.use('/login', login);
app.use('/register', register);
app.use('/changePassword', changePassword);
app.use('/report', report);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
