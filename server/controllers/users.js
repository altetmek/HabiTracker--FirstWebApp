var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/api/users', function(req, res, next){
    User.find(function(err, users){
        if (err) {return next(err);}
        res.json({'users': users});
    });
});