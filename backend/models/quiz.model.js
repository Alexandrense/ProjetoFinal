const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CONFIG = require('../config/config');

const quizSchema = new Schema({
    name: String,
    birth_date: Date,
    sex: String,
    contactName: String,
    contactPhone: String,
    contactMail: String,
    users: [{
        type: String,
        ref: CONFIG.mongodb.collections.user
    }]
});

module.exports = global.mongoConnection.model(CONFIG.mongodb.collections.quiz, quizSchema);