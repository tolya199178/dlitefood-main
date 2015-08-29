'use strict';

var crypto = require('crypto');

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
      validate: {
        isValidateEmail: function(email) {
          if (email.length < 9) {
            throw new Error("Please choose a longer password")
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
      allowNull: false,
      validate: {
        isLongEnough: function(hashedPassword) {
          if (authTypes.indexOf(this.provider) !== -1) return true;
          return hashedPassword.length;
        }
      }
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
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    provider: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.VIRTUAL,
      set: function(val) {
        this._password = password;
        this.staff_password = this.encryptPassword(password);

        // this.setDataValue('password', val); // Remember to set the data value, otherwise it won't be validated
        // this.setDataValue('hashedPassword', this.salt + val);
      },
      get: function() {
        return this._password;
      },
      validate: {
        isLongEnough: function(val) {
          if (val.length < 7) {
            throw new Error("Please choose a longer password")
          }
        }
      }
    },
    token: {
      type: DataTypes.VIRTUAL,
      get: function(val) {
        return {
          '_id': this.staff_id,
          'role': this.role
        };
      }
    }
  }, {
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
};