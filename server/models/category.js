var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new Schema({
    "categoryType": {
        "typeName": {type: String},
        "task": {type: String},
        "level": {type: Number},
        "typeExperience": {type: Number} 
    }
});

module.exports = mongoose.model('category', categorySchema);