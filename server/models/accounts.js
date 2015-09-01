'use strict';
var md5       = require('md5' ),
    Promise   = require('bluebird');

module.exports = function(sequelize, DataTypes) {
  var Accounts = sequelize.define('Accounts', {

    user_id: {
      type: DataTypes.INTEGER,
      field:'id',
      autoIncrement: true,
      primaryKey: true
    },
    userName: {
      type: DataTypes.STRING,
      field: 'user_name',
      unique: true,
      allowNull: false
    },

    userScreenName: {
      type: DataTypes.STRING,
      field: 'user_screen_name',
      unique: true,
      allowNull: false
    },
    userPassword: {
      type: DataTypes.STRING,
      field: 'user_password',
      allowNull: false
    },

    userEmail: {
      type: DataTypes.STRING,
      field: 'user_email',
      unique: true,
      allowNull: false
    },

    userAddress: {
      type: DataTypes.TEXT,
      field: 'user_address',
      allowNull: false
    },

    userCity: {
      type: DataTypes.STRING,
      field: 'user_city',
      allowNull: false
    },
    userPostCode: {
      type: DataTypes.STRING,
      field: 'user_post_code',
      allowNull: false
    },
    userDOB: {
      type: DataTypes.STRING,
      field: 'user_dob'
    },

    userVerified: {
      type: DataTypes.BOOLEAN,
      field: 'user_verified'
    },
    userStatus: {
      type: DataTypes.STRING,
      field: 'user_status'
    },
    companyAccount: {
      type: DataTypes.STRING,
      field: 'co_user'
    },
    companyName: {
      type: DataTypes.STRING,
      field: 'co_company_name'
    },

    companyJobTitle: {
      type: DataTypes.STRING,
      field: 'co_job_title'
    },

    totalEmployees: {
      type: DataTypes.STRING,
      field: 'co_total_employees'
    },

    companyPaymentMethod: {
      type: DataTypes.STRING,
      field: 'co_pay_method'
    },


    userRole: {
      type: DataTypes.STRING,
      field: 'user_role'
    }

  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Accounts.hasMany(models.Orders, {foreignKey: 'order_user_id'});
      }
    },
    instanceMethods: {
      setPassword: function(password) {
        var _this = this;
        return Promise.resolve().then(function() {
          _this.userPassword = md5(password);
          return _this.save()
        })
      },
      verifyPassword: function(password) {
        var _this = this;
        return Promise.resolve().then(function() {
          var currentHash = md5(password);
          return _this.userPassword === currentHash
        })
      }
    }
  });
  return Accounts;
};