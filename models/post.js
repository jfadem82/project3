var mongoose 	= require('mongoose');
var User 		= require("./user");

var postSchema 	= new mongoose.Schema ( {
	title		: String,
	description	: String,
	location	: String,
	latitude	: String,
	longitude	: String,
	avatar_url	: String,
	time 		: Date,
	user 		: {type: mongoose.Schema.ObjectId, ref: 'User'}
})

var Post = mongoose.model('Post', postSchema);

module.exports = Post    