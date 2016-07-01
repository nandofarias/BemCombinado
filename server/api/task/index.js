'use strict';

var express = require('express');
var controller = require('./task.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.post('/', auth.isAuthenticated(), controller.create);
router.get('/mine', auth.isAuthenticated(), controller.getByUser);
router.get('/', auth.isAuthenticated(), controller.getAll);
router.put('/:id/deactivate', auth.isAuthenticated(), controller.deactivate);
router.put('/:id/apply', auth.isAuthenticated(), controller.apply);
router.put('/:id/unapply', auth.isAuthenticated(), controller.unapply);
router.get('/admin', auth.hasRole('admin'),controller.getAllAdmin);

module.exports = router;