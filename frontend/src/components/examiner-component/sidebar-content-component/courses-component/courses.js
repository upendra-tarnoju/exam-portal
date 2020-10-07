import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { Snackbar, Button } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import Moment from 'react-moment';
import Pagination from '@material-ui/lab/Pagination';

import * as ActionTypes from '../../../../action';
import CourseModal from '../../../../modals/courseModal';
import styles from './courses.module.css';
import CourseService from '../../../../services/courseApi';
import DeleteModal from '../../../../modals/deleteModal';

class Courses extends Component {
	constructor(props) {
		super(props);
		this.state = {
			search: false,
			modal: false,
			modalType: '',
			snackbar: { show: false, msg: '' },
			pageIndex: 0,
			pageSize: 5,
			currentPage: 0,
			name: '',
			description: '',
			courseId: '',
			deleteModal: { show: false, id: '' },
		};
		this.courseService = new CourseService();
	}

	handleCourseModal = (modal, modalType) => {
		if (modalType === 'create' || modalType === 'search')
			this.setState({ modal, modalType, name: '', description: '' });
		else this.setState({ modal, modalType });
	};

	handleSnackBar = (status, msg) => {
		this.setState({
			snackbar: {
				show: status,
				msg: msg,
			},
		});
	};

	editCourse = (name, description, id) => {
		this.setState({
			modal: true,
			modalType: 'update',
			name: name,
			description: description,
			courseId: id,
		});
	};

	handleDeleteModal = (show, id) => {
		this.setState({
			deleteModal: {
				show,
				id,
			},
		});
	};

	deleteCourse = () => {
		let courseId = this.state.deleteModal.id;
		this.courseService.deleteCourse(courseId).then((response) => {
			this.viewCourses();
			this.handleDeleteModal(false, '');
			this.handleSnackBar(true, response.data.msg);
		});
	};

	handleSearch = (search) => {
		this.setState({
			search: search,
		});
	};

	clearSearch = () => {
		this.setState(
			{
				search: false,
				pageIndex: 0,
				pageSize: 5,
			},
			() => this.viewCourses()
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
				let courses = response.data.courses;
				this.setState(
					{
						pageCount: Math.ceil(coursesLength / this.state.pageSize),
					},
					() => this.props.setCourses(courses)
				);
			});
	};

	componentDidMount() {
		this.viewCourses();
	}

	handlePageChange = (event, value) => {
		this.setState({ pageIndex: value - 1 }, () => this.viewCourses());
	};

	render() {
		let { pageIndex, pageSize } = this.state;
		let courses = this.props.courses.map((data, index) => (
			<tr key={data._id}>
				<th scope='row'>{pageIndex * pageSize + index + 1}</th>
				<td>{data.name}</td>

				<td>{data.description}</td>
				<td>
					<Moment format='MMM Do, YYYY (hh:mm A)'>{data.createdAt}</Moment>
				</td>
				<td>
					<OverlayTrigger
						placement='bottom'
						overlay={<Tooltip id='button-tooltip'>Edit</Tooltip>}
					>
						<i
							className='fa fa-pencil-square-o cursor-pointer text-white mr-2'
							onClick={() =>
								this.editCourse(data.name, data.description, data._id)
							}
						></i>
					</OverlayTrigger>
					<OverlayTrigger
						placement='bottom'
						overlay={<Tooltip id='button-tooltip'>Delete</Tooltip>}
					>
						<i
							className='fa fa-trash-o cursor-pointer text-white'
							onClick={() => this.handleDeleteModal(true, data._id)}
						></i>
					</OverlayTrigger>
				</td>
			</tr>
		));
		return (
			<div className='container'>
				<div className='d-flex justify-content-end py-4'>
					<Button
						variant='contained'
						color='primary'
						className='mr-2'
						onClick={() => this.handleCourseModal(true, 'create')}
					>
						Create
					</Button>
					<Button
						variant='contained'
						className='mr-2'
						onClick={() => this.handleCourseModal(true, 'search')}
					>
						Search
					</Button>
					{this.state.search ? (
						<Button variant='danger' onClick={this.clearSearch}>
							Clear search
						</Button>
					) : null}
				</div>
				<div className={`text-center ${styles.heading} mb-2`}>Courses</div>
				{this.props.courses.length === 0 ? (
					<p className='mb-0'>No course existed. Create a new one </p>
				) : (
					<div className='px-5'>
						<Table striped bordered hover variant='dark' className='mb-0'>
							<thead>
								<tr>
									<th scope='col'>S.No</th>
									<th scope='col'>Name</th>
									<th scope='col'>Description</th>
									<th scope='col'>Created at</th>
									<th scope='col'>Actions</th>
								</tr>
							</thead>
							<tbody>{courses}</tbody>
						</Table>
						<div className='d-flex justify-content-center py-2 bg-white'>
							<Pagination
								count={this.state.pageCount}
								variant='outlined'
								color='secondary'
								size='large'
								onChange={this.handlePageChange}
								showFirstButton
								showLastButton
							/>
						</div>
					</div>
				)}
				<CourseModal
					show={this.state.modal}
					closeModal={this.handleCourseModal}
					handleSnackBar={this.handleSnackBar}
					handleSearch={this.handleSearch}
					modalType={this.state.modalType}
					name={this.state.name}
					description={this.state.description}
					courseId={this.state.courseId}
					viewCourses={this.viewCourses}
				/>
				<DeleteModal
					show={this.state.deleteModal.show}
					hideModal={this.handleDeleteModal}
					heading='course'
					deleteContent={this.deleteCourse}
				/>
				<Snackbar
					open={this.state.snackbar.show}
					autoHideDuration={6000}
					onClose={() => this.handleSnackBar(false, '')}
				>
					<MuiAlert
						elevation={6}
						variant='filled'
						onClose={() => this.handleSnackBar(false, '')}
						severity='success'
					>
						{this.state.snackbar.msg}
					</MuiAlert>
				</Snackbar>
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
