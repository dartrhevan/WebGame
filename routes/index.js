//import {editUser} from "../workers";

const {addRecord , getRecords, checkAuthentication, checkNotAuthentication, editUser} = require("../workers");

const express = require('express');
const passport = require("passport");
const router = express.Router();
const { User, Record } = require('../db');


/* GET home page. */
/*router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
});*/

router.post('/login', checkNotAuthentication, passport.authenticate('login', {
  successRedirect: '/u',
  failureRedirect: '/?fail',
  //failureFlash : true
}));

router.post('/signup',  checkNotAuthentication, passport.authenticate('signup', {
  successRedirect: '/',
  failureRedirect: '/?fail',
  //failureFlash : true
}));

router.get('/u', (req, res) => {
  console.log(req.isAuthenticated());
   res.send(req.user);
});

router.get('/records', getRecords);

router.post('/add_record', checkAuthentication, addRecord);

router.get('/logout', checkAuthentication, (req, res) => {
  req.logOut();
  res.redirect('/');
});

router.post('/edit_user', checkAuthentication, editUser);
module.exports = router;
