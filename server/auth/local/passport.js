var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

exports.setup = function (User, config) {
  passport.use(new LocalStrategy({
      usernameField: 'phoneno',
      passwordField: 'password' // this is the virtual field on the model
    },
    function(phoneno, password, done) {
      User.findOne({
        where: {
          staff_phoneno: phoneno.toLowerCase()
        }
      }).then(function(user) {
        
        if (!user) {
          return done(null, false, { message: 'This phoneno is not registered.' });
        }
        if (!user.authenticate(password)) {
          return done(null, false, { message: 'This password is not correct.' });
        }
        return done(null, user);
      });
    }
  ));
};