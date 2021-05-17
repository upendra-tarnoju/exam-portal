import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { Link } from 'react-router-dom';
import { Table, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Moment from 'react-moment';

import styles from './students.module.css';
import ExaminerService from '../../../../services/examinerApi';
import CustomSnackBar from '../../../customSnackbar';

class Students extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			studentList: [],
			pageSize: 5,
			pageIndex: 0,
			totalExams: 0,
			snackBar: {
				status: false,
				msg: 'You cannot add students to expired exam',
				type: 'error',
			},
		};
		this.examinerService = new ExaminerService();
	}

	addNewStudent = (student) => {
		this.props.history.push(`/examiner/student/new`);
		// let currentDate = new Date();

		// let formattedExamDate = moment(student.examDate).format('YYYY-MM-DD');
		// let formattedCurrentDate = moment(currentDate).format('YYYY-MM-DD');

		// if (formattedExamDate <= formattedCurrentDate) {
		// 	let formattedExamEndTime = moment(student.endTime).format('HH:mm:ss a');
		// 	let formattedCurrentTime = moment(currentDate).format('HH:mm:ss a');
		// 	if (formattedExamEndTime < formattedCurrentTime) {
		// 		this.handleSnackBar(true);
		// 	} else {
		// 	}
		// }
	};

	handleSnackBar = (status) => {
		this.setState((prevState) => ({
			snackBar: {
				...prevState.snackBar,
				status: status,
			},
		}));
	};

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
						<Moment format='MMM Do, YYYY'>{student.examDate}</Moment>
						<Moment format='(hh:mm A)' className='ml-1'>
							{student.startTime}
						</Moment>
					</td>
					<td className='text-right'>{student.totalStudents}</td>
					<td className='d-flex justify-content-center'>
						<OverlayTrigger
							placement='bottom'
							overlay={<Tooltip id='button-tooltip'>Add student</Tooltip>}
						>
							<i
								onClick={() => this.addNewStudent(student)}
								className='fa fa-plus cursor-pointer text-white mr-2 align-self-center'
							></i>
						</OverlayTrigger>
						<OverlayTrigger
							placement='bottom'
							overlay={<Tooltip id='button-tooltip'>View students</Tooltip>}
						>
							<Link to={`/examiner/exam/${student._id}/students`}>
								<i className='fa fa-eye cursor-pointer text-white mt-1 mr-2'></i>
							</Link>
						</OverlayTrigger>
					</td>
				</tr>
			);
		});
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
				</div>
				<CustomSnackBar
					handleSnackBar={this.handleSnackBar}
					show={this.state.snackBar.status}
					message={this.state.snackBar.msg}
					snackBarType={this.state.snackBar.type}
				/>
			</div>
		);
	}
}

export default Students;
