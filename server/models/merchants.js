
module.exports = function(sequelize, DataTypes) {
  var Merchants = sequelize.define('Merchants', {
    type_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    type_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type_email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type_password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type_picture: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type_phoneno: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type_time: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type_notes: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    type_charges: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type_steps: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type_min_order: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type_opening_hours: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    type_category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type_is_delivery: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type_special_offer: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    type_status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type_date_added: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    type_food: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  },
  {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Merchants.hasMany(models.Locations, {foreignKey: 'location_menu_id'});
      }
    }
  });
  return Merchants;
};
