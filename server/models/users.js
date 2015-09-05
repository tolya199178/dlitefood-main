var crypto = require('crypto');

module.exports = function(sequelize, DataTypes) {
  var Users =  sequelize.define('Users', { 
    id: {
      type: DataTypes.INTEGER(11),
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isValidateEmail: function(email) {
          if (email.length < 9) {
            throw new Error("Please choose a longer email !")
          }
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.VIRTUAL,
      set: function(val) {
        this.hashedpassword = this.encryptPassword(val);

        // this.setDataValue('password', val); // Remember to set the data value, otherwise it won't be validated
        // this.setDataValue('hashedPassword', this.salt + val);
      },
      get: function() {
        return this._password;
      },
      validate: function(val) {
        if (val.length < 7) {
          throw new Error("Please choose a longer password")
        }
      }
    },
    hashedpassword: {
      type: DataTypes.STRING,
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
    role: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: 'CURRENT_TIMESTAMP'
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: 'CURRENT_TIMESTAMP'
    },
    provider: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'local'
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'staff'
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Users.belongsTo(models.Roles, {foreignKey: 'role'});
      }
    },
    instanceMethods: {
      /**
       * Authenticate - check if the passwords are the same
       *
       * @param {String} plainText
       * @return {Boolean}
       * @api public
       */
      authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashedpassword;
      },

      /**
       * Encrypt password
       *
       * @param {String} password
       * @return {String}
       * @api public
       */
      encryptPassword: function(password) {
        if (!password) return '';
        var md5 = crypto.createHash('md5');
        md5.update(password);
        return md5.digest('hex');
      }
    }
  });
  
  return Users;
};
