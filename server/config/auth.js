var passport = require('passport');

exports.authenticate = function(req, res, next) {
    req.body.username =  req.body.username.toLowerCase();
    var auth = passport.authenticate('local', function(err, user) {
        if(err) {return next(err);}
        if(!user) {res.send({success: false})}
        req.logIn(user, function(err) {
            if(err) {return next(err);}
            req.session.user = user._id;
            res.send({success:true, user: user});
        });
    });
    auth(req, res, next);
};
