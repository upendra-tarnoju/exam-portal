const { subAdminHandler } = require('../handlers');

const subAdmin = {
	getSubAdminExaminers: async (req, res) => {
		try {
			let userDetails = req.user;
			let payload = req.query;
			let response = await subAdminHandler.getSubAdminExaminers(
				payload,
				userDetails
			);
			res.status(response.status).send(response.data);
		} catch (err) {
			throw err;
		}
	},

	requestNewExaminer: async (req, res) => {
		try {
			let examinerDetails = req.body;
			let userDetails = req.user;
			let response = await subAdminHandler.requestNewExaminer(
				examinerDetails,
				userDetails
			);
			res.status(response.status).send(response.data);
		} catch (err) {
			throw err;
		}
	},
};

module.exports = subAdmin;
