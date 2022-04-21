import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import UserService from '../../services/userApi';
import LoginForm from '../../forms/loginForm';
import styles from './login.module.css';
import Snackbar from '../../common/customSnackbar';

class LoginCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: '',
			snackbar: { show: false, msg: '', type: '' },
		};
		this.userService = new UserService();
	}

	handleLogin = (data) => {
		this.userService.setCookie(data.token, data.userType);
		if (data.userType === 'admin') {
			this.props.history.push('/admin');
		} else if (data.userType === 'examiner') {
			this.props.history.push('/examiner/exam');
		} else if (data.userType === 'subAdmin') {
			this.props.history.push('/subAdmin/examiners');
		} else {
			this.props.history.push('/student/exam');
		}
	};

	handleError = (error) => {
		if (error.response) {
			this.handleSnackBar(true, error.response.data.msg, 'error');
		}
	};

	handleSnackBar = (show, msg, type) => {
		if (type === undefined) {
			type = 'error';
		}
		this.setState({ snackbar: { show, msg, type } });
	};

	render() {
		let { snackbar } = this.state;
		return (
			<div className='container py-3'>
				<h2 className={`bg-white text-center ${styles.loginHeading}`}>Login</h2>
				{this.state.error ? (
					<p className='mb-0 text-danger font-weight-bold'>
						* {this.state.error}
					</p>
				) : (
					' '
				)}
				<LoginForm
					handleLogin={this.handleLogin}
					handleError={this.handleError}
				/>
				<Snackbar
					handleSnackBar={this.handleSnackBar}
					snackBarType={snackbar.type}
					message={snackbar.msg}
					show={snackbar.show}
				/>
			</div>
		);
	}
}

export default withRouter(LoginCard);
