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
		let userId = req.user._id;
		let courseDetails = req.body;
		examinerHandler
			.createCourse(userId, courseDetails)
			.then((response) => {
				if (response.status === 400) {
					res.status(400).send({ msg: 'Course already existed' });
				} else res.status(200).send({ msg: 'New course created' });
			})
			.catch((err) => {
				res.status(400).send({
					msg: 'Something wrong happened, Try again',
				});
			});
	},

	getCourses: async (req, res) => {
		let userId = req.user._id;
		let pageIndex = parseInt(req.query.pageIndex);
		let pageSize = parseInt(req.query.pageSize);
		let courses = await examinerHandler.getCourses(
			userId,
			pageIndex,
			pageSize
		);
		let totalCourses = await examinerHandler.getCoursesLength(userId);
		res.status(200).send({ courses, totalCourses });
	},

	updateCourse: async (req, res) => {
		let courseData = req.query;
		let updatedCourse = await examinerHandler.updateCourse(courseData);
		res.status(200).send({ course: updatedCourse, msg: 'Updated course' });
	},

	deleteCourse: async (req, res) => {},
};

module.exports = examiner;
