import React from 'react';
import { Card, Button } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import styles from '../exam.module.css';
import ExaminerService from '../../../../../services/examinerApi';
import moment from 'moment';

class EditExam extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			examCode: '',
			subject: '',
			totalMarks: '',
			passingMarks: '',
			examDate: '',
			startTime: '',
			endTime: '',
			password: {
				current: '',
				new: '',
				confirm: '',
			},
		};
		this.examinerService = new ExaminerService();
	}

	componentDidMount() {
		let examId = this.props.match.params.examId;
		this.examinerService.getParticularExam(examId).then((res) => {
			let exam = res.data;
			this.setState({
				examCode: exam.examCode,
				subject: exam.subject,
				totalMarks: exam.totalMarks,
				passingMarks: exam.passingMarks,
				examDate: moment(exam.examDate, 'YYYY-MM-DD').format('YYYY-MM-DD'),
				startTime: moment(exam.startTime).format('HH:MM'),
				endTime: moment(exam.endTime).format('HH:MM'),
			});
		});
	}

	render() {
		return (
			<div className='container w-50 my-5'>
				<h3 className={`text-center ${styles.heading}`}>Edit exam</h3>
				<Accordion defaultActiveKey='0'>
					<Card className='mb-2'>
						<Accordion.Toggle
							className='bg-dark text-white'
							as={Card.Header}
							variant='link'
							eventKey='0'
						>
							Exam details
						</Accordion.Toggle>
						<Accordion.Collapse eventKey='0'>
							<Card.Body>
								<form>
									<div className='container'>
										<div className='form-group'>
											<label>Subject</label>
											<input
												type='text'
												name='subject'
												className='w-100 form-control'
												value={this.state.subject}
												// onChange={this.handleExamChange}
											/>
										</div>
										<div className='form-group'>
											<label>Exam Code</label>
											<input
												type='text'
												name='examCode'
												className='w-100 form-control'
												value={this.state.examCode}
												// onChange={this.handleExamChange}
											/>
										</div>
										<div className='d-flex justify-content-end'>
											<Button
												type='submit'
												className='btn btn-primary'
											>
												Update
											</Button>
										</div>
									</div>
								</form>
							</Card.Body>
						</Accordion.Collapse>
					</Card>
				</Accordion>
				<Accordion defaultActiveKey='1'>
					<Card className='mb-2'>
						<Accordion.Toggle
							className='bg-dark text-white'
							as={Card.Header}
							variant='link'
							eventKey='0'
						>
							Exam marks
						</Accordion.Toggle>
						<Accordion.Collapse eventKey='0'>
							<Card.Body>
								<div className='container'>
									<div className='form-group'>
										<label>Total marks</label>
										<input
											type='text'
											name='totalMarks'
											value={this.state.totalMarks}
											// onChange={this.handleExamChange}
											className='w-100 form-control'
										/>
									</div>
									<div className='form-group'>
										<label>Passing marks</label>
										<input
											type='text'
											name='passingMarks'
											value={this.state.passingMarks}
											// onChange={this.handleExamChange}
											className='w-100 form-control'
										/>
									</div>
									<div className='d-flex justify-content-end'>
										<Button type='submit' className='btn btn-primary'>
											Update
										</Button>
									</div>
								</div>
							</Card.Body>
						</Accordion.Collapse>
					</Card>
				</Accordion>
				<Accordion defaultActiveKey='1'>
					<Card className='mb-2'>
						<Accordion.Toggle
							className='bg-dark text-white'
							as={Card.Header}
							variant='link'
							eventKey='0'
						>
							Exam time period
						</Accordion.Toggle>
						<Accordion.Collapse eventKey='0'>
							<Card.Body>
								<div className='container'>
									<div className='form-group'>
										<label>Exam date</label>
										<input
											type='date'
											name='examDate'
											value={this.state.examDate}
											// onChange={this.handleExamChange}
											className='w-100 form-control'
										/>
									</div>
									<div className='form-group'>
										<label>Start time</label>
										<input
											type='time'
											name='startTime'
											value={this.state.startTime}
											// onChange={this.handleExamChange}
											className='w-100 form-control'
										/>
									</div>
									<div className='form-group'>
										<label>End time</label>
										<input
											type='time'
											name='endTime'
											value={this.state.endTime}
											// onChange={this.handleExamChange}
											className='w-100 form-control'
										/>
									</div>
									<div className='d-flex justify-content-end'>
										<Button type='submit' className='btn btn-primary'>
											Update
										</Button>
									</div>
								</div>
							</Card.Body>
						</Accordion.Collapse>
					</Card>
				</Accordion>
				<Accordion defaultActiveKey='1'>
					<Card>
						<Accordion.Toggle
							className='bg-dark text-white'
							as={Card.Header}
							variant='link'
							eventKey='0'
						>
							Exam password
						</Accordion.Toggle>
						<Accordion.Collapse eventKey='0'>
							<Card.Body>
								<div className='container'>
									<div className='form-group'>
										<label>Current password</label>
										<input
											type='password'
											name='current'
											value={this.state.password.current}
											// onChange={this.handleExamChange}
											className='w-100 form-control'
										/>
									</div>
									<div className='form-group'>
										<label>New password</label>
										<input
											type='password'
											name='new'
											value={this.state.password.new}
											// onChange={this.handleExamChange}
											className='w-100 form-control'
										/>
									</div>
									<div className='form-group'>
										<label>Confirm password</label>
										<input
											type='password'
											name='confirm'
											value={this.state.password.confirm}
											// onChange={this.handleExamChange}
											className='w-100 form-control'
										/>
									</div>
									<div className='d-flex justify-content-end'>
										<Button type='submit' className='btn btn-primary'>
											Update
										</Button>
									</div>
								</div>
							</Card.Body>
						</Accordion.Collapse>
					</Card>
				</Accordion>
			</div>
		);
	}
}

export default EditExam;
