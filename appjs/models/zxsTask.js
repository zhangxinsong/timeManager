var mongoose = require('mongoose');

var zxsTaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    taskTime: {
        type: String,
        required: true
    },
    isRemind: {
        type: Boolean,
        default: true
    },
    taskType: String,
    taskDes: String,
    userId: {
        type: String,
        unique: true
    },
    isFinished: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('zxsTask',zxsTaskSchema);