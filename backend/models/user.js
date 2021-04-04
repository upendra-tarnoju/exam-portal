const { users } = require('../schemas');
const APP_DEFAULTS = require('../config/app-defaults');

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

	findByUserType = (userType) => {
		return this.userModel.aggregate([
			{ $match: { userType } },
			{ $group: { _id: '$status', count: { $sum: 1 } } },
			{ $sort: { _id: 1 } },
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
					$or: [{ mobileNumber: data.mobileNumber }, { email: data.email }],
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

	updateByUserDataId = (id, data) => {
		return this.userModel.findOneAndUpdate(id, data, { new: true });
	};

	findLatest24HoursExaminers() {
		return this.userModel.aggregate([
			{
				$match: {
					$and: [
						{ userType: APP_DEFAULTS.ACCOUNT_TYPE.EXAMINER },
						{ createdAt: { $gt: new Date(Date.now() - 24 * 60 * 60 * 1000) } },
						{ status: APP_DEFAULTS.ACCOUNT_STATUS.PENDING },
					],
				},
			},
			{
				$project: { firstName: 1, lastName: 1 },
			},
		]);
	}

	findParticularUserExam = (userId) => {
		return this.userModel.aggregate([
			{ $match: { _id: userId } },
			{
				$lookup: {
					from: 'students',
					let: { studentId: '$userDataId' },
					pipeline: [
						{
							$match: {
								$expr: {
									$eq: ['$_id', '$$studentId'],
								},
							},
						},
					],
					as: 'examData',
				},
			},
			{ $unwind: '$examData' },
			{ $project: { 'examData.exam': 1 } },
		]);
	};

	countDocuments = (criteria) => {
		return this.userModel.countDocuments(criteria);
	};
}

module.exports = new Users();
