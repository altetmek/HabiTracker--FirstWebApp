var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var budgetSchema = new Schema ({
    name: {type: String},
    income: {type: Number},
    expenses: {type: Number},
    savings: {type: Number},
    user: [{type: Schema.Types.ObjectId, ref: 'user'}],
    achievement: [{type: Schema.Types.ObjectId, ref: 'achievement'}]
});

module.exports = mongoose.model('budget', budgetSchema);