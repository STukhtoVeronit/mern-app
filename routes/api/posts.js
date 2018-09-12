const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// @route   GET api/posts/test
// @desc    Test post route
// @access  Public
router.get('/test', (req, res) => {
	res.json({msg: "Posts works"});
});

// @route   post api/posts/posts
// @desc    Create post
// @access  Private
router.post('/posts', passport.authenticate('jwt', {session: false}), (req, res) => {

});


module.exports = router;