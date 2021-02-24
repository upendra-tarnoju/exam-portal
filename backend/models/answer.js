const mongoose = require('mongoose');

const { answers } = require('../schemas');

class Answer {
	constructor() {
		this.answerModel = answers;
	}

	create(answerData) {
		let { questionId, examId, studentId, answer, marks, correct } = answerData;

		let answerObj = new this.answerModel({
			userId: studentId,
			examId,
			answers: [{ questionId: questionId, answer: answer, correct }],
			marks,
		});
		return answerObj.save();
	}

	find(answerData) {
		return this.answerModel.findOne({
			$and: [{ examId: answerData.examId }, { userId: answerData.studentId }],
		});
	}

	updateExamAnswers(answerData) {
		return this.answerModel.updateOne({
			$and: [{ examId: answerData.examId }, { userId: answerData.studentId }],
			$set: { marks: answerData.marks },
			$push: {
				answers: {
					questionId: mongoose.Types.ObjectId(answerData.questionId),
					answer: answerData.answer,
					correct: answerData.correct,
				},
			},
		});
	}

	updateExamMarks(answerData) {
		return this.answerModel.updateOne(
			{
				$and: [
					{ examId: answerData.examId },
					{ userId: answerData.studentId },
					{
						'answers.questionId': mongoose.Types.ObjectId(
							answerData.questionId
						),
					},
				],
			},
			{
				$set: {
					marks: answerData.marks,
					'answers.$.correct': answerData.correct,
					'answers.$.answer': answerData.answer,
				},
			}
		);
	}
}

module.exports = new Answer();
