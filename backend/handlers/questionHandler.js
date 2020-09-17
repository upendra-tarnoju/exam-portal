let { question, exam } = require('../models');

let createQuestionData = (data, image) => {
	let options = JSON.parse(data.options);
	let optionArray = options.map((option) => {
		let key = Object.keys(option)[0];
		return { name: key, value: option[key].value };
	});
	return {
		examId: data.examId,
		question: data.question,
		optionType: data.optionsType,
		options: optionArray,
		correctAnswer: data.correctAnswer,
		image: image ? image.filename : null,
	};
};

const questions = {
	addNewQuestion: async (questionData, image) => {
		let questionObject = createQuestionData(questionData, image);
		return question.create(questionObject);
	},

	getAllQuestions: async (examId) => {
		let questionData = await question
			.getSpecificData(examId)
			.select({ _id: 1, question: 1 });
		let examData = await exam.getById(examId).select({ examCode: 1 });
		return { questionData, examData };
	},

	getParticularQuestion: async (questionId) => {
		return question
			.findById(questionId)
			.select({ modifiedAt: 0, createdAt: 0, __v: 0, _id: 0 });
	},

	update: async (questionId, data, image) => {
		let questionObject = createQuestionData(data, image);
		return question
			.update(questionId, questionObject)
			.select({ examId: 1, question: 1 });
	},
};

module.exports = questions;
