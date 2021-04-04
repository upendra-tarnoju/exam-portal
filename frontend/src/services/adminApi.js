import axios from 'axios';

import UserService from './userApi';

class AdminService {
	constructor() {
		this.adminUrl = 'api/admin/examiner';
		this.dashboardUrl = 'api/admin/dashboard';
		this.userService = new UserService();
	}

	getAllExaminerCount = (params) => {
		let token = this.userService.getToken();
		return axios({
			method: 'get',
			url: `${process.env.REACT_APP_BASE_URL}/${this.dashboardUrl}/examinerCount`,
			params: params,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
	};

	viewLatestPendingExaminer = (type, pageIndex, pageSize) => {
		let token = this.userService.getToken();
		return axios({
			method: 'get',
			url: `${process.env.REACT_APP_BASE_URL}/${this.adminUrl}`,
			params: {
				type: type,
				pageIndex: pageIndex,
				pageSize: pageSize,
			},
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
	};

	approveOrDeclineExaminer = (modalData) => {
		let token = this.userService.getToken();
		return axios({
			method: 'patch',
			url: `${process.env.REACT_APP_BASE_URL}/${this.adminUrl}`,
			data: modalData,
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
}

export default AdminService;
