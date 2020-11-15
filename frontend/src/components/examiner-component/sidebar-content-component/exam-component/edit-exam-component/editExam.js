import React from 'react';
import moment from 'moment';
import { Alert, AlertTitle } from '@material-ui/lab';

import styles from '../exam.module.css';
import ExamService from '../../../../../services/examApi';
import ExamDetails from './accordion/examDetails';
import ExamMarks from './accordion/examMarks';
import ExamTime from './accordion/examTime';
import ExamPassword from './accordion/examPassword';
import factories from '../../../../../factories/factories';

class EditExam extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			examCode: { prev: '', new: '', collapse: false, msg: '' },
			subject: { prev: '', new: '', collapse: false, msg: '' },
			totalMarks: { prev: '', new: '', collapse: false, msg: '' },
			passingMarks: { prev: '', new: '', collapse: false, msg: '' },
			examDate: { prev: '', new: '', collapse: false, msg: '' },
			startTime: { prev: '', new: '', collapse: false, msg: '' },
			endTime: { prev: '', new: '', collapse: false, msg: '' },
			courses: { prev: '', new: '', collapse: false, msg: '' },
			duration: { prev: '', new: '', collapse: false, msg: '' },
			password: { collapse: false, msg: '' },
			editExam: true,
		};
		this.examService = new ExamService();
	}

	handleExamChange = (event) => {
		let update = false;
		let key = event.target.name;
		let value = event.target.value;
		if (
			key === 'totalMarks' ||
			key === 'passingMarks' ||
			key === 'duration'
		) {
			let letters = /^[0-9\b]+$/;
			if (letters.test(value) || value === '') {
				update = true;
			}
		} else {
			update = true;
		}
		if (update) {
			this.setState((prevState) => ({
				[key]: {
					...prevState[key],
					new: value,
				},
			}));
		}
	};

	changeCourse = (newCourse) => {
		this.setState((prevState) => ({
			courses: {
				...prevState.courses,
				new: newCourse !== null ? newCourse : {},
			},
		}));
	};

	setEditExamStatus(examDate) {
		let currentDate = new Date();
		currentDate = factories.formatDate(currentDate);
		if (examDate >= currentDate) {
			return true;
		} else {
			return false;
		}
	}

	componentDidMount() {
		let examId = this.props.match.params.examId;
		this.examService.getParticularExam(examId).then((res) => {
			let exam = res.data;
			let examDate = moment(exam.examDate, 'YYYY-MM-DD').format(
				'YYYY-MM-DD'
			);
			let boolStatus = this.setEditExamStatus(examDate);
			this.setState((prevState) => ({
				courses: {
					...prevState.courses,
					prev: exam.courses,
					new: exam.courses,
				},
				examCode: {
					...prevState.examCode,
					prev: exam.examCode,
					new: exam.examCode,
				},
				subject: {
					...prevState.subject,
					prev: exam.subject,
					new: exam.subject,
				},
				totalMarks: {
					...prevState.totalMarks,
					prev: exam.totalMarks,
					new: exam.totalMarks,
				},
				passingMarks: {
					...prevState.passingMarks,
					prev: exam.passingMarks,
					new: exam.passingMarks,
				},
				examDate: {
					...prevState.examDate,
					prev: exam.examDate,
					new: exam.examDate,
				},
				startTime: {
					...prevState.startTime,
					prev: exam.startTime,
					new: exam.startTime,
				},
				endTime: {
					...prevState.endTime,
					prev: exam.endTime,
					new: exam.endTime,
				},
				duration: {
					...prevState.duration,
					prev: exam.duration,
					new: exam.duration,
				},
				editExam: boolStatus,
			}));
		});
	}

	handleCollapseChange = (key) => {
		if (key === 'password') {
			this.setState((prevState) => ({
				[key]: {
					collapse: !prevState[key].collapse,
				},
			}));
		} else {
			this.setState((prevState) => ({
				[key]: {
					...prevState[key],
					collapse: !prevState[key].collapse,
					msg: '',
				},
			}));
		}
	};

	updateExamDetails = (data) => {
		let key = Object.keys(data)[0];
		let examId = this.props.match.params.examId;
		this.examService
			.updateExam(examId, data)
			.then((response) => {
				if (key === 'courses') {
					this.setState((prevState) => ({
						courses: {
							...prevState.courses,
							prev: prevState.courses.new,
							collapse: false,
						},
					}));
				} else {
					this.setState({
						[key]: {
							prev: response.data[key],
							new: response.data[key],
							collapse: false,
						},
					});
				}
			})
			.catch((error) => {
				this.setState((prevState) => ({
					[key]: {
						...prevState[key],
						msg: error.response.data.msg,
					},
				}));
			});
	};

	deleteDuration = () => {
		let examId = this.props.match.params.examId;
		this.examService.updateExam(examId, { duration: '' }).then((response) => {
			console.log(response.data);
		});
	};

	render() {
		return (
			<div className='container w-50 my-5'>
				<h3 className={`text-center ${styles.heading}`}>Edit exam</h3>
				{!this.state.editExam ? (
					<div className='mb-2'>
						<Alert severity='error' variant='filled'>
							<AlertTitle>Message</AlertTitle>
							You cannot edit <strong>expired</strong> exam
						</Alert>
					</div>
				) : null}
				{this.state.courses.new !== '' ? (
					<ExamDetails
						fields={this.state}
						handleCollapseChange={this.handleCollapseChange}
						updateExamDetails={this.updateExamDetails}
						handleCourseChange={this.changeCourse}
					/>
				) : null}

				{this.state.examDate.prev !== '' ? (
					<ExamMarks
						fields={this.state}
						handleCollapseChange={this.handleCollapseChange}
						updateExamDetails={this.updateExamDetails}
					/>
				) : null}

				<ExamTime
					fields={this.state}
					handleCollapseChange={this.handleCollapseChange}
					deleteDuration={this.deleteDuration}
					updateExamDetails={this.updateExamDetails}
				/>
				<ExamPassword
					fields={this.state}
					handleCollapseChange={this.handleCollapseChange}
					updateExamDetails={this.updateExamDetails}
				/>
			</div>
		);
	}
}

export default EditExam;
