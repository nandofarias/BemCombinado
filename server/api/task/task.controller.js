'use strict';

var Task = require('./task.model');

function create(req, res, next) {
    var user = req.user;
    var task = new Task(req.body);

    task.user = {};
    task.user.id = user._id;
    task.user.name = user.name;
    task.user.phone = user.phone;


    task.saveAsync()
        .then((task) => {
            res.status(200).end();
        })
        .catch((err) => {
            next(err);
        });
}

module.exports = {
    create: create
}
