const express = require('express');
const passport = require('passport');

const { subAdminController } = require('../controllers');

module.exports = () => {
	const router = express.Router();

	router.get(
		'/examiners',
		passport.authenticate('jwt'),
		subAdminController.getSubAdminExaminers
	);

	router.post(
		'/requestExaminer',
		passport.authenticate('jwt'),
		subAdminController.requestNewExaminer
	);

	return router;
};
