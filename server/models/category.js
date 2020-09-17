var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new Schema({
    categoryType: {      
        typeName: {type: String},
        task: {type: String},
        level: {type: Number},
        typeExperience: {type: Number},
        user: [{type: Schema.Types.ObjectId, ref: 'user'}],
        achievement: [{type: Schema.Types.ObjectId, ref: 'achievement'}]
    }
});

module.exports = mongoose.model('category', categorySchema);