const express = require('express');

const { userController, questionController } = require('../controllers');
const { UserValidator } = require('../validator');
const { requestMiddleware } = require('../middleware');

module.exports = () => {
	const router = express.Router();

	router.post(
		'/signup',
		requestMiddleware(UserValidator.SIGNUP_USER),
		userController.saveUserDetails
	);

	router.post(
		'/login',
		requestMiddleware(UserValidator.LOGIN_USER),
		userController.loginUser
	);

	router.get('/collegeList', userController.getCollegeList);

	router.get('/image/:imageId', questionController.getQuestionImage);

	return router;
};
