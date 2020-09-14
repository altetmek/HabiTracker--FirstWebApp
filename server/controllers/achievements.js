var express = require('express');
var router = express.Router();
var Achievement = require('../models/achievement');

const bronze = 10;
const silver = 20;
const gold = 30;

router.get('/', function(req, res, next){
    Achievement.find(function(err, achievements){
        if (err) {return next(err);}
        if (achievements.length === 0) {
            return res.status(404).json({'message': 'There is no existing achievement!'});
        }
        res.status(200).json({'achievements': achievements});
    });
});

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

router.post('/', function(req, res, next) {
    var achievement = new Achievement(req.body);
    achievement.experiencePoints = degree(req);
    achievement.save(function(err, achievement) {
        if(err) { return next(err); }
        res.status(201).json(achievement);
    });
});

router.delete('/:id', function(req, res, next) {
    var id = req.params.id;
    Achievement.findOneAndDelete({_id: id}, function(err, achievement) {
        if (err) {return next(err); }
        if (achievement === null){
            return res.status(404).json({'message': 'Achievement not found'});
        }
        res.status(200).json(achievement)
    
        });
});

router.patch('/:id', function(req, res, next) {
    var id = req.params.id;
    User.findById(id, function(err, achievement){
        if(err) {return next(err);}
        if(achievement == null){
            return res.status(404).json({"message": "User not found"});
        }
        achievement.description = (req.body.description || achievement.description),
        achievement.name = (req.body.name || achievement.name),
        achievement.goal = (req.body.goal || achievement.goal),
        achievement.degree = (req.body.degree || achievement.degree)
        achievement.experiencePoints = (req.body.experiencePoints || achievement.experiencePoints)
        achievement.save();
        res.status(201).json(achievement);
    })
})

module.exports = router;