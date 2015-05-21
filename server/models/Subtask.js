var mongoose = require('mongoose');

var subtaskSchema = mongoose.Schema({
    text: String,
    task_id: {type: mongoose.Schema.ObjectId, ref: 'Task'}
});

var Subtask = mongoose.model('Subtask', subtaskSchema);



