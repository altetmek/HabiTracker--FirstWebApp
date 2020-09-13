var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/', function(req, res, next){
    User.find(function(err, users){
        if (err) {return next(err);}
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

router.patch('/users/:id', function(req, res) {
    var id = re.params.id;
    var users = users[id];
    var updated_users = {
        "_id": id,
        "title": req.body.title,
        "experience_points": req.body.experiencePoints,
        "level": req.body.level,
        "username": req.body.username

    };
    user[id] = updated_users;
    res.json(updated_users);
})

module.exports = router;