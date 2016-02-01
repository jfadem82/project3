var express             = require('express');
var router              = express.Router();
var bodyParser          = require('body-parser');
var methodOverride      = require('method-override');
var passport            = require("passport");
var usersController     = require('../controllers/users');
var postsController     = require('../controllers/posts')
var user                = require('../models/user')

function authenticatedUser(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
}

// Route for users to sign up using Passport
router.route('/signup')
  .get(usersController.getSignup)
  .post(usersController.postSignup)

// Route for users to login using Passport
router.route('/login')
  .get(usersController.getLogin)
  .post(usersController.postLogin)

// Route for ending a session using Passport
router.route('/logout')
  .get(usersController.getLogout)

// Route to user Facebook authorization for signup/login
router.route('/auth/facebook')
  .get(usersController.getFacebook)

// Route that sends a call back to Facebook for authorization
router.route('/auth/facebook/callback')
   .get(usersController.getFacebookCallback)

// Routes to the home page using the posts index controller
router.route('/')
  .get(postsController.index)

// Routes to a signed in users list of posts
router.route('/myposts')
  .get(postsController.userposts)

// Route to add a new post for a signed in user
router.route('/posts/new')
  .get(authenticatedUser, postsController.newPost)
  .post(postsController.create)

// Routes to displya/edit/delete a user's post
router.route('/posts/:id')
  .delete(authenticatedUser, postsController.removePost)
  .get(postsController.show)
  .put(authenticatedUser, postsController.updatePost)

// Route to the edit page
router.route('/posts/:id/edit')
  .get(authenticatedUser, postsController.editPost)

module.exports = router