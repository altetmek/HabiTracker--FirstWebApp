var express = require('express');
var router = express.Router();
var Achievement = require('../models/achievement');

const bronze = 10;
const silver = 20;
const gold = 30;

router.get('/', function(req, res, next){
    Achievement.find(function(err, achievements){
        if (err) {return next(err);}
        res.json({'achievements': achievements});
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

module.exports = router;