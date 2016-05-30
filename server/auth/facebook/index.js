'use strict';

var express = require('express');
var passport = require('passport');
var authService = require('../auth.service');

var router = express.Router();

router
    .get('/', passport.authenticate('facebook', {
        scope: ['email', 'user_about_me'],
        failureRedirect: '/signup',
        session: false
    }))
    .get('/callback', passport.authenticate('facebook',{
        failureRedirect: '/signup',
        session: false
    }), authService.setTokenCookie);

module.exports = router;
