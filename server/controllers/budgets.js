var express = require('express');
var router = express.Router();
var Budget = require('../models/budget');

router.get('/', function(req, res, next){
    User.find(function(err, budgets){
        if (err) {return next(err);}
        res.json({'budgets': budgets});
    });
});

router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    User.findById(id, function(err, budgets) {
        if (err) { return next(err); }
        if (budgets === null) {
            return res.status(404).json({'message': 'User not found'});
        }
        res.json(budgets);
    });
});

router.post('/', function(req, res, next) {
    var budget = new Budget(req.body);
    user.save(function(err, budget) {
        if(err) { return next(err); }
        res.status(201).json(budget);
    });
});

router.delete('/:id', function(req, res, next) {
    var id = req.params.id;
    User.findOneAndDelete({_id: id}, function(err, user) {
        if (err) {return next(err); }
        if (user === null){
            return res.status(404).json({'message': 'User not found'});
        }
        res.json(budget)
    
        });
});

router.patch('/budgets/:id', function(req, res) {
    var id = re.params.id;
    var budgets = budgets[id];
    var updated_budgets = {
        "_id": id,
        "income": req.body.income,
        "expense": req.body.expense,
        "expense_name": req.body.name,
        "savings": req.body.savings,
        "experience_points": req.body.experiencePoints

    };
    budget[id] = updated_budgets;
    res.json(updated_budgets);
})

module.exports = router;