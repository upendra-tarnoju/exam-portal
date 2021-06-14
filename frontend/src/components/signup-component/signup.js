import React, { Component } from 'react';
import { Card, withStyles } from '@material-ui/core';

// import ShowModal from './showModal';
import Navbar from '../header/navbar';
import SignUpForm from '../../forms/signUpForm';
import './signup.module.css';
import CustomSnackBar from '../../common/customSnackbar';

const style = (theme) => ({
	signUpBackground: {
		height: 'calc(100% - 66px) !important',
		padding: '20px 0px',
		background:
			'linear-gradient(to right,#5733da,#5e3cda,#6545da,#6b4dda,#7155da,#5868e6,#3a78ef,#0187f4,#009ef9,#00b2f4,#00c3e9,#31d2de)',
	},
	signUpCard: {
		borderRadius: '10px',
		[theme.breakpoints.down('xs')]: {
			margin: '10px 0px',
		},
	},
	rocketIcon: {
		color: 'white',
		[theme.breakpoints.down('xs')]: {
			fontSize: '15vw !important',
		},
		[theme.breakpoints.up('xs')]: {
			fontSize: '55px !important',
		},

		[theme.breakpoints.up('md')]: {
			fontSize: '8vw !important',
		},
	},
	signupHeading: {
		fontFamily: 'Raleway',
	},
	signupSubHeading: {
		fontFamily: 'Raleway',
		fontSize: '18px',
		textAlign: 'center',
	},
	cardHeading: {
		fontFamily: 'Raleway',
		fontSize: '21px',
	},
});

class SignUp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			snackbar: { show: false, msg: '', type: '' },
		};
	}

	showModal = (message) => {
		this.setState({ modal: true, message: message });
	};

	handleSnackBar = (show, msg, type) => {
		this.setState({ snackbar: { show, msg, type } });
	};

	render() {
		const { classes } = this.props;
		let { snackbar } = this.state;
		return (
			<div className='container-fluid p-0 h-100'>
				<Navbar {...this.props} />
				<div className={`${classes.signUpBackground}`}>
					<div className='container h-100'>
						<div className='row h-100 justify-content-center align-items-center'>
							<div className='col-md-5 col-sm-12 d-flex flex-column align-items-center'>
								<i
									aria-hidden='true'
									className={`fa align-self-center fa-rocket ${classes.rocketIcon}`}
								></i>
								<h2 className={`text-white ${classes.signupHeading}`}>
									Welcome
								</h2>
								<p className={`mb-0 ${classes.signupSubHeading} text-white`}>
									Get started and publish exam in less than 5 minutes.
								</p>
							</div>
							<div className='col-md-7 col-sm-12'>
								<Card className={`py-3 ${classes.signUpCard}`}>
									<p className={`text-center mb-0 ${classes.cardHeading}`}>
										Sign up as sub admin to continue
									</p>
									<div className='px-5'>
										<SignUpForm
											showModal={this.showModal}
											handleSnackBar={this.handleSnackBar}
										/>
									</div>
								</Card>
							</div>
						</div>
					</div>
				</div>
				<CustomSnackBar
					show={snackbar.show}
					message={snackbar.msg}
					snackBarType={snackbar.type}
					handleSnackBar={this.handleSnackBar}
				/>
			</div>
		);
	}
}

export default withStyles(style)(SignUp);
