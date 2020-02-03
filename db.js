const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User  = mongoose.model('User', new Schema({
    username: String,
    password: String
}));

const Record = mongoose.model('Record', new Schema({
    userId: Schema.Types.ObjectId,
    scores: Number,
    date: Date
}));

module.exports = { User, Record };