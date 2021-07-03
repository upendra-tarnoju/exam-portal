const express = require('express');
const passport = require('passport');

const { authMiddleware, requestMiddleware } = require('../middleware');
const { studentController, examController } = require('../controllers');
const { StudentValidator } = require('../validator');

module.exports = () => {
	const router = express.Router();

	router.post(
		'/exam/validateKey',
		authMiddleware,
		requestMiddleware(StudentValidator.VALIDATE_EXAM_KEY),
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
		'/exam/:examId/submit',
		passport.authenticate('jwt'),
		studentController.submitExam
	);

	return router;
};
