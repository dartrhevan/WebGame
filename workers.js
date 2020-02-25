const isValidPassword = require("./passCheck");

const bCrypt = require("bcryptjs");
const { User, Record } = require('./db');
/**accept in body params:
 * scores
 * */
function addRecord(req , res) {
    Record.find(function (err , results) {
        console.log(results);
        console.log(req.body);
        if (results.length <= 0 || results[0].scores < req.body.scores) {
            const rec = new Record();
            rec.userId = req.user._id;
            rec.username = req.user.username;
            rec.scores = req.body.scores;
            rec.date = new Date();
            rec.save(e => {
                console.log(e)
            });
            res.send({res: "OK"});
        } else
            res.send({res: "Too little"});
    }).sort({scores: -1}).limit(10);//.toArray(
}

function getRecords(req, res) {
    Record.find(function(err, results) {
        res.send(results);
    }).sort({scores: -1}).limit(10);//.toArray();
    //console.log(a)
}
/**
 * @params:
 * username
 * oldPassword
 * password
 * */
function editUser(req, res) {
    if(!req.body.oldPassword || !isValidPassword(req.body.oldPassword, req.user.password))
    {
        res.send({error: "Wrong password"});
        return;
    }
    const name = req.body.username ? req.body.username : req.user.username;
    console.log(`name: ${name}`);
    const password = req.body.password ? bCrypt.hashSync(req.body.password) : req.user.password;
    User.findByIdAndUpdate(req.user._id, { $set: {username: name,
        password: password } }, {useFindAndModify: true}, e => {
        console.log(e);
        Record.find({userId: req.user._id}, (err, resuslt) => {
            if(err) {
                res.send({error: err});
                return;
            }
            for(let rec of resuslt)
                Record.findByIdAndUpdate(rec._id, { $set: {username: name} }, {useFindAndModify: true}, e => console.log(e));
            res.send({res: "OK"});
        })
    })
}

function checkAuthentication(req, res, next) {
    if(!req.isAuthenticated())
        res.send({error: "Not authenticated"});
    else
        next();
}

function checkNotAuthentication(req, res, next) {
    if(req.isAuthenticated())
        res.redirect("/");
    else
        next();
}

function getUsername(req, res) {/*
   console.log(req.query);*/
    console.log(req.isAuthenticated());
    if(req.user)
        res.json({ username: req.user.username });
    else
        res.json({err: "A problem with authentication has occurred"});
}

function registrationResult(req, res)
{
    if(req.query.fail)
        res.json({err: "A problem with registration has occurred"});
    else res.json({res: "OK"});
}

module.exports = {addRecord , getRecords, checkAuthentication, checkNotAuthentication, editUser, getUsername, registrationResult};
