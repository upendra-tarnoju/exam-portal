const express = require('express');
const passport = require('passport');

const {
	examinerController,
	examController,
	questionController,
	studentController,
} = require('../controllers');
const { multerMiddleware, validatorMiddleware } = require('../middleware');
const { ExaminerValidator } = require('../validator');

module.exports = () => {
	const router = express.Router();

	router.patch(
		'/',
		passport.authenticate('jwt'),
		examinerController.updateExaminerDetails
	);

	router.post(
		'/course',
		passport.authenticate('jwt'),
		validatorMiddleware(ExaminerValidator.SAVE_COURSE),
		examinerController.createCourse
	);

	router.get(
		'/course/default',
		passport.authenticate('jwt'),
		examinerController.getDefaultCourses
	);

	router.get(
		'/course',
		passport.authenticate('jwt'),
		validatorMiddleware(ExaminerValidator.GET_COURSES),
		examinerController.getExaminerCourses
	);

	router.patch(
		'/course',
		passport.authenticate('jwt'),
		examinerController.updateCourse
	);

	router.delete(
		'/course',
		passport.authenticate('jwt'),
		validatorMiddleware(ExaminerValidator.DELETE_COURSE),
		examinerController.deleteCourse
	);

	router.post(
		'/exam',
		passport.authenticate('jwt'),
		examController.saveExamDetails
	);

	router.get(
		'/exam',
		passport.authenticate('jwt'),
		examController.getExamDetails
	);

	router.get(
		'/exam/:examId',
		passport.authenticate('jwt'),
		examController.getParticularExam
	);

	router.patch(
		'/exam/:examId',
		passport.authenticate('jwt'),
		examController.updateExamDetails
	);

	router.delete(
		'/exam',
		passport.authenticate('jwt'),
		examController.deleteExam
	);

	router.post(
		'/question',
		passport.authenticate('jwt'),
		multerMiddleware.upload.single('image'),
		questionController.addNewQuestion
	);

	router.get(
		'/question',
		passport.authenticate('jwt'),
		questionController.getAllQuestions
	);

	router.get(
		'/question/:questionId',
		passport.authenticate('jwt'),
		questionController.getParticularQuestion
	);

	router.patch(
		'/question/:questionId',
		passport.authenticate('jwt'),
		multerMiddleware.upload.single('image'),
		questionController.update
	);

	router.delete(
		'/question/:questionId',
		passport.authenticate('jwt'),
		questionController.delete
	);

	router.post(
		'/student',
		passport.authenticate('jwt'),
		multerMiddleware.upload.single('file'),
		studentController.addNewStudent
	);

	router.get(
		'/student',
		passport.authenticate('jwt'),
		studentController.getAllStudents
	);

	router.delete(
		'/student/:studentId',
		passport.authenticate('jwt'),
		studentController.deleteStudent
	);

	router.patch(
		'/student/:studentId',
		passport.authenticate('jwt'),
		studentController.updateStudent
	);

	router.get(
		'/exam/:examId/student',
		passport.authenticate('jwt'),
		studentController.getParticularExamStudents
	);

	router.patch(
		'/profile',
		passport.authenticate('jwt'),
		examinerController.updateProfile
	);

	return router;
};
