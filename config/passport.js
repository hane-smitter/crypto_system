// set up passport for user model and strategies
const bCrypt = require('bcrypt-nodejs');
const db = require('../models');

module.exports = function (passport, user) {
  // local strategy
  var User = user;
  var LocalStrategy = require('passport-local').Strategy;
  // custom strategy
  passport.use('local-signup', new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true // allows pass back of the entire request to callback
    },
    // callback function to pass entire request
    function (req, email, password, done) {
      var generateHash = function (password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
      };
      // check to see if user exists, if not then add
      db.User.findOne({
        where: {
          email: email
        }
      }).then(function (user) {
        if (user) {
          return done(null, false, {
            message: 'That email is already taken' // return message if email exists
          });
        } else {
          var userPassword = generateHash(password);
          var data = {
            email: email,
            password: userPassword,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username
          };
          // add new user if email not found
          db.User.create(data).then(function (newUser, created) {
            if (!newUser) {
              return done(null, false);
            }
            if (newUser) {
              console.log('NEW USER: ' + newUser.firstname + ', ID: ' + newUser.id); // pull data for new user
              return done(null, newUser);
            }
          });
        }
      });
    }
  ));

  //serialize to save user ID in session
  passport.serializeUser(function (user, done) {
    console.log('user serialized');
    done(null, user.id);
  });

  // deserialize user remove user ID in session
  passport.deserializeUser(function (id, done) {
    db.User.findById(id).then(function (user) {
      if (user) {
        console.log('user deserialized');
        done(null, user.get());
      } else {
        done(user.errors, null);
      }
    });
  });

  // Local Signin
  passport.use('local-signin', new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true // allows pass back of the entire request to the callback
    },

    function (req, email, password, done) {
      var User = user;
      var isValidPassword = function (userpass, password) {
        return bCrypt.compareSync(password, userpass);
      }
      db.User.findOne({
        where: {
          email: email
        }
      }).then(function (user) {
        if (!user) {
          return done(null, false, {
            message: 'Email does not exist'
          });
        }
        if (!isValidPassword(user.password, password)) { // compares password with bCrypt
          return done(null, false, {
            message: 'Incorrect password.'
          });
        }

        var userinfo = user.get();
        console.log('CURRENT USER: ' + userinfo.firstname) // pull data for current user
        return done(null, userinfo);

      }).catch(function (err) {
        console.log("Error:", err);
        return done(null, false, {
          message: 'Something went wrong with your Signin'
        });
      });
    }
  ));
}
