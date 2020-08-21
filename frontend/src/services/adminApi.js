import axios from 'axios';

class AdminService {
	getAllExaminer = () => {
		return axios.get(`${process.env.REACT_APP_BASE_URL}/api/admin/examiner`);
	};
}

export default AdminService;
