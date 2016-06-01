'use strict';

var express = require('express');
var passport = require('passport');
var authService = require('../auth.service');

var router = express.Router();

router
    .get('/', passport.authenticate('twitter', {
        failureRedirect: '/',
        session: false
    }))
    .get('/callback', passport.authenticate('twitter', {
        failureRedirect: '/',
        session: false
    }), authService.setTokenCookie);

module.exports = router
