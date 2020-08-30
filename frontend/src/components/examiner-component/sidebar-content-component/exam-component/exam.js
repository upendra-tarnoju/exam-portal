import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import Moment from 'react-moment';

import ExaminerService from '../../../../services/examinerApi';
import ExamDetails from './examDetails';
import ExamPeriod from './examPeriod';
import style from './exam.module.css';

class Exam extends Component {
	constructor(props) {
		super(props);
		this.state = {
			createExam: false,
			nextInputs: false,
			courses: [],
			editCourse: false,
		};
		this.examinerService = new ExaminerService();
		this.handleInputs = this.handleInputs.bind(this);
	}

	setInputScreen(status) {
		this.setState({
			createExam: status,
		});
	}

	handleInputs(status) {
		this.setState({
			nextInputs: status,
		});
	}

	formatDate(date) {
		let year = new Intl.DateTimeFormat('en', {
			year: 'numeric',
		}).format(date);
	}

	componentDidMount() {
		this.examinerService.getAllExams().then((res) => {
			this.setState({ courses: res.data });
		});
	}

	render() {
		const allExams = this.state.courses.map((course, index) => {
			return (
				<tr key={course._id}>
					<td>{index + 1}</td>
					<td>{course.subject}</td>
					<td>{course.examCode}</td>
					<td>
						<Moment format='MMM Do, YYYY'>{course.examDate}</Moment>
					</td>
					<td>{course.totalMarks}</td>
					<td>{course.passingMarks}</td>
					<td>
						<Moment format='HH:mm A'>{course.startTime}</Moment>
					</td>
					<td>
						<Moment format='hh:mm A'>{course.endTime}</Moment>
					</td>
					<td className='d-flex justify-content-around'>
						<i className='fa fa-trash-o cursor-pointer text-white align-self-center'></i>
						<i className='fa fa-check-square-o cursor-pointer text-white align-self-center'></i>
						<i className='fa fa-times cursor-pointer text-white align-self-center'></i>
					</td>
				</tr>
			);
		});
		return (
			<div className='container pt-4'>
				<div className='d-flex justify-content-end'>
					{this.state.createExam ? (
						<button
							type='button'
							className='btn btn-danger'
							onClick={() => this.setInputScreen(false)}
						>
							Cancel
						</button>
					) : (
						<button
							type='submit'
							className='btn btn-primary'
							onClick={() => this.setInputScreen(true)}
						>
							Create
						</button>
					)}
				</div>
				{this.state.createExam ? (
					<div className='card mt-4 w-50 mx-auto'>
						<div className='card-header bg-white text-center'>
							<h3 className='font-weight-normal'>Create new Exam</h3>
						</div>
						{!this.state.nextInputs ? (
							<ExamDetails handleInputs={this.handleInputs} />
						) : (
							<ExamPeriod handleInputs={this.handleInputs} />
						)}
					</div>
				) : (
					<div className='mt-2'>
						<p className={`${style.heading} text-center`}>
							List of all created Exams
						</p>
						<Table striped bordered hover variant='dark'>
							<thead>
								<tr>
									<th>S.No</th>
									<th>Subject</th>
									<th>Exam code</th>
									<th>Exam date</th>
									<th>Total marks</th>
									<th>Passing marks</th>
									<th>Start time</th>
									<th>End time</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>{allExams}</tbody>
						</Table>
					</div>
				)}
			</div>
		);
	}
}

export default Exam;
