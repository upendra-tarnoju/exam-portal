import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import * as ActionTypes from '../../action';
import { connect } from 'react-redux';
import UserService from '../../services/userApi';
import validate from '../../services/validation.js';

class LoginCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			error: '',
			errors: {
				email: '',
				password: '',
			},
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.userService = new UserService();
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	handleSubmit = (event) => {
		event.preventDefault();
		let validation = validate.loginFields(this.state);
		if (!validation.error) {
			this.userService
				.loginExisitingUser(this.state.email, this.state.password)
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
		} else {
			this.setState(validation.tempState);
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
						{this.state.errors.email ? (
							<span className='text-danger'>
								{this.state.errors.email}
							</span>
						) : null}
					</label>
					<input
						type='text'
						name='email'
						className='w-100 px-3 py-2 mb-2'
						value={this.state.email}
						onChange={this.handleChange}
					/>
					<label className='w-100 text-left'>
						Password{' '}
						{this.state.errors.password ? (
							<span className='text-danger'>
								{this.state.errors.password}
							</span>
						) : null}
					</label>
					<input
						type='password'
						className='w-100 px-3 py-2'
						name='password'
						value={this.state.password}
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
