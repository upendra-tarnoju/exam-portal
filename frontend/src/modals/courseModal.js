import React from 'react';
import { Divider, Modal, Paper, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import CourseService from '../services/courseApi';
import * as ActionTypes from '../action';
import CreateCourseForm from '../forms/course-form/createCourseForm';

const useStyles = (theme) => ({
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		width: '35%',
	},
});

const CourseModal = (props) => {
	const handleSubmit = (values) => {
		let courseService = new CourseService();

		if (props.course.name._id === '') {
			courseService
				.createCourse({
					courseId: values.name._id,
					description: values.description,
				})
				.then((res) => {
					props.closeModal(false, 'create');
					props.handleSnackBar(true, res.data.msg, 'success');
					props.viewCourses();
				})
				.catch((err) => {
					props.closeModal(false, 'create');
					props.handleSnackBar(true, err.response.data.msg, 'error');
				});
		} else {
			courseService
				.editCourse({
					previousCourseId: props.course.name._id,
					newCourseId: values.name._id,
					description: values.description,
				})
				.then((res) => {
					props.closeModal();
					props.handleSnackBar(true, res.data.msg, 'success');
					props.viewCourses();
				})
				.catch((err) => {
					if (err.response.status === 409) {
						props.closeModal();
						props.handleSnackBar(true, err.response.data.msg, 'error');
					}
				});
		}
	};
	let { show, closeModal, classes } = props;

	return (
		<Modal
			className={classes.modal}
			open={show}
			onClose={() => closeModal(false, '')}
		>
			<Paper className={classes.paper}>
				<Typography variant='h6' className='p-3'>
					{props.course && props.course.name._id === ''
						? 'Create new course'
						: 'Update course'}
				</Typography>
				<Divider />
				<div className='px-5 py-3'>
					<CreateCourseForm
						handleSubmit={handleSubmit}
						course={props.course}
						coursesList={props.coursesList}
						closeModal={props.closeModal}
					/>
				</div>
			</Paper>
		</Modal>
	);
};

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

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(useStyles)(CourseModal));
