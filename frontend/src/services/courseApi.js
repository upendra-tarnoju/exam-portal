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
			data: {
				name: state.name.value,
				description: state.description.value,
			},
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
	};

	editCourse = (id, state) => {
		let token = this.userService.getToken();
		return axios({
			method: 'patch',
			url: `${process.env.REACT_APP_BASE_URL}/${this.COURSE_URL}`,
			params: {
				courseId: id,
				name: state.name.value,
				description: state.description.value,
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

	viewCourses(state) {
		let token = this.userService.getToken();
		return axios({
			method: 'get',
			url: `${process.env.REACT_APP_BASE_URL}/${this.COURSE_URL}`,
			params: state,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
	}
}

export default CourseService;
