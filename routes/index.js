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
  successRedirect: '/username',
  failureRedirect: '/username?fail',
  //failureFlash : true
}));

router.post('/signup', (req,res,n) => {
  console.log(req.body);
  n();
},  checkNotAuthentication, passport.authenticate('signup', {
  successRedirect: '/reg-res',
  failureRedirect: '/reg-res?fail',
  //failureFlash : true
}));

router.get('/username', (req, res) => {/*
   console.log(req.query);*/
   console.log(req.isAuthenticated());
   if(req.user)
        res.json({ username: req.user.username });
   else
       res.json({err: "A problem with authentication has occurred"});
});

router.get('/reg-res', (req, res) =>
{
   if(req.query.fail)
       res.json({err: "A problem with registration has occurred"});
   else res.json({res: "OK"});
});

router.get('/get_records', getRecords);

router.post('/add_record', checkAuthentication, addRecord);

router.get('/logout', checkAuthentication, (req, res) => {
  req.logOut();
  res.redirect('/');
});

router.post('/edit_user', checkAuthentication, editUser);
module.exports = router;
