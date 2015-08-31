/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Role_Permission', { 
    role: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    permission: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    value: {
      type: DataTypes.DECIMAL(2,0),
      allowNull: false,
    }
  });
};
