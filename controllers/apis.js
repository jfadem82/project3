var Post = require('../models/post.js')

// Displays all posts in the api
function index (req, res) {
	 
	 Post.find({}, function (err, posts) {
		if (err) console.log(err);
		res.json(posts);
	}); 
}

// Adds a new post to the api
function newPost (req, res) {
	var post = new Post();

	post.title = req.body.title;
	post.description = req.body.description;
	post.location = req.body.location;
	post.avatar_url		= req.body.avatar_url

	post.save(function(err, post) {
		if(err) console.log(err)
		res.json(post)
	})
}

// Deletes a post based on its id in the api
function removePost (req, res) {
	var id = req.params.id

	Post.remove({_id: id}, function(error) {
		if(error) res.json({message: 'Could not delete post b/c' + error});

		res.json({message: 'Post succesfully deleted'})
	})
}

// Updates a post based on its id in the api
function updatePost (req, res) {
	var id = req.params.id

	Post.findById(id, function(error, post) {
		if(error) {
			res.send('Could not find post b/c' + error);
		}
		console.log('put request received ')
		console.log(post)

		post.title = req.body.title;
		post.description = req.body.description;
		post.location = req.body.location;
		post.avatar_url		= req.body.avatar_url

		post.save(function(error) {
			if(error) {
				res.send("could not update post bc" + error)
			}
			res.json(post)
		})
	})
}

module.exports = { 
	index: index,
	newPost: newPost,
	removePost: removePost,
	updatePost: updatePost
}