
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
