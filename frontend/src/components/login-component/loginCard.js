import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import * as ActionTypes from '../../action';
import UserService from '../../services/userApi';
import LoginForm from '../../forms/loginForm';

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
		if (data.accountType === 'admin') {
			this.props.history.push('/admin');
		} else if (data.accountType === 'examiner') {
			let lastLogin = data.lastLogin;
			if (lastLogin == null) {
				this.props.setExaminerInputWindow(true);
			} else {
				console.log('ues');
				this.props.setExaminerInputWindow(false);
				this.props.history.push('/examiner');
			}
		}
	};

	handleError = (error) => {
		if (error.response) {
			this.setState({ error: error.response.data.msg });
		}
	};

	render() {
		return (
			<div>
				<h3 className='bg-white text-center'>Login</h3>
				{this.state.error ? (
					<p className='mb-0 text-center text-danger font-weight-bold'>
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
