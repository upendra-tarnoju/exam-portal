import React, { Component } from 'react';
import { Card } from '@material-ui/core';

import styles from './signup.module.css';
import ShowModal from './showModal';
import Navbar from '../header/navbar';
import SignUpForm from '../../forms/signUpForm';
import Footer from '../footer-component/footer';

class SignUp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: false,
			message: '',
		};
	}

	showModal = (message) => {
		this.setState({ modal: true, message: message });
	};

	hideModal = () => {
		this.setState({ modal: false }, () => this.props.history.push('/login'));
	};

	handleModal = (state) => {
		this.setState({
			modal: state,
		});
	};

	render() {
		return (
			<div
				className={`container-fluid p-0 ${styles.containerBackgroundColor} h-100`}
			>
				<Navbar />
				<div className={`${styles.containerHeight} ${styles.signupContainer}`}>
					<div className='row h-100 justify-content-center align-items-center'>
						<div className='col-md-5'>
							<i
								aria-hidden='true'
								className={`fa align-self-center fa-rocket ${styles.rocketIcon}`}
							></i>
							<h2 className={`text-white ${styles.signupHeading}`}>Welcome</h2>
							<p className={`mb-0 ${styles.signupSubHeading} text-white`}>
								Get started and publish exam in less than 5 minutes.
							</p>
						</div>
						<div className='col-md-7'>
							<Card className={`py-3 container ${styles.signupCard}`}>
								<p className={`text-center ${styles.heading}`}>
									Sign up as examiner to continue
								</p>
								<div className='px-5'>
									<SignUpForm showModal={this.showModal} />
								</div>
							</Card>
						</div>
					</div>
					<ShowModal
						show={this.state.modal}
						handleClose={this.hideModal}
						message={this.state.message}
					/>
				</div>
				<Footer />
			</div>
		);
	}
}

export default SignUp;
