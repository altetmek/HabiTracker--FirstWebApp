var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var achievementSchema = new Schema ({
    type: {type: String},
    name: {type: String},
    degree: {type: String},
    experiencePoints: {type: Number},
    description: {type: String},
    user: [{type: Schema.Types.ObjectId, ref: 'user'}],
    category: [{type: Schema.Types.ObjectId, ref: 'category'}],
    budget: [{type: Schema.Types.ObjectId, ref: 'budget'}]

})

module.exports = mongoose.model('achievement', achievementSchema)