var express = require('express');
var router = express.Router();
var Budget = require('../models/budget');

//GET all budgets.
router.get('/', function(req, res, next){
    Budget.find(function(err, budgets){
        if (err) {return next(err);}
        if (budgets.length === 0) {
            return res.status(404).json({'message': 'There is no existing budget!'});
        }
        res.status(200).json({'budgets': budgets});
    });
});

//GET budget by id.
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    Budget.findById(id, function(err, budgets) {
        if (err) { return next(err); }
        if (budgets === null) {
            return res.status(404).json({'message': 'Budget not found'});
        }
        res.status(200).json(budgets);
    });
});

//POST a budget.
router.post('/', function(req, res, next) {
    var budget = new Budget(req.body);
    budget.save(function(err, budget) {
        if(err) { return next(err); }
        res.status(201).json(budget);
    });
});

//DELETE budget collection.
router.delete('/', function(req, res, next){
    Budget.db.dropCollection("budgets", function(err, budgets){
        if (err) {return next(err); }
        if (budgets === null){
            return res.status(404).json({'message': 'There is no budget to delete!'});
        };
        res.status(202).json({'message': 'All bugets have been deleted.'})
    });
});

//DELETE budget by colleciton.
router.delete('/:id', function(req, res, next) {
    var id = req.params.id;
    Budget.findOneAndDelete({_id: id}, function(err, budget) {
        if (err) {return next(err); }
        if (budget === null){
            return res.status(404).json({'message': 'Budget not found'});
        }
        res.status(202).json({'message': 'Budget deleted.'})
    
        });
});

//PATCH a bucget by id.
router.patch('/:id', function(req, res, next) {
    var id = req.params.id;
    Budget.findById(id, function(err, budget){
        if(err) {return next(err);}
        if(budget == null){
            return res.status(404).json({"message": "Budget not found"});
        }
        budget.expenses = (req.body.expenses || budget.expenses),
       // budget.expenseName = (req.body.expenseName || budget.expenseName),
        budget.savings = (req.body.savings || budget.savings),
        budget.income = (req.body.income || budget.income)
        budget.save();
        res.status(201).json(budget);
    })
})

router.put('/:id', function(req, res, next) {
    var id = req.params.id;
    Budget.findById(id, function(err, budget) {
        if(err) {return next (err);}
        if(budget == null){
            return res.status(404).json({"message": "Budget not found"});
        }
        budget.expenses = req.body.expenses,
        budget.savings = req.body.savings,
        budget.income = req.body.income
        budget.save();
        res.status(200).json(budget);
        })
})
module.exports = router;