import React, { Component } from 'react';
import styles from './signup.module.css';
import axios from 'axios';
import ShowModal from './showModal';

class SignUp extends Component {
	constructor(props) {
		super(props);

		this.state = {
			firstName: { value: '', error: '' },
			lastName: { value: '', error: '' },
			mobileNumber: { value: '', error: '' },
			email: { value: '', error: '' },
			password: { value: '', error: '' },
			accountType: { value: '', error: '' },
			modal: false,
			message: '',
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleModal = this.handleModal.bind(this);
		this.hideModal = this.hideModal.bind(this);
	}

	showModal = (message) => {
		this.setState({ modal: true, message: message });
	};

	hideModal = () => {
		this.setState({ modal: false }, () => this.props.history.push('/login'));
	};

	validateInput = () => {
		let error = false;
		let tempState = this.state;
		Object.entries(tempState).forEach((item) => {
			let key = item[0];
			let value = item[1].value;
			if (value === '') {
				error = true;
				item[1].error = '* Required';
			} else if (key === 'email') {
				let re = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
				if (!re.test(value)) {
					error = true;
					item[1].error = 'Invalid Email';
				} else item[1].error = '';
			} else if (key === 'mobileNumber') {
				var re = /^[0-9\b]+$/;
				if (!re.test(value)) {
					item[1].error = 'Invalid Mobile number';
				} else item[1].error = '';
			} else if (key === 'password') {
				if (value.length <= 6) {
					error = true;
					item[1].error = 'Minimum password length should be 6';
				} else item[1].error = '';
			}
		});
		this.setState(tempState);
		return error;
	};

	handleSubmit(event) {
		event.preventDefault();
		let validation = this.validateInput();
		if (!validation) {
			axios
				.post(`${process.env.REACT_APP_BASE_URL}/api/signup`, this.state)
				.then((response) => {
					this.showModal(response.data.msg);
				});
		}
	}

	handleChange(event) {
		var regex = /^[0-9\b]+$/;

		if (event.target.name === 'mobileNumber') {
			let number = event.target.value;
			let mobileNumber = this.state.mobileNumber;
			if (number === '' || regex.test(number)) {
				mobileNumber.value = number;
			}
			this.setState({ mobileNumber });
		} else {
			this.setState({
				[event.target.name]: {
					...this.state[event.target.name],
					value: event.target.value,
				},
			});
		}
	}

	handleModal(state) {
		this.setState({
			modal: state,
		});
	}

	render() {
		return (
			<div className='container-fluid p-3'>
				<div className={`card ${styles.width35} mx-auto`}>
					<div className='pt-3 pb-2'>
						<p className={`text-center ${styles.heading}`}>
							Sign up to continue
						</p>
						<div className='px-5'>
							<form className='text-center' onSubmit={this.handleSubmit}>
								<label className='w-100 text-left'>
									First name{' '}
									{this.state.firstName.error ? (
										<span className='text-danger'>
											{this.state.firstName.error}
										</span>
									) : null}
								</label>
								<input
									type='text'
									name='firstName'
									className='w-100 px-3 py-2 mb-2'
									value={this.state.firstName.value}
									onChange={this.handleChange}
								/>
								<label className='w-100 text-left'>
									Last name{' '}
									{this.state.lastName.error ? (
										<span className='text-danger'>
											{this.state.lastName.error}
										</span>
									) : null}
								</label>
								<input
									type='text'
									className='w-100 px-3 py-2 mb-2'
									name='lastName'
									value={this.state.lastName.value}
									onChange={this.handleChange}
								/>

								<label className='w-100 text-left'>
									Mobile number{' '}
									{this.state.mobileNumber.error ? (
										<span className='text-danger'>
											{this.state.mobileNumber.error}
										</span>
									) : null}
								</label>
								<input
									type='text'
									className='w-100 px-3 py-2 mb-2'
									name='mobileNumber'
									maxLength={10}
									value={this.state.mobileNumber.value}
									onChange={this.handleChange}
								/>

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
									className='w-100 px-3 py-2 mb-2'
									name='email'
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

								<p className='text-center font-weight-bold mt-2 mb-0'>
									Account Type{' '}
									{this.state.accountType.error ? (
										<span className='text-danger'>
											{this.state.accountType.error}
										</span>
									) : null}
								</p>
								<div className='d-flex justify-content-around'>
									<div className='form-check'>
										<input
											className='form-check-input'
											type='radio'
											name='accountType'
											id='examiner'
											value='examiner'
											onChange={this.handleChange}
										/>
										<label
											className='form-check-label'
											htmlFor='examiner'
										>
											Examiner
										</label>
									</div>
									<div className='form-check'>
										<input
											className='form-check-input'
											type='radio'
											name='accountType'
											id='student'
											value='student'
											onChange={this.handleChange}
										/>
										<label
											className='form-check-label'
											htmlFor='student'
										>
											Student
										</label>
									</div>
								</div>

								<div className='w-100 text-left'>
									<input type='checkbox' className='pt-1' />
									<span className={`${styles.textSize}`}>
										{' '}
										I have read and agree to Terms and Conditions
									</span>
								</div>

								<button
									type='submit'
									className='btn btn-primary mt-3 w-100'
								>
									CREATE ACCOUNT
								</button>
							</form>
							<p className='mt-3 text-center'>
								Already have an account?{' '}
								<a href='/login' className='text-decoration-none'>
									Sign In
								</a>
							</p>
						</div>
					</div>
				</div>
				<ShowModal
					show={this.state.modal}
					handleClose={this.hideModal}
					message={this.state.message}
				/>
			</div>
		);
	}
}

export default SignUp;
