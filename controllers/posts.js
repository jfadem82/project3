var Post = require('../models/post.js')

function index (req, res) {
	Post.find({}, function (err, posts) {
		if (err) console.log(err)
		res.render('layout', {posts: posts})
	})
}

module.exports = {
	index: index
}