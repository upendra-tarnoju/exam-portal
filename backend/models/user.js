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

	updateByUserDataId = (id, data) => {
		return this.userModel.findOneAndUpdate(id, data, { new: true });
	};

	findLatest24HoursExaminers() {
		return this.userModel.aggregate([
			{
				$match: {
					$and: [
						{ accountType: 'examiner' },
						{
							createdAt: {
								$gt: new Date(Date.now() - 24 * 60 * 60 * 1000),
							},
						},
					],
				},
			},
			{
				$lookup: {
					from: 'examiners',
					let: { studentId: '$userDataId' },
					pipeline: [
						{
							$match: {
								$expr: {
									$eq: ['$_id', '$$studentId'],
								},
								accountStatus: 'pending',
							},
						},
						{ $project: { _id: 1 } },
					],
					as: 'examinerData',
				},
			},
			{ $unwind: '$examinerData' },
			{ $project: { firstName: 1, lastName: 1, 'examinerData._id': 1 } },
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
}

module.exports = new Users();
