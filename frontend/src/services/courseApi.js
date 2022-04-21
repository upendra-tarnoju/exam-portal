import axios from 'axios';
import UserService from './userApi';

class CourseService {
	constructor() {
		this.COURSE_URL = 'api/examiner/course';
		this.userService = new UserService();
	}

	createCourse = (state) => {
		let token = this.userService.getToken();
		return axios({
			method: 'post',
			url: `${process.env.REACT_APP_BASE_URL}/${this.COURSE_URL}`,
			data: state,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
	};

	editCourse = (courseDetails) => {
		let token = this.userService.getToken();
		return axios({
			method: 'patch',
			url: `${process.env.REACT_APP_BASE_URL}/${this.COURSE_URL}`,
			data: {
				previousCourseId: courseDetails.previousCourseId,
				newCourseId: courseDetails.newCourseId,
				description: courseDetails.description,
			},
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
	};

	deleteCourse = (id) => {
		let token = this.userService.getToken();
		return axios({
			method: 'delete',
			url: `${process.env.REACT_APP_BASE_URL}/${this.COURSE_URL}`,
			params: {
				courseId: id,
			},
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
	};

	viewCourses(query) {
		let token = this.userService.getToken();
		return axios({
			method: 'get',
			url: `${process.env.REACT_APP_BASE_URL}/${this.COURSE_URL}`,
			params: query,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
	}

	viewDefaultCourses() {
		let token = this.userService.getToken();
		return axios({
			method: 'get',
			url: `${process.env.REACT_APP_BASE_URL}/${this.COURSE_URL}/default`,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
	}
}

export default CourseService;
