import React from 'react';
import { Button, Snackbar } from '@material-ui/core';
import Moment from 'react-moment';
import Pagination from '@material-ui/lab/Pagination';
import MuiAlert from '@material-ui/lab/Alert';
import { Table, OverlayTrigger, Tooltip } from 'react-bootstrap';

import CreateStudent from './create-student-component/createStudent';
import styles from './students.module.css';
import ExaminerService from '../../../../services/examinerApi';
import DeleteModal from '../../../../modals/deleteModal';

class Students extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			createStudent: false,
			studentList: [],
			pageSize: 5,
			pageIndex: 0,
			totalStudents: 0,
			snackBar: { show: false, msg: '' },
			deleteModal: { show: false, heading: '', id: '' },
		};
		this.examinerService = new ExaminerService();
	}

	viewStudents() {
		let { pageIndex, pageSize } = this.state;
		this.examinerService.getAllStudents(pageIndex, pageSize).then((res) => {
			let studentsLength = res.data.totalStudents;

			this.setState({
				studentList: res.data.studentData,
				totalStudents: studentsLength,
				pageCount: Math.ceil(studentsLength / this.state.pageSize),
			});
		});
	}

	handleSnackBar = (show, msg) => {
		this.setState({ snackBar: { show, msg } });
	};

	handlePageChange = (event, value) => {
		this.setState({ pageIndex: value - 1 }, () => this.viewStudents());
	};

	componentDidMount() {
		this.viewStudents();
	}

	resetViewStudents = () => {
		this.setState({ pageIndex: 0, createStudent: false }, () =>
			this.viewStudents()
		);
	};

	handleStudent = (status) => {
		this.setState({
			createStudent: status,
		});
	};

	deleteStudent = () => {
		let studentId = this.state.deleteModal.id;
		this.examinerService.deleteStudent(studentId).then((response) => {
			let updatedStudentList = this.state.studentList.filter(
				(data) => data.studentId !== studentId
			);
			this.setState((prevState) => ({
				...prevState,
				studentList: updatedStudentList,
				snackBar: { show: true, msg: response.data.msg },
				deleteModal: { show: false, heading: '' },
			}));
		});
	};

	handleDeleteModal = (show, heading, id) => {
		this.setState({ deleteModal: { show, heading, id } });
	};

	capitalizeString(string) {
		return string
			.split(' ')
			.map((char) => char.charAt(0).toUpperCase() + char.slice(1))
			.join(' ');
	}

	render() {
		let { pageIndex, pageSize } = this.state;
		let allStudents = this.state.studentList.map((student, index) => {
			return (
				<tr key={student._id}>
					<td>{pageIndex * pageSize + index + 1}</td>
					<td>{student.studentId}</td>
					<td>{`${student.data.firstName} ${student.data.lastName}`}</td>
					<td>{this.capitalizeString(student.fatherName)}</td>
					<td>{this.capitalizeString(student.motherName)}</td>
					<td>{student.data.email}</td>
					<td>{student.data.mobileNumber}</td>
					<td>
						<Moment parse='YYYY-MM-DD' format='MMM Do, YYYY'>
							{student.dob}
						</Moment>
					</td>
					<td className='d-flex justify-content-center'>
						<OverlayTrigger
							placement='bottom'
							overlay={<Tooltip id='button-tooltip'>Edit</Tooltip>}
						>
							<i className='fa fa-pencil-square-o cursor-pointer text-white mr-2'></i>
						</OverlayTrigger>
						<OverlayTrigger
							placement='bottom'
							overlay={<Tooltip id='button-tooltip'>Delete</Tooltip>}
						>
							<i
								className='fa fa-trash-o cursor-pointer text-white'
								onClick={() =>
									this.handleDeleteModal(
										true,
										'student',
										student.studentId
									)
								}
							></i>
						</OverlayTrigger>
					</td>
				</tr>
			);
		});
		let { snackBar, deleteModal } = this.state;
		return (
			<div className='p-4'>
				<div className='d-flex justify-content-end'>
					{!this.state.createStudent ? (
						<Button
							variant='contained'
							color='primary'
							size='large'
							onClick={() => this.handleStudent(true)}
						>
							Add
						</Button>
					) : null}
				</div>
				{this.state.createStudent ? (
					<CreateStudent
						resetViewStudents={this.resetViewStudents}
						handleSuccessSnackBar={this.handleSnackBar}
						createStudent={this.state.createStudent}
						handleStudent={this.handleStudent}
					/>
				) : (
					<div className='mt-5'>
						<p className={`${styles.heading} text-center`}>
							List of all students
						</p>
						<Table striped bordered hover variant='dark' className='mb-0'>
							<thead>
								<tr>
									<th>S.No</th>
									<th>Student ID</th>
									<th>Name</th>
									<th>Father name</th>
									<th>Mother name</th>
									<th>Email</th>
									<th>Mobile</th>
									<th>D.O.B</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>{allStudents}</tbody>
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
						<Snackbar
							open={snackBar.show}
							autoHideDuration={6000}
							onClose={() => this.handleSnackBar(false)}
						>
							<MuiAlert
								elevation={6}
								variant='filled'
								severity='success'
								onClose={() => this.handleSnackBar(false)}
							>
								{snackBar.msg}
							</MuiAlert>
						</Snackbar>
						<DeleteModal
							show={deleteModal.show}
							heading={deleteModal.heading}
							hideModal={this.handleDeleteModal}
							deleteContent={this.deleteStudent}
						/>
					</div>
				)}
			</div>
		);
	}
}

export default Students;
