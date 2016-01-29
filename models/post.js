var mongoose 	= require('mongoose');
var User 		= require("./user");

var postSchema 	= new mongoose.Schema ( {
	title		: String,
	description	: String,
	location	: {type: String, require: true},
	latitude	: String,
	longitude	: String,
	avatar_url	: {type: String, require: true},
	time 		: Date,
	user 		: {type: mongoose.Schema.ObjectId, ref: 'User'}
})

var Post = mongoose.model('Post', postSchema);

module.exports = Post    