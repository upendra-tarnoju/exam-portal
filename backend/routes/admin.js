const express = require('express');
const passport = require('passport');

const { adminController } = require('../controllers');
const { validatorMiddleware } = require('../middleware');
const { AdminValidator } = require('../validator');

module.exports = () => {
	const router = express.Router();

	router.get(
		'/examiner',
		passport.authenticate('jwt'),
		validatorMiddleware(AdminValidator.ADMIN_EXAMINER_DETAILS),
		adminController.getExaminerDetails
	);

	router.patch(
		'/examiner',
		passport.authenticate('jwt'),
		adminController.saveExaminerDetails
	);

	router.get(
		'/dashboard',
		passport.authenticate('jwt'),
		adminController.getDashboardCardDetails
	);

	router.get(
		'/dashboard/exam',
		passport.authenticate('jwt'),
		adminController.getUnexpiredExamDetails
	);

	router.get(
		'/dashboard/examinerCount',
		passport.authenticate('jwt'),
		adminController.examinerStatusCount
	);

	return router;
};
