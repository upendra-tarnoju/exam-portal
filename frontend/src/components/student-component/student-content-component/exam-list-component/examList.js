import React from 'react';

import ExamCard from './examCard';
import StudentService from '../../../../services/studentApi';
import { Paper } from '@material-ui/core';
import { Book } from '@material-ui/icons';
import classes from '../../student.module.css';
import Examkey from './examKey';

class ExamList extends React.Component {
	constructor() {
		super();
		this.state = {
			examList: [],
			conductedExamsList: [],
			upcomingExamsList: [],
			todayExamsList: [],
			showModal: false,
			selectedExam: '',
		};
		this.studentService = new StudentService();
	}
	componentDidMount() {
		this.studentService.getParticularStudentExamDetails().then((res) => {
			let examData = res.data;
			let conductedExamsList = [];
			let todayExamsList = [];
			let upcomingExamsList = [];
			while (examData.conductedExams.length > 0) {
				conductedExamsList.push(examData.conductedExams.splice(0, 3));
			}
			while (examData.todayExams.length > 0) {
				todayExamsList.push(examData.todayExams.splice(0, 3));
			}
			while (examData.upcomingExams.length > 0) {
				upcomingExamsList.push(examData.upcomingExams.splice(0, 3));
			}
			this.setState({
				conductedExamsList,
				todayExamsList,
				upcomingExamsList,
			});
		});
	}

	handleModal = (showModal, selectedExam) => {
		this.setState({ showModal, selectedExam });
	};

	render() {
		return (
			<div className='container mt-5'>
				<Paper className='p-3 mb-2 d-flex align-items-center' elevation={3}>
					<Book fontSize='large' />
					<span className={`${classes.conductedExamsHeading}`}>
						Conducted Exams
					</span>
				</Paper>
				{this.state.conductedExamsList.map((data, index) => (
					<div className='row mb-5' key={index}>
						{data.map((exam) => (
							<div className='col-md-4' key={exam._id}>
								<ExamCard exam={exam} type='conducted' />
							</div>
						))}
					</div>
				))}
				<Paper className='p-3 mb-2 d-flex align-items-center' elevation={3}>
					<Book fontSize='large' />
					<span className={`${classes.conductedExamsHeading}`}>
						Today's Exam
					</span>
				</Paper>
				{this.state.todayExamsList.map((data, index) => (
					<div className='row mb-5' key={index}>
						{data.map((exam) => (
							<div className='col-md-4' key={exam._id}>
								<ExamCard
									exam={exam}
									type='today'
									handleModal={this.handleModal}
								/>
							</div>
						))}
					</div>
				))}
				<Paper className='p-3 mb-2 d-flex align-items-center' elevation={3}>
					<Book fontSize='large' />
					<span className={`${classes.conductedExamsHeading}`}>
						Upcoming Exam
					</span>
				</Paper>
				{this.state.upcomingExamsList.map((data, index) => (
					<div className='row mb-5' key={index}>
						{data.map((exam) => (
							<div className='col-md-4' key={exam._id}>
								<ExamCard exam={exam} type='upcoming' />
							</div>
						))}
					</div>
				))}
				<Examkey
					selectedExam={this.state.selectedExam}
					open={this.state.showModal}
					handleClose={this.handleModal}
					{...this.props}
				/>
			</div>
		);
	}
}

export default ExamList;
