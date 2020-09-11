var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var achievementSchema = new Schema ({
    
    goal: {},
    name: {},
    degree: {},
    description: {}

})

module.exports = mongoose.model('achievement', achievementSchema)