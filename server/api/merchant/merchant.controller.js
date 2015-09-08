'use strict';

var models          = require('../../models'),
    passport        = require('passport' ),
    config          = require('../../config/environment' ),
    _               = require('lodash' ),
    merchantSocket  = require('./merchant.socket');


var LIST_MERCHANT_ATTRIBUTE = [
  'name',
  'picture',
  'time',
  'notes',
  'charges',
  'steps',
  'min_order',
  'opening_hours',
  'category',
  'is_delivery',
  'special_offer',
  'status',
  'food'
];

var MERCHANT_STATUS = {
  ACTIVE: "1",
  INACTIVE: "2"
};

// Get list of merchants
exports.index = function(req, res) {

  console.log('inside merchants');

try {

  models.Merchants.findAll({
    include: [{model: models.Users, attributes: ['email', 'phoneno']}]
  } ).then( function (merchants) {
    return res.json(200, {success: true, data: merchants });
  } ).catch( function (exception) {

    return res.json(500, {success: false, data: exception.toString(), msg: 'Exception thrown. Please review request'});
  });

} catch (exception) {
  return res.json(500, {
    success: false,
    data: exception.toString(),
    msg: 'Exception was thrown. Please review request data'
  });
}

};

// Get a single merchant
exports.show = function(req, res) {
};

// Creates a new merchant in the DB.
exports.create = function(req, res) {
};

// Updates an existing merchant in the DB.
exports.update = function(req, res) {
};

// Deletes a merchant from the DB.
exports.destroy = function(req, res) {
};

function handleError(res, err) {
  return res.status(500).send(err);
}
