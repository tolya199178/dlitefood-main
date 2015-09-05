'use strict';

var _ = require('lodash');

// Get list of merchants
exports.index = function(req, res) {
  
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