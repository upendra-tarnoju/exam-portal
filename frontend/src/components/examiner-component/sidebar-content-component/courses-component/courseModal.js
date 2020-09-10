import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux';

import validateInputs from '../../../../services/validation';
import CourseService from '../../../../services/courseApi';
import * as ActionTypes from '../../../../action';
import styles from './courses.module.css';

class CourseModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: { value: '', error: '' },
			description: { value: '', error: '' },
			error: '',
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.courseService = new CourseService();
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			name: {
				error: '',
				value: nextProps.name,
			},
			description: {
				error: '',
				value: nextProps.description,
			},
		});
	}

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
		let validationState = {};
		if (this.props.modalType === 'search') validationState.error = false;
		else {
			validationState = validateInputs.courseFields(this.state);
		}

		if (!validationState.error) {
			if (this.props.modalType === 'create') {
				this.courseService
					.createCourse(this.state)
					.then((res) => {
						this.props.closeModal();
						this.props.handleAlert(true, res.data.msg);
					})
					.catch((err) => {
						this.setState({
							error: err.response.data.msg,
						});
					});
			} else if (this.props.modalType === 'update') {
				this.courseService
					.editCourse(this.props.courseId, this.state)
					.then((res) => {
						let name = res.data.course.name;
						let description = res.data.course.description;
						let updatedCourse = this.props.courses.map((course) =>
							course._id === res.data.course._id
								? { ...course, name: name, description: description }
								: course
						);
						this.props.setCourses(updatedCourse);
						this.props.closeModal();
						this.props.handleAlert(true, res.data.msg);
					});
			} else {
				this.courseService
					.viewCourses({
						search: {
							name: this.state.name.value,
							description: this.state.description.value,
						},
					})
					.then((res) => {
						let searchedCourse = res.data;
						this.props.setCourses(searchedCourse);
						this.props.closeModal();
						this.props.handleSearch(true);
					});
			}
		} else {
			this.setState(validationState.tempState);
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
					{this.props.modalType === 'create'
						? 'Create new course'
						: this.props.modalType === 'update'
						? 'Update course'
						: 'Search course'}
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
									{this.props.modalType === 'create'
										? 'Create'
										: this.props.modalType === 'update'
										? 'Update'
										: 'Search'}
								</button>
							</div>
						</form>
					</div>
				</Modal.Body>
			</Modal>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		courses: state.examinerReducer.courses,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setCourses: (courses) => {
			dispatch({
				type: ActionTypes.SET_COURSES,
				courses: courses,
			});
		},
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(CourseModal);
