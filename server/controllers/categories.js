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

router.patch('/categories/:id', function(req, res) {
    var id = re.params.id;
    var categories = categories[id];
    var updated_categories = {
        "_id": id,
        "type": req.body.type,
        "task": req.body.task,
        "level": req.body.level,
        "experience_points": req.body.experiencePoints

    };
    category[id] = updated_categories;
    res.json(updated_categories);
})

module.exports = router;