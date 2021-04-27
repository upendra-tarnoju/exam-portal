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
			console.log('yses');
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

		// if ('pageIndex' in req.query) {
		// 	let pageIndex = parseInt(req.query.pageIndex);
		// 	let pageSize = parseInt(req.query.pageSize);
		// 	let courses = await examinerHandler.getCourses(
		// 		userId,
		// 		pageIndex,
		// 		pageSize
		// 	);
		// 	let totalCourses = await examinerHandler.getCoursesLength(userId);
		// 	res.status(200).send({ courses, totalCourses });
		// } else if ('search' in req.query) {
		// 	let pageIndex = 0;
		// 	let pageSize = 5;
		// 	let query = JSON.parse(req.query.search);
		// 	let searchedCourse = await examinerHandler.searchCourse(
		// 		query.name,
		// 		query.description,
		// 		pageIndex,
		// 		pageSize
		// 	);
		// 	res.status(200).send(searchedCourse);
		// } else {
		// 	let courses = await examinerHandler.getAllCourses(userId);
		// 	res.status(200).send(courses);
		// }
	},

	updateCourse: async (req, res) => {
		let courseData = req.query;
		let updatedCourse = await examinerHandler.updateCourse(courseData);
		res.status(200).send({
			course: updatedCourse,
			msg: 'Course updated successfully',
		});
	},

	deleteCourse: async (req, res) => {
		let courseId = req.query.courseId;
		let deletedCourse = await examinerHandler.deleteCourse(courseId);
		res.status(200).send({
			courseId: deletedCourse._id,
			msg: 'Course deleted successfully',
		});
	},

	updateProfile: async (req, res) => {
		let examinerId = req.user._id;
		let profileData = req.body;
		let response = await examinerHandler.updateProfile(examinerId, profileData);
		res.status(response.status).send({ msg: response.msg });
	},
};

module.exports = examiner;
