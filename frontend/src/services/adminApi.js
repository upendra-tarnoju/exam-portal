import axios from 'axios';

import UserService from './userApi';

class AdminService {
	constructor() {
		this.adminUrl = 'api/admin/examiner';
		this.userService = new UserService();
	}

	getAllExaminer = () => {
		let token = this.userService.getToken();
		return axios({
			method: 'get',
			url: `${process.env.REACT_APP_BASE_URL}/api/admin/examiner`,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
	};

	getExaminersCount = (type, pageIndex, pageSize) => {
		let token = this.userService.getToken();
		return axios({
			method: 'get',
			url: `${process.env.REACT_APP_BASE_URL}/api/admin/examiner`,
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
			url: `${process.env.REACT_APP_BASE_URL}/api/admin/examiner`,
			params: modalData,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
	};
}

export default AdminService;
