'use strict';

var models = require('../../models'),
    passport = require('passport'),
    config = require('../../config/environment'),
    jwt = require('jsonwebtoken'),
    _ = require('lodash'),
    staffSocket = require('./staff.socket');

var validationError = function(res, err) {
  return res.json(422, err);
};

var LIST_STAFF_ATTRIBUTE = [
    'name',
    'address',
    'postcode',
    'max_distance',
    'available_time',
    'location'
  ];

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

var LIST_CUSTOMER_ATTRIBUTE = [
    'name',
    'screen_name',
    'address',
    'address1',
    'city',
    'post_code',
    'dob',
    'verified',
    'status',
    'co_user',
    'co_company_name',
    'co_job_title',
    'co_total_employees',
    'co_pay_method'
  ];

var USER_STATUS = {
  ACTIVE: "1",
  DELIVERING: "2",
  INACTIVE: "3"
};


/**
 * Get list of staffs
 * restriction: 'admin'
 */
exports.index = function(req, res) {

  /*
    Set default value for parameters
  */
  var  keywordForName = req.query.name || "";
  var pageNumber = parseInt(req.query.pageNumber) || 1;
  var pageSize = parseInt(req.query.pageSize) || 20;

  if (keywordForName){
    var whereCondition = {
        name: {
          $like: '%' + keywordForName + '%'
        }
      }
  }
  else{
    var whereCondition = {};
  }

  try {
    models.Staffs.findAll({
      where: whereCondition,
      attributes: LIST_STAFF_ATTRIBUTE,
      offset: (pageNumber-1)*pageSize,
      limit: pageSize,
      include: [{model: models.Users, attributes: ['email', 'phoneno']}]
    }).then(function (users) {
       // get email/phoneno info from user
      res.json(200, {success: true, data: users});
    })
    .catch(function(exception){
      res.json(500, {success: false, data: exception.toString(), msg: 'Exception thrown !!!'});
    });;
  } catch (exception){
    res.json(500, {success: false, data: exception.toString(), msg: 'Exception thrown !!!'});
  }
};

/**
 * Get list of active user
 * restriction: 'admin'
 */
exports.getActiveStaff = function(req, res) {

  try {
    models.Users.findAll({
      where: {
        status: USER_STATUS.ACTIVE
      },
      attributes: LIST_STAFF_ATTRIBUTE
    }).then(function (users) {
      res.json(200, {success: true, data: users});
    })
    .catch(function(exception){
      res.json(500, {success: false, data: exception, msg: 'Exception thrown !!!'});
    });;
  } catch (exception){
    res.json(500, {success: false, data: exception, msg: 'Exception thrown !!!'});
  }
};



var USER_STATUS = {
  ACTIVE: "1",
  DISABLED: "2",
  INACTIVE: "3"
};

/**
 * Creates a new user
 * @param {email}
 * @param {phoneno}
 * @param {password}
 * @param {name}
 * @param {address}
 * @param {avaiable_time}
 * @param {postcode}
 * @param {role}
 * @result {Object} {sucess: true/false, id: 'in success case'}
 */

exports.create = function (req, res, next) {
  var newStaff = req.body;
  newStaff.provider = 'local';
  newStaff.role = newStaff.role.toString();
  if (!newStaff.email ||
      !newStaff.phoneno ||
      !newStaff.password ||
      !newStaff.name ||
      !newStaff.address ||
      !newStaff.available_time ||
      !newStaff.max_distance ||
      !newStaff.postcode ||
      !newStaff.role
      ){
    return res.json(400, {success: false, msg: 'You must pass in mandatory fields !'});
  }

  // Must create user-account first
  models.Users.createUser({
    email: newStaff.email,
    phoneno: newStaff.phoneno,
    password: newStaff.password,
    name: newStaff.name,
    role: newStaff.role,
    type: 'staff'
  }, function(result){

    // can't create user
    if (!result.success){
      return res.json(400, result);
    }

    // create staff with user info
    models.Staffs.create({
      name: newStaff.name,
      address: newStaff.address,
      postcode: newStaff.postcode,
      max_distance: newStaff.max_distance,
      available_time: newStaff.available_time,
      title: newStaff.title,
      location: newStaff.location || '',
      user_id: result.user.id
    }).then(function(staff){
      if (!staff) res.json(400, {success: false, msg: 'Unknow issue !!'});

      res.json(200, {success: true, staff: staff});
    })
    .catch(function(exception){
      res.json(500, {success: false, data: exception.toString(), msg: 'Exception thrown !!!'});
    });

  });

};


/**
 * Deletes a user
 * restriction: 'admin'
 * 
 */
exports.destroy = function(req, res) {
  if (!req.params.id){
    return res.json(400, {success: false, msg: 'You must pass in user !'});
  }

  try{
    models.Users
      .destroy({
        where: {
          id: req.params.id
        }
      })
      .then(function(result) {
        if(result != 1) return res.json(404,{success: false, data: 'Can\'t delete the user ' });
        return res.json(200, {success: true});
      })
      .catch(function(exception){
        res.json(500, {success: false, data: exception, msg: 'Exception thrown !!!'});
      });
  } catch (exception){
    res.json(500, {success: false, data: exception, msg: 'Exception thrown !!!'});
  }
  
};
