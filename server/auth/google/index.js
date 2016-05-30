'use strict';

var express = require('express');
var passport = require('passport');
var authService = require('../auth.service');

var router = express.Router();

router
    .get('/', passport.authenticate('google',{
        failureRedirect: '/signup',
        scope: [
            'profile',
            'email'
        ],
        session: false
    }))
    .get('/callback', passport.authenticate('google',{
        failureRedirect: '/signup',
        session: false
    }), authService.setTokenCookie);

module.exports = router;
