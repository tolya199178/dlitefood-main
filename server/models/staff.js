'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Staffs', { 
    staff_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    staff_email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    staff_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    staff_password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    staff_address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    staff_phoneno: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    staff_postcode: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    staff_max_distence: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    staff_location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    staff_available_time: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    staff_status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    staff_date_added: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: 'CURRENT_TIMESTAMP'
    }
  });
};
