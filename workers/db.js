const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User  = mongoose.model('User', new Schema({
    username: String,
    password: String
}));

const Record = mongoose.model('Record', new Schema({
    userId: Schema.Types.ObjectId,
    username: String,
    scores: Number,
    date: Date
}));

mongoose.connect('mongodb+srv://laptop:android@cluster0-dprw7.mongodb.net/test?retryWrites=true&w=majority');

module.exports = { User, Record };
