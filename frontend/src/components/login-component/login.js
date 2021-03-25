import React from 'react';
import { connect } from 'react-redux';
import { Card, makeStyles } from '@material-ui/core';

import ExaminerInput from './examinerInput';
import Navbar from '../header/navbar';
import LoginCard from './loginCard';
import styles from './login.module.css';
import Footer from '../footer-component/footer';
import LoginImage from '../../assets/login.jpg';

const useStyles = makeStyles((theme) => ({
	loginContainer: {
		backgroundImage: `url(${LoginImage})`,
		height: 'calc(100% - 64px)',
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		padding: '60px 0px',
	},
	loginCard: {
		borderRadius: '10px',
		[theme.breakpoints.down('sm')]: {
			width: '60%',
		},
		[theme.breakpoints.up('sm')]: {
			width: '50%',
		},
		[theme.breakpoints.up('md')]: {
			width: '30%',
		},
	},
}));

const Login = (props) => {
	const classes = useStyles();
	return (
		<div className='container-fluid h-100 p-0'>
			<Navbar {...props} />
			<div className={classes.loginContainer}>
				<section className=''>
					<Card className={`mx-auto h-100 ${classes.loginCard}`}>
						{props.examinerInputWindow ? <ExaminerInput /> : <LoginCard />}
					</Card>
				</section>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		examinerInputWindow: state.examinerReducer.examinerInput,
	};
};
export default connect(mapStateToProps)(Login);
