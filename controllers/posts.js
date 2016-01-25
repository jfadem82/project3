var Post = require('../models/post.js')

function index (req, res) {
	Post.find({}, function (err, posts) {
		if (err) console.log(err)
		res.render('posts.ejs', {posts: posts});
	})
}

function show (req, res) {
	var id = req.params.id;

	Post.findById({_id: id}, function (err, post) {
		if (err) console.log(err)
		res.render('show.ejs', {post: post});
	})
}

function newPost (req, res) {
	res.render('newpost.ejs')
}

function create (req, res) {
	var post = new Post();
	

	post.title = req.body.title;
	post.description = req.body.description;
	post.location = req.body.location;
	post.user = req.user._id; 

	post.save(function(err) {
		if (err) console.log(err)
		res.redirect('/posts')
	})
}

// function editPost (req, res) {
// 	res.render('editpost.ejs')
// }

// function update (req, res) {
// 	var id = req.params.id;

// 	Post.findById({_id: id}, function(err, post) {
// 		if (err) console.log(err)
// 	})
	

// 	if(req.body.title) post.title = req.body.title;
// 	if(req.body.description) post.description = req.body.description;
// 	if(req.body.location) post.location = req.body.location;

// 	post.save(function(err) {
// 		if (err) console.log(err)
// 		res.redirect('posts')
// 	})
// }

module.exports = {
	index: index,
	show: show,
	newPost: newPost,
	create: create
}