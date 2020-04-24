const createError = require('http-errors');
const express = require('express');
const session = require("express-session");
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const flash = require('connect-flash'),
bodyParser = require('body-parser');
const indexRouter = require('./routes');
const passport = require('passport');
//const LocalStrategy = require('passport-local').Strategy;
const { User } = require('./workers/db');
const {signup, login} = require('./workers/passport');
const app = express();


//const mongoose = require('mongoose');

//mongoose.connect('mongodb+srv://laptop:android@cluster0-dprw7.mongodb.net/test?retryWrites=true&w=majority');

passport.use('signup', signup);

passport.use('login', login);

passport.serializeUser((user, done) => done(null, user._id));

passport.deserializeUser((id, done) => User.findById(id, (err, user) => done(err, user)));

/**
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
*/

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('anything'));
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({ secret: 'anything', cookie: { maxAge: 60000 } }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err);
  res.render('error');
});

module.exports = app;
