var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: {type: String},
    level: {type: Number},
    title: {type: String},
    experiencePoints: {type: Number}

});

module.exports = mongoose.model('users', userSchema)