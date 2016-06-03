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
    candidates: [],
    created_at: Date,
    updated_at: Date
});




module.exports = mongoose.model('Task', TaskSchema);