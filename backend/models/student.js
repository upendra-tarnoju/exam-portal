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

	findByStudentId(existingUserId, studentData) {
		return this.studentModel.findOne({
			$and: [
				{ studentId: studentData.studentId },
				{ exam: { $elemMatch: { examId: studentData.examCode } } },
				{ _id: existingUserId },
			],
		});
	}

	delete(studentId) {
		return this.studentModel.findOneAndRemove({ studentId });
	}

	updateExam(studentId, data) {
		return this.studentModel.findByIdAndUpdate(studentId, {
			$push: { exam: data },
		});
	}

	findByExamId(examId) {
		return this.studentModel.find({
			exam: { $elemMatch: { examId } },
		});
	}

	updateStudentAccountStatus(studentId, data) {
		return this.studentModel.findOneAndUpdate(
			{
				_id: studentId,
				'exam.examId': data.examId,
			},
			{ $set: { 'exam.$.accountStatus': data.accountStatus } }
		);
	}

	updateStudentDetails(studentId, data) {
		return this.studentModel.findOneAndUpdate(studentId, data, { new: true });
	}

	findStudentsByExamId(examId) {
		return this.studentModel.aggregate([
			{ $match: { exam: { $elemMatch: { examId: ObjectId(examId) } } } },
			{
				$lookup: {
					from: 'users',
					localField: '_id',
					foreignField: 'userDataId',
					as: 'userData',
				},
			},
			{ $unwind: '$userData' },
			{
				$project: {
					studentId: 1,
					fatherName: 1,
					motherName: 1,
					address: 1,
					gender: 1,
					dob: 1,
					exam: 1,
					'userData.mobileNumber': 1,
					'userData.email': 1,
					'userData.firstName': {
						$concat: [
							{ $toUpper: { $substrCP: ['$userData.firstName', 0, 1] } },
							{
								$substrCP: [
									'$userData.firstName',
									1,
									{
										$subtract: [
											{ $strLenCP: '$userData.firstName' },
											1,
										],
									},
								],
							},
						],
					},
					'userData.lastName': {
						$concat: [
							{ $toUpper: { $substrCP: ['$userData.lastName', 0, 1] } },
							{
								$substrCP: [
									'$userData.lastName',
									1,
									{
										$subtract: [
											{ $strLenCP: '$userData.lastName' },
											1,
										],
									},
								],
							},
						],
					},
				},
			},
		]);
	}

	findAll = () => {
		return this.studentModel.find();
	};
}

module.exports = new Students();
