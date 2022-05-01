const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    userID: {type: String, require: true, unique: true},
    serverID: { type : String, require: true},
    moons: { type: Number, default: 100},
    suns: {type: Number, default: 10},
    energy: {type: Number, default: 30},
    smessage: {type: String, default: 'false'},
    stringsmessage: {type: String, default: 'none / error'},
    version: {type: Number, require: true ,default: 1},
    password: {type: String, default: 'false'},
    username: {type: String},
    deleted: {type: String, default: 'false'},
});

const model = mongoose.model('ProfileModels', profileSchema);
module.exports = model;