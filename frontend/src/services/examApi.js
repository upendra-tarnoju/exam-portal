import axios from 'axios';
import UserService from './userApi';

class ExamService {
	constructor() {
		this.userService = new UserService();
		this.EXAM_URL = 'api/examiner/exam';
	}

	saveExamDetails = (examDetails) => {
		let token = this.userService.getToken();
		return axios({
			method: 'post',
			url: `${process.env.REACT_APP_BASE_URL}/${this.EXAM_URL}`,
			data: examDetails,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
	};

	getAllExams = (params) => {
		let token = this.userService.getToken();
		return axios({
			method: 'get',
			url: `${process.env.REACT_APP_BASE_URL}/${this.EXAM_URL}`,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			params: params,
		});
	};

	getParticularExam = (examId) => {
		let token = this.userService.getToken();
		return axios({
			method: 'get',
			url: `${process.env.REACT_APP_BASE_URL}/${this.EXAM_URL}/${examId}`,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
	};

	updateExam = (examId, data) => {
		let token = this.userService.getToken();
		return axios({
			method: 'patch',
			url: `${process.env.REACT_APP_BASE_URL}/${this.EXAM_URL}/${examId}`,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			data: data,
		});
	};

	deleteExam = (examId) => {
		let token = this.userService.getToken();
		return axios({
			method: 'delete',
			url: `${process.env.REACT_APP_BASE_URL}/${this.EXAM_URL}`,
			params: { examId },
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
	};
}

export default ExamService;
