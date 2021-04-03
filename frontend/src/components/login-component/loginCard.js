import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import * as ActionTypes from '../../action';
import UserService from '../../services/userApi';
import LoginForm from '../../forms/loginForm';
import styles from './login.module.css';

class LoginCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: '',
		};
		this.userService = new UserService();
	}

	handleLogin = (data) => {
		this.userService.setCookie(data.token, data.accountType);
		if (data.userType === 'admin') {
			this.props.history.push('/admin');
		} else if (data.userType === 'examiner') {
			let lastLogin = data.lastLogin;
			if (lastLogin == null) {
				this.props.setExaminerInputWindow(true);
			} else {
				this.props.setExaminerInputWindow(false);
				this.props.history.push('/examiner/exam');
			}
		} else {
			this.props.history.push('/student/exam');
		}
	};

	handleError = (error) => {
		if (error.response) {
			this.setState({ error: error.response.data.msg });
		}
	};

	render() {
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
			</div>
			// <div className='py-4'>
			//

			// </div>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setExaminerInputWindow: (status) => {
			dispatch({
				type: ActionTypes.SET_EXAMINER_INPUT_WINDOW,
				status: status,
			});
		},
	};
};

export default withRouter(connect(null, mapDispatchToProps)(LoginCard));
