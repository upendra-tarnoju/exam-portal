const express = require('express');

const {
	examinerController,
	examController,
	questionController,
	studentController,
} = require('../controllers');
const {
	multerMiddleware,
	validatorMiddleware,
	authMiddleware,
	requestMiddleware,
} = require('../middleware');
const { ExaminerValidator } = require('../validator');

module.exports = () => {
	const router = express.Router();

	router.patch('/', authMiddleware, examinerController.updateExaminerDetails);

	router.post(
		'/course',
		authMiddleware,
		requestMiddleware(ExaminerValidator.SAVE_COURSE),
		examinerController.createCourse
	);

	router.get(
		'/course/default',
		authMiddleware,
		examinerController.getDefaultCourses
	);

	router.get(
		'/course',
		authMiddleware,
		requestMiddleware(ExaminerValidator.GET_COURSES),
		examinerController.getExaminerCourses
	);

	router.patch(
		'/course',
		authMiddleware,
		requestMiddleware(ExaminerValidator.UPDATE_COURSE),
		examinerController.updateCourse
	);

	router.delete(
		'/course',
		authMiddleware,
		requestMiddleware(ExaminerValidator.DELETE_COURSE),
		examinerController.deleteCourse
	);

	router.post(
		'/exam',
		authMiddleware,
		requestMiddleware(ExaminerValidator.SAVE_EXAM),
		examController.saveExamDetails
	);

	router.get(
		'/exam',
		authMiddleware,
		requestMiddleware(ExaminerValidator.GET_EXAMS),
		examController.getExamDetails
	);

	router.get(
		'/exam/:examId/questionDetails',
		authMiddleware,
		requestMiddleware(ExaminerValidator.GET_EXAM_DETAILS),
		examController.getSpecificExamQuestionDetails
	);

	router.get(
		'/exam/examDetails',
		authMiddleware,
		requestMiddleware(ExaminerValidator.GET_EXAM_LIST),
		examController.getExamList
	);

	router.get(
		'/exam/:examId',
		authMiddleware,
		requestMiddleware(ExaminerValidator.GET_EXAM_DETAILS),
		examController.getParticularExam
	);

	router.patch(
		'/exam/:examId',
		authMiddleware,
		requestMiddleware(ExaminerValidator.UPDATE_EXAM),
		examController.updateExamDetails
	);

	router.delete(
		'/exam',
		authMiddleware,
		requestMiddleware(ExaminerValidator.DELETE_EXAM),
		examController.deleteExam
	);

	router.post(
		'/question',
		authMiddleware,
		multerMiddleware.upload.single('image'),
		questionController.addNewQuestion
	);

	router.get(
		'/exam/:examId/questions',
		authMiddleware,
		requestMiddleware(ExaminerValidator.GET_EXAM_QUESTIONS),
		questionController.getAllQuestions
	);

	router.get(
		'/question/:questionId',
		authMiddleware,
		requestMiddleware(ExaminerValidator.PARTICULAR_QUESTION),
		questionController.getParticularQuestion
	);

	router.patch(
		'/question/:questionId/status',
		authMiddleware,
		requestMiddleware(ExaminerValidator.QUESTION_STATUS),
		questionController.updateQuestionStatus
	);

	router.patch(
		'/question/:questionId',
		authMiddleware,
		multerMiddleware.upload.single('image'),
		// validatorMiddleware(ExaminerValidator.UPDATE_QUESTION),
		questionController.update
	);

	router.delete(
		'/question/:questionId',
		authMiddleware,
		requestMiddleware(ExaminerValidator.DELETE_QUESTION),
		questionController.delete
	);

	router.get(
		'/studentCount',
		authMiddleware,
		requestMiddleware(ExaminerValidator.EXAM_QUESTION_COUNT),
		studentController.getExamStudentsCount
	);

	router.get(
		'/students',
		authMiddleware,
		requestMiddleware(ExaminerValidator.STUDENTS_LIST),
		studentController.getAllStudentsList
	);

	router.post(
		'/student/assign',
		authMiddleware,
		requestMiddleware(ExaminerValidator.ASSIGN_STUDENTS),
		studentController.assignStudents
	);

	router.delete(
		'/student/:studentId',
		authMiddleware,
		requestMiddleware(ExaminerValidator.DEALLOCATE_STUDENT),
		studentController.deallocateStudent
	);

	router.patch(
		'/student/:studentId',
		authMiddleware,
		requestMiddleware(ExaminerValidator.UPDATE_STUDENT),
		studentController.updateStudent
	);

	router.get(
		'/exam/:examId/students',
		authMiddleware,
		requestMiddleware(ExaminerValidator.PARTICULAR_EXAM_STUDENTS),
		studentController.getParticularExamStudents
	);

	router.patch(
		'/student/:studentId/blockUnblock',
		authMiddleware,
		requestMiddleware(ExaminerValidator.BLOCK_UNBLOCK_STUDENT),
		studentController.blockOrUnblockStudent
	);

	router.patch(
		'/profile',
		authMiddleware,
		requestMiddleware(ExaminerValidator.UPDATE_PROFILE),
		examinerController.updateProfile
	);

	return router;
};
