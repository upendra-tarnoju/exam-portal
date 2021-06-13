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
			url: `${process.env.REACT_APP_BASE_URL}/${this.STUDENT_URL}/examList`,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
	};

	validateExamKey = (data) => {
		let token = this.userService.getToken();

		return axios({
			method: 'post',
			url: `${process.env.REACT_APP_BASE_URL}/${this.STUDENT_URL}/exam/validateKey`,
			data: data,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
	};

	getQuestionForExam(examId, pageIndex) {
		let token = this.userService.getToken();
		return axios({
			method: 'get',
			url: `${process.env.REACT_APP_BASE_URL}/${this.STUDENT_URL}/exam/${examId}/question`,
			params: { pageIndex },
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
	}

	saveExamAnswer(questionData) {
		let token = this.userService.getToken();
		return axios({
			method: 'post',
			url: `${process.env.REACT_APP_BASE_URL}/${this.STUDENT_URL}/exam/${questionData.examId}/question`,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			data: questionData,
		});
	}

	submitExam(examId) {
		let token = this.userService.getToken();
		return axios({
			method: 'put',
			url: `${process.env.REACT_APP_BASE_URL}/${this.STUDENT_URL}/exam/${examId}`,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
	}
}

export default StudentService;
