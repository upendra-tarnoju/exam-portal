import React, { Component } from 'react';
import './signupStyles.css';

class SignUp extends Component {
	render() {
		return (
			<div className='container-fluid p-3'>
				<div className='card w-35 mx-auto'>
					<div className='pt-3 pb-2'>
						<p className='text-center heading'>Sign up to continue</p>
						<div className='px-5'>
							<form className='text-center'>
								<label className='w-100 text-left font-weight-bold'>
									First name
								</label>
								<input type='text' className='w-100 px-3 py-2 mb-2' />

								<label className='w-100 text-left'>Last name</label>
								<input type='text' className='w-100 px-3 py-2 mb-2' />

								<label className='w-100 text-left'>Mobile number</label>
								<input type='text' className='w-100 px-3 py-2 mb-2' />

								<label className='w-100 text-left'>Email</label>
								<input type='email' className='w-100 px-3 py-2 mb-2' />

								<label className='w-100 text-left'>Password</label>
								<input type='password' className='w-100 px-3 py-2' />

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
										/>
										<label
											className='form-check-label'
											for='examiner'
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
										/>
										<label className='form-check-label' for='student'>
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
			</div>
		);
	}
}

export default SignUp;
