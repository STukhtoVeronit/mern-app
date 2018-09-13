const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const {secretOrKey} = require('../../config/keys');

// Load input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

//Load user model
const User = require('../../models/User');


// @route   GET api/users/test
// @desc    Test users route
// @access  Public
router.get('/test', (req, res) => {
	res.json({msg: "USer works"});
});

// @route   post api/users/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
	const { errors, isValid } = validateRegisterInput(req.body);

	if (!isValid) {
		return res.status(400).json(errors);
	}

	User.findOne({email: req.body.email})
		.then(user => {
			if (user) {
				errors.email = "Email already exists";
				return res.status(400).json(errors);
			} else {
				const avatar = gravatar.url(req.body.email, {
					s: '200',
					r: "pg",
					d: 'mm'
				});

				const newUser = new User({
					name: req.body.name,
					email: req.body.email,
					avatar,
					password: req.body.password
				});
				bcrypt.genSalt(10, (err, salt) => {
					bcrypt.hash(newUser.password, salt, (err, hash) => {
						if (err) throw err;
						newUser.password = hash;
						newUser.save()
							.then(user => res.json(user))
							.catch(err => console.err(err));
					})
				})
			}
		})
});

// @route   post api/usesrs/login
// @desc    Login user / Returning JWT token
// @access  Public
router.post('/login', (req, res) => {
	const {errors, isValid} = validateLoginInput(req.body);

	if (!isValid){
		return res.status(400).json(errors);
	}

	const email = req.body.email;
	const password = req.body.password;

	// Find user by email
	User.findOne({email})
		.then(user => {
			// Check user
			if (!user) {
				errors.email = "User not found";
				return res.status(404).json(errors);
			}
			//	Check password
			bcrypt.compare(password, user.password)
				.then(isMatch => {
					if (isMatch) {
						//User mathced
						const payload = {
							id: user.id,
							name: user.name,
							avatar: user.avatar
						};
						//Sign token
						jwt.sign(
							payload,
							secretOrKey,
							{expiresIn: 36000},
							(err, token) => {
								res.json({
									success: true,
									token: 'Bearer ' + token
								});
							}
						);
					} else {
						errors.password = 'Password incorrect';
						res.status(400).json(errors);
					}
				})

		})
});

// @route   get api/users/current
// @desc    Return current user
// @access  Private
router.get('/current',passport.authenticate('jwt', {session: false}), (req, res) => {
	res.json(req.user.id);
});

module.exports = router;