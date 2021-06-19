const express = require('express');
const passport = require('passport');

const { adminController } = require('../controllers');
const { validatorMiddleware, requestMiddleware } = require('../middleware');
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
		validatorMiddleware(AdminValidator.APPROVE_DECLINE_EXAMINER),
		adminController.approveOrDeclineExaminer
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

	router.get(
		'/subAdmin',
		passport.authenticate('jwt'),
		adminController.getSubAdminList
	);

	router.patch(
		'/subAdmin/status',
		passport.authenticate('jwt'),
		validatorMiddleware(AdminValidator.APPROVE_DECLINE_SUBADMIN),
		adminController.updateSubAdminStatus
	);

	return router;
};
