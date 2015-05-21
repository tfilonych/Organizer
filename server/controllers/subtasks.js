var mongoose = require('mongoose'),
    Subtask = require('mongoose').model('Subtask');

exports.saveSubtask = function(req, res) {
    var subtask = new Subtask(req.body);
    subtask.text = req.body.text;
    subtask.save(function (err, subtask) {
        if (err) {return next(err);}
        res.json(subtask);
    });
};

exports.getAll = function(req, res) {
    Subtask.find({task_id: req.params.id},function(err, subtask) {
        if (err) {return next(err);}
        res.send(subtask);
    });
};

exports.removeSubTask = function(req, res) {
    var id = req.params.id;
    Subtask.remove({_id: id}, function(err, data) {
        if(err) {return next(err);}
        res.send('ok');
    });
};

