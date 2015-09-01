'use strict';

var crypto = require('crypto');

module.exports = function(sequelize, DataTypes) {
  var Staffs =  sequelize.define('Staffs', {
    staff_id: {
      type: DataTypes.INTEGER(11),
      autoIncrement: true,
      primaryKey: true
    },
    staff_email: {
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
    staff_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    staff_password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    staff_address: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    staff_phoneno: {
      type: DataTypes.STRING,
      allowNull: false
    },
    staff_postcode: {
      type: DataTypes.TEXT
    },
    staff_max_distance: {
      type: DataTypes.STRING,
      allowNull: false
    },
    staff_location: {
      type: DataTypes.STRING
    },
    staff_available_time: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    staff_status: {
      type: DataTypes.STRING
    },
    role: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    provider: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.VIRTUAL,
      set: function(val) {
        this._password = val;
        this.staff_password = this.encryptPassword(val);

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
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
       Staffs.belongsTo(models.Roles, {foreignKey: 'role'});
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
        return this.encryptPassword(plainText) === this.staff_password;
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
        // var salt = new Buffer(this.salt, 'base64');
        // return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
      }
    }
  });
  
  return Staffs;
};