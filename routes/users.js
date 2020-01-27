const express = require('express');
const router = express.Router();

//api/users
router.post('/', (req, res) => {
	res.send('REGISTER');
});

module.exports = router;
