'use strict';

var Task = require('./task.model');
var error = require('../../components/errors');

function create(req, res, next) {
    var user = req.user;
    var task = new Task(req.body);

    task.user = {};
    task.user.id = user._id;
    task.user.name = user.name;
    task.user.phone = user.phone;
    task.active = true;


    task.saveAsync()
        .then((task) => {
            console.log(task);
            return res.status(200).end();
        })
        .catch((err) => {
            return error.handleError(res);
        });
}


function getByUser(req, res, next) {
    var userId = req.user._id;
    Task.findAsync({
        'user.id': userId
    }).then((arrayTasks) => {
        var response = {
            tasks: arrayTasks
        }
        return res.json(response);
    }).catch((err) => {
        error.handleError(res);
    });
}

function getAll(req, res, next) {
    Task.findAsync({
        active: true
    }).then((arrayTasks) => {
        var response = {
            tasks: arrayTasks
        }
        return res.json(response);
    }).catch((err) => {
        return error.handleError(res);
    });
}

module.exports = {
    create: create,
    getByUser: getByUser,
    getAll: getAll
}
