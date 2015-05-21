var mongoose = require('mongoose'),
    users = require('../controllers/users'),
    tasks = require('../controllers/tasks'),
    subtasks = require('../controllers/subtasks'),
    auth = require('../config/auth');


module.exports = function(app) {

    app.get('/partials/:partialPath', function (req, res) {
        res.render('partials/' + req.params.partialPath);
    });

    app.post('/login', auth.authenticate);
    app.post('/logout', function(req, res) {
        req.logout();
        req.session.destroy();
        res.end();
    });

    app.post('/user', users.createUser);
    app.get('/user', users.getCurrentUser);

    app.get('/tasks', tasks.getTasks);
    app.post('/tasks', tasks.createTask);
    app.put('/tasks', tasks.updateTask);
    app.del('/tasks/:id', tasks.delTask);

    app.post( '/subtasks', subtasks.saveSubtask);
    app.get( '/subtasks/:id', subtasks.getAll);
    app.del( '/subtasks/:id', subtasks.removeSubTask);

    app.get('*', function (req, res) {
        res.render('index', {bootstrappedUser: req.user});
    });


};



