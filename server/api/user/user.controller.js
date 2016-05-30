'use strict';

var User = require('./user.model');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');


function validationError(res, statusCode) {
    statusCode = statusCode || 422;
    return function(err) {
        res.status(statusCode).json(err);
    }
}

function handleError(res, statusCode) {
    statusCode = statusCode || 500;
    return function(err) {
        res.status(statusCode).send(err);
    };
}

function index(req, res) {
    User.findAsync({}, '-salt -password')
        .then((users) =>{
            res.status(200).json(users);
        })
        .catch(handleError(res));
}

function create(req, res, next) {
    var newUser = new User(req.body);
    newUser.provider = 'local';
    newUser.role = 'user';
    newUser.saveAsync()
        .then((user) => {
            var access_token = jwt.sign({ _id: user._id, role: user.role}, config.secrets.session, {
                expiresIn: 60 * 60 * 5
            });
            res.json({ access_token });
        })
        .catch(validationError(res));
}

function show(req, res, next) {
    var userId = req.params.id;

    User.findById(userId)
        .then((user) => {
            if(!user){
                return res.status(404).end();
            }
            res.json(user.profile);
        })
        .catch((err) => {
            next(err);
        });
}

function destroy(req, res) {
    User.findByIdAndRemoveAsync(req.params.id)
        .then(() => {
            res.status(204).end();
        })
        .catch(handleError(res));
}

function changePassword(req, res, next) {
    var userId = req.user._id;
    var oldPass = String(req.body.oldPassword);
    var newPass = String(req.body.newPassword);

    User.findByIdAsync(userId)
        .then((user) => {
            if(user.authenticate(oldPass)){
                user.password = newPass;
                return user.saveAsync()
                    .then(() => {
                        res.status(204).end();
                    })
                    .catch(validationError(res));
            } else {
                return res.status(403).end();
            }
        });
}

function authCallback(req, res, next) {
    res.redirect('/');
}

module.exports = {
    index: index,
    create: create,
    show: show,
    destroy: destroy,
    changePassword: changePassword,
    authCallback: authCallback
}