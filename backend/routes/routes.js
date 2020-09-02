const express = require('express');
const {
	userController,
	adminController,
	examinerController,
	examController,
} = require('../controllers');
const passport = require('passport');

module.exports = () => {
	const router = express.Router();

	router.post('/signup', userController.saveUserDetails);

	router.post('/login', userController.loginUser);

	router.get('/admin/examiner', adminController.getExaminerDetails);

	router.patch('/admin/examiner', adminController.saveExaminerDetails);

	router.patch(
		'/examiner',
		passport.authenticate('jwt'),
		examinerController.updateExaminerDetails
	);

	router.post(
		'/examiner/course',
		passport.authenticate('jwt'),
		examinerController.createCourse
	);

	router.get(
		'/examiner/course',
		passport.authenticate('jwt'),
		examinerController.getCourses
	);

	router.patch(
		'/examiner/course',
		passport.authenticate('jwt'),
		examinerController.updateCourse
	);

	router.delete(
		'/examiner/course',
		passport.authenticate('jwt'),
		examinerController.deleteCourse
	);

	router.post(
		'/examiner/exam',
		passport.authenticate('jwt'),
		examController.saveExamDetails
	);

	router.get(
		'/examiner/exam',
		passport.authenticate('jwt'),
		examController.getExamDetails
	);

	router.patch(
		'/examiner/exam',
		passport.authenticate('jwt'),
		examController.updateExamDetails
	);

	router.delete(
		'/examiner/exam',
		passport.authenticate('jwt'),
		examController.deleteExam
	);

	return router;
};
