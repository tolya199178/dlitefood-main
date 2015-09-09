'use strict';

var models          = require('../../models'),
    passport        = require('passport' ),
    config          = require('../../config/environment' ),
    _               = require('lodash' );


// Creates a new order in the DB.
exports.create = function(req, res) {
  var newOrder = req.body;

  console.log(newOrder.acceptance_time);
  if (!newOrder.customer_id ||
      !newOrder.merchant_id ||
      !newOrder.merchant_type ||
      !newOrder.delivery_type ||
      !newOrder.transaction_id ||
      !newOrder.transaction_details ||
      !newOrder.payment_type ||
      !newOrder.total ||
      !newOrder.details ||
      !newOrder.note ||
      !newOrder.status ||
      !newOrder.acceptance_time
      ){
    return res.json(400, {success: false, msg: 'Please ensure to pass the required parameters to api!'});
  }

  // create merchant with user info
  models.Orders.create(newOrder).then(function(order){
    if (!order) res.json(400, {success: false, msg: 'Unknow issue !!'});

    res.json(200, {success: true, data: order});
  })
  .catch(function(exception){
    handlerException (res, exception);
  });

};

function handlerException (res, ex){
  res.json(500, {success: false, data: ex.toString(), msg: 'Exception thrown !!!'});
}
