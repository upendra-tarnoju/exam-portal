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

	findByStudentId(studentId) {
		return this.studentModel.findOne({ studentId });
	}

	delete(studentId) {
		return this.studentModel.findOneAndRemove({ studentId });
	}

	find(examinerId) {
		return this.studentModel.aggregate([
			{ $match: { examinerId: ObjectId(examinerId) } },
			{
				$project: {
					fatherName: 1,
					motherName: 1,
					dob: 1,
					studentId: 1,
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
				$sort: { 'data.createdAt': -1 },
			},
			{
				$project: {
					fatherName: 1,
					motherName: 1,
					dob: 1,
					studentId: 1,
					'data.email': 1,
					'data.mobileNumber': 1,
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
				},
			},
		]);
	}
}

module.exports = new Students();
