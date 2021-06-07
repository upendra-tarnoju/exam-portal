import axios from 'axios';
import UserService from './userApi';

class ExaminerService {
	constructor() {
		this.userService = new UserService();
		this.EXAMINER_URL = 'api/examiner';
	}

	saveExaminerDetails = (state) => {
		let token = this.userService.getToken();
		return axios({
			method: 'patch',
			url: `${process.env.REACT_APP_BASE_URL}/${this.EXAMINER_URL}`,
			data: state,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
	};

	getExaminerDetails = () => {
		let token = this.userService.getToken();
		return axios({
			url: `${process.env.REACT_APP_BASE_URL}/${this.EXAMINER_URL}`,
			method: 'get',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
	};

	deleteStudent = (studentId) => {
		let token = this.userService.getToken();
		return axios({
			url: `${process.env.REACT_APP_BASE_URL}/${this.EXAMINER_URL}/student/${studentId}`,
			method: 'delete',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
	};

	updateStudent = (studentId, data) => {
		let token = this.userService.getToken();
		return axios({
			url: `${process.env.REACT_APP_BASE_URL}/${this.EXAMINER_URL}/student/${studentId}`,
			method: 'patch',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			data: data,
		});
	};

	getExamStudentsCount = (pageIndex, pageSize) => {
		let token = this.userService.getToken();
		return axios({
			url: `${process.env.REACT_APP_BASE_URL}/${this.EXAMINER_URL}/studentCount`,
			method: 'get',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			params: {
				pageIndex: pageIndex,
				pageSize: pageSize,
			},
		});
	};

	getStudentsList = (examId) => {
		let token = this.userService.getToken();
		return axios({
			url: `${process.env.REACT_APP_BASE_URL}/${this.EXAMINER_URL}/students`,
			method: 'get',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			params: { examId },
		});
	};

	getParticularExamStudents = (examId) => {
		let token = this.userService.getToken();
		return axios({
			url: `${process.env.REACT_APP_BASE_URL}/${this.EXAMINER_URL}/exam/${examId}/student`,
			method: 'get',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
	};

	updateProfile = (data) => {
		let token = this.userService.getToken();
		return axios({
			url: `${process.env.REACT_APP_BASE_URL}/${this.EXAMINER_URL}/profile`,
			method: 'patch',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			data,
		});
	};
}

export default ExaminerService;
