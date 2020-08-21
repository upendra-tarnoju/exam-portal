import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import * as ActionTypes from '../../action';
import { connect } from 'react-redux';
import UserService from '../../services/userApi';
import validateInputs from '../../services/validation';

class LoginCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: {
				value: '',
				error: '',
			},
			password: {
				value: '',
				error: '',
			},
			error: '',
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.userService = new UserService();
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: {
				...this.state[event.target.name],
				value: event.target.value,
			},
		});
	};

	handleSubmit = (event) => {
		event.preventDefault();
		let validation = validateInputs(this.state, 'login');
		this.setState(validation.tempState);
		if (!validation.error) {
			this.userService
				.loginExisitingUser(
					this.state.email.value,
					this.state.password.value
				)
				.then((response) => {
					let data = response.data;
					this.userService.setCookie(data.token, data.accountType);
					if (data.accountType === 'admin') {
						this.props.history.push('/admin');
					} else if (data.accountType === 'examiner') {
						let lastLogin = response.data.lastLogin;
						if (lastLogin == null) {
							this.props.setExaminerInputWindow(true);
						} else {
							this.props.setExaminerInputWindow(false);
							this.props.history.push('/examiner');
						}
					}
				})
				.catch((error) => {
					if (error.response) {
						this.setState({ error: error.response.data.msg });
					}
				});
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
				<form className='px-3 pb-4' onSubmit={this.handleSubmit}>
					<label className='w-100 text-left'>
						Email{' '}
						{this.state.email.error ? (
							<span className='text-danger'>
								{this.state.email.error}
							</span>
						) : null}
					</label>
					<input
						type='text'
						name='email'
						className='w-100 px-3 py-2 mb-2'
						value={this.state.email.value}
						onChange={this.handleChange}
					/>
					<label className='w-100 text-left'>
						Password{' '}
						{this.state.password.error ? (
							<span className='text-danger'>
								{this.state.password.error}
							</span>
						) : null}
					</label>
					<input
						type='password'
						className='w-100 px-3 py-2'
						name='password'
						value={this.state.password.value}
						onChange={this.handleChange}
					/>
					<button
						type='submit'
						className='btn btn-primary float-right mt-4'
					>
						Login
					</button>
				</form>
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
