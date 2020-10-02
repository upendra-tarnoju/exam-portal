const { users } = require('../schemas');

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

	findByAccountStatus = (accountStatus, accountType) => {
		return this.userModel.aggregate([
			{
				$match: { accountType },
			},
			{
				$lookup: {
					from: 'examiners',
					pipeline: [{ $match: { accountStatus } }],
					as: 'examiner',
				},
			},
			{
				$project: {
					firstName: 1,
					lastName: 1,
					email: 1,
				},
			},
		]);
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
}

module.exports = new Users();
