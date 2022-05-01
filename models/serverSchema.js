const mongoose = require('mongoose');

const serverSchema = new mongoose.Schema({
    serverId: {type: string, require: true, unique: true}
    /*userID: {type: String, require: true, unique: true},
    serverID: { type : String, require: true},
    moons: { type: Number, default: 100},
    suns: {type: Number, default: 10},
    energy: {type: Number, default: 30},
    smessage: {type: String, default: 'false'},
    stringsmessage: {type: String, default: 'none / error'},
    version: {type: Number, require: true ,default: 1},
    terminated: {type: String, default: 'false'},
    terminatedTimeOut: {type: String},
    deleted: {type: String, default: 'false'},*/
});

const model = mongoose.model('ServerModel', serverSchema);
module.exports = model;