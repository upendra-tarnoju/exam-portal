const { examinerHandler } = require('../handlers');

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

			let response = await examinerHandler.createCourse(
				userDetails,
				courseDetails
			);

			res.status(response.status).send(response.data);
		} catch (err) {
			throw err;
		}
	},

	getDefaultCourses: async (req, res) => {
		try {
			response = await examinerHandler.getDefaultCourses();
			res.status(response.status).send(response.data);
		} catch (err) {
			throw err;
		}
	},

	getExaminerCourses: async (req, res) => {
		try {
			let userData = req.user;
			let payload = req.query;

			let response = await examinerHandler.getExaminerCourses(
				payload,
				userData
			);

			res.status(response.status).send(response.data);
		} catch (err) {
			throw err;
		}
	},

	updateCourse: async (req, res) => {
		try {
			let courseData = req.body;
			let userData = req.user;

			let response = await examinerHandler.updateCourse(courseData, userData);
			res.status(response.status).send(response.data);
		} catch (err) {
			throw err;
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
		let examinerId = req.user._id;
		let profileData = req.body;
		let response = await examinerHandler.updateProfile(examinerId, profileData);
		res.status(response.status).send({ msg: response.msg });
	},
};

module.exports = examiner;
