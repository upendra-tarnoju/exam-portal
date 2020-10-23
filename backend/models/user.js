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
		return this.userModel.findOne({
			$and: [
				{
					$or: [
						{ mobileNumber: data.mobileNumber },
						{ email: data.email },
					],
				},
				{
					accountType: data.accountType,
				},
			],
		});
	}

	deleteByUserDataId = (id) => {
		return this.userModel.findOneAndRemove({ userDataId: id });
	};

	findLatest24HoursExaminers() {
		return this.userModel
			.find({
				$and: [
					{ accountType: 'examiner' },
					{
						createdAt: {
							$gt: new Date(Date.now() - 24 * 60 * 60 * 1000),
						},
					},
				],
			})
			.select({ firstName: 1, lastName: 1 });
	}
}

module.exports = new Users();
