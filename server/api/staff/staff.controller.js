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

/**
 * Change a users password
 * Change current login user password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user.id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  if (!oldPass || !newPass){
    return res.json(400, {success: false, msg: 'You must pass in passwords !'});
  }

  try{
    models.Users
    .findOne({
      where: {
        id: userId
      }
    })
    .then(function (user) {
      if(!user) return res.json(404,{success: false, data: 'Can\'t find the user ' });

      if(user.authenticate(oldPass)) {
        models.Users
        .update({
            password: newPass
          },{
            where: {
              id: userId
            }
        })
        .then(function(result) {
          if (result != 1) return res.json(404,{success: false, data: 'Unknown issue - can\'t update password !' });
          return res.json(200, {success: true});
        })
        .catch(function(exception){
          res.json(500, {success: false, data: exception, msg: 'Exception thrown !!!'});
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
 * update a users information - you can update user-password here
 * {result} {sucess: true/false}
 */
exports.update = function(req, res, next) {
  var userId = req.params.id;
  var userInfo = req.body;

  try{
    models.Users
    .findOne({
      where: {
        id: userId
      }
    })
    .then(function (user) {
      if(!user) return res.json(404,{success: false, data: 'Can\'t find the user ' });

      user.update(userInfo)
      .then(function(result) {
        if (!result) return res.json(404,{success: false, data: 'Unknown issue - can\'t update user information !' });
        return res.json(200, {success: true});
      })
      .catch(function(exception){
        res.json(500, {success: false, data: exception, msg: 'Exception thrown !!!'});
      });
         
    });
  }
  catch (exception){
    res.json(500, {success: false, data: exception, msg: 'Exception thrown !!!'});
  }
  
};


/**
 * Get personal info
 * {result} personal info of current login user
 */
var USER_TYPES = {
  STAFF: 'staff',
  MERCHANT: 'merchant',
  CUSTOMER: 'customer',
}
exports.me = function(req, res, next) {
  var userId = req.user.id;
  var detailModel = {};
  var attributes = [];

  /*
    Get Proper model base on user's type
    there are three types:
      1. staff - Staffs table
      2. merchant - Merchants tables
      3. customer - Customers table
  */
  switch (req.user.type){
    case USER_TYPES.STAFF:
      detailModel = models.Staffs;
      attributes = LIST_STAFF_ATTRIBUTE;
      break;

    case USER_TYPES.MERCHANT:
      detailModel = models.Merchants;
      attributes = LIST_MERCHANT_ATTRIBUTE;
      break;

    case USER_TYPES.CUSTOMER:
      detailModel = models.Customers;
      attributes = LIST_CUSTOMER_ATTRIBUTE;
      break;
  };

  try{

    detailModel.findOne({
      where: {
        user_id: userId
      }
    }).then(function(info) {
      if (!info) return res.json(401, {sucess: false, msg: 'Can\'t find the your info !'});

      // get email/phoneno info from user
      var result = _.pick(info, LIST_STAFF_ATTRIBUTE);
      result.email = req.user.email;
      result.phoneno = req.user.phoneno;
      result.id = req.user.id;

      res.json(200, {success: true, data: result});
    })
    .catch(function(exception){
      res.json(500, {success: false, data: exception, msg: 'Exception thrown !!!'});
    });
  }
  catch (exception){
    res.json(500, {success: false, data: exception, msg: 'Exception thrown !!!'});
  }
  
};



/*
  Update user location
  @param {Integer} user id
  @param {Float} Latitude
  @param {Float} Longtitude
*/
exports.updateLocation = function(req, res) {
  if (!req.body.lat || !req.body.lon) {
    return res.json(400, {
      success: false,
      msg: 'Please pass in right data'
    });
  };

  try {
    models.Users
      .findOne({
        where: {
          id: req.user.id
        }
      })
      .then(function(user) {
        if (!user) {
          return res.json(404, {
            success: false,
            msg: 'Can\'t find the user '
          });
        }

        models.Users.update({
          location: JSON.stringify({
            lat: req.body.lat,
            lon: req.body.lon
          }),
        }, {
          where: {
            id: req.user.id
          }
        }).then(function(result) {
          if (result[0] == 1){
            staffSocket.broadcastData('user:location_change', {
              id: req.user.id,
              lat: req.body.lat,
              lon: req.body.lon
            });
            return res.json(200, {
              sucess: true
            });
          }
          else
            return res.json(422, {
              success: false,
              msg: 'Please double check the input lat lon. '
            });
        });

      });
  } catch (exception) {
    return res.json(500, {
      success: false,
      data: exception
    });
  }

};


/*
  Update user location
  @param {Integer} user id
  @param {Interge} Status
*/

exports.changeStatus = function(req, res) {
  if (!req.body.status) {
    return res.json(400, {success: false, msg: 'Please pass in right data'});
  };

  try {
    models.Users
      .findOne({
        where: {
          id: req.user.id
        }
      })
      .then(function(user) {
        if (!user) {
          return res.json(404, { success: false, msg: 'Can\'t find the user '});
        }

        models.Users.update({
          status: req.body.status.toString(),
        }, {
          where: {
            id: req.user.id
          }
        }).then(function(result) {
          if (result[0] == 1){
            user.status = req.body.status;
            staffSocket.broadcastData('user:status_change', user);
            return res.json(200, {
              sucess: true
            });
          }
          else
            return res.json(422, {success: false, msg: 'Please double check the input lat lon. '});
        });

      });
  } catch (exception) {
    return res.json(500, {success: false, data: exception});
  }

};


/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/login');
};
