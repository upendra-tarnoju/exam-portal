const { examinerHandler } = require('../handlers');
const { responseManager } = require('../lib');

const examiner = {
	updateExaminerDetails: async (req, res) => {
		let userId = req.user._id;
		let examinerDetails = req.body;
		examinerHandler
			.updateExaminerDetails(examinerDetails, userId)
			.then((data, err) => {
				if (err) {
					res.status(400).send({ msg: 'Unexpected error, Try again' });
				} else {
					res.status(200).send({ msg: 'User updated' });
				}
			});
	},

	createCourse: async (req, res) => {
		try {
			let userDetails = req.user;
			let courseDetails = req.body;

			let responseData = await examinerHandler.createCourse(
				userDetails,
				courseDetails
			);

			responseManager.sendSuccessResponse(responseData, res);
		} catch (err) {
			responseManager.sendErrorResponse(err, res);
		}
	},

	getDefaultCourses: async (req, res) => {
		try {
			let responseData = await examinerHandler.getDefaultCourses();
			responseManager.sendSuccessResponse(responseData, res);
		} catch (err) {
			responseManager.sendErrorResponse(err, res);
		}
	},

	getExaminerCourses: async (req, res) => {
		try {
			let userData = req.user;
			let payload = req.query;

			let responseData = await examinerHandler.getExaminerCourses(
				payload,
				userData
			);

			responseManager.sendSuccessResponse(responseData, res);
		} catch (err) {
			responseManager.sendErrorResponse(err, res);
		}
	},

	updateCourse: async (req, res) => {
		try {
			let courseData = req.body;
			let userData = req.user;

			let responseData = await examinerHandler.updateCourse(
				courseData,
				userData
			);

			responseManager.sendSuccessResponse(responseData, res);
		} catch (err) {
			responseManager.sendErrorResponse(err, res);
		}
	},

	deleteCourse: async (req, res) => {
		try {
			let payload = req.query;
			let userDetails = req.user;
			let response = await examinerHandler.deleteCourse(payload, userDetails);
			res.status(response.status).send(response.data);
		} catch (err) {
			throw err;
		}
	},

	updateProfile: async (req, res) => {
		try {
			let userDetails = req.user;
			let payload = req.body;

			let responseData = await examinerHandler.updateProfile(
				payload,
				userDetails
			);
			responseManager.sendSuccessResponse(responseData, res);
		} catch (err) {
			responseManager.sendErrorResponse(err, res);
		}
	},
};

module.exports = examiner;
