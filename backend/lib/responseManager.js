const RESPONSE_MESSAGES = require('../config/response-messages');

const responseManager = {
	sendErrorResponse: (err, res) => {
		let response;
		console.log(err, err.name);
		if (
			err.name == 'CastError' ||
			err.name == 'ValidationError' ||
			err.name == 'RangeError' ||
			err.name == 'MongoError'
		) {
			response = {
				status: RESPONSE_MESSAGES.DB_ERROR.STATUS_CODE,
				data: { msg: RESPONSE_MESSAGES.DB_ERROR.MSG },
			};
		}

		res.status(response.status).send(response.data);
	},

	sendSuccessResponse: (data, res) => {
		let response = {
			status: data.response.STATUS_CODE,
			data: { msg: data.response.MSG, ...data.finalData },
		};
		res.status(response.status).send(response.data);
	},

	sendJOIResponse: (msg, res) => {
		let response = {
			status: 500,
			data: { msg, type: 'JOI error' },
		};

		res.status(response.status).send(response.data);
	},
};

module.exports = responseManager;
