var express = require('express');
var router = express.Router();
var Achievement = require('../models/achievement');

const bronze = 10;
const silver = 20;
const gold = 30;

//GET all achievements.
router.get('/', function(req, res, next){
    Achievement.find(function(err, achievements){
        if (err) {return next(err);}
        if (achievements.length === 0) {
            return res.status(404).json({'message': 'There is no existing achievement!'});
        }
        res.status(200).json({'achievements': achievements});
    });
});

//GET achievement by id.
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    Achievement.findById(id, function(err, achievements) {
        if (err) { return next(err); }
        if (achievements === null) {
            return res.status(404).json({'message': 'Achievement not found'});
        }
        res.status(200).json(achievements);
    });
});

//Function to return experiencePoints related to the degree.
function degree(req) {
    var degree = req.body.degree;
    switch (degree) {
        case 'Bronze':
            return req.body.experiencePoints = bronze;

        case 'Silver':
            return req.body.experiencePoints = silver;
            
        case 'Gold':
            return req.body.experiencePoints = gold;

    };  
};

//POST an achievement.
router.post('/', function(req, res, next) {
    var achievement = new Achievement(req.body);
    achievement.experiencePoints = degree(req);
    achievement.save(function(err, achievement) {
        if(err) { return next(err); }
        res.status(201).json(achievement);
    });
});

//DELETE achievement collection
router.delete('/', function(req, res, next){
    Achievement.db.dropCollection("achievements", function(err, achievements){
        if (err) {return next(err); }
        if (achievements === null){
            return res.status(404).json({'message': 'There is no achievement to delete!'});
        };
        res.status(202).json({'message': 'All achievements have been deleted.'})
    });
});

//DELETE achievement by id.
router.delete('/:id', function(req, res, next) {
    var id = req.params.id;
    Achievement.findOneAndDelete({_id: id}, function(err, achievement) {
        if (err) {return next(err); }
        if (achievement === null){
            return res.status(404).json({'message': 'Achievement not found'});
        }
        res.status(202).json({'message': 'Achievement deleted.'})
    
        });
});

//PATCH an achievement by id.
router.patch('/:id', function(req, res, next) {
    var id = req.params.id;
    Achievement.findById(id, function(err, achievement){
        if(err) {return next(err);}
        if(achievement == null){
            return res.status(404).json({"message": "Achievement not found"});
        }
        achievement.experiencePoints = degree(req);
        achievement.type = (req.body.type || achievement.type),
        achievement.name = (req.body.name || achievement.name),
        achievement.degree = (req.body.degree || achievement.degree),
        achievement.description = (req.body.description || achievement.description)
        achievement.save();
        res.status(201).json(achievement);
    });
});

//PUT achievement by id.
router.put('/:id', function(req,res,next) {
    var id = req.params.id;
    Achievement.findById(id, function(err, achievement) {
        if (err) {return next(err);}
        if (achievement == null) {
            return res.status(404).json({"message": "Achievement not found"})
        }
        achievement.experiencePoints = degree(req);
        achievement.type = req.body.type,
        achievement.name = req.body.name,
        achievement.degree = req.body.degree,
        achievement.description = req.body.description
        achievement.save();
        res.status(200).json(achievement);

    });
});

module.exports = router;