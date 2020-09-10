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
			data: {
				institution: state.collegeName.value,
				department: state.department.value,
				designation: state.designation.value,
			},
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
	};
}

export default ExaminerService;
