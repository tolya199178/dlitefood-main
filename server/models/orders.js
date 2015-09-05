'use strict';
module.exports = function(sequelize, DataTypes) {
  var Orders = sequelize.define('Orders', {

    id: {
      type: DataTypes.INTEGER,
      field: 'id',
      autoIncrement: true,
      primaryKey: true
    },
    customer_id: {
      type: DataTypes.INTEGER(24),
      allowNull: false,
    },
    rest_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    rest_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    delivery_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    transaction_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    transaction_details: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    payment_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    total: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    details: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    postcode: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    phoneno: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '3'
    },
    acceptence_time: {
      type: DataTypes.DATE,
      allowNull: false,
    }

  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
       Orders.belongsTo(models.Customers, {foreignKey: 'customer_id', targetKey: "id"});
      }
    }
  });
  return Orders;
};