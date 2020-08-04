const { userHandler } = require('../handlers');

const user = {
	saveUserDetails: async (req, res) => {
		const response = await userHandler.save_user_details(req, res);
		return response;
	},
};

module.exports = user;
