import axios from 'axios';
import UserService from './userApi';

class ExaminerService {
	constructor() {
		this.userService = new UserService();
		this.EXAMINER_URL = 'api/examiner';
	}

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

	assignSelectedStudents = (data) => {
		let token = this.userService.getToken();
		return axios({
			url: `${process.env.REACT_APP_BASE_URL}/${this.EXAMINER_URL}/student/assign`,
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			data,
		});
	};

	getParticularExamStudents = (examId, data) => {
		let token = this.userService.getToken();
		return axios({
			url: `${process.env.REACT_APP_BASE_URL}/${this.EXAMINER_URL}/exam/${examId}/students`,
			method: 'get',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			params: data,
		});
	};

	blockUnblockStudent = (studentId, data) => {
		let token = this.userService.getToken();
		return axios({
			url: `${process.env.REACT_APP_BASE_URL}/${this.EXAMINER_URL}/student/${studentId}/blockUnblock`,
			method: 'patch',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			data: data,
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
