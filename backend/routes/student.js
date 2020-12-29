const express = require('express');
const passport = require('passport');
const { studentController } = require('../controllers');

module.exports = () => {
	const router = express.Router();

	router.get(
		'/exam',
		passport.authenticate('jwt'),
		studentController.getParticularStudentExamDetails
	);

	return router;
};
