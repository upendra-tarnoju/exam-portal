import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	Card,
	Paper,
	TableContainer,
	Table,
	TableHead,
	TableRow,
	Typography,
	withStyles,
	TableCell,
	TableBody,
	IconButton,
	TablePagination,
} from '@material-ui/core';
import { Button } from '@material-ui/core';
import Moment from 'react-moment';
import moment from 'moment';
import { Add, Edit, Delete } from '@material-ui/icons';

import * as ActionTypes from '../../../../action';
import CourseModal from '../../../../modals/courseModal';
import CourseService from '../../../../services/courseApi';
import DeleteModal from '../../../../modals/deleteModal';
import Snackbar from '../../../customSnackbar';
import SearchCourseForm from '../../../../forms/course-form/searchCourseForm';

const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	body: {
		fontSize: 14,
	},
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
	root: {
		'&:nth-of-type(odd)': {
			backgroundColor: theme.palette.action.hover,
		},
	},
}))(TableRow);

class Courses extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: false,
			snackbar: { show: false, msg: '', type: '' },
			pageIndex: 0,
			pageSize: 5,
			totalCourses: 0,
			course: {
				name: { _id: '', name: '', description: '' },
				description: '',
				courseId: '',
			},
			deleteModal: { show: false, id: '' },
			defaultCoursesList: [],
		};
		this.courseService = new CourseService();
	}

	handleCourseModal = (modal) => {
		this.setState({
			modal,
			course: {
				name: { _id: '', name: '', description: '' },
				description: '',
				courseId: '',
			},
			defaultCoursesList: [],
		});
	};

	handleSnackBar = (status, msg, type) => {
		this.setState({
			snackbar: {
				show: status,
				msg: msg,
				type: type,
			},
		});
	};

	editCourse = async (course) => {
		const response = await this.courseService.viewDefaultCourses();

		let savedCourse = response.data.filter(
			(option) => option.name === course.courseId.name
		)[0];
		this.setState(
			{
				modal: true,
				defaultCoursesList: response.data,
				course: {
					name: savedCourse,
					description: course.description,
					courseId: course._id,
				},
			},
			() => this.state.course.name
		);
	};

	handleDeleteModal = (show, id) => {
		this.setState({ deleteModal: { show, id } });
	};

	deleteCourse = () => {
		let courseId = this.state.deleteModal.id;
		this.courseService.deleteCourse(courseId).then((response) => {
			this.viewCourses();
			this.handleDeleteModal(false, '');
			this.handleSnackBar(true, response.data.msg, 'success');
		});
	};

	handleFilter = (filterData) => {
		let query = {};
		if (filterData.startDate !== '') {
			query.startDate = moment(filterData.startDate, 'YYYY-MM-DD').valueOf();
		}

		if (filterData.endDate !== '') {
			query.endDate = moment(filterData.endDate, 'YYYY-MM-DD').valueOf();
		}

		query = {
			...query,
			pageIndex: this.state.pageIndex,
			pageSize: this.state.pageSize,
		};

		this.courseService.viewCourses(query).then((res) => {
			let coursesLength = res.data.totalCourses;
			let courses = res.data.courseDetails;
			this.setState({ totalCourses: coursesLength }, () =>
				this.props.setCourses(courses)
			);
		});
	};

	clearSearch = () => {
		this.setState({ search: false, pageIndex: 0, pageSize: 5 }, () =>
			this.viewCourses()
		);
	};

	viewCourses = () => {
		this.courseService
			.viewCourses({
				pageSize: this.state.pageSize,
				pageIndex: this.state.pageIndex,
			})
			.then((response) => {
				let coursesLength = response.data.totalCourses;
				let courses = response.data.courseDetails;
				this.setState({ totalCourses: coursesLength }, () =>
					this.props.setCourses(courses)
				);
			});
	};

	componentDidMount() {
		this.viewCourses();
	}

	handlePageChange = (event, value) => {
		this.setState({ pageIndex: value }, () => this.viewCourses());
	};

	handlePageSize = (event) => {
		this.setState({ pageSize: parseInt(event.target.value, 10) }, () =>
			this.viewCourses()
		);
	};

	render() {
		let {
			pageIndex,
			pageSize,
			snackbar,
			modal,
			totalCourses,
			course,
			defaultCoursesList,
		} = this.state;

		let { courses } = this.props;

		const emptyRows =
			pageSize - Math.min(pageSize, courses.length - pageIndex * pageSize);

		return (
			<div className='container py-5'>
				<Card className='p-3'>
					<div className='d-xs-block d-md-flex justify-content-between'>
						<div>
							<Typography variant='h4'>Courses</Typography>
							<Typography variant='subtitle1'>Handle your courses</Typography>
						</div>
						<div className='align-self-center'>
							<Button
								variant='contained'
								className='bg-dark text-white'
								startIcon={<Add />}
								onClick={() => this.handleCourseModal(true)}
							>
								Create new
							</Button>
						</div>
					</div>
				</Card>

				<Card className='mt-4 p-3'>
					<SearchCourseForm handleFilter={this.handleFilter} />
				</Card>
				<TableContainer component={Paper} className='mt-4'>
					<Table>
						<TableHead>
							<TableRow>
								<StyledTableCell>S.No</StyledTableCell>
								<StyledTableCell>Name</StyledTableCell>
								<StyledTableCell>Description</StyledTableCell>
								<StyledTableCell>Created Date</StyledTableCell>
								<StyledTableCell>Actions</StyledTableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{courses.length === 0 ? (
								<StyledTableRow component='th' scope='row'>
									<StyledTableCell
										colSpan={5}
										className='text-center font-weight-bold'
									>
										No course available
									</StyledTableCell>
								</StyledTableRow>
							) : null}
							{courses.map((course, index) => (
								<StyledTableRow key={course._id}>
									<StyledTableCell component='th' scope='row'>
										{index + 1}
									</StyledTableCell>
									<StyledTableCell>{course.courseId.name}</StyledTableCell>
									<StyledTableCell>{course.description}</StyledTableCell>
									<StyledTableCell>
										<Moment format='MMM Do, YYYY (hh:mm A)'>
											{course.createdDate}
										</Moment>
									</StyledTableCell>
									<StyledTableCell>
										<IconButton
											size='small'
											onClick={() => this.editCourse(course)}
										>
											<Edit fontSize='small' />
										</IconButton>
										<IconButton
											size='small'
											onClick={() => this.handleDeleteModal(true, course._id)}
										>
											<Delete fontSize='small' />
										</IconButton>
									</StyledTableCell>
								</StyledTableRow>
							))}
							{courses.length !== 0 && emptyRows > 0 && (
								<TableRow style={{ height: 23 * emptyRows }}>
									<TableCell colSpan={5} />
								</TableRow>
							)}
						</TableBody>
					</Table>
					<TablePagination
						rowsPerPageOptions={[5, 10, 25]}
						component='div'
						count={totalCourses}
						rowsPerPage={pageSize}
						page={pageIndex}
						onChangePage={this.handlePageChange}
						onChangeRowsPerPage={this.handlePageSize}
					></TablePagination>
				</TableContainer>
				<CourseModal
					show={modal}
					closeModal={this.handleCourseModal}
					handleSnackBar={this.handleSnackBar}
					viewCourses={this.viewCourses}
					course={course}
					coursesList={defaultCoursesList}
				/>
				<DeleteModal
					show={this.state.deleteModal.show}
					hideModal={this.handleDeleteModal}
					heading='course'
					deleteContent={this.deleteCourse}
				/>
				<Snackbar
					show={snackbar.show}
					message={snackbar.msg}
					snackBarType={snackbar.type}
					handleSnackBar={this.handleSnackBar}
				/>
			</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Courses);
