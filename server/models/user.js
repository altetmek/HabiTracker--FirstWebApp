var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    email: {type: String},
    password: {type: String}, //Add unique?
    username: {type: String},
    level: {type: Number},
    title: {type: String},
    experiencePoints: {type: Number},
    achievement: [{type: Schema.Types.ObjectId, ref: 'achievement'}],
    category: [{type: Schema.Types.ObjectId, ref: 'category'}],
    budget: [{type: Schema.Types.ObjectId, ref: 'budget'}]

});

module.exports = mongoose.model('user', userSchema)