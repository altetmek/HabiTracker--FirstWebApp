var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/', function(req, res, next){
    User.find(function(err, users){
        if (err) {return next(err);}
        if (users.length === 0) {
            return res.status(404).json({'message': 'There is no existing user!'});
        }
        res.status(200).json({'users': users});
    });
});

router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    User.findById(id, function(err, users) {
        if (err) { return next(err); }
        if (users === null) {
            return res.status(404).json({'message': 'User not found'});
        };
        res.status(200).json(users);
    });
});

router.post('/', function(req, res, next) {
    var user = new User(req.body);
    user.save(function(err, user) {
        if(err) { return next(err); }
        res.status(201).json(user);
    });
});

router.delete('/', function(req, res, next){
    User.db.dropCollection("users", function(err, users){
        if (err) {return next(err); }
        if (users === null){
            return res.status(404).json({'message': 'There is no user to delete!'});
        };
        res.status(202).json({'message': 'All users has been deleted.'})
    });
});

router.delete('/:id', function(req, res, next) {
    var id = req.params.id;
    User.findOneAndDelete({_id: id}, function(err, user) {
        if (err) {return next(err); }
        if (user === null){
            return res.status(404).json({'message': 'User not found'});
        };
        res.status(202).json({'message': 'User deleted'})
    
        });
});

router.patch('/:id', function(req, res, next) {
    var id = req.params.id;
    User.findById(id, function(err, user){
        if(err) {return next(err);}
        if(user == null){
            return res.status(404).json({"message": "User not found"});
        }
        user.title = (req.body.title || user.title),
        user.experiencePoints = (req.body.experiencePoints || user.experiencePoints),
        user.level = (req.body.level || user.level),
        user.username = (req.body.username || user.username)
        user.save();
        res.status(201).json(user);
    })
})

module.exports = router;