import React, { Component } from 'react';
import Navbar from '../header/navbar';
import LoginCard from './loginCard';
import { connect } from 'react-redux';
import ExaminerInput from './examinerInput';

class Login extends Component {
	render() {
		return (
			<div className='container-fluid p-0'>
				<Navbar />
				<div className='card mx-auto w-25 mt-4'>
					<img
						src={require('../../assets/login.jpg')}
						alt={'login'}
						className='card-img-top'
					/>
					<div className='card-body'>
						{this.props.examinerInputWindow ? (
							<ExaminerInput />
						) : (
							<LoginCard />
						)}
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		examinerInputWindow: state.examinerReducer.examinerInput,
	};
};
export default connect(mapStateToProps, null)(Login);
