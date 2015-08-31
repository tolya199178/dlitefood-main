/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  var Role =  sequelize.define('Role', {
    id: {
      type: DataTypes.INTEGER(11),
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });
  return Role;
};
