'use strict';

var express = require('express');
var passport = require('passport');
var authService = require('../auth.service');

var router = express.Router();

router
    .get('/', passport.authenticate('twitter', {
        failureRedirect: '/signup',
        session: false
    }))
    .get('/callback', passport.authenticate('twitter', {
        failureRedirect: '/signup',
        session: false
    }), authService.setTokenCookie);

module.exports = router
