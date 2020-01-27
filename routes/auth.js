const express = require('express');
const router = express.Router();

router
	.route('/')
	.get((req, res) => {
		res.send('get user');
	}) //private   api/auth
	.post((req, res) => {
		res.send('log in');
	}); //public

module.exports = router;
