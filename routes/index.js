const express = require('express');
const passport = require("passport");
const router = express.Router();

/* GET home page. */
/*router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
});*/

router.post('/login', passport.authenticate('login', {
  successRedirect: '/',
  failureRedirect: '/?fail',
 // failureFlash : true
}));

router.post('/signup', passport.authenticate('signup', {
  successRedirect: '/',
  failureRedirect: '/?fail',
 // failureFlash : true
}));

module.exports = router;
