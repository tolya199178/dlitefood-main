'use strict';

var models = require('../../models'),
    passport = require('passport'),
    config = require('../../config/environment'),
    jwt = require('jsonwebtoken'),
    _ = require('lodash');

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

  /*
    Set default value for parameters
  */
  var  keywordForName = req.query.name || "";
  var pageNumber = parseInt(req.query.pageNumber) || 1;
  var pageSize = parseInt(req.query.pageSize) || 20;

  if (keywordForName){
    var whereCondition = {
        staff_name: {
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
      limit: pageSize
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
  newStaff.role = newStaff.role || 'user';

  try {
    models.Staffs
    .create(newStaff)
    .then(function(staff) {
      if (!staff) res.json(500, { sucess: false, msg: 'Unknow issue - Can\'t create staff ' });

      res.json(200, { sucess: true });
    })
    .catch(function(exception){
      res.json(400, {success: false, data: exception, msg: 'Please pass in proper inputs !!!'});  
    });
  } catch (exception) {
    res.json(500, {success: false, data: exception, msg: 'Exception thrown !!!'});
  }
  
};

/**
 * Get a single staff
 */
// exports.show = function (req, res, next) {
//   var staffId = req.params.id;
//   try{
//     models.Staffs.findOne({
//       where: {
//         staff_id: staffId
//       }
//     }).then(function (staff) {
//       if (!staff) return res.json(401, {sucess: false, msg: 'Can\'t find the staff'});
//       res.json(200, {success: true, data: staff.profile});
//     });
//   }
//   catch (exception){
//     res.json(500, {success: false, data: exception, msg: 'Exception thrown !!!'});
//   }
  
// };

/**
 * Deletes a staff
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  try{
    models.Staffs
      .destroy({
        where: {
          staff_id: req.params.id
        }
      })
      .then(function(result) {
        if(result != 1) return res.json(404,{success: false, data: 'Can\'t delete the staff ' });
        return res.json(200, {success: true});
      })
      .catch(function(exception){
        res.json(500, {success: false, data: exception, msg: 'Exception thrown !!!'});
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
          if (result != 1) return res.json(404,{success: false, data: 'Unknown issue - can\'t update password !' });
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
 * update a staffs password
 */
exports.update = function(req, res, next) {
  var staffId = req.params.id;
  var staffInfo = req.body;

  try{
    models.Staffs
    .findOne({
      where: {
        staff_id: staffId
      }
    })
    .then(function (staff) {
      if(!staff) return res.json(404,{success: false, data: 'Can\'t find the staff ' });

      staff.update(staffInfo)
      .then(function(result) {
        if (!result) return res.json(404,{success: false, data: 'Unknown issue - can\'t update staff information !' });
        return res.json(200, {success: true});
      });
         
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
