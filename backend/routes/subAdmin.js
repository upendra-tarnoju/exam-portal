const express = require('express');
const passport = require('passport');

const { subAdminController } = require('../controllers');
const { multerMiddleware } = require('../middleware');

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

	router.delete(
		'/examiner/:id',
		passport.authenticate('jwt'),
		subAdminController.removeExaminers
	);

	router.get(
		'/student/download',
		passport.authenticate('jwt'),
		subAdminController.downloadSampleExcelFile
	);

	router.post(
		'/student/upload',
		passport.authenticate('jwt'),
		multerMiddleware.physicalUpload.single('studentFile'),
		subAdminController.uploadStudentFile
	);

	router.get(
		'/student/list',
		passport.authenticate('jwt'),
		subAdminController.listStudents
	);

	return router;
};
