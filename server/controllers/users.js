var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/', function(req, res, next){
    User.find(function(err, users){
        if (err) {return next(err);}
        if (users.length === 0) {
            return res.status(404).json({'message': 'There is no existing user!'});
        }
        res.json({'users': users});
    });
});

router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    User.findById(id, function(err, users) {
        if (err) { return next(err); }
        if (users === null) {
            return res.status(404).json({'message': 'User not found'});
        }
        res.json(users);
    });
});

router.post('/', function(req, res, next) {
    var user = new User(req.body);
    user.save(function(err, user) {
        if(err) { return next(err); }
        res.status(201).json(user);
    });
});

router.delete('/:id', function(req, res, next) {
    var id = req.params.id;
    User.findOneAndDelete({_id: id}, function(err, user) {
        if (err) {return next(err); }
        if (user === null){
            return res.status(404).json({'message': 'User not found'});
        }
        res.json(user)
    
        });
});

module.exports = router;