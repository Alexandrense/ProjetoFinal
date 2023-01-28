const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CONFIG = require('../config/config');

const quizSchema = new Schema({
    name: String,
    points: {
        type: Number,
        default: 0
    },
    level: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    },
    users: [{
        type: String,
        ref: CONFIG.mongodb.collections.user
    }],
    active: {
        type: Boolean,
        default: true
    }
});

module.exports = global.mongoConnection.model(CONFIG.mongodb.collections.quiz, quizSchema);