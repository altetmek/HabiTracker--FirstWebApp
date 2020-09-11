var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var budgetSchema = new Schema ({
    income: {},
    expenses: {},
    savings: {}
});

module.exports = mongoose.model('budget', budgetSchema);