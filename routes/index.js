

const {addRecord , getRecords, checkAuthentication, checkNotAuthentication, editUser, getUsername, registrationResult} = require("../workers");

const express = require('express');
const passport = require("passport");
const router = express.Router();

router.post('/login', checkNotAuthentication, passport.authenticate('login', {
  successRedirect: '/username',
  failureRedirect: '/username?fail'
}));

router.post('/signup', (req,res,n) => {
  console.log(req.body);
  n();
},  checkNotAuthentication, passport.authenticate('signup', {
  successRedirect: '/reg-res',
  failureRedirect: '/reg-res?fail',
  //failureFlash : true
}));

router.get('/username', getUsername);

router.get('/reg-res', registrationResult);

router.get('/get_records', getRecords);

router.post('/add_record', checkAuthentication, addRecord);

router.get('/logout', checkAuthentication, (req, res) => {
  req.logOut();
  res.redirect('/');
});

router.post('/edit_user', checkAuthentication, editUser);
module.exports = router;
