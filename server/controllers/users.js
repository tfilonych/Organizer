var mongoose = require('mongoose'),
    User = require('mongoose').model('User'),
    encrypt = require('../utilities/encryption');


exports.getUser = function(req, res, next) {
    console.log(req.user);
    var user_id = req.body.id;
    console.log(user_id);
    User.find({_id: user_id}).exec(function (err, user) {
        if(err) {return next(err);}
        if (!!user) {
            next();
        }
    })
};

exports.createUser = function(req, res, next) {
    var userData = req.body;
    userData.username = userData.username.toLowerCase();
    userData.salt = encrypt.createSalt();
    userData.hashed_pwd = encrypt.hashPwd(userData.salt, userData.password);
    User.create(userData, function(err, user) {
        if(err) {
            if(err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate Username');
            }
            res.status(400);
            return res.send({reason:err.toString()});
        }
        req.logIn(user, function(err) {
            if(err) {return next(err);}
            res.send(user);
        })
    })
};

exports.getCurrentUser = function(req, res) {
    if(!req.session.user) {
        res.send(401,'not authorized');
    }else {
        res.send(req.user);
    }
};
