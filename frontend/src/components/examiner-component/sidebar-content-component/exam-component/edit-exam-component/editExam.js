import React from 'react';
import styles from '../exam.module.css';
import ExaminerService from '../../../../../services/examinerApi';
import moment from 'moment';
import ExamDetails from './accordion/examDetails';

class EditExam extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			examCode: { prev: '', new: '', collapse: false, msg: '' },
			subject: { prev: '', new: '', collapse: false, msg: '' },
			totalMarks: { prev: '', new: '' },
			passingMarks: { prev: '', new: '' },
			examDate: { prev: '', new: '' },
			startTime: { prev: '', new: '' },
			endTime: { prev: '', new: '' },
			password: {
				current: { prev: '', new: '' },
				new: { prev: '', new: '' },
				confirm: { prev: '', new: '' },
			},
		};
		this.handleExamChange = this.handleExamChange.bind(this);
		this.handleCollapseChange = this.handleCollapseChange.bind(this);
		this.updateExamDetails = this.updateExamDetails.bind(this);
		this.examinerService = new ExaminerService();
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
				[key]: {
					...prevState[key],
					new: value,
				},
			}));
		}
	}

	componentDidMount() {
		let examId = this.props.match.params.examId;
		this.examinerService.getParticularExam(examId).then((res) => {
			let exam = res.data;
			let examDate = moment(exam.examDate, 'YYYY-MM-DD').format(
				'YYYY-MM-DD'
			);
			let startTime = moment(exam.startTime).format('HH:MM');
			let endTime = moment(exam.endTime).format('HH:MM');
			this.setState({
				examCode: {
					prev: exam.examCode,
					new: exam.examCode,
					collapse: false,
					msg: '',
				},
				subject: {
					prev: exam.subject,
					new: exam.subject,
					collapse: false,
					msg: '',
				},
				totalMarks: { prev: exam.totalMarks, new: exam.totalMarks },
				passingMarks: {
					prev: exam.passingMarks,
					new: exam.passingMarks,
				},
				examDate: { prev: examDate, new: examDate },
				startTime: { prev: startTime, new: startTime },
				endTime: { prev: endTime, new: endTime },
			});
		});
	}

	handleCollapseChange(key) {
		this.setState((prevState) => ({
			[key]: {
				...prevState[key],
				collapse: !prevState[key].collapse,
				new: prevState[key].collapse === true ? prevState[key].prev : null,
				msg: '',
			},
		}));
	}

	updateExamDetails(data) {
		let key = Object.keys(data)[0];
		let examId = this.props.match.params.examId;
		this.examinerService
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
	}

	render() {
		return (
			<div className='container w-50 my-5'>
				<h3 className={`text-center ${styles.heading}`}>Edit exam</h3>
				<ExamDetails
					state={this.state}
					handleExamChange={this.handleExamChange}
					handleCollapseChange={this.handleCollapseChange}
					updateExamDetails={this.updateExamDetails}
				/>
			</div>
		);
	}
}

export default EditExam;
