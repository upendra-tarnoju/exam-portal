const path = require('path');
const fs = require('fs');

const { questionHandler } = require('../handlers');

const question = {
	addNewQuestion: async (req, res) => {
		let questionDetails = req.body;
		// questionDetails.imageId = req.file.id;
		let userDetails = req.user;
		let imageDetails = req.file;

		let response = await questionHandler.addNewQuestion(
			questionDetails,
			userDetails,
			imageDetails
		);

		// let questionImage = req.file;
		// questionHandler
		// 	.addNewQuestion(questionData, questionImage)
		// 	.then((response) => {
		// 		let data = {
		// 			_id: response._id,
		// 			question: response.question,
		// 			questionMarks: response.questionMarks,
		// 		};
		res.status(response.status).send(response.data);
		// 	});
	},

	getAllQuestions: async (req, res) => {
		let examId = req.query.examId;
		let { queryType, pageIndex, pageSize } = req.query;
		if (queryType === 'selective') {
			let response = await questionHandler.getSelectiveQuestionData(
				examId,
				parseInt(pageIndex, 10),
				parseInt(pageSize, 10)
			);
			res.status(200).send(response);
		} else {
			questionHandler.getAllQuestionData(examId).then((response) => {
				res.status(200).send(response);
			});
		}
	},

	getParticularQuestion: async (req, res) => {
		let questionId = req.params.questionId;
		questionHandler
			.getParticularQuestion(questionId)
			.then((response) => {
				res.status(200).send(response);
			})
			.catch((error) => {
				console.log(error);
			});
	},

	update: async (req, res) => {
		let questionId = req.params.questionId;
		let questionData = req.body;
		let questionImage = req.file;
		if (questionData.image === 'null') {
			questionImage = {};
			questionImage['filename'] = null;
		}
		let response = questionHandler.update(
			questionId,
			questionData,
			questionImage
		);
		res.status(200).send(response);
	},

	delete: async (req, res) => {
		let questionId = req.params.questionId;
		questionHandler.delete(questionId).then((response) => {
			let data = {
				question: response.question,
				questionMarks: response.questionMarks,
			};
			res.status(200).send(data);
		});
	},

	getQuestionImage: async (req, res) => {
		let imageId = req.params.imageId;
		let uploadDirectory = path.join(`uploads/${imageId}`);
		fs.readFile(uploadDirectory, (err, data) => {
			res.writeHead(200, { 'Content-Type': 'image/jpg' });
			res.end(data, 'Base64');
		});
	},
};

module.exports = question;
