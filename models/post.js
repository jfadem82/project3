var mongoose 	= require('mongoose');
var User 			= require("./user");

var postSchema = new mongoose.Schema ( {
	title		: String,
	description	: String,
	location	: String,
	photo		: String,
	User 		: {type: mongoose.Schema.ObjectId, ref: 'User'}
})

var Post = mongoose.model('Post', postSchema);

module.exports = Post    