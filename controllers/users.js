var passport = require("passport")

// GET /signup
function getSignup(request, response) {
  response.render('signup.ejs', { message: request.flash('signupMessage') });
}

// POST /signup
function postSignup(request, response) {
  var signupStrategy = passport.authenticate('local-signup', {
    successRedirect : '/secret',
    failureRedirect : '/signup',
    failureFlash : true
  });

  return signupStrategy(request, response);
}

// GET /login
function getLogin(request, response) {
    response.render('login.ejs', { message: request.flash('loginMessage') });
}

// POST /login
function postLogin(request, response) {
    var loginProperty = passport.authenticate('local-login', {
    successRedirect : '/secret',
    failureRedirect : '/login',
    failureFlash : true
});

    return loginProperty(request, response);
  }

// function getFacebook(request, response) {
//    var signupStrategy = passport.authenticate('facebook', {
//      scope : 'email'
//    });

//    return signupStrategy(request, response);
//  }

// function getFacebookCallback(request, response) {
//    var loginProperty = passport.authenticate('facebook', {
//      successRedirect : '/',
//      failureRedirect : '/login'
//    });

//    return loginProperty(request, response);
//  }

// GET /logout
function getLogout(request, response) {
  request.logout();
  response.redirect('/');
}

// Restricted page
function secret(request, response){
	response.render('secret.ejs');
}

module.exports = {
  getLogin: getLogin,
  postLogin: postLogin ,
  getSignup: getSignup,
  postSignup: postSignup,
  // getFacebook: getFacebook,
  // getFacebookCallback: getFacebookCallback,
  getLogout: getLogout,
  secret: secret
}