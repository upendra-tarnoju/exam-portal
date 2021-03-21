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
					<div
						className={`d-flex justify-content-between ${styles.containerHeight}`}
					>
						<div className='d-flex flex-wrap flex-column justify-content-center align-items-center'>
							<i
								aria-hidden='true'
								className={`fa fa-rocket ${styles.rocketIcon}`}
							></i>
							<h2 className={`text-white ${styles.signupHeading}`}>Welcome</h2>
							<p className={`mb-0 ${styles.signupSubHeading} text-white`}>
								Get started and publish exam in less than 5 minutes.
							</p>
						</div>
						<Card className={`pt-3 ${styles.signupCard}`}>
							<p className={`text-center ${styles.heading}`}>
								Sign up as examiner to continue
							</p>
							<SignUpForm showModal={this.showModal} />
						</Card>
						<ShowModal
							show={this.state.modal}
							handleClose={this.hideModal}
							message={this.state.message}
						/>
					</div>
				</div>
				<Footer />
			</div>
		);
	}
}

export default SignUp;
