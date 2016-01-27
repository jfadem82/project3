var Post = require('../models/post.js')


function index (req, res) {
	// res.json(Post.find({}))
	 
	 Post.find({}, function (err, posts) {
		if (err) console.log(err);
		// res.json({ message: 'hooray! welcome to our api!' }); 
		res.json(posts);
	}); 
}

function newPost (req, res) {
	var post = new Post();

	post.title = req.body.title;
	post.description = req.body.description;
	post.location = req.body.location

	post.save(function(err, post) {
		if(err) console.log(err)
		res.json(post)
	})
}


function removePost (req, res) {
	var id = req.params.id

	Post.remove({_id: id}, function(error) {
		if(error) res.json({message: 'Could not delete post b/c' + error});

		res.json({message: 'Post succesfully deleted'})
	})
}

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