var express             = require('express');
var bodyParser          = require('body-parser');
var methodOverride      = require('method-override');
var passport            = require("passport");
var usersController     = require('../controllers/users');
var postsController     = require('../controllers/posts')
var user                = require('../models/user')
var apiRoutes			= express.Router()
var apiController 		= require('../controllers/apis')

apiRoutes.route('/api')
	.get(apiController.index)

apiRoutes.route('/api/new')
	.post(apiController.newPost)

apiRoutes.route('/api/:id')
	.delete(apiController.removePost)
	.put(apiController.updatePost)





module.exports = apiRoutes