var express             = require('express');
var router              = express.Router();
var bodyParser          = require('body-parser');
var methodOverride      = require('method-override');
var passport            = require("passport");
var usersController     = require('../controllers/users');
var postsController     = require('../controllers/posts')
var user                = require('../models/user')
//requires packages and necessary files

function authenticatedUser(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
}

router.route('/signup')
  .get(usersController.getSignup)
  .post(usersController.postSignup)

router.route('/login')
  .get(usersController.getLogin)
  .post(usersController.postLogin)

router.route('/logout')
  .get(usersController.getLogout)

router.route('/auth/facebook')
  .get(usersController.getFacebook)

router.route('/auth/facebook/callback')
   .get(usersController.getFacebookCallback)

router.route('/')
  .get(postsController.index)

router.route('/myposts')
  .get(postsController.userposts)

router.route('/posts/new')
  .get(authenticatedUser, postsController.newPost)
  .post(postsController.create)

router.route('/posts/:id')
  .delete(authenticatedUser, postsController.removePost)
  .get(postsController.show)
  .put(authenticatedUser, postsController.updatePost)

router.route('/posts/:id/edit')
  .get(authenticatedUser, postsController.editPost)

module.exports = router
//expors and makes available these routes