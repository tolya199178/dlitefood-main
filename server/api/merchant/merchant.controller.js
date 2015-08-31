'use strict';

var _ = require('lodash');
var Merchant = require('./merchant.model');

// Get list of merchants
exports.index = function(req, res) {
  Merchant.find(function (err, merchants) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(merchants);
  });
};

// Get a single merchant
exports.show = function(req, res) {
  Merchant.findById(req.params.id, function (err, merchant) {
    if(err) { return handleError(res, err); }
    if(!merchant) { return res.status(404).send('Not Found'); }
    return res.json(merchant);
  });
};

// Creates a new merchant in the DB.
exports.create = function(req, res) {
  Merchant.create(req.body, function(err, merchant) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(merchant);
  });
};

// Updates an existing merchant in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Merchant.findById(req.params.id, function (err, merchant) {
    if (err) { return handleError(res, err); }
    if(!merchant) { return res.status(404).send('Not Found'); }
    var updated = _.merge(merchant, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(merchant);
    });
  });
};

// Deletes a merchant from the DB.
exports.destroy = function(req, res) {
  Merchant.findById(req.params.id, function (err, merchant) {
    if(err) { return handleError(res, err); }
    if(!merchant) { return res.status(404).send('Not Found'); }
    merchant.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}