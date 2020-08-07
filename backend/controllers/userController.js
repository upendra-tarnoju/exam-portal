const { userHandler } = require('../handlers');

const user = {
	saveUserDetails: async (req, res) => {
		let response = await userHandler.saveUserDetails(req, res);
		return response;
	},

	loginUser: async (req, res, next) => {
		let response = await userHandler.loginUser(req, res, next);
		return response;
	},
};

module.exports = user;
