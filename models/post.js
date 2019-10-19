var mongoose 	= require('mongoose');
var User 		= require("./user");
//uses mongoose and requires the user model

//deetermines our schema, the name of the fields and types of data theyll store
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

//stores a mongoose model named Post, with the postSchema as variable POST
var Post = mongoose.model('Post', postSchema);

module.exports = Post
//exports our model