const express = require('express');
const router = express.Router();
const fetchData = require('../utilities/fetchData');

router.get('/camps', async (req, res) => {
	try {
		const response = await fetchData();
		res.send(response.data.response.body.items.item);
	} catch (error) {
		console.error(error);
		res.status(500).send({ message: 'Internal Server Error' });
	}
});

module.exports = router;
