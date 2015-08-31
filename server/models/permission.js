/* jshint indent: 2 */
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Permission', { 
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    alias: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });
};
