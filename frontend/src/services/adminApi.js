import axios from 'axios';

import UserService from './userApi';

class AdminService {
	constructor() {
		this.adminUrl = 'api/admin/examiner';
		this.dashboardUrl = 'api/admin/dashboard';
		this.subAdminUrl = 'api/admin/subAdmin';
		this.userService = new UserService();
	}

	getAllExaminers = (params) => {
		let token = this.userService.getToken();
		return axios({
			method: 'get',
			url: `${process.env.REACT_APP_BASE_URL}/${this.adminUrl}`,
			params,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
	};

	approveOrDeclineExaminer = (data) => {
		let token = this.userService.getToken();
		return axios({
			method: 'patch',
			url: `${process.env.REACT_APP_BASE_URL}/${this.adminUrl}`,
			data,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
	};

	getDashboardCardDetails = () => {
		let token = this.userService.getToken();
		return axios({
			method: 'get',
			url: `${process.env.REACT_APP_BASE_URL}/${this.dashboardUrl}`,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
	};

	getExamChartDetails = (minDate, maxDate) => {
		let token = this.userService.getToken();
		return axios({
			method: 'get',
			url: `${process.env.REACT_APP_BASE_URL}/${this.dashboardUrl}/exam`,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			params: {
				minDate,
				maxDate,
			},
		});
	};

	getSubAdminList = (params) => {
		let token = this.userService.getToken();
		return axios({
			method: 'get',
			url: `${process.env.REACT_APP_BASE_URL}/${this.subAdminUrl}`,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			params: params,
		});
	};

	changeSubAdminStatus = (data) => {
		let token = this.userService.getToken();
		return axios({
			method: 'patch',
			url: `${process.env.REACT_APP_BASE_URL}/${this.subAdminUrl}/status`,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			data: data,
		});
	};

	viewLatestPendingExaminer = (params) => {
		let token = this.userService.getToken();

		return axios({
			method: 'get',
			url: `${process.env.REACT_APP_BASE_URL}/${this.dashboardUrl}/latestExaminers`,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			params,
		});
	};

	getAdminSettings = () => {
		let token = this.userService.getToken();

		return axios({
			method: 'get',
			url: `${process.env.REACT_APP_BASE_URL}/api/admin/getSettings`,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
	};

	sendEmail = () => {
		let token = this.userService.getToken();

		return axios({
			method: 'post',
			url: `${process.env.REACT_APP_BASE_URL}/api/admin/sendEmail`,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
	};

	updateSettings = (values) => {
		let token = this.userService.getToken();

		return axios({
			method: 'post',
			url: `${process.env.REACT_APP_BASE_URL}/api/admin/updateSettings`,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			data: values,
		});
	};

	sendEmail = (values) => {
		let token = this.userService.getToken();

		return axios({
			method: 'post',
			url: `${process.env.REACT_APP_BASE_URL}/api/admin/sendMail`,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			data: values,
		});
	};

	resetPassword = (values) => {
		let token = this.userService.getToken();

		return axios({
			method: 'patch',
			url: `${process.env.REACT_APP_BASE_URL}/api/admin/resetPassword`,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			data: values,
		});
	};
}

export default AdminService;
