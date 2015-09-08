'use strict';

var express = require('express');
var controller = require('./merchant.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');


var router = express.Router();

router.get('/', auth.hasPermission('MERCHANT_MANAGEMENT', 'Read'), controller.index);

module.exports = router;
