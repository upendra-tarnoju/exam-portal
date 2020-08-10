import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'js-cookie';

class Login extends Component {
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
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: {
				...this.state[event.target.name],
				value: event.target.value,
			},
		});
	};

	validateInput = () => {
		let error = false;
		let tempState = this.state;
		if (tempState.email.value === '') {
			tempState.email.error = '* Required';
			error = true;
		}
		if (tempState.password.value === '') {
			tempState.password.error = '* Required';
			error = true;
		}
		this.setState(tempState);
		return error;
	};

	handleSubmit = (event) => {
		event.preventDefault();
		let validationState = this.validateInput();
		if (!validationState) {
			axios
				.post(`${process.env.REACT_APP_BASE_URL}/api/login`, {
					username: this.state.email.value,
					password: this.state.password.value,
				})
				.then((response) => {
					cookie.set('token', response.data.token, {
						expires: 365,
					});
					cookie.set('type', response.data.accountType, {
						expires: 365,
					});
				})
				.catch((error) => {
					if (error.response) {
						this.setState({
							error: error.response.data.msg,
						});
					}
				});
		}
	};

	render() {
		return (
			<div className='container-fluid p-3'>
				<div className='card mx-auto w-25'>
					<img
						src={require('../../assets/login.jpg')}
						alt={'login'}
						className='card-img-top'
					/>
					<div className='card-body'>
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
				</div>
			</div>
		);
	}
}
export default Login;
