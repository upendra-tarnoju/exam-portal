import React from 'react';
import { Button } from 'react-bootstrap';

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
		};
		this.examinerService = new ExaminerService();
	}

	componentDidMount() {
		this.examinerService.getAllStudents().then((res) => {
			this.setState({
				studentList: res.data,
			});
		});
	}

	handleStudent = (status) => {
		this.setState({
			createStudent: status,
		});
	};
	render() {
		let allStudents = this.state.studentList.map((student, index) => {
			return (
				<tr key={student._id}>
					<td>{index + 1}</td>
					<td>{`${student.data.firstName} ${student.data.lastName}`}</td>
					<td>{student.fatherName}</td>
					<td>{student.motherName}</td>
					<td>{student.data.email}</td>
					<td>{student.data.mobileNumber}</td>
					<td>{student.dob}</td>
				</tr>
			);
		});
		return (
			<div className='container py-4'>
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
					</div>
				)}
			</div>
		);
	}
}

export default Students;
