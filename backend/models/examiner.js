const { examiner } = require('../schemas');

class Examiner {
	constructor() {
		this.examinerModel = examiner;
	}

	create(data) {
		let examinerData = new this.examinerModel(data);
		return examinerData.save();
	}

	find(userId) {
		return this.examinerModel.findOne(userId);
	}

	update = (id, toUpdate) => {
		return this.examinerModel.findByIdAndUpdate(id, toUpdate, { new: true });
	};

	findByAccountStatus = (accountStatus, pageIndex, pageSize) => {
		return this.examinerModel
			.aggregate([
				{ $match: { accountStatus: accountStatus } },
				{
					$lookup: {
						from: 'users',
						localField: '_id',
						foreignField: 'userDataId',
						as: 'data',
					},
				},
				{ $unwind: '$data' },
				{
					$project: {
						'data.firstName': {
							$concat: [
								{ $toUpper: { $substrCP: ['$data.firstName', 0, 1] } },
								{
									$substrCP: [
										'$data.firstName',
										1,
										{
											$subtract: [{ $strLenCP: '$data.firstName' }, 1],
										},
									],
								},
							],
						},
						'data.lastName': {
							$concat: [
								{ $toUpper: { $substrCP: ['$data.lastName', 0, 1] } },
								{
									$substrCP: [
										'$data.lastName',
										1,
										{
											$subtract: [{ $strLenCP: '$data.lastName' }, 1],
										},
									],
								},
							],
						},
						'data.email': 1,
					},
				},
			])
			.skip(pageIndex)
			.limit(pageSize);
	};

	countExaminers = (criteria) => {
		return this.examinerModel.countDocuments(criteria);
	};
}

module.exports = new Examiner();
