import React, { Component } from 'react';

import styles from './signup.module.css';
import ShowModal from './showModal';
import Navbar from '../header/navbar';
import UserService from '../../services/userApi';
import SignUpForm from '../../forms/signUpForm';

class SignUp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: false,
			message: '',
		};
		this.handleModal = this.handleModal.bind(this);
		this.hideModal = this.hideModal.bind(this);
		this.userService = new UserService();
	}

	showModal = (message) => {
		this.setState({ modal: true, message: message });
	};

	hideModal = () => {
		this.setState({ modal: false }, () => this.props.history.push('/login'));
	};

	handleModal(state) {
		this.setState({
			modal: state,
		});
	}

	render() {
		return (
			<div className='container-fluid p-0'>
				<Navbar />
				<div className={`card ${styles.width35} mx-auto mt-3`}>
					<div className='pt-3 pb-2'>
						<p className={`text-center ${styles.heading}`}>
							Sign up to continue
						</p>
						<div className='px-5'>
							<SignUpForm showModal={this.showModal} />
						</div>
					</div>
				</div>
				<ShowModal
					show={this.state.modal}
					handleClose={this.hideModal}
					message={this.state.message}
				/>
			</div>
		);
	}
}

export default SignUp;
