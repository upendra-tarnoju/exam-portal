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
				{ exam: { $elemMatch: { examId: studentData.examCode._id } } },
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
}

module.exports = new Students();
