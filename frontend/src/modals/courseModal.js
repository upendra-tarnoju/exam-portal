import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux';

import CourseService from '../services/courseApi';
import * as ActionTypes from '../action';
import styles from '../components/examiner-component/sidebar-content-component/courses-component/courses.module.css';
import CourseForm from '../forms/courseForm';

class CourseModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			description: '',
			error: '',
		};
		this.courseService = new CourseService();
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			name: nextProps.name,
			description: nextProps.description,
		});
	}

	handleSubmit = (values) => {
		if (this.props.modalType === 'create') {
			this.courseService
				.createCourse(values)
				.then((res) => {
					this.props.closeModal();
					this.props.handleSnackBar(true, res.data.msg);
					this.props.viewCourses();
				})
				.catch((err) => {
					this.setState({
						error: err.response.data.msg,
					});
				});
		} else if (this.props.modalType === 'update') {
			this.courseService
				.editCourse(this.props.courseId, values)
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
					this.props.handleSnackBar(true, res.data.msg);
				});
		} else {
			this.courseService
				.viewCourses({
					search: {
						name: this.state.name,
						description: this.state.description,
					},
				})
				.then((res) => {
					let searchedCourse = res.data;
					this.props.setCourses(searchedCourse);
					this.props.closeModal();
					this.props.handleSearch(true);
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
					{this.props.modalType === 'create'
						? 'Create new course'
						: this.props.modalType === 'update'
						? 'Update course'
						: 'Search course'}
				</Modal.Header>
				<Modal.Body>
					<div className='container'>
						{this.state.error ? (
							<p className='mb-0 text-center text-danger font-weight-bold'>
								* {this.state.error}
							</p>
						) : (
							' '
						)}
						<CourseForm
							state={{
								name: this.state.name,
								description: this.state.description,
							}}
							modalType={this.props.modalType}
							handleSubmit={this.handleSubmit}
						/>
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
