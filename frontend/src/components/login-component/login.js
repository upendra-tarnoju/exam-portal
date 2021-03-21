import React from 'react';
import { connect } from 'react-redux';
import { Card } from '@material-ui/core';

import ExaminerInput from './examinerInput';
import Navbar from '../header/navbar';
import LoginCard from './loginCard';
import styles from './login.module.css';
import Footer from '../footer-component/footer';

const Login = (props) => {
	return (
		<div className={`container-fluid h-100 p-0 ${styles.bgGrey}`}>
			<Navbar {...props} />
			<div className='container'>
				<Card className={styles.loginCard}>
					<div className='d-flex'>
						<img
							src={require('../../assets/login.jpg')}
							className={styles.loginImage}
							alt='loginScreen'
						/>
						<div className='container'>
							{props.examinerInputWindow ? <ExaminerInput /> : <LoginCard />}
						</div>
					</div>
				</Card>
			</div>
			<Footer />
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		examinerInputWindow: state.examinerReducer.examinerInput,
	};
};
export default connect(mapStateToProps)(Login);
