const express = require('express');

const { adminController } = require('../controllers');
const { requestMiddleware, authMiddleware } = require('../middleware');
const { AdminValidator } = require('../validator');

module.exports = () => {
	const router = express.Router();

	router.get(
		'/examiner',
		authMiddleware,
		requestMiddleware(AdminValidator.EXAMINER_DETAILS),
		adminController.getExaminerDetails
	);

	router.patch(
		'/examiner',
		authMiddleware,
		requestMiddleware(AdminValidator.APPROVE_DECLINE_EXAMINER),
		adminController.approveOrDeclineExaminer
	);

	router.get(
		'/dashboard',
		authMiddleware,
		adminController.getDashboardCardDetails
	);

	router.get(
		'/dashboard/exam',
		authMiddleware,
		requestMiddleware(AdminValidator.EXAM_DETAILS),
		adminController.getUnexpiredExamDetails
	);

	router.get(
		'/dashboard/latestExaminers',
		authMiddleware,
		adminController.getLatestPendingExaminers
	);

	router.get(
		'/subAdmin',
		authMiddleware,
		requestMiddleware(AdminValidator.SUB_ADMIN_DETAILS),
		adminController.getSubAdminList
	);

	router.patch(
		'/subAdmin/status',
		authMiddleware,
		requestMiddleware(AdminValidator.APPROVE_DECLINE_SUBADMIN),
		adminController.updateSubAdminStatus
	);

	return router;
};
