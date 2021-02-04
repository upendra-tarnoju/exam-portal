import axios from 'axios';

import UserService from './userApi';

class StudentService {
	constructor() {
		this.STUDENT_URL = 'api/student';
		this.userService = new UserService();
	}

	getParticularStudentExamDetails = () => {
		let token = this.userService.getToken();
		return axios({
			method: 'get',
			url: `${process.env.REACT_APP_BASE_URL}/${this.STUDENT_URL}/exam`,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
	};

	validateExamKey = (examId, examKey) => {
		let token = this.userService.getToken();
		return axios({
			method: 'get',
			url: `${process.env.REACT_APP_BASE_URL}/${this.STUDENT_URL}/exam/${examId}`,
			params: { key: examKey },
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
	};
}

export default StudentService;
