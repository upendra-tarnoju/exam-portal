import React, { Component } from 'react';
import './signupStyles.css';

class SignUp extends Component {
	render() {
		return (
			<div className='container-fluid pt-5'>
				<div className='card w-35 mx-auto'>
					<div className='p-4'>
						<p className='text-center heading'>Sign up to continue</p>
						<div className='px-5'>
							<form className='text-center'>
								<label className='w-100 text-left'>Full name</label>
								<input type='text' className='w-100 px-3 py-2 mb-2' />
								<label className='w-100 text-left'>Email</label>
								<input type='email' className='w-100 px-3 py-2 mb-2' />
								<label className='w-100 text-left'>Password</label>
								<input type='password' className='w-100 px-3 py-2' />
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
