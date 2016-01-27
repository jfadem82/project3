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


module.exports = { 
	index: index,
	newPost: newPost
}