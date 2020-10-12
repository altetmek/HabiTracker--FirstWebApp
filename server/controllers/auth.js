var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/', function(req, res, next){
    var user = req.body.username;
    var pass = req.body.password;
    console.log(user);
    console.log(pass);
    User.findOne({username: user, password: pass})
    .exec()
    .then(result => {
        if (result === null) {
            res.status(404).json({loggedIn: false});
        }else {
            res.status(200).json({
                id: result._id,
                email: result.email,
                username: result.username,
                loggedIn: true
            })
        }
    });
});

module.exports = router