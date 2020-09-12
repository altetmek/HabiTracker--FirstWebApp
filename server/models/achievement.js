var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var achievementSchema = new Schema ({
    
    type: {type: String},
    name: {type: String},
    degree: {type: String},
    description: {type: String}

})

module.exports = mongoose.model('achievement', achievementSchema)