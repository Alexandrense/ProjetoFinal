const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CONFIG = require('../config/config');

const expertSchema = new Schema({
    name: String,
    birth_date: Date,
    sex: String,
    contactName: String,
    contactPhone: String,
    contactMail: String
});

module.exports = global.mongoConnection.model(CONFIG.mongodb.collections.expert, expertSchema);