'use strict';

var Task = require('./task.model');
var error = require('../../components/errors');
var _ = require('lodash');

function create(req, res, next) {
    var user = req.user;
    var task = new Task(req.body);

    task.user = {};
    task.user.id = user._id;
    task.user.name = user.name;
    task.user.email = user.email;
    task.user.phone = user.phone;
    task.active = true;


    task.saveAsync()
        .then((task) => {
            return res.status(200).json(task).end();
        })
        .catch((err) => {
            return error.handleError(res);
        });
}


function getByUser(req, res, next) {
    var userId = req.user._id;
    Task.findAsync({
        'user.id': userId
    }, '-user').then((arrayTasks) => {
        var response = {
            tasks: arrayTasks
        }
        return res.json(response);
    }).catch((err) => {
        error.handleError(res);
    });
}

function getAll(req, res, next) {
    var user = req.user;
    Task.findAsync({
        active: true
    }).then((arrayTasks) => {

        var newArrayTasks = [];
        arrayTasks.forEach(function (record) {
            var task = record.toObject();
            task.isOwner = task.user.id.equals(user._id);
            var pos = _.findIndex(task.candidates, function (candidate) {
                return candidate.id.equals(user._id);
            })
            task.isCandidate = pos !== -1;

            delete task.user.id;
            delete task.user.email;
            delete task.candidates;

            newArrayTasks.push(task);
        });


        var response = {
            tasks: newArrayTasks
        };
        return res.json(response);
    }).catch((err) => {
        return error.handleError(res);
    });
}

function deactivate(req, res, next) {
    var taskId = req.params.id;
    var user = req.user;
    Task.findByIdAsync(taskId)
        .then((task) => {
            if (task.user.id.equals(user._id)) {
                task.active = false;
                return task.saveAsync()
                    .then(() => {
                        res.status(204).end();
                    })
                    .catch(error.validationError(res));
            } else {
                return res.status(403).end();
            }

        });
}

function apply(req, res, next) {
    var taskId = req.params.id;
    var user = req.user;

    var candidate = {};
    candidate.id = user._id;
    candidate.name = user.name;
    candidate.email = user.email;
    candidate.phone = user.phone;
    candidate.active = true;

    Task.findByIdAsync(taskId)
        .then((task) => {
            if (!task.user.id.equals(user._id)) {
                task.candidates.push(candidate);
                return task.saveAsync()
                    .then(() => {
                        res.status(204).end();
                    })
                    .catch(error.validationError(res));
            } else {
                return res.status(403).end();
            }
        });
}

function unapply(req, res, next) {
    var taskId = req.params.id;
    var user = req.user;
    Task.findByIdAsync(taskId)
        .then((task) => {

            var pos = _.findIndex(task.candidates, function (candidate) {
                return candidate.id.equals(user._id);
            })
            var isCandidate = pos !== -1;

            if (isCandidate) {
                task.candidates.splice(pos, 1);
                return task.saveAsync()
                    .then(() => {
                        res.status(204).end();
                    })
                    .catch(error.validationError(res));
            } else {
                return res.status(403).end();
            }

        });
}

module.exports = {
    create: create,
    getByUser: getByUser,
    getAll: getAll,
    deactivate: deactivate,
    apply: apply,
    unapply: unapply
}
