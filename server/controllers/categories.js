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
        res.status(200).json({'message': 'All categories have been deleted.'})
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
        res.status(200).json({'message': 'Category deleted'});
    
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
        category.categoryType.typeName = (req.body.categoryType.typeName || category.categoryType.typeName),
        category.categoryType.task = (req.body.categoryType.task || category.categoryType.task),
        category.categoryType.level = (req.body.categoryType.level || category.categoryType.level),
        category.categoryType.typeExperience = (req.body.categoryType.typeExperience || category.categoryType.typeExperience)
        category.save();
        res.status(200).json(category);
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
        category.categoryType.typeName = req.body.categoryType.typeName,
        category.categoryType.task = req.body.categoryType.task,
        category.categoryType.level = req.body.categoryType.level,
        category.categoryType.typeExperience = req.body.categoryType.typeExperience
        category.save();
        res.status(200).json(category);

    });
});

module.exports = router;