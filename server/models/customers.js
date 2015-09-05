'use strict';
var md5       = require('md5' ),
    Promise   = require('bluebird');

module.exports = function(sequelize, DataTypes) {
  var Customers = sequelize.define('Customers', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    screen_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    address1: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    post_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dob: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    verified: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: '0'
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'non-active'
    },
    co_user: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    co_company_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    co_job_title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    co_total_employees: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    co_pay_method: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: 'CURRENT_TIMESTAMP'
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: 'CURRENT_TIMESTAMP'
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    }

  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Customers.belongsTo(models.Users, {foreignKey: 'user_id'});
      }
    }
  });
  return Customers;
};