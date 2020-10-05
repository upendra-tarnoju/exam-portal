const { users } = require('../schemas');

class Users {
	constructor() {
		this.userModel = users;
	}

	find = (data) => {
		return this.userModel.findOne(data);
	};

	create = (data) => {
		const userData = new this.userModel(data);
		return userData.save();
	};

	findByAccountType = (accountType) => {
		return this.userModel.aggregate([
			{
				$match: { accountType: accountType },
			},
			{
				$lookup: {
					from: 'examiners',
					localField: 'userDataId',
					foreignField: '_id',
					as: 'examiner',
				},
			},
			{
				$unwind: '$examiner',
			},
			{
				$project: { 'examiner.accountStatus': 1 },
			},
		]);
	};

	update = (id, toUpdate) => {
		return this.userModel.findByIdAndUpdate(id, toUpdate, { new: true });
	};

	findById = (id) => {
		return this.userModel.findById(id);
	};

	findByEmailAndMobileNumber(data) {
		return this.userModel.findOne({ $or: data });
	}
}

module.exports = new Users();
