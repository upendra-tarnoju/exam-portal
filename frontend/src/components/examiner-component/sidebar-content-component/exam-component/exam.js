import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import Moment from 'react-moment';
import moment from 'moment';
import { connect } from 'react-redux';

import ExaminerService from '../../../../services/examinerApi';
import ExamDetails from './examDetails';
import ExamPeriod from './examPeriod';
import style from './exam.module.css';
import * as ActionTypes from '../../../../action';

class Exam extends Component {
	constructor(props) {
		super(props);
		this.state = {
			createExam: false,
			nextInputs: true,
			courses: [],
			editCourse: {
				status: false,
				index: '',
			},
			input: {
				subject: '',
				examCode: '',
				examDate: '',
				totalMarks: '',
				passingMarks: '',
				startTime: '',
				endTime: '',
			},
		};
		this.examinerService = new ExaminerService();
		this.handleStates = this.handleStates.bind(this);
		this.handleExamChange = this.handleExamChange.bind(this);
	}

	handleStates(key, value) {
		if (key === 'createExam' && value === false) {
			this.props.clearExamInputs();
		}
		this.setState({
			[key]: value,
		});
	}

	componentDidMount() {
		this.examinerService.getAllExams().then((res) => {
			this.setState({ courses: res.data });
		});
	}

	editExam(status, index) {
		this.setState((prevState) => ({
			...prevState,
			editCourse: {
				status: status,
				index: index,
			},
			input: prevState.courses[index],
		}));
	}

	handleExamChange(event) {
		let update = false;
		let key = event.target.name;
		let value = event.target.value;
		if (key === 'totalMarks' || key === 'passingMarks') {
			let letters = /^[0-9\b]+$/;
			if (letters.test(value) || value === '') {
				update = true;
			}
		} else {
			update = true;
		}
		if (update) {
			this.setState((prevState) => ({
				...prevState,
				courses: prevState.courses,
				input: {
					...prevState.input,
					[key]: value,
				},
			}));
		}
	}

	render() {
		let { input } = this.state;
		const allExams = this.state.courses.map((course, index) => {
			return (
				<tr key={course._id}>
					<td>{index + 1}</td>
					<td>
						{this.state.editCourse.index === index &&
						this.state.editCourse.status ? (
							<input
								type='text'
								name='subject'
								className='w-100 form-control'
								value={input.subject}
								onChange={this.handleExamChange}
							/>
						) : (
							course.subject
						)}
					</td>
					<td>
						{this.state.editCourse.index === index &&
						this.state.editCourse.status ? (
							<input
								type='text'
								name='examCode'
								className='w-100 form-control'
								value={input.examCode}
								onChange={this.handleExamChange}
							/>
						) : (
							course.examCode
						)}
					</td>
					<td>
						{this.state.editCourse.index === index &&
						this.state.editCourse.status ? (
							<input
								type='date'
								name='examDate'
								value={moment(input.examDate).format('YYYY-MM-DD')}
								onChange={this.handleExamChange}
								className='w-100 form-control'
							/>
						) : (
							<Moment format='MMM Do, YYYY'>{course.examDate}</Moment>
						)}
					</td>
					<td>
						{this.state.editCourse.index === index &&
						this.state.editCourse.status ? (
							<input
								type='text'
								name='totalMarks'
								value={input.totalMarks}
								onChange={this.handleExamChange}
								className='w-100 form-control text-right'
							/>
						) : (
							<div className='text-right'>{course.totalMarks}</div>
						)}
					</td>
					<td>
						{this.state.editCourse.index === index &&
						this.state.editCourse.status ? (
							<input
								type='text'
								name='passingMarks'
								value={input.passingMarks}
								onChange={this.handleExamChange}
								className='w-100 form-control text-right'
							/>
						) : (
							<div className='text-right'>{course.passingMarks}</div>
						)}
					</td>
					<td>
						{this.state.editCourse.index === index &&
						this.state.editCourse.status ? (
							<input
								type='time'
								name='startTime'
								value={moment(input.startTime).format('HH:MM')}
								onChange={this.handleExamChange}
								className='w-100 form-control'
							/>
						) : (
							<Moment format='HH:mm A'>{course.startTime}</Moment>
						)}
					</td>
					<td>
						{this.state.editCourse.index === index &&
						this.state.editCourse.status ? (
							<input
								type='time'
								name='endTime'
								value={moment(input.endTime).format('HH:MM')}
								onChange={this.handleExamChange}
								className='w-100 form-control'
							/>
						) : (
							<Moment format='HH:mm A'>{course.endTime}</Moment>
						)}
					</td>
					<td className='d-flex justify-content-around'>
						<i className='fa fa-trash-o cursor-pointer text-white align-self-center'></i>
						{this.state.editCourse.index === index &&
						this.state.editCourse.status ? (
							<i
								className='fa fa-times cursor-pointer text-white align-self-center ml-1 mr-1'
								onClick={() => this.editExam(false, index)}
							></i>
						) : (
							<i
								className='fa fa-check-square-o cursor-pointer text-white align-self-center'
								onClick={() => this.editExam(true, index)}
							></i>
						)}
					</td>
				</tr>
			);
		});
		return (
			<div className='p-4'>
				<div className='d-flex justify-content-end'>
					{this.state.createExam ? (
						<button
							type='button'
							className='btn btn-danger'
							onClick={() => this.handleStates('createExam', false)}
						>
							Cancel
						</button>
					) : (
						<button
							type='submit'
							className='btn btn-primary'
							onClick={() => this.handleStates('createExam', true)}
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
							<ExamDetails handleInputs={this.handleStates} />
						) : (
							<ExamPeriod handleInputs={this.handleStates} />
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
									<th className='text-right'>Total marks</th>
									<th className='text-right'>Passing marks</th>
									<th>Start time</th>
									<th>End time</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>{allExams}</tbody>
						</Table>
						{this.state.editCourse.status ? (
							<div className='d-flex justify-content-end'>
								<button type='button' className='btn btn-primary mr-2'>
									Update
								</button>
								<button type='button' className='btn btn-danger'>
									Cancel
								</button>
							</div>
						) : null}
					</div>
				)}
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		clearExamInputs: () => {
			dispatch({
				type: ActionTypes.CLEAR_EXAM_DETAILS_FIELDS,
			});
		},
	};
};
export default connect(null, mapDispatchToProps)(Exam);
