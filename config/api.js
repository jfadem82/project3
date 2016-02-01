var express             = require('express');
var bodyParser          = require('body-parser');
var methodOverride      = require('method-override');
var passport            = require("passport");
var usersController     = require('../controllers/users');
var postsController     = require('../controllers/posts')
var user                = require('../models/user')
var apiRoutes			= express.Router()
var apiController 		= require('../controllers/apis')

// Route to display the api json
apiRoutes.route('/api')
	.get(apiController.index)

// Route to add new data to api
apiRoutes.route('/api/new')
	.post(apiController.newPost)


// Route to update or delete a certain post from the model using the id
apiRoutes.route('/api/:id')
	.delete(apiController.removePost)
	.put(apiController.updatePost)

module.exports = apiRoutes