'use strict';

var models = require('../../models');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');

var validationError = function(res, err) {
  return res.json(422, err);
};

/**
 * Get list of staffs
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  models.Staffs.findAll({attributes: ['-staff_password']}).then(function (staffs) {
    res.json(200, staffs);
  });
};

/**
 * Creates a new staff
 */
exports.create = function (req, res, next) {
  var newStaff = req.body;
  newStaff.provider = 'local';
  newStaff.role = 'user';
  models.Staffs.create(newStaff).then(function(staff) {
    var token = jwt.sign({_id: staff.staff_id }, config.secrets.session, { expiresInMinutes: 60*5 });
    res.json({ token: token });
  });
};

/**
 * Get a single staff
 */
exports.show = function (req, res, next) {
  var staffId = req.params.id;

  Staffs.findOne({
    where: {
      staff_id: staffId
    }
  }).then(function (staff) {
    if (!staff) return res.send(401);
    res.json(staff.profile);
  });
};

/**
 * Deletes a staff
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  Staffs.findByIdAndRemove(req.params.id, function(err, staff) {
    if(err) return res.send(500, err);
    return res.send(204);
  });
};

/**
 * Change a staffs password
 */
exports.changePassword = function(req, res, next) {
  var staffId = req.staff._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  Staffs.findById(staffId, function (err, staff) {
    if(staff.authenticate(oldPass)) {
      staff.password = newPass;
      staff.save(function(err) {
        if (err) return validationError(res, err);
        res.send(200);
      });
    } else {
      res.send(403);
    }
  });
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var staffId = req.staff._id;
  Staffs.findOne({
    _id: staffId
  }, '-salt -hashedPassword', function(err, staff) { // don't ever give out the password or salt
    if (err) return next(err);
    if (!staff) return res.json(401);
    res.json(staff);
  });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};
