'use strict';

var mongoose =  require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
    title: String,
    details: String,
    location:  {},
    when: Date,
    value: Number,
    user: {},
    active: Boolean,
    candidates: [],
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});


TaskSchema.pre('save', function (next) {
    var now = new Date();
    this.updated_at = now;

    if(!this.created_at){
        this.created_at = now;
    }


    next();
});



module.exports = mongoose.model('Task', TaskSchema);