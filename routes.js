

const {addRecord , getRecords, checkAuthentication, checkNotAuthentication, editUser, getUsername} = require("./workers/workers");

const express = require('express');
const passport = require("passport");
const router = express.Router();

router.post('/login', checkNotAuthentication, passport.authenticate('login', {
  successRedirect: '/auth_result',
  failureRedirect: '/auth_result?fail',
  failureFlash : true
}));

router.post('/signup', (req,res,n) => {
  console.log(req.body);
  n();
},  checkNotAuthentication, passport.authenticate('signup', {
  successRedirect: '/auth_result',
  failureRedirect: '/auth_result?fail',
  failureFlash : true
}));

router.get('/auth_result', getUsername);

router.get('/username', getUsername);

router.get('/get_records', getRecords);

router.post('/add_record', checkAuthentication, addRecord);

router.get('/logout', checkAuthentication, (req, res) => {
  req.logOut();
  res.redirect('/');
});

router.post('/edit_user', checkAuthentication, editUser);
module.exports = router;
