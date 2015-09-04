'use strict';

var express = require('express');
var controller = require('./user.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.hasPermission('STAFF_MANAGEMENT', 'READ'), controller.index);
router.get('/activeStaff', auth.hasPermission('STAFF_MANAGEMENT', 'READ'), controller.getActiveStaff);
router.delete('/:id', auth.hasPermission('STAFF_MANAGEMENT', 'DELETE'), controller.destroy);
router.put('/updateUserInfo/:id', auth.hasPermission('STAFF_MANAGEMENT', 'UPDATE'), controller.update);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
// router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', auth.hasPermission('STAFF_MANAGEMENT', 'CREATE'), controller.create);
router.put('/updateLocation', auth.isAuthenticated(), controller.updateLocation);
router.put('/changeStatus', auth.isAuthenticated(), controller.changeStatus);

module.exports = router;
