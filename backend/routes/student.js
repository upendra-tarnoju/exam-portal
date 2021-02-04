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
		'/exam',
		passport.authenticate('jwt'),
		studentController.getParticularStudentExamDetails
	);

	return router;
};
