const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
/**const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;*/
const indexRouter = require('./routes/index');
//const User = require('./db');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/testDB');
/** /
 *
 */


const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./db');
//const db = require('mongoose');

passport.use('signup', new LocalStrategy((username, password, done) => {
        console.log('reg1');
        User.findOne({ username: username }, (err, user) => {
            console.log('reg2');

            if(!user)
                User.insertOne({username: username, password: password});
            return done(null, user);
        });
    }
));

passport.use('login', new LocalStrategy((username, password, done) => {
        User.findOne({ username: username, password: password }, (err, user) => {
            return done(null, user);
        });
    }
));

passport.serializeUser((user, done) => done(null, user._id));

passport.deserializeUser((id, done) => User.findById(id, (err, user) => done(err, user)));


/**
 *
 *
 */

/**
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
*/
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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
