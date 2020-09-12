var express = require('express');
var router = express.Router();
var category = require('../models/category');

router.get('/', function(req, res, next){
    Category.find(function(err, categories){
        if (err) {return next(err);}
        res.json({'categories': categories});
    });
});

router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    Category.findById(id, function(err, categories) {
        if (err) { return next(err); }
        if (categories === null) {
            return res.status(404).json({'message': 'Category not found'});
        }
        res.json(categories);
    });
});

router.post('/', function(req, res, next) {
    var category = new Category(req.body);
    Category.save(function(err, category) {
        if(err) { return next(err); }
        res.status(201).json(Category);
    });
});

router.delete('/:id', function(req, res, next) {
    var id = req.params.id;
    Category.findOneAndDelete({_id: id}, function(err, category) {
        if (err) {return next(err); }
        if (category === null){
            return res.status(404).json({'message': 'Category not found'});
        }
        res.json(category)
    
        });
});

module.exports = router;