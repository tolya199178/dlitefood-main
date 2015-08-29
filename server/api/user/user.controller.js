'use strict';

var models = require('../../models');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');

var validationError = function(res, err) {
  return res.json(422, err);
};

var LIST_STAFF_ATTRIBUTE = [
        'staff_id',
        'staff_email',
        'staff_name',
        'staff_address',
        'staff_phoneno',
        'staff_postcode',
        'staff_max_distance',
        'staff_available_time',
        'staff_location'
      ];

/**
 * Get list of staffs
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  try {
    models.Staffs.findAll({
      attributes: LIST_STAFF_ATTRIBUTE
    }).then(function (staffs) {
      res.json(200, {success: true, data: staffs});
    });
  } catch (exception){
    res.json(500, {success: false, data: exception, msg: 'Exception thrown !!!'});
  }
};

/**
 * Creates a new staff
 */
exports.create = function (req, res, next) {
  var newStaff = req.body;
  newStaff.provider = 'local';
  newStaff.role = 'user';
  try {
    models.Staffs.create(newStaff).then(function(staff) {
      if (!staff) res.json(500, { sucess: false, msg: 'Unknow issue - Can\'t create staff ' });

      var token = jwt.sign({_id: staff.staff_id }, config.secrets.session, { expiresInMinutes: 60*5 });
      res.json(200, { sucess: true, token: token });
    });
  } catch (exception) {
    res.json(500, {success: false, data: exception, msg: 'Exception thrown !!!'});
  }
  
};

/**
 * Get a single staff
 */
exports.show = function (req, res, next) {
  var staffId = req.params.id;
  try{
    models.Staffs.findOne({
      where: {
        staff_id: staffId
      }
    }).then(function (staff) {
      if (!staff) return res.json(401, {sucess: false, msg: 'Can\'t find the staff'});
      res.json(200, {success: true, data: staff.profile});
    });
  }
  catch (exception){
    res.json(500, {success: false, data: exception, msg: 'Exception thrown !!!'});
  }
  
};

/**
 * Deletes a staff
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  try{
    models.Staffs
      .remove({
        where: {
          staff_id: req.params.id
        }
      })
      .then(function(result) {
        if(result[0] != 1) return res.json(404,{success: false, data: 'Can\'t delete the staff ' });
        return res.json(200, {success: true});
      });
  } catch (exception){
    res.json(500, {success: false, data: exception, msg: 'Exception thrown !!!'});
  }
  
};

/**
 * Change a staffs password
 */
exports.changePassword = function(req, res, next) {
  var staffId = req.staff.staff_id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  try{
    models.Staffs
    .findOne({
      where: {
        staff_id: staffId
      }
    })
    .then(function (staff) {
      if(!staff) return res.json(404,{success: false, data: 'Can\'t find the staff ' });

      if(staff.authenticate(oldPass)) {
        models.Staffs
        .update({
            password: newPass
          },{
            where: {
              staff_id: staffId
            }
        })
        .then(function(result) {
          if (result[0] != 1) return res.json(404,{success: false, data: 'Unknown issue - can\'t update password !' });
          return res.json(200, {success: true});
        });
      } else {
        return res.json(403, {success: false, msg: 'Forbidden'});
      }
    });
  }
  catch (exception){
    res.json(500, {success: false, data: exception, msg: 'Exception thrown !!!'});
  }
  
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var staffId = req.staff.staff_id;
  try{
    models.Staffs.findOne({
      where: {
        staff_id: staffId
      },
      attributes: LIST_STAFF_ATTRIBUTE
    }).then(function(staff) {
      if (!staff) return res.json(401, {sucess: false, msg: 'Can\'t find the your info !'});
      res.json(200, {success: true, data: staff});
    });
  }
  catch (exception){
    res.json(500, {success: false, data: exception, msg: 'Exception thrown !!!'});
  }
  
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/login');
};
