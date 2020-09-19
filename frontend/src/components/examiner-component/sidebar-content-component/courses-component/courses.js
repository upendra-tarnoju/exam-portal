import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Alert, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';

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
			alert: false,
			msg: '',
			pageIndex: 0,
			pageSize: 5,
			maxSizeIndex: 5,
			tableIndex: 0,
			totalCount: 0,
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

	handleAlert = (status, msg) => {
		this.setState({
			alert: status,
			msg: msg,
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
				let maxIndex;
				if (response.data.totalCourses < this.state.maxSizeIndex)
					maxIndex = response.data.totalCourses;
				else {
					maxIndex = this.state.maxSizeIndex;
				}
				this.props.setCourses(response.data.courses);
				this.setState({
					maxSizeIndex: maxIndex,
					totalCount: response.data.totalCourses,
				});
			});
	};

	componentDidMount() {
		this.viewCourses();
	}

	changePageSize = (event) => {
		let newPageSize = event.target.value;
		this.setState({ pageIndex: 0, pageSize: newPageSize }, () => {
			this.viewCourses();
		});
	};

	paginateCourses(paginateType) {
		let pageIndex = this.state.pageIndex;
		let pageSize = this.state.pageSize;
		if (paginateType === 'inc') pageIndex = pageIndex + 1;
		else pageIndex = pageIndex - 1;
		let maxSizeIndex = (pageIndex + 1) * pageSize;
		if (maxSizeIndex > this.state.totalCount) {
			maxSizeIndex = this.state.totalCount;
		}

		if (
			pageIndex >= 0 &&
			(this.state.maxSizeIndex !== this.state.totalCount ||
				maxSizeIndex !== this.state.totalCount)
		) {
			this.setState(
				{
					pageIndex: pageIndex,
					tableIndex: pageIndex * pageSize,
					maxSizeIndex: maxSizeIndex,
				},
				() => {
					this.viewCourses();
				}
			);
		}
	}

	render() {
		let courses = this.props.courses.map((data, index) => (
			<tr key={data._id}>
				<th scope='row'>{this.state.tableIndex + index + 1}</th>
				<td>{data.name}</td>
				<td>{data.description}</td>
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
						variant='primary'
						className='mr-2'
						onClick={() => this.handleCourseModal(true, 'create')}
					>
						Create
					</Button>
					<Button
						variant='success'
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
				<Alert
					variant='success'
					show={this.state.alert}
					onClose={() => this.handleAlert(false, '')}
					dismissible
					animation='false'
				>
					{this.state.msg}
				</Alert>
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
									<th scope='col'>Actions</th>
								</tr>
							</thead>
							<tbody>{courses}</tbody>
						</Table>
						<div className='py-2 px-1 bg-light d-flex justify-content-end'>
							<span className='align-self-center mr-3'>
								Item per page
							</span>
							<select
								onChange={this.changePageSize}
								value={this.state.pageSize}
								className={`form-control ${styles.selectWidth} form-control-sm mr-3`}
							>
								<option>5</option>
								<option>10</option>
								<option>15</option>
							</select>
							<span className='align-self-center mr-3'>
								{this.state.tableIndex + 1} - {this.state.maxSizeIndex}{' '}
								of {this.state.totalCount}
							</span>
							<i
								onClick={() => this.paginateCourses('dec')}
								className='fa fa-2x fa-angle-left align-self-center mr-3 cursor-pointer'
							></i>
							<i
								onClick={() => this.paginateCourses('inc')}
								className='fa fa-2x fa-angle-right align-self-center cursor-pointer'
							></i>
						</div>
					</div>
				)}
				<CourseModal
					show={this.state.modal}
					closeModal={this.handleCourseModal}
					handleAlert={this.handleAlert}
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
