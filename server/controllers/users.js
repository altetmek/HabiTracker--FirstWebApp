var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Achievement = require('../models/achievement');
var Budget = require('../models/budget');
var Category = require('../models/category');
var achievementController = require('../controllers/achievements');
const user = require('../models/user');

//POST achievement to a user by id.
router.post('/:id/achievements', function(req, res, next){
    var id = req.params.id;
    User.findById(id).populate('achievement').exec(function(err, user){
        if (err) { return next(err); }
        if (user === null) {
            return res.status(404).json({'message': 'User not found'});
        };
        var achievement = new Achievement(req.body);
        achievement.experiencePoints = achievementController.degree(req);
        achievement.save();
        user.achievement.push(achievement);
        user.save();
        res.status(201).json(achievement);
    });
});

//POST budget to a user by id.
router.post('/:id/budgets', function(req, res, next){
    var id = req.params.id;
    User.findById(id).populate('budget').exec(function(err, user){
        if (err) { return next(err); }
        if (user === null) {
            return res.status(404).json({'message': 'User not found'});
        };
        var budget = new Budget(req.body);
        budget.save();
        user.budget.push(budget);
        user.save();
        res.status(201).json(budget);
    });
});

//POST category to a user by id.
router.post('/:id/categories', function(req, res, next){
    var id = req.params.id;
    User.findById(id).populate('category').exec(function(err, user){
        if (err) { return next(err); }
        if (user === null) {
            return res.status(404).json({'message': 'User not found'});
        };
        var category = new Category(req.body);
        category.save();
        user.category.push(category);
        user.save();
        res.status(201).json(category);
    });
});

//GET achievement(s) user has by user id.
router.get('/:id/achievements', function(req, res, next) {
    var id = req.params.id;
    User.findById(id, async function(err, user) {
        if (err) { return next(err); }
        if (user === null) {
            return res.status(404).json({'message': 'User not found'});
        };
        if(user.achievement.length === 0) {
            return res.status(404).json({'message': 'User has no achievements.'})
        };
        var arr = [];
        for(el of user.achievement) {
            var achievement = await Achievement.findById(el).exec(); 
            arr.push(achievement);
        }
        res.status(200).json(arr);
    });
});

//GET specific achievement from specific user by id.
router.get('/:id/achievements/:idAch', function(req, res, next) {
    var id = req.params.id;
    var idAchievement = req.params.idAch;
    User.findById(id, function(err, user) {
        if (err) { return next(err); }
        if (user === null) {
            return res.status(404).json({'message': 'User not found'});
        };
        Achievement.findById(idAchievement, function(err, achievement) {
            if (err) { return next(err); }
            if (achievement === null) {
                return res.status(404).json({'message': 'Achievement not found'});
            };
            res.status(200).json(achievement);
        });
    });
});

//DELETE a specific achievement from a specific user by id.
router.delete('/:id/achievements/:idAch', function(req, res, next) {
    var id = req.params.id;
    var idAch = req.params.idAch;
    User.findById(id, function(err, user){
        if (err) { return next(err); }
        if (user === null) {
            return res.status(404).json({'message': 'User not found'});
        };
        user.achievement.pull(idAch);
        user.save()
        Achievement.findByIdAndDelete(idAch, function(err, achievement){
            if (err) { return next(err); };
            res.status(200).json({'message': 'Achievement deleted succesfully!'});
        });
    }); 
});

//GET all users.
router.get('/', function(req, res, next){
    User.find(function(err, users){
        if (err) {return next(err);}
        if (users.length === 0) {
            return res.status(404).json({'message': 'There is no existing user!'});
        }
        res.status(200).json({'users': users});
    });
});

//GET user by id.
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

//POST a user.
router.post('/', function(req, res, next) {
    var user = new User(req.body);
    user.save(function(err, user) {
        if(err) { return next(err); }
        res.status(201).json(user);
    });
});

//DELETE user collection.
router.delete('/', function(req, res, next){
    User.db.dropCollection("users", function(err, users){
        if (err) {return next(err); }
        if (users === null){
            return res.status(404).json({'message': 'There is no user to delete!'});
        };
        res.status(200).json({'message': 'All users have been deleted.'})
    });
});

//DELETE a user by id.
router.delete('/:id', function(req, res, next) {
    var id = req.params.id;
    User.findOneAndDelete({_id: id}, function(err, user) {
        if (err) {return next(err); }
        if (user === null){
            return res.status(404).json({'message': 'User not found'});
        };
        res.status(200).json({'message': 'User deleted'})
    
        });
});

//PATCH user by id.
router.patch('/:id', function(req, res, next) {
    var id = req.params.id;
    User.findById(id, function(err, user){
        if(err) {return next(err);}
        if(user == null){
            return res.status(404).json({"message": "User not found"});
        }
        user.email = (req.body.email || user.email),
        user.password = (req.body.password || user.password),
        user.title = (req.body.title || user.title),
        user.experiencePoints = (req.body.experiencePoints || user.experiencePoints),
        user.level = (req.body.level || user.level),
        user.username = (req.body.username || user.username)
        user.save();
        res.status(200).json(user);
    })
})

//PUT user by id.
router.put('/:id', function(req,res,next) {
    var id = req.params.id;
    User.findById(id, function(err, user) {
        if (err) {return next(err);}
        if (user == null) {
            return res.status(404).json({"message": "User not found"})
        }
        user.email = req.body.email,
        user.password = req.body.password,
        user.username = req.body.username,
        user.level = req.body.level,
        user.title = req.body.title,
        user.experiencePoints = req.body.experiencePoints
        user.save();
        res.status(200).json(user);

    });
});

module.exports = router;