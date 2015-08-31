'use strict';
module.exports = function(sequelize, DataTypes) {
  var Orders = sequelize.define('Orders', {

    id: {
      type: DataTypes.INTEGER,
      field: 'order_id',
      autoIncrement: true,
      primaryKey: true
    },
    orderUserId: {
      type: DataTypes.INTEGER,
      field: 'order_user_id',
      allowNull: false
    },
    orderMerchantId: {
      type: DataTypes.INTEGER,
      field: 'order_rest_id',
      allowNull: false
    },
    orderMerchantType: {
      type: DataTypes.STRING,
      field: 'order_rest_type',
      allowNull: false
    },
    orderDeliveryType: {
      type: DataTypes.STRING,
      field: 'order_delivery_type',
      allowNull: false
    },

    orderTransactionID: {
      type: DataTypes.STRING,
      field: 'order_transaction_id',
      allowNull: false
    },

    orderTransactionDetails: {
      type: DataTypes.TEXT,
      field: 'order_transaction_details',
      allowNull: false
    },

    orderPaymentType: {
      type: DataTypes.STRING,
      field: 'order_payment_type',
      allowNull: false
    },
    orderTotal: {
      type: DataTypes.STRING,
      field: 'order_total',
      allowNull: false
    },
    orderDetails: {
      type: DataTypes.TEXT,
      field: 'order_details',
      allowNull: false
    },
    orderPostcode: {
      type: DataTypes.TEXT,
      field: 'order_postcode',
      allowNull: false
    },
    orderAddress: {
      type: DataTypes.TEXT,
      field: 'order_address',
      allowNull: false
    },
    orderNote: {
      type: DataTypes.TEXT,
      field: 'order_note',
      allowNull: false
    },
    orderPhoneNo: {
      type: DataTypes.STRING,
      field: 'order_phoneno',
      allowNull: false
    },
    orderStatus: {
      type: DataTypes.STRING,
      field: 'order_status',
      allowNull: false,
      defaultValue: 'SENT_TO_DRIVER'
    },
    orderAcceptanceTime: {
      type: DataTypes.DATE,
      field: 'order_acceptence_time',
      allowNull: false
    },

    orderDateAdded: {
      type: DataTypes.DATE,
      field: 'order_date_added',
      allowNull: false
    },

  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
       Orders.belongsTo(models.Accounts, {foreignKey: 'orderUserId'});
      }
    }
  });
  return Orders;
};