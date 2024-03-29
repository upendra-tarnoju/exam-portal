import axios from 'axios';

import UserService from './userApi';

class SubAdminService {
	constructor() {
		this.userService = new UserService();
	}

	requestForExaminer = (values) => {
		let token = this.userService.getToken();
		return axios({
			method: 'post',
			url: `${process.env.REACT_APP_BASE_URL}/api/subAdmin/requestExaminer`,
			data: values,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
	};

	getExaminerList = (query) => {
		let token = this.userService.getToken();
		return axios({
			method: 'get',
			url: `${process.env.REACT_APP_BASE_URL}/api/subAdmin/examiners`,
			params: query,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
	};

	removeExaminer = (examinerId) => {
		let token = this.userService.getToken();
		return axios({
			method: 'delete',
			url: `${process.env.REACT_APP_BASE_URL}/api/subAdmin/examiner/${examinerId}`,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
	};

	downloadExcelFile = () => {
		let token = this.userService.getToken();
		return axios({
			method: 'get',
			url: `${process.env.REACT_APP_BASE_URL}/api/subAdmin/student/download`,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			responseType: 'blob',
		});
	};

	uploadStudentExcelFile = (formData) => {
		let token = this.userService.getToken();
		return axios({
			method: 'post',
			url: `${process.env.REACT_APP_BASE_URL}/api/subAdmin/student/upload`,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			data: formData,
		});
	};

	listStudents = (data) => {
		let token = this.userService.getToken();

		return axios({
			method: 'get',
			url: `${process.env.REACT_APP_BASE_URL}/api/subAdmin/student/list`,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			params: data,
		});
	};

	removeStudent = (studentId) => {
		let token = this.userService.getToken();

		return axios({
			method: 'delete',
			url: `${process.env.REACT_APP_BASE_URL}/api/subAdmin/student/${studentId}`,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
	};

	viewStudent = (studentId) => {
		let token = this.userService.getToken();

		return axios({
			method: 'get',
			url: `${process.env.REACT_APP_BASE_URL}/api/subAdmin/student/${studentId}`,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
	};

	updateStudent = (studentId, studentDetails) => {
		let token = this.userService.getToken();

		return axios({
			method: 'patch',
			url: `${process.env.REACT_APP_BASE_URL}/api/subAdmin/student/${studentId}`,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			data: studentDetails,
		});
	};

	createNewStudent = (data) => {
		let token = this.userService.getToken();
		return axios({
			url: `${process.env.REACT_APP_BASE_URL}/api/subAdmin/student`,
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			data: data,
		});
	};
}

export default SubAdminService;
