const axios = require('axios');
const key = require('../config/serviceKey');
const url = require('../config/url');

const fetchData = async () => {
	try {
		return await axios.get(url.goCampingUrl, {
			params: {
				serviceKey: key.serviceKey,
				numOfRows: '10',
				pageNo: '1',
				MobileOS: 'IOS',
				MobileApp: 'AppTest',
				// mapX: '128.6142847',
				// mapY: '36.0345423',
				// radius: '2000',
				_type: 'json',
			},
		});
	} catch (error) {
		console.log(error);
	}
};

module.exports = fetchData;
