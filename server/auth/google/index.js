'use strict';

var express = require('express');
var passport = require('passport');
var authService = require('../auth.service');

var router = express.Router();

router
    .get('/', passport.authenticate('google',{
        failureRedirect: '/',
        scope: [
            'profile',
            'email'
        ],
        session: false
    }))
    .get('/callback', passport.authenticate('google',{
        failureRedirect: '/',
        session: false
    }), authService.setTokenCookie);

module.exports = router;
