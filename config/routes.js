var express = require('express');
var router = express.Router();
// Parses information from POST
var bodyParser = require('body-parser');
// Used to manipulate POST methods
var methodOverride = require('method-override');
var passport = require("passport");
var usersController = require('../controllers/users');
var staticsController = require('../controllers/statics');
var postsController = require('../controllers/posts')
var user = require('../models/user')

function authenticatedUser(req, res, next) {
    // If the user is authenticated, then we continue the execution
  if (req.isAuthenticated()) return next();

    // Otherwise the request is always redirected to the home page
  res.redirect('/login');
}


// router.route('/')
//   .get(staticsController.home);

router.route('/signup')
  .get(usersController.getSignup)
  .post(usersController.postSignup)

router.route('/login')
  .get(usersController.getLogin)
  .post(usersController.postLogin)

router.route('/logout')
  .get(usersController.getLogout)

router.route('/secret')
  .get(usersController.secret)


router.route('/auth/facebook')
  .get(usersController.getFacebook)

router.route('/auth/facebook/callback')
   .get(usersController.getFacebookCallback)

router.route('/')
  .get(postsController.index)

router.route('/posts/new')
  .get(authenticatedUser, postsController.newPost)
  .post(postsController.create)

router.route('/posts/:id')

  
  // .patch(postsController.update)
  .delete(authenticatedUser, postsController.removePost)

  .get(authenticatedUser, postsController.show)
  // .patch(postsController.update)

// router.route('/posts/:id/edit')
  // .get(postsController.editPost)




module.exports = router