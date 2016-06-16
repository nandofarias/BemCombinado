'use strict';

var express = require('express');
var controller = require('./user.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.hasRole('admin'), controller.index);
router.get('/me', auth.isAuthenticated(), controller.me);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.post('/', controller.create);
router.post('/forgot', controller.forgotPassword);
router.post('/reset/:token', controller.resetPassword);

module.exports = router;