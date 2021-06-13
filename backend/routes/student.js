const express = require('express');
const passport = require('passport');

const { studentController, examController } = require('../controllers');

module.exports = () => {
	const router = express.Router();

	router.get(
		'/exam/:examId',
		passport.authenticate('jwt'),
		examController.validateExamKey
	);

	router.get(
		'/examList',
		passport.authenticate('jwt'),
		studentController.getParticularStudentExamDetails
	);

	router.get(
		'/exam/:examId/question',
		passport.authenticate('jwt'),
		studentController.getParticularExamQuestion
	);

	router.post(
		'/exam/:examId/question',
		passport.authenticate('jwt'),
		studentController.saveExamQuestionAnswer
	);

	router.put(
		'/exam/:examId',
		passport.authenticate('jwt'),
		studentController.submitExam
	);

	return router;
};
