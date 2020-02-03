const express = require('express');
const passport = require("passport");
const router = express.Router();

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

router.get('/logout', (req, res) => {
  req.logOut();
  res.redact('/');
});

module.exports = router;
