import axios from 'axios';
import cookie from 'js-cookie';

class UserService {
	loginExisitingUser = (data) => {
		return axios({
			method: 'post',
			url: `${process.env.REACT_APP_BASE_URL}/api/login`,
			data: {
				username: data.email,
				password: data.password,
			},
		});
	};

	setCookie = (token, accountType) => {
		cookie.set('token', token, {
			expires: 365,
		});
		cookie.set('type', accountType, {
			expires: 365,
		});
	};

	getToken = () => {
		return cookie.get('token');
	};

	saveNewUsers = (state) => {
		return axios({
			method: 'post',
			url: `${process.env.REACT_APP_BASE_URL}/api/signup`,
			data: state,
		});
	};

	removeCookie = () => {
		cookie.remove('token');
		cookie.remove('type');
	};
}
export default UserService;
