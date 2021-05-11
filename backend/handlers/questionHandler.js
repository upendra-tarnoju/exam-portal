const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

let { question, exam } = require('../models');
let APP_CONSTANTS = require('../config/app-defaults');
let RESPONSE_MESSAGES = require('../config/response-messages');
let { queries } = require('../db');
let Schema = require('../schemas');

const questions = {
	addNewQuestion: async (questionDetails, userDetails, imageDetails) => {
		try {
			let aggregateArray = [
				{ $match: { examId: mongoose.Types.ObjectId(questionDetails.examId) } },
				{
					$group: { _id: '$totalMarks', examMarks: { $sum: '$questionMark' } },
				},
			];

			let questionData = await queries.aggregateData(
				Schema.question,
				aggregateArray
			);

			let conditions = { _id: questionDetails.examId };
			let projections = { totalMarks: 1 };
			let options = { lean: true };

			let examData = await queries.findOne(
				Schema.exam,
				conditions,
				projections,
				options
			);

			if (
				questionData[0].examMarks + parseInt(questionDetails.questionMark) >
				examData.totalMarks
			) {
				return {
					status:
						RESPONSE_MESSAGES.QUESTION.CREATE.TOTAL_MARKS_LIMIT.STATUS_CODE,
					data: {
						msg: RESPONSE_MESSAGES.QUESTION.CREATE.TOTAL_MARKS_LIMIT.MSG,
					},
				};
			} else {
				options = JSON.parse(questionDetails.optionsList);
				let optionList = [];
				let answerList = [];

				for (let [key, obj] of Object.entries(options)) {
					if (obj.answer) answerList.push(key);
					optionList.push({ key: key, value: obj.value });
				}

				let questionObject = {
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
				await queries.create(Schema.question, questionObject);

				let toUpdate;

				if (
					questionData[0].examMarks + parseInt(questionDetails.questionMark) ===
					examData.totalMarks
				) {
					toUpdate = {
						$set: {
							status: APP_CONSTANTS.EXAM_STATUS.ACTIVE,
							updatedDate: new Date(),
						},
					};
				} else if (
					questionData[0].examMarks + parseInt(questionDetails.questionMark) <
					examData.totalMarks
				) {
					toUpdate = {
						$set: {
							status: APP_CONSTANTS.EXAM_STATUS.INCOMPLETE_QUESTIONS,
							updatedDate: new Date(),
						},
					};
				}

				await queries.findAndUpdate(Schema.exam, conditions, toUpdate);
				return {
					status: RESPONSE_MESSAGES.QUESTION.CREATE.SUCCESS.STATUS_CODE,
					data: { msg: RESPONSE_MESSAGES.QUESTION.CREATE.SUCCESS.MSG },
				};
			}
		} catch (err) {
			throw err;
		}
	},

	getExamQuestions: async (params) => {
		try {
			let query = {
				$and: [
					{ examId: mongoose.Types.ObjectId(params.examId) },
					{ status: { $nin: [APP_CONSTANTS.QUESTION_STATUS.DELETED] } },
				],
			};
			let projections = {
				createdDate: 0,
				modifiedDate: 0,
				examId: 0,
				examinerId: 0,
			};
			let options = { lean: true };

			let questions = await queries.getData(
				Schema.question,
				query,
				projections,
				options
			);

			let countDocuments = await queries.countDocuments(Schema.question, query);

			query = { _id: mongoose.Types.ObjectId(params.examId) };
			projections = { totalMarks: 1 };

			let examDetails = await queries.findOne(
				Schema.exam,
				query,
				projections,
				options
			);

			return {
				status: 200,
				data: { questions, examDetails, count: countDocuments },
			};
		} catch (err) {
			throw err;
		}
	},

	getParticularQuestion: async (questionId) => {
		return question
			.findById(questionId)
			.select({ modifiedAt: 0, createdAt: 0, __v: 0, _id: 0 });
	},

	update: async (params, payload, imageDetails) => {
		try {
			let aggregateArray = [
				{
					$match: {
						$and: [
							{ examId: mongoose.Types.ObjectId(payload.examId) },
							{ _id: { $nin: [mongoose.Types.ObjectId(params.questionId)] } },
						],
					},
				},
				{
					$group: { _id: '$totalMarks', examMarks: { $sum: '$questionMark' } },
				},
			];

			let questionData = await queries.aggregateData(
				Schema.question,
				aggregateArray
			);

			let conditions = { _id: mongoose.Types.ObjectId(payload.examId) };
			let projections = { totalMarks: 1 };
			let options = { lean: true };

			let examData = await queries.findOne(
				Schema.exam,
				conditions,
				projections,
				options
			);

			if (questionData.length !== 0) {
				if (
					questionData[0].examMarks + parseInt(payload.questionMark) >
					examData.totalMarks
				) {
					return {
						status:
							RESPONSE_MESSAGES.QUESTION.UPDATE.TOTAL_MARKS_LIMIT.STATUS_CODE,
						data: {
							msg: RESPONSE_MESSAGES.QUESTION.UPDATE.TOTAL_MARKS_LIMIT.MSG,
						},
					};
				} else {
					let optionList = [];
					let answerList = [];

					options = JSON.parse(payload.optionsList);

					for (let [key, obj] of Object.entries(options)) {
						if (obj.answer) answerList.push(key);
						optionList.push({ key: key, value: obj.value });
					}
					conditions = { _id: mongoose.Types.ObjectId(params.questionId) };

					let toUpdate = {
						question: payload.question,
						description: payload.description,
						questionMark: payload.questionMark,
						optionType: payload.optionType,
						options: optionList,
						correctAnswer: answerList,
						updatedDate: new Date(),
					};

					let updatedQuestion = await queries.findAndUpdate(
						Schema.question,
						conditions,
						toUpdate
					);

					if (updatedQuestion) {
						if (
							questionData[0].examMarks + parseInt(payload.questionMark) ===
							examData.totalMarks
						) {
							toUpdate = {
								$set: {
									status: APP_CONSTANTS.EXAM_STATUS.ACTIVE,
									updatedDate: new Date(),
								},
							};
						} else if (
							questionData[0].examMarks + parseInt(payload.questionMark) <
							examData.totalMarks
						) {
							toUpdate = {
								$set: {
									status: APP_CONSTANTS.EXAM_STATUS.INCOMPLETE_QUESTIONS,
									updatedDate: new Date(),
								},
							};
						}

						conditions = { _id: mongoose.Types.ObjectId(payload.examId) };

						await queries.findAndUpdate(Schema.exam, conditions, toUpdate);

						return {
							status: RESPONSE_MESSAGES.QUESTION.UPDATE.SUCCESS.STATUS_CODE,
							data: { msg: RESPONSE_MESSAGES.QUESTION.UPDATE.SUCCESS.MSG },
						};
					} else {
						return {
							status:
								RESPONSE_MESSAGES.QUESTION.UPDATE.INVALID_QUESTION_ID
									.STATUS_CODE,
							data: {
								msg: RESPONSE_MESSAGES.QUESTION.UPDATE.INVALID_QUESTION_ID.MSG,
							},
						};
					}
				}
			} else {
				return {
					status: RESPONSE_MESSAGES.QUESTION.UPDATE.INVALID_EXAM_ID.STATUS_CODE,
					data: { msg: RESPONSE_MESSAGES.QUESTION.UPDATE.INVALID_EXAM_ID.MSG },
				};
			}
		} catch (err) {
			throw err;
		}
	},

	delete: async (params) => {
		try {
			let condition = { _id: mongoose.Types.ObjectId(params.questionId) };
			let toUpdate = {
				$set: { status: APP_CONSTANTS.QUESTION_STATUS.DELETED },
			};
			let options = { lean: true, new: true };

			let questionDetail = await queries.findAndUpdate(
				Schema.question,
				condition,
				toUpdate,
				options
			);

			if (questionDetail) {
				return {
					status: RESPONSE_MESSAGES.QUESTION.DELETE.SUCCESS.STATUS_CODE,
					data: {
						msg: RESPONSE_MESSAGES.QUESTION.DELETE.SUCCESS.MSG,
						question: { _id: questionDetail._id },
					},
				};
			} else {
				return {
					status: RESPONSE_MESSAGES.QUESTION.DELETE.INVALID_ID.STATUS_CODE,
					data: { msg: RESPONSE_MESSAGES.QUESTION.DELETE.INVALID_ID.MSG },
				};
			}
		} catch (err) {
			throw err;
		}
	},

	updateQuestionStatus: async (params, data) => {
		try {
			let condition = { _id: mongoose.Types.ObjectId(params.questionId) };
			let toUpdate;
			let options = { lean: true, new: true };

			if (data.status === APP_CONSTANTS.QUESTION_STATUS.ACTIVE) {
				toUpdate = {
					$set: {
						status: APP_CONSTANTS.QUESTION_STATUS.ACTIVE,
						modifiedDate: new Date(),
					},
				};
			} else {
				toUpdate = {
					$set: {
						status: APP_CONSTANTS.QUESTION_STATUS.INACTIVE,
						modifiedDate: new Date(),
					},
				};
			}

			let questionDetail = await queries.findAndUpdate(
				Schema.question,
				condition,
				toUpdate,
				options
			);

			if (questionDetail) {
				return {
					status:
						RESPONSE_MESSAGES.QUESTION.UPDATE.STATUS[data.status].STATUS_CODE,
					data: {
						msg: RESPONSE_MESSAGES.QUESTION.UPDATE.STATUS[data.status].MSG,
					},
				};
			} else {
				return {
					status:
						RESPONSE_MESSAGES.QUESTION.UPDATE.STATUS.INVALID_ID.STATUS_CODE,
					data: {
						msg: RESPONSE_MESSAGES.QUESTION.UPDATE.STATUS.INVALID_ID.MSG,
					},
				};
			}
		} catch (err) {
			throw err;
		}
	},
};

module.exports = questions;
