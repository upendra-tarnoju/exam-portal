const express = require('express');

const { userController, questionController } = require('../controllers');
const { UserValidator } = require('../validator');
const { validatorMiddleware } = require('../middleware');

module.exports = () => {
	const router = express.Router();

	router.post(
		'/signup',
		validatorMiddleware(UserValidator.SIGNUP),
		userController.saveUserDetails
	);

	router.post('/login', userController.loginUser);

	router.get('/image/:imageId', questionController.getQuestionImage);

	return router;
};
