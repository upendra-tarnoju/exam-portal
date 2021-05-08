const fs = require('fs');
const path = require('path');

let { question, exam } = require('../models');
let APP_CONSTANTS = require('../config/app-defaults');
let RESPONSE_MESSAGES = require('../config/response-messages');
let { queries } = require('../db');
let Schema = require('../schemas');

// let createQuestionData = (data, image) => {
// 	let optionArray = [];
// 	for (let key in data) {
// 		if (!isNaN(key.slice(-1))) {
// 			optionArray.push({ name: key, value: data[key] });
// 		}
// 	}
// 	return {
// 		examId: data.examId,
// 		question: data.question,
// 		questionMarks: data.questionMarks,
// 		optionType: data.optionType,
// 		options: optionArray,
// 		correctAnswer: data.correctAnswer,
// 		image: image ? image.filename : null,
// 	};
// };

const questions = {
	addNewQuestion: async (questionDetails, userDetails, imageDetails) => {
		let options = JSON.parse(questionDetails.optionsList);
		let optionList = [];
		let answerList = [];
		for (let [key, obj] of Object.entries(options)) {
			if (obj.answer) answerList.push(key);
			optionList.push({ key: key, value: obj.value });
		}

		let questionData = {
			examId: questionDetails.examId,
			question: questionDetails.question,
			description: questionDetails.description
				? questionDetails.description
				: null,
			questionMark: questionDetails.questionMark,
			optionType: questionDetails.optionType,
			image: imageDetails ? imageDetails.id : null,
			examinerId: userDetails._id,
			correctAnswer: answerList,
			options: optionList,
			status: APP_CONSTANTS.QUESTION_STATUS.ACTIVE,
		};

		await queries.create(Schema.question, questionData);

		return {
			status: RESPONSE_MESSAGES.QUESTION.CREATE.SUCCESS.STATUS_CODE,
			data: { msg: RESPONSE_MESSAGES.QUESTION.CREATE.SUCCESS.MSG },
		};
	},

	getSelectiveQuestionData: async (examId, pageIndex, pageSize) => {
		pageIndex = pageIndex * pageSize;
		let totalQuestions = await question.getSpecificData(examId);

		let questionData = await question
			.getSpecificData(examId)
			.skip(pageIndex)
			.limit(pageSize)
			.select({ _id: 1, question: 1, questionMarks: 1 });
		let examData = await exam.getById(examId);
		let examCode = examData[0].examCode;
		let totalMarks = examData[0].totalMarks;
		return {
			questionData,
			examCode,
			totalMarks,
			totalQuestions: totalQuestions.length,
		};
	},

	getAllQuestionData: async (examId) => {
		let questionData = await question
			.getSpecificData(examId)
			.select({ modifiedAt: 0, examId: 0 });
		return questionData;
	},

	getParticularQuestion: async (questionId) => {
		return question
			.findById(questionId)
			.select({ modifiedAt: 0, createdAt: 0, __v: 0, _id: 0 });
	},

	update: async (questionId, data, image) => {
		let questionObject = createQuestionData(data, image);
		let questionData = await question.findById(questionId).select({ image: 1 });
		let updatedQuestion = await question
			.update(questionId, questionObject)
			.select({ examId: 1, question: 1 });

		if (
			(data.image === null ||
				data.image === undefined ||
				data.image === 'null') &&
			questionData.image !== null
		) {
			let pathName = `${path.dirname(require.main.filename)}/uploads/${
				questionData.image
			}`;
			fs.unlinkSync(pathName);
		}

		return updatedQuestion;
	},

	delete: async (questionId) => {
		return question.deleteById(questionId);
	},
};

module.exports = questions;
