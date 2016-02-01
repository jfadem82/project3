var passport = require("passport")

// Displays sign up form
function getSignup (req, res) {
  res.render('signup.ejs', { message: req.flash ('signupMessage') });
}

// Saves the info from getSignup
function postSignup (req, res) {
  var signupStrategy = passport.authenticate ('local-signup', {
    successRedirect : '/',
    failureRedirect : '/signup',
    failureFlash : true
  });
  return signupStrategy (req, res);
}

// Displays login form
function getLogin (req, res) {
    res.render('login.ejs', { message: req.flash ('loginMessage')});
}

// Logs the user in if the credentials match
function postLogin (req, res) {
  var loginProperty = passport.authenticate ('local-login', {
    successRedirect : '/',
    failureRedirect : '/login',
    failureFlash : true
});
  return loginProperty (req, res);
  }

// Displays a link to login through Facebook
function getFacebook (req, res) {
  var signupStrategy = passport.authenticate ('facebook', {
     scope : 'email'
  });
  return signupStrategy (req, res);
 }

// Sends callback to Facebook to check authorization
function getFacebookCallback (req, res) {
  var loginProperty = passport.authenticate ('facebook', {
    successRedirect : '/',
    failureRedirect : '/login'
  });
  return loginProperty (req, res);
}

// Logs the user out of their session
function getLogout(req, res) {
  req.logout();
  res.redirect('/');
}

module.exports = {
  getLogin: getLogin,
  postLogin: postLogin ,
  getSignup: getSignup,
  postSignup: postSignup,
  getFacebook: getFacebook,
  getFacebookCallback: getFacebookCallback,
  getLogout: getLogout
}