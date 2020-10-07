import React from 'react';
import { Button } from 'react-bootstrap';
import Moment from 'react-moment';
import Pagination from '@material-ui/lab/Pagination';

import CreateStudent from './create-student-component/createStudent';
import styles from './students.module.css';
import { Table } from 'react-bootstrap';
import ExaminerService from '../../../../services/examinerApi';

class Students extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			createStudent: false,
			studentList: [],
			pageSize: 5,
			pageIndex: 0,
			totalStudents: 0,
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

	handlePageChange = (event, value) => {
		this.setState({ pageIndex: value - 1 }, () => this.viewStudents());
	};

	componentDidMount() {
		this.viewStudents();
	}

	handleStudent = (status) => {
		this.setState({
			createStudent: status,
		});
	};
	render() {
		let { pageIndex, pageSize } = this.state;
		let allStudents = this.state.studentList.map((student, index) => {
			return (
				<tr key={student._id}>
					<td>{pageIndex * pageSize + index + 1}</td>
					<td>{`${student.data.firstName} ${student.data.lastName}`}</td>
					<td>{student.fatherName}</td>
					<td>{student.motherName}</td>
					<td>{student.data.email}</td>
					<td>{student.data.mobileNumber}</td>
					<td>
						<Moment parse='YYYY-MM-DD' format='MMM Do, YYYY'>
							{student.dob}
						</Moment>
					</td>
				</tr>
			);
		});
		return (
			<div className='p-4'>
				<div className='d-flex justify-content-end'>
					{!this.state.createStudent ? (
						<Button
							variant='primary'
							onClick={() => this.handleStudent(true)}
						>
							Add
						</Button>
					) : (
						<Button
							variant='danger'
							onClick={() => this.handleStudent(false)}
						>
							Cancel
						</Button>
					)}
				</div>
				{this.state.createStudent ? (
					<CreateStudent />
				) : (
					<div className='mt-5'>
						<p className={`${styles.heading} text-center`}>
							List of all students
						</p>
						<Table striped bordered hover variant='dark'>
							<thead>
								<tr>
									<th>S.No</th>
									<th>Name</th>
									<th>Father name</th>
									<th>Mother name</th>
									<th>Email</th>
									<th>Mobile</th>
									<th>D.O.B</th>
									<th>Student actions</th>
								</tr>
							</thead>
							<tbody>{allStudents}</tbody>
						</Table>
						<div className='d-flex justify-content-center py-2  bg-white'>
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
			</div>
		);
	}
}

export default Students;
