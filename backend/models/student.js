const { student } = require('../schemas');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

class Students {
	constructor() {
		this.studentModel = student;
	}

	create(data) {
		let studentData = new this.studentModel(data);
		return studentData.save();
	}

	findByExaminerId(examinerId) {
		return this.studentModel.find({ examinerId: examinerId });
	}

	find(examinerId) {
		return this.studentModel.aggregate([
			{ $match: { examinerId: ObjectId(examinerId) } },
			{
				$project: {
					fatherName: 1,
					motherName: 1,
					dob: 1,
				},
			},
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
					fatherName: 1,
					motherName: 1,
					dob: 1,
					'data.email': 1,
					'data.mobileNumber': 1,
					'data.firstName': 1,
					'data.lastName': 1,
				},
			},
		]);
	}
}

module.exports = new Students();
