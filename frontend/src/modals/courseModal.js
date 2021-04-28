import React, { Component } from 'react';
import { Divider, Modal, Paper, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import CourseService from '../services/courseApi';
import * as ActionTypes from '../action';
import CourseForm from '../forms/courseForm';

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

class CourseModal extends Component {
	constructor(props) {
		super(props);
		this.courseService = new CourseService();
	}

	handleSubmit = (values) => {
		this.courseService
			.createCourse({
				courseId: values.name,
				description: values.description,
				defaultCourse: false,
			})
			.then((res) => {
				this.props.closeModal(false, 'create');
				this.props.handleSnackBar(true, res.data.msg, 'success');
				this.props.viewCourses();
			})
			.catch((err) => {
				console.log(err);
				// this.setState({
				// 	error: err.response.data.msg,
				// });
			});
		// if (this.props.modalType === 'create') {

		// } else if (this.props.modalType === 'update') {
		// 	this.courseService.editCourse(this.props.courseId, values).then((res) => {
		// 		let name = res.data.course.name;
		// 		let description = res.data.course.description;
		// 		let updatedCourse = this.props.courses.map((course) =>
		// 			course._id === res.data.course._id
		// 				? { ...course, name: name, description: description }
		// 				: course
		// 		);
		// 		this.props.setCourses(updatedCourse);
		// 		this.props.closeModal();
		// 		this.props.handleSnackBar(true, res.data.msg, 'success');
		// 	});
		// } else {
		// 	this.courseService
		// 		.viewCourses({
		// 			search: {
		// 				name: this.state.name,
		// 				description: this.state.description,
		// 			},
		// 		})
		// 		.then((res) => {
		// 			let searchedCourse = res.data;
		// 			this.props.setCourses(searchedCourse);
		// 			this.props.closeModal();
		// 			this.props.handleSearch(true);
		// 		});
		// }
	};
	render() {
		let { show, closeModal, classes } = this.props;
		return (
			<Modal
				className={classes.modal}
				open={show}
				onClose={() => closeModal(false, '')}
			>
				<Paper className={classes.paper}>
					<Typography variant='h6' className='p-3'>
						Create new course
					</Typography>
					<Divider />
					<div className='px-5 py-3'>
						<CourseForm handleSubmit={this.handleSubmit} />
					</div>
				</Paper>
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

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(useStyles)(CourseModal));
