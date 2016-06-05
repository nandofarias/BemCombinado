'use strict';

var express = require('express');
var controller = require('./task.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.post('/', auth.isAuthenticated(), controller.create);
router.get('/mine', auth.isAuthenticated(), controller.getByUser);
router.get('/', auth.isAuthenticated(), controller.getAll);


module.exports = router;