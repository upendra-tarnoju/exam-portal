const express = require('express');
const passport = require('passport');

const { subAdminController } = require('../controllers');
const { multerMiddleware, authMiddleware } = require('../middleware');

module.exports = () => {
	const router = express.Router();

	router.get(
		'/examiners',
		passport.authenticate('jwt'),
		subAdminController.getSubAdminExaminers
	);

	router.post(
		'/requestExaminer',
		authMiddleware,
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

	router.delete(
		'/student/:studentId',
		passport.authenticate('jwt'),
		subAdminController.removeStudent
	);

	router.get(
		'/student/:studentId',
		passport.authenticate('jwt'),
		subAdminController.viewStudent
	);

	router.patch(
		'/student/:studentId',
		passport.authenticate('jwt'),
		subAdminController.updateStudent
	);

	router.post(
		'/student',
		passport.authenticate('jwt'),
		multerMiddleware.upload.single('image'),
		subAdminController.addNewStudent
	);

	return router;
};
