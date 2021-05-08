import React from 'react';
import { Card, makeStyles } from '@material-ui/core';

import Navbar from '../header/navbar';
import LoginCard from './loginCard';
import LoginImage from '../../assets/login.jpg';

const useStyles = makeStyles((theme) => ({
	loginContainer: {
		backgroundImage: `url(${LoginImage})`,
		height: 'calc(100% - 64px)',
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		padding: '60px 0px',
		[theme.breakpoints.down('sm')]: {
			height: 'calc(100% - 55px)',
		},
	},
	loginCard: {
		borderRadius: '10px',
		[theme.breakpoints.down('sm')]: {
			width: '78%',
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
						<LoginCard />
					</Card>
				</section>
			</div>
		</div>
	);
};

export default Login;
