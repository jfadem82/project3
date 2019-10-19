var express             = require('express');
var bodyParser          = require('body-parser');
var methodOverride      = require('method-override');
var passport            = require("passport");		// requiring the right packages
var usersController     = require('../controllers/users'); //requiring the necessary files
var postsController     = require('../controllers/posts')
var user                = require('../models/user')
var apiRoutes			= express.Router() //instantiating express router
var apiController 		= require('../controllers/apis')


//below sets routes for the api

apiRoutes.route('/api')
	.get(apiController.index)
	//lists all of our posts when hit with a get request

apiRoutes.route('/api/new')
	.post(apiController.newPost)
	//creates new post when hit with a post request

apiRoutes.route('/api/:id')
	.delete(apiController.removePost)
	.put(apiController.updatePost)

	//delete and update methods through api

module.exports = apiRoutes
//exports, in other words, makes available these routes