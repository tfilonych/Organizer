var mongoose = require('mongoose'),
    Task = require('mongoose').model('Task');

exports.createTask = function(req, res) {
    var task = new Task(req.body);
    task.taskName = req.body.taskName;
    task.date = req.body.date;
    task.user_id = req.user._id;
    task.category = req.body.category;
    task.status = "progress";
    task.save(function (err, task) {
        if (err) {return next(err);}
        res.json(task);
    });
};

exports.getTasks = function (req, res) {
        Task.find({user_id: req.user._id},function(err, tasks) {
            if (err) {return next(err);}
            res.send(tasks);
        });
};

exports.updateTask = function(req, res) {
   var status = req.body.task.status;
   var taskname = req.body.task.taskName;
   Task.update({_id: req.body.task._id}, {taskName: taskname, status: status}, function(err, data) {
       if (err) {return next(err);}
       res.send("ok");
   })
};

exports.delTask = function(req, res) {
    var id = req.params.id;
    Task.remove({_id: id}, function(err, data) {
        if(err) {return next(err);}
        res.send('task has been deleted');
    });
};
