var Post = require('../models/post.js')

function index (req, res) {
	Post.find({}, function (err, posts) {
		if (err) console.log(err);
		res.render('posts.ejs', {posts: posts});
	});
}

function show (req, res) {
	var id = req.params.id;

	Post.findById({_id: id}, function (err, post) {
		if (err) console.log(err);
		res.render('./show.ejs', {post: post});
	});
}

function newPost (req, res) {
	res.render('newpost.ejs')
}

function create (req, res) {
	var post = new Post();
	
	post.title 				= req.body.title;
	post.description 	= req.body.description;
	post.location 		= req.body.location;
	post.user 				= req.user._id; 

	post.save(function(err, post) {
		if (err) console.log(err);
		res.redirect('/')
	});
}

function removePost (req, res) {
	 var id = req.params.id

	Post.remove({_id: id}, function(error) {
		if(error) res.json({message: 'Could not delete post b/c:' + error});
		res.json({message: 'Post successfully deleted'});
	})
}

module.exports = {
	index: index,
	show: show,
	newPost: newPost,
	create: create,
	removePost: removePost
}