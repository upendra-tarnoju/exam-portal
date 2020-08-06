import React, { Component } from 'react';
import './signupStyles.css';
import axios from 'axios';
import ShowModal from './showModal';

class SignUp extends Component {
	constructor(props) {
		super(props);

		this.state = {
			firstName: '',
			lastName: '',
			mobileNumber: '',
			email: '',
			password: '',
			accountType: '',
			modal: false,
			message: '',
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleModal = this.handleModal.bind(this);
	}

	showModal = (message) => {
		this.setState({ modal: true, message: message });
	};

	hideModal = () => {
		this.setState({ modal: false });
	};

	handleSubmit(event) {
		event.preventDefault();
		axios
			.post(`${process.env.REACT_APP_BASE_URL}/api/signup`, this.state)
			.then((response) => {
				this.showModal(response.data.msg);
			});
	}

	handleChange(event) {
		var value = event.target.value;
		var regex = /^[0-9\b]+$/;

		if (event.target.name === 'mobileNumber') {
			let number = event.target.value;
			if (number === '' || regex.test(number)) {
				this.setState({
					[event.target.name]: number,
				});
			}
		} else {
			this.setState({
				[event.target.name]: event.target.value,
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
				<div className='card w-35 mx-auto'>
					<div className='pt-3 pb-2'>
						<p className='text-center heading'>Sign up to continue</p>
						<div className='px-5'>
							<form className='text-center' onSubmit={this.handleSubmit}>
								<label className='w-100 text-left'>First name</label>
								<input
									type='text'
									name='firstName'
									className='w-100 px-3 py-2 mb-2'
									value={this.state.firstName}
									onChange={this.handleChange}
								/>

								<label className='w-100 text-left'>Last name</label>
								<input
									type='text'
									className='w-100 px-3 py-2 mb-2'
									name='lastName'
									value={this.state.lastName}
									onChange={this.handleChange}
								/>

								<label className='w-100 text-left'>Mobile number</label>
								<input
									type='text'
									className='w-100 px-3 py-2 mb-2'
									name='mobileNumber'
									maxLength={10}
									value={this.state.mobileNumber}
									onChange={this.handleChange}
								/>

								<label className='w-100 text-left'>Email</label>
								<input
									type='email'
									className='w-100 px-3 py-2 mb-2'
									name='email'
									value={this.state.email}
									onChange={this.handleChange}
								/>

								<label className='w-100 text-left'>Password</label>
								<input
									type='password'
									className='w-100 px-3 py-2'
									name='password'
									value={this.state.password}
									onChange={this.handleChange}
								/>

								<p className='text-center font-weight-bold mt-2 mb-0'>
									Account Type
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
									<span className='textSize'>
										{' '}
										I read and agree to Terms and Conditions
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
