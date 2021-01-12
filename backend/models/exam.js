const { exam } = require('../schemas');
const mongoose = require('mongoose');

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

	deleteDurationById = (examId) => {
		return this.examModel.findByIdAndUpdate(examId, {
			$unset: { duration: 1 },
		});
	};

	getById = (id) => {
		return this.examModel.aggregate([
			{ $match: { _id: new mongoose.Types.ObjectId(id) } },
			{
				$lookup: {
					from: 'courses',
					let: { courseId: { $toObjectId: '$course' } },
					pipeline: [
						{ $match: { $expr: { $eq: ['$$courseId', '$_id'] } } },
					],
					as: 'courses',
				},
			},
			{ $unwind: '$courses' },
			{
				$project: {
					password: 0,
					createdAt: 0,
					course: 0,
					'courses.modifiedAt': 0,
					'courses.createdAt': 0,
					'courses.__v': 0,
					'courses.examinerId': 0,
				},
			},
		]);
	};

	getByExamId = (examId) => {
		return this.examModel.findById(examId);
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

	findAll = () => {
		return this.examModel.find();
	};

	findByExamMonth = (minDate, maxDate) => {
		return this.examModel.aggregate([
			{
				$match: {
					examDate: { $gte: new Date(minDate), $lt: new Date(maxDate) },
				},
			},
			{
				$group: {
					_id: {
						$dateToString: { format: '%d', date: '$examDate' },
					},
					count: { $sum: 1 },
				},
			},
			{ $project: { _id: 0, examDate: '$_id', count: 1 } },
			{ $sort: { examDate: 1 } },
		]);
	};
}

module.exports = new Exams();
