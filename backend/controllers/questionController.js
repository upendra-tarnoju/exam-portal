const path = require('path');
const fs = require('fs');

const { questionHandler } = require('../handlers');

const question = {
	addNewQuestion: async (req, res) => {
		let questionDetails = req.body;
		let userDetails = req.user;
		let imageDetails = req.file;

		let response = await questionHandler.addNewQuestion(
			questionDetails,
			userDetails,
			imageDetails
		);

		res.status(response.status).send(response.data);
	},

	getAllQuestions: async (req, res) => {
		try {
			let params = req.params;

			let response = await questionHandler.getExamQuestions(params);

			res.status(response.status).send(response.data);
		} catch (err) {
			throw err;
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
		try {
			let params = req.params;
			let questionDetails = req.body;
			let imageDetails = req.file;

			let response = await questionHandler.update(
				params,
				questionDetails,
				imageDetails
			);
			res.status(response.status).send(response.data);
		} catch (err) {
			throw err;
		}
	},

	delete: async (req, res) => {
		try {
			let params = req.params;

			let response = await questionHandler.delete(params);
			res.status(response.status).send(response.data);
		} catch (err) {
			throw err;
		}
	},

	updateQuestionStatus: async (req, res) => {
		try {
			let params = req.params;
			let data = req.body;
			let response = await questionHandler.updateQuestionStatus(params, data);

			res.status(response.status).send(response.data);
		} catch (err) {
			throw err;
		}
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
