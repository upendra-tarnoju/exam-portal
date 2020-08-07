import React, { Component } from 'react';

class Login extends Component {
	render() {
		return (
			<div className='container-fluid p-3'>
				<div className='card mx-auto w-25'>
					<img
						src={require('../../assets/login.jpg')}
						className='card-img-top'
					/>
				</div>
			</div>
		);
	}
}
export default Login;
