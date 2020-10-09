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

	findByEmailAndMobileNumber(mobileNumber, email, accountType) {
		return this.userModel.findOne({
			$and: [
				{
					$or: [{ mobileNumber }, { email }],
				},
				{
					accountType,
				},
			],
		});
	}

	deleteByUserDataId = (id) => {
		return this.userModel.findOneAndRemove({ userDataId: id });
	};
}

module.exports = new Users();
