var express = require('express');
var router = express.Router();
var Budget = require('../models/budget');

router.get('/', function(req, res, next){
    User.find(function(err, budgets){
        if (err) {return next(err);}
        if (budgets.length === 0) {
            return res.status(404).json({'message': 'There is no existing budget!'});
        }
        res.status(200).json({'budgets': budgets});
    });
});

router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    User.findById(id, function(err, budgets) {
        if (err) { return next(err); }
        if (budgets === null) {
            return res.status(404).json({'message': 'User not found'});
        }
        res.status(200).json(budgets);
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
            return res.status(404).json({'message': 'Budget not found'});
        }
        res.status(202).json(budget)
    
        });
});

router.patch('/:id', function(req, res, next) {
    var id = req.params.id;
    User.findById(id, function(err, budget){
        if(err) {return next(err);}
        if(budget == null){
            return res.status(404).json({"message": "User not found"});
        }
        budget.expense = (req.body.expense || budget.expense),
        budget.expenseName = (req.body.expenseName || budget.expenseName),
        budget.savings = (req.body.savings || budget.savings),
        budget.income = (req.body.income || budget.income)
        budget.save();
        res.status(201).json(budget);
    })
})

module.exports = router;