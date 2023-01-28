const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CONFIG = require('../config/config');

const sponsorSchema = new Schema({
    name: String,
    patient: String,
    registryDate: Date,
    bath: String,
    bloodPressure: String,
    temperature: String,
    dayClassification: String,
    description: String
});

module.exports = global.mongoConnection.model(CONFIG.mongodb.collections.sponsor, sponsorSchema);