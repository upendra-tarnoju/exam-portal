const { userHandler } = require('../handlers');

const user = {
	saveUserDetails: async (req, res) => {
		let userData = req.body;
		let response = await userHandler.saveUserDetails(userData);

		res.status(response.status).send(response.data);
	},

	loginUser: async (req, res, next) => {
		let response = await userHandler.loginUser(req, res, next);
		return response;
	},
};

module.exports = user;
