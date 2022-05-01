const mongoose = require('mongoose');

const bannedSchema = new mongoose.Schema({
    userID: {type: String, require: true},
    banned: {type: Number, defauld: 0},
});

const model = mongoose.model('BannedModels', bannedSchema);
module.exports = model;