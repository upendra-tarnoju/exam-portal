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

	findByAccountStatus = (accountStatus) => {
		return this.userModel.find({ accountStatus: accountStatus });
	};

	findByAccountType = (accountType) => {
		return this.userModel.find({ accountType: accountType });
	};

	update = (id, accountStatus) => {
		return this.userModel.findByIdAndUpdate(id, {
			accountStatus: accountStatus,
		});
	};
}

module.exports = new Users();
