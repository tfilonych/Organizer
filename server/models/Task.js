var mongoose = require('mongoose');



var taskSchema = mongoose.Schema({
    user_id : {  type: mongoose.Schema.ObjectId, ref : 'User'},
    taskName: {type: String},
    date : {type: Date, default: Date.now},
    status: String,
    category: String
});

var Task = mongoose.model('Task', taskSchema);

