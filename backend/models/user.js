const { users } = require('../schemas');
const user = require('../handlers/userHandler');

class Users {
	constructor() {
		this.userModel = users;
	}

	find = (email) => {
		return this.userModel.findOne({ email });
	};

	create = (data) => {
		const userData = new this.userModel(data);
		return userData.save();
	};
}

module.exports = new Users();
