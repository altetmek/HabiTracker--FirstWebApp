var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var budgetSchema = new Schema ({
    income: {type: Number},
    expenses: {type: Number},
    savings: {type: Number}
});

module.exports = mongoose.model('budget', budgetSchema);