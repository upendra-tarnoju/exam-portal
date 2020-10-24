import React from 'react';
import moment from 'moment';
import { Alert, AlertTitle } from '@material-ui/lab';

import styles from '../exam.module.css';
import ExamService from '../../../../../services/examApi';
import validation from '../../../../../services/validation';
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
			password: { collapse: false, msg: '' },
			current: { value: '', msg: '' },
			new: { value: '', msg: '' },
			reTypeNew: { value: '', msg: '' },
			editExam: true,
		};
		this.examService = new ExamService();
	}

	handleExamChange = (event) => {
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
				[key]: {
					...prevState[key],
					new: value,
				},
			}));
		}
	};

	handlePasswordChange = (event) => {
		let key = event.target.name;
		let value = event.target.value;
		this.setState((prevState) => ({
			[key]: {
				...prevState[key],
				value: value,
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
			let startTime = moment(exam.startTime).format('HH:MM');
			let endTime = moment(exam.endTime).format('HH:MM');
			let boolStatus = this.setEditExamStatus(examDate);
			this.setState({
				examCode: { prev: exam.examCode, new: exam.examCode },
				subject: { prev: exam.subject, new: exam.subject },
				totalMarks: { prev: exam.totalMarks, new: exam.totalMarks },
				passingMarks: { prev: exam.passingMarks, new: exam.passingMarks },
				examDate: { prev: examDate, new: examDate },
				startTime: { prev: startTime, new: startTime },
				endTime: { prev: endTime, new: endTime },
				editExam: boolStatus,
			});
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
					new:
						prevState[key].collapse === true ? prevState[key].prev : null,
					msg: '',
				},
			}));
		}
	};

	updateExamDetails = (data) => {
		let key = Object.keys(data)[0];
		let examId = this.props.match.params.examId;
		let validationState = validation.updateExamFields(data);
		if (validationState.error === '') {
			this.examService
				.updateExam(examId, data)
				.then((response) => {
					this.setState({
						[key]: {
							prev: response.data[key],
							new: response.data[key],
							collapse: false,
						},
					});
				})
				.catch((error) => {
					this.setState((prevState) => ({
						[key]: {
							...prevState[key],
							msg: error.response.data.msg,
						},
					}));
				});
		} else {
			if (key !== 'password') {
				this.setState((prevState) => ({
					[key]: {
						...prevState[key],
						msg: validationState.error,
					},
				}));
			} else {
				this.setState((prevState) => ({
					current: {
						...prevState.current,
						msg: validationState.current.msg,
					},
					new: {
						...prevState.new,
						msg: validationState.new.msg,
					},
					reTypeNew: {
						...prevState.reTypeNew,
						msg: validationState.reTypeNew.msg,
					},
				}));
			}
		}
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

				<ExamDetails
					state={this.state}
					handleExamChange={this.handleExamChange}
					handleCollapseChange={this.handleCollapseChange}
					updateExamDetails={this.updateExamDetails}
				/>
				<ExamMarks
					state={this.state}
					handleExamChange={this.handleExamChange}
					handleCollapseChange={this.handleCollapseChange}
					updateExamDetails={this.updateExamDetails}
				/>
				<ExamTime
					state={this.state}
					handleExamChange={this.handleExamChange}
					handleCollapseChange={this.handleCollapseChange}
					updateExamDetails={this.updateExamDetails}
				/>
				<ExamPassword
					state={this.state}
					handlePasswordChange={this.handlePasswordChange}
					handleCollapseChange={this.handleCollapseChange}
					updateExamDetails={this.updateExamDetails}
				/>
			</div>
		);
	}
}

export default EditExam;
