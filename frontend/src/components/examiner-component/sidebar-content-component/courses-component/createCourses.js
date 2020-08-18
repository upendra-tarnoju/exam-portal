import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import styles from './courses.module.css';
import axios from 'axios';
import cookie from 'js-cookie';

class CreateCourses extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: {
				value: '',
				error: '',
			},
			description: {
				value: '',
				error: '',
			},
			error: '',
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	validateInput = () => {
		let error = false;
		let tempState = this.state;
		if (tempState.name.value === '') {
			tempState.name.error = '* Required';
			error = true;
		}
		if (tempState.description.value === '') {
			tempState.description.error = '* Required';
			error = true;
		}
		this.setState(tempState);
		return error;
	};

	handleChange = (event) => {
		this.setState({
			[event.target.name]: {
				...this.state[event.target.name],
				value: event.target.value,
			},
		});
	};

	handleSubmit = (event) => {
		event.preventDefault();
		let validationState = this.validateInput();
		if (!validationState) {
			let token = cookie.get('token');
			axios({
				method: 'post',
				url: `${process.env.REACT_APP_BASE_URL}/api/examiner/exam`,
				data: {
					name: this.state.name.value,
					description: this.state.description.value,
				},
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
				.then((res) => {
					this.props.closeModal();
					this.props.handleAlert(true, res.data.msg);
				})
				.catch((err) => {
					this.setState({
						error: err.response.data.msg,
					});
				});
		}
	};
	render() {
		return (
			<Modal
				show={this.props.show}
				animation={false}
				onHide={this.props.closeModal}
				centered
			>
				<Modal.Header closeButton className={styles.createCourseHeading}>
					Create new Course
				</Modal.Header>
				<Modal.Body>
					<div className='container'>
						<form onSubmit={this.handleSubmit}>
							{this.state.error ? (
								<p className='mb-0 text-center text-danger font-weight-bold'>
									* {this.state.error}
								</p>
							) : (
								' '
							)}

							<label className='w-100 text-left'>
								Name{' '}
								{this.state.name.error ? (
									<span className='text-danger'>
										{this.state.name.error}
									</span>
								) : null}
							</label>
							<input
								type='text'
								name='name'
								className='w-100 px-3 py-2 mb-2'
								value={this.state.name.value}
								onChange={this.handleChange}
							/>
							<label className='w-100 text-left'>
								Description{' '}
								{this.state.description.error ? (
									<span className='text-danger'>
										{this.state.description.error}
									</span>
								) : null}
							</label>
							<input
								type='text'
								name='description'
								className='w-100 px-3 py-2 mb-2'
								value={this.state.description.value}
								onChange={this.handleChange}
							/>
							<div className='d-flex justify-content-end pt-2'>
								<button type='submit' className='btn btn-primary'>
									Create
								</button>
							</div>
						</form>
					</div>
				</Modal.Body>
			</Modal>
		);
	}
}

export default CreateCourses;
