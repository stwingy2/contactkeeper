const express = require('express');
const router = express.Router();

router
	.route('/')
	.get((req, res) => {
		res.send('get contacts');
	}) // all private api/contacts
	.post((req, res) => {
		res.send('add contact');
	});

router.route('/:id').put((req, res) => res.send('edit contact')).delete((req, res) => res.send('delete contact'));

module.exports = router;
