var express = require('express');
var router = express.Router();
var Category = require('../models/category');

//GET all categories.
router.get('/', function(req, res, next){
    Category.find(function(err, categories){
        if (err) {return next(err);}
        if (categories.length === 0) {
            return res.status(404).json({'message': 'There is no existing category!'});
        }
        res.status(200).json({'categories': categories});
    });
});

//GET category by id.
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    Category.findById(id, function(err, categories) {
        if (err) { return next(err); }
        if (categories === null) {
            return res.status(404).json({'message': 'Category not found'});
        }
        res.status(200).json(categories);
    });
});

//POST a category.
router.post('/', function(req, res, next) {
    var category = new Category(req.body);
    category.save(function(err, category) {
        if(err) { return next(err); }
        res.status(201).json(category);
    });
});

//DELETE category collection.
router.delete('/', function(req, res, next){
    Category.db.dropCollection("categories", function(err, categories){
        if (err) {return next(err); }
        if (categories === null){
            return res.status(404).json({'message': 'There is no category to delete!'});
        };
        res.status(202).json({'message': 'All categories have been deleted.'})
    });
});

//DELETE category by id.
router.delete('/:id', function(req, res, next) {
    var id = req.params.id;
    Category.findOneAndDelete({_id: id}, function(err, category) {
        if (err) {return next(err); }
        if (category === null){
            return res.status(404).json({'message': 'Category not found'});
        }
        res.status(202).json({'message': 'Category deleted'});
    
        });
});

//PATCH category by id.
router.patch('/:id', function(req, res, next) {
    var id = req.params.id;
    Category.findById(id, function(err, category){
        if(err) {return next(err);}
        if(category == null){
            return res.status(404).json({"message": "Category not found"});
        }
        category.task = (req.body.task || category.task),
        category.typeName = (req.body.typeName || category.typeName),
        category.level = (req.body.level || category.level),
        category.experiencePoints = (req.body.experiencePoints || category.experiencePoints)
        category.save();
        res.status(201).json(category);
    });
});

//PUT category by id.
router.put('/:id', function(req, res, next) {
    var id = req.params.id;
    Category.findById(id, function(err, category) {
        if(err) {return next(err);}
        if(category == null) {
            return res.status(404).json({"message": "Category not found"});
        }
        category.task = req.body.task,
        category.typeName = req.body.typeName,
        category.level = req.body.level,
        category.experiencePoints = req.body.experiencePoints
        category.save();
        res.json(200).json(category);

    });
});

module.exports = router;