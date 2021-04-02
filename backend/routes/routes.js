const express = require('express');
const expressJOI = require('express-joi-validation').createValidator({});

const { userController, questionController } = require('../controllers');
const { UserValidator } = require('../validator');

module.exports = () => {
	const router = express.Router();

	router.post(
		'/signup',
		expressJOI.body(UserValidator.SIGNUP),
		userController.saveUserDetails
	);

	router.post('/login', userController.loginUser);

	router.get('/image/:imageId', questionController.getQuestionImage);

	return router;
};
