var passport = require("passport")

function getSignup (req, res) {
  res.render('signup.ejs', { message: req.flash ('signupMessage') });
}

function postSignup (req, res) {
  var signupStrategy = passport.authenticate ('local-signup', {
    successRedirect : '/',
    failureRedirect : '/signup',
    failureFlash : true
  });
  return signupStrategy (req, res);
}

function getLogin (req, res) {
    res.render('login.ejs', { message: req.flash ('loginMessage')});
}

function postLogin (req, res) {
  var loginProperty = passport.authenticate ('local-login', {
    successRedirect : '/',
    failureRedirect : '/login',
    failureFlash : true
});
  return loginProperty (req, res);
  }

function getFacebook (req, res) {
  var signupStrategy = passport.authenticate ('facebook', {
     scope : 'email'
  });
  return signupStrategy (req, res);
 }

function getFacebookCallback (req, res) {
  var loginProperty = passport.authenticate ('facebook', {
    successRedirect : '/',
    failureRedirect : '/login'
  });
  return loginProperty (req, res);
}

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