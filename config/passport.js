var LocalStrategy    = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var User             = require('../models/user');
// var configAuth       = require('./auth');


// Using the node module passport for authentication
module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, callback) {
    User.findById(id, function(err, user) {
      callback(err, user);
    });
  });

  // Signup with email and password
  passport.use('local-signup', new LocalStrategy ({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  }, function(req, email, password, callback) {
    process.nextTick(function() {
      User.findOne({ 'local.email' :  email }, function(err, user) {
        if (err) return callback(err);

        if (user) {
          return callback(null, false, req.flash('signupMessage', 'This email is already used.'));
        } else {
            var newUser            = new User();
            newUser.local.email    = email;
            newUser.local.password = newUser.encrypt(password);

            newUser.save(function(err) {
              if (err) throw err;
              return callback(null, newUser);
            });
        }
      });
    });
  }));

  // Login with email and password
  passport.use('local-login', new LocalStrategy ({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  }, function(req, email, password, callback) {
      User.findOne({ 'local.email' :  email }, function(err, user) {
        if (err) return callback(err);

        if (!user) return callback(null, false, req.flash('loginMessage', 'No user found.'));

        if (!user.validPassword(password))     return callback(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

        return callback(null, user);
      });
  }));

  // Signup and login with Facebook
  passport.use(new FacebookStrategy ({
     clientID        : process.env.FACEBOOK_APP_ID       || configAuth.facebookAuth.clientID,
     clientSecret    : process.env.FACEBOOK_APP_SECRET   || configAuth.facebookAuth.clientSecret,
     callbackURL     : process.env.FACEBOOK_CALLBACK_URL || configAuth.facebookAuth.callbackURL,
     profileFields   : ["emails", "displayName", "name"]
  }, function(token, refreshToken, profile, done) {
    process.nextTick(function() {
      User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
        if (err)
           return done(err);
         
        if (user) {
          return done(null, user); 
        } else {
          var newUser            = new User();

          newUser.facebook.id    = profile.id; 
          newUser.facebook.token = token; 
          newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName; 
          newUser.facebook.email = profile.emails[0].value;

          newUser.save(function(err) {
           if (err)
               throw err;
           return done(null, newUser);
          });
        }
      });
    });
  }));
}
