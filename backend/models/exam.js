const { exam } = require('../schemas');

class Exams {
	constructor() {
		this.examModel = exam;
	}

	create = (data) => {
		let examData = new this.examModel(data);
		return examData.save();
	};

	get = (data) => {
		return this.examModel.find(data);
	};

	update = (examId, data) => {
		return this.examModel.findByIdAndUpdate(examId, data, {
			new: true,
		});
	};

	deleteById = (id) => {
		return this.examModel.findByIdAndDelete(id);
	};

	getById = (id) => {
		return this.examModel.findById(id);
	};

	findExamStudents(examinerId) {
		return this.examModel.aggregate([
			{ $match: { examinerId: `${examinerId}` } },
			{
				$lookup: {
					from: 'students',
					localField: '_id',
					foreignField: 'exam.examId',
					as: 'student',
				},
			},
			{
				$project: {
					subject: 1,
					examCode: 1,
					examDate: 1,
					totalStudents: { $size: '$student.exam' },
				},
			},
		]);
	}
}

module.exports = new Exams();
