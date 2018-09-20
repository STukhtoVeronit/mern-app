const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Validation
const validatePostInput = require('../../validation/post');


// load models
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');

// @route   GET api/posts
// @desc    Get all posts
// @access  Public
router.get('/', (req, res) => {
	Post.find()
		.sort({date: -1})
		.then(posts => res.json(posts))
		.catch(err => res.status(404).json({nopePost: "nope posts found"}));

});

// @route   GET api/posts/:id
// @desc    Get all post by id
// @access  Public
router.get('/:id', (req, res) => {
	Post.findById(req.params.id)
		.then(posts => res.json(posts))
		.catch(err => res.status(404).json({nopePost: "nope post found"}));
});

// @route   post api/posts/posts
// @desc    Create post
// @access  Private
router.post(
	'/',
	passport.authenticate('jwt', {session: false}),
	(req, res) => {
		const {errors, isValid} = validatePostInput(req.body);

		if (!isValid){
			//if ane errors
			return res.status(404).json(errors);
		}

		const newPost = new Post({
			text:req.body.text,
			name: req.body.name,
			avatar: req.body.avatar,
			user: req.user.id
		});
		newPost.save().then(post => {
			res.json(post);
		});
	}
);

// @route   delete api/posts/:id
// @desc    Delte post by id
// @access  Private
router.delete(
	'/:id',
	passport.authenticate('jwt', {session: false}),
	(req, res) => {
		Profile.findOne({user: req.user.id})
			.then(profile => {
				Post.findById(req.params.id)
					.then(post => {
						if (post.user.toString() !== req.user.id) {
							return res.status(401).json({notauthorized: 'User not authorized'});
						}
						post.remove().then(() => res.json({success: true}));
					})
					.catch(err => res.status(404).json({postnotfound: 'No post found'}));
			})
	}
);

// @route   post api/posts/like/:id
// @desc    post Like/unlike post by id
// @access  Private
router.post(
	'/like/:id',
	passport.authenticate('jwt', {session: false}),
	(req, res) => {
		Profile.findOne({user: req.user.id})
			.then(profile => {
				Post.findById(req.params.id)
					.then(post => {
						if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
							const removeIndex = post.likes
								.map(item => item.user.toString())
								.indexOf(req.user.id);
							post.likes.splice(removeIndex, 1);
							post.save().then(post => res.json(post));
						} else {
							post.likes.unshift({user: req.user.id });
							post.save().then(post => res.json(post));
						}
					})
					.catch(err => res.status(404).json({postnotfound: 'No post found'}));
			})
	}
);

// @route   post api/posts/comment/:id
// @desc    Add comment to post
// @access  Private
router.post(
	'/comment/:id',
	passport.authenticate('jwt', {session: false}),
	(req, res) => {
		const {errors, isValid} = validatePostInput(req.body);

		if (!isValid){
			//if any errors
			return res.status(404).json(errors);
		}

		Post.findById(req.params.id)
			.then(post => {
				const newComment = {
					text: req.body.text,
					name: req.body.name,
					avatar: req.body.avatar,
					user: req.user.id
				};

				post.comments.unshift(newComment);

				post.save().then( post => res.json(post))
			})
			.catch(err => res.status(404).json({postnotfound: 'No post found'}));
	}
);

// @route   delete api/posts/comment/:id
// @desc    delete comment from post
// @access  Private
router.delete(
	'/comment/:id/:comment_id',
	passport.authenticate('jwt', {session: false}),
	(req, res) => {
		Post.findById(req.params.id)
			.then(post => {
				if (post.comments.filter(
					comment => (comment._id.toString() === req.params.comment_id &&
								comment.user.toString() === req.user.id)
				).length === 0){
					return res
							.status(404)
							.json({commentnotexists: 'Comment does not exist or you don\'t have right for edit it'});
				}
				const removeIndex = post.comments
					.map(item => item._id.toString())
					.indexOf(req.params.comment_id);

				post.comments.splice(removeIndex, 1);

				post.save().then( post => res.json(post))
			})
			.catch(err => res.status(404).json({postnotfound: 'No post found ' +err}));
	}
);




module.exports = router;