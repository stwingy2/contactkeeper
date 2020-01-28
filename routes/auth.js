const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const User = require('../models/User');
const config = require('config');
const { check, validationResult } = require('express-validator');

router
	.route('/')
	.get(auth, async (req, res) => {
		try {
			const user = await User.findById(req.user.id).select('-password');
			res.json(user);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('sever error');
		}
	}) //private   api/auth
	.post(
		[
			check('email', 'Please enter a valid email').isEmail(),
			check('password', 'Please enter 6 or more characters').isLength({ min: 6 })
		],
		async (req, res) => {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			} //log in
			const { email, password } = req.body;
			try {
				let user = await User.findOne({ email });
				if (!user) {
					return res.status(400).json({ msg: 'Invalid credentials' });
				}
				const isMatch = await bcrypt.compare(password, user.password);
				if (!isMatch) {
					return res.status(400).json({ msg: 'Invalid credentials' });
				}
				const payload = { id: user.id };
				jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 }, (err, token) => {
					if (err) res.throw(err);
					res.json({ token });
				});
			} catch (err) {
				console.error(err.message);
				res.status(500).send('server error');
			}
		}
	); //public

module.exports = router;
