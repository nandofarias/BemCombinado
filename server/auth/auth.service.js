'user strict';

var express = require('express');
var config = require('../config/environment');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var compose = require('composable-middleware');
var User = require('../api/user/user.model');

var validateJwt = expressJwt({
    secret: config.secrets.session
});


function isAuthenticated() {
    return compose()
            .use((req, res, next) => {
            if(req.query && req.query.hasOwnProperty('access_token')){
        req.headers.authorization = 'Bearer ' + req.query.access_token;
    }
    validateJwt(req, res, next);
})
.use((req, res, next) => {
        User.findByIdAsync(req.user._id)
        .then((user) => {
        if(!user){
        return res.status(401).end();
    }
    req.user = user;
    return next();
})
.catch((err) => {
        return next(err);
});
});
}


function hasRole(roleRequired) {
    if(!roleRequired){
        throw new Error('Informe a role necessaria')
    }

    return compose()
            .use(isAuthenticated())
            .use((req, res, next) => {
            if( config.userRoles.indexOf(req.user.role) >=
        config.userRoles.indexOf(roleRequired)) {
        next();
    } else {
        res.status(403).send('Forbidden');
    }
});
}

function signToken(id, role) {
    return jwt.sign({
        _id: id,
        role: role
    }, config.secrets.session, {
        expiresIn: 60 * 60 * 5
    });
}

function setTokenCookie(req, res) {
    if(!req.user){
        return res.status(404).send("Me parece que voce nao esta logado");
    }

    var token = signToken(req.user._id, req.user.role);
    res.cookie('token', token);
    res.redirect('/');
}

module.exports = {
    isAuthenticated: isAuthenticated,
    hasRole: hasRole,
    signToken: signToken,
    setTokenCookie: setTokenCookie
}


