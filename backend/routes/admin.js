const express = require('express');
const passport = require('passport');

const { adminController } = require('../controllers');

module.exports = () => {
	const router = express.Router();

	router.get(
		'/examiner',
		passport.authenticate('jwt'),
		adminController.getExaminerDetails
	);

	router.patch(
		'/examiner',
		passport.authenticate('jwt'),
		adminController.saveExaminerDetails
	);

	return router;
};
