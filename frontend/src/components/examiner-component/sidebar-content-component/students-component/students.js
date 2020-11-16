import React from 'react';
import { Snackbar } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import MuiAlert from '@material-ui/lab/Alert';
import { Table, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Moment from 'react-moment';

import styles from './students.module.css';
import ExaminerService from '../../../../services/examinerApi';
import { Link } from 'react-router-dom';

class Students extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			studentList: [],
			pageSize: 5,
			pageIndex: 0,
			totalExams: 0,
			snackBar: { show: false, msg: '' },
		};
		this.examinerService = new ExaminerService();
	}

	viewStudents() {
		let { pageIndex, pageSize } = this.state;
		this.examinerService.getAllStudents(pageIndex, pageSize).then((res) => {
			let examsLength = res.data.totalExams;
			this.setState({
				studentList: res.data.studentData,
				totalExams: examsLength,
				pageCount: Math.ceil(examsLength / this.state.pageSize),
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

	render() {
		let { pageIndex, pageSize } = this.state;
		let allStudents = this.state.studentList.map((student, index) => {
			return (
				<tr key={student._id}>
					<td>{pageIndex * pageSize + index + 1}</td>
					<td>{student.subject}</td>
					<td>{student.examCode}</td>
					<td>
						<Moment format='MMM Do, YYYY (hh:mm A)'>
							{student.examDate}
						</Moment>
					</td>
					<td className='text-right'>{student.totalStudents}</td>
					<td className='d-flex justify-content-center'>
						<OverlayTrigger
							placement='bottom'
							overlay={
								<Tooltip id='button-tooltip'>Add student</Tooltip>
							}
						>
							<Link to={`/examiner/exam/${student._id}/students/new`}>
								<i className='fa fa-plus cursor-pointer text-white mr-2'></i>
							</Link>
						</OverlayTrigger>
						<OverlayTrigger
							placement='bottom'
							overlay={
								<Tooltip id='button-tooltip'>View students</Tooltip>
							}
						>
							<Link to={`/examiner/exam/${student._id}/students`}>
								<i className='fa fa-eye cursor-pointer text-white mt-1 mr-2'></i>
							</Link>
						</OverlayTrigger>
					</td>
				</tr>
			);
		});
		let { snackBar } = this.state;
		return (
			<div className='p-4'>
				<div className='mt-5 w-75 mx-auto'>
					<p className={`${styles.heading} text-center`}>
						List of all students
					</p>
					<Table striped bordered hover variant='dark' className='mb-0'>
						<thead>
							<tr>
								<th>S.No</th>
								<th>Subject</th>
								<th>Exam code</th>
								<th>Exam date</th>
								<th className='text-right'>Total Students</th>
								<th className='text-center'>Actions</th>
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
				</div>
			</div>
		);
	}
}

export default Students;
