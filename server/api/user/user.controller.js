'use strict';

var User = require('./user.model');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var error = require('../../components/errors');

function index(req, res) {
    User.findAsync({}, '-salt -password')
        .then((users) =>{
            res.status(200).json(users);
        })
        .catch(error.handleError(res));
}

function create(req, res, next) {
    var newUser = new User(req.body);
    newUser.provider = 'local';
    newUser.role = 'user';
    newUser.saveAsync()
        .then((user) => {
            var token = jwt.sign({ _id: user._id, role: user.role}, config.secrets.session, {
                expiresIn: 60 * 60 * 5
            });
            res.json({ token });
        })
        .catch(error.validationError(res));
}

function me(req, res, next) {
    var userId = req.user._id;

    User.findOneAsync({ _id: userId }, '-salt -password')
        .then(function(user){ // don't ever give out the password or salt
            if (!user) {
                return res.status(401).end();
            }
            return res.json(user);
        })
        .catch(function(err){
            return error.handleError(res);
        });
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
            error.handleError(res);
        });
}

function destroy(req, res) {
    User.findByIdAndRemoveAsync(req.params.id)
        .then(() => {
            res.status(204).end();
        })
        .catch(error.handleError(res));
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
                    .catch(error.validationError(res));
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
    me: me,
    changePassword: changePassword,
    authCallback: authCallback
}