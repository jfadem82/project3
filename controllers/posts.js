var Post = require('../models/post.js')
// requires post model

//crud forthe posts model
function index (req, res) {
	Post.find({ time: { $gt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14)}  }).sort({time: -1}).exec( function (err, posts) {
		if (err) console.log(err);
		res.render('posts.ejs', {posts: posts});
	});
}

function userposts (req, res) {
	var userID = req.user._id //stores user's id as variable
	console.log(req.user._id)
	// the line below finds all posts that belong to the user by searching for estbalishged var userID
	Post.find({user: userID}, function(error, posts) {
		if(error) throw error
		res.render('userposts.ejs', {posts: posts});
	})
}

function show (req, res) {
	var id = req.params.id;

	Post.findById({_id: id}, function (err, post) {
		if (err) console.log(err);
		res.render('show.ejs', {post: post});
	});
}

function newPost (req, res) {
	res.render('newpost.ejs')		
}

function create (req, res) {
	console.log('req.body', req.body)
	console.log('req.user', req.user)
	var post = new Post();
	
	post.title 			= req.body.title;
	post.description 	= req.body.description;
	post.location 		= req.body.location;
	post.user 			= req.user._id; 
	post.avatar_url		= req.body.avatar_url;
	post.latitude		= req.body.latitude;
	post.longitude		= req.body.longitude;
	post.time 			= Date.now();

	post.save(function(err, post) {
		if (err) console.log(err)
		res.json({message: "Successfully 'posted', sort of...", success: true, postId: post._id})
	})
}

function removePost (req, res) {
	 var id = req.params.id

	Post.remove({_id: id}, function(error) {
		if(error) res.json({message: 'Could not delete post b/c:' + error});
		res.json({message: 'Post successfully deleted'});
	})
}

function editPost (req, res) {
	var id = req.params.id
	Post.findById(id, function(error, post) {
		if(error) { console.log(error) }
		res.render('editpost.ejs', {post: post})
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
				console.log("could not update post bc" + error)
			}
			res.redirect('/')
		})
	})
}
//exports these functions
module.exports = {
	index: index,
	userposts: userposts,
	show: show,
	newPost: newPost,
	create: create,
	removePost: removePost,
	editPost: editPost,
	updatePost: updatePost
}