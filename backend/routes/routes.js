const express = require('express');

const { userController, questionController } = require('../controllers');

module.exports = () => {
	const router = express.Router();

	router.post('/signup', userController.saveUserDetails);

	router.post('/login', userController.loginUser);

	router.get('/image/:imageId', questionController.getQuestionImage);

	return router;
};
