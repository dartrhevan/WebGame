const express = require('express');
const passport = require("passport");
const router = express.Router();
const { User, Record } = require('../db')


/* GET home page. */
/*router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
});*/

router.post('/login', passport.authenticate('login', {
  successRedirect: '/u',
  failureRedirect: '/?fail',
  //failureFlash : true
}));

router.post('/signup', passport.authenticate('signup', {
  successRedirect: '/',
  failureRedirect: '/?fail',
  //failureFlash : true
}));

router.get('/u', (req, res) => {
  console.log(req.isAuthenticated());
   res.send(req.user);
});

router.get('/records', (req, res) => {
  Record.find(function(err, results) {
    res.send(results);
  }).sort({scores: -1}).limit(10);
});

router.post('/add_record', (req, res) => {
  Record.find(function(err, results) {
    if(results.length <= 0 || results[results.length - 1] < req.body.scores) {
      const rec = new Record();
      rec.userId = req.user._id;
      rec.scores = req.body.scores;
      rec.date = new Date();
      rec.save(e => {
        console.log(e)
      });
      res.send("OK");
    }
    else
      res.send("Too little");
  }).sort({scores: -1}).limit(10)//.toArray(
});

router.get('/logout', (req, res) => {
  req.logOut();
  res.redact('/');
});

module.exports = router;
