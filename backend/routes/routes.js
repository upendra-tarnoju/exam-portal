const express = require('express');
const { userController, adminController } = require('../controllers');

module.exports = () => {
	const router = express.Router();

	router.post('/signup', userController.saveUserDetails);

	router.post('/login', userController.loginUser);

	router.get('/admin/examiner', adminController.getExaminerDetails);

	return router;
};
