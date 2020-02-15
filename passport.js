
//const passport = require('passport');
const isValidPassword = require("./passCheck");

const LocalStrategy = require('passport-local').Strategy;
const { User }= require('./db');
const bCrypt = require("bcryptjs");


const signup = new LocalStrategy((username, password, done) => {
        console.log('reg1');
        User.findOne({ username: username }, (err, user) => {
            console.log('reg2');
            const u = new User();
            u.username = username;
            const h = bCrypt.hashSync(password);
            console.log(h);
            u.password = h;
            if(!user)
                u.save(e => {console.log(e)});
            else return done(null, false, err);
            //User.insert({username: username, password: password});
            return done(null, user);
        });
    }
);

const login = new LocalStrategy((username, password, done) => {
        console.log('login');
        User.findOne({ username: username }, (err, user) => {
            console.log(user);
            if(!user)
                return done(null, false, err);
            else if(!isValidPassword(password, user.password))
                return done(null, false, 'Wrong password!');
            return done(null, user);
        });
    }
);

module.exports = { signup, login };
