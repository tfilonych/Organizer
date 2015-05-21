var express = require('express'),
    passport = require('passport'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    mongoose = require('mongoose'),
    MongoStore = require('connect-mongo')(session);


module.exports = function(app, config) {
    app.set('views', config.rootPath + '/server/views');
    app.set('view engine', 'jade');
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(express.cookieParser());
    app.use(express.static(config.rootPath + '/public'));
    app.use(session({
        cookieName: 'session',
        secret: 'random_string_goes_here',
        resave: false,
        saveUninitialized: true,
        store: new MongoStore({mongooseConnection: mongoose.connection})
    }));
    app.use(passport.initialize());
    app.use(passport.session());
};
