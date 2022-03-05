import React from 'react';
import { Paper, Typography, withStyles } from '@material-ui/core';

import ExamCard from './examCard';
import StudentService from '../../../services/studentApi';
import ExamKeyModal from '../../../modals/examKeyModal';
import factories from '../../../factories/factories';
import Snackbar from '../../../common/customSnackbar';

const useStyles = (theme) => ({
	tabs: {
		paddingLeft: 10,
		paddingRight: 10,
		paddingTop: 5,
		paddingBottom: 5,
		cursor: 'pointer',
		borderRadius: 8,
		'&:hover': {
			backgroundColor: '#585F63',
			color: 'white',
		},
		marginLeft: 6,
	},
	activeTab: {
		backgroundColor: 'black',
		color: 'white',
	},
});

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
			activeTab: 1,
			snackbar: { show: false, msg: '', type: '' },
		};
		this.studentService = new StudentService();
	}

	handleSnackBar = (status, msg, type) => {
		let { snackbar } = this.state;
		if (type === undefined) type = snackbar.type;
		this.setState({ snackbar: { show: status, msg: msg, type: type } });
	};

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
		if (showModal !== undefined || selectedExam !== undefined) {
			this.setState({ showModal, selectedExam });
		}
	};

	handleTabChange = (value) => {
		this.setState({ activeTab: value });
	};

	validateExamKey = (values) => {
		let { selectedExam } = this.state;

		this.studentService
			.validateExamKey({ examId: selectedExam, password: values.password })
			.then((res) => {
				let data = res.data.examDetails;

				this.props.history.push({
					pathname: `/student/exam/${selectedExam}/guidelines`,
					state: {
						totalMarks: data.totalMarks,
						negativeMarks: data.negativeMarks,
						subject: data.subject,
						duration: data.duration
							? `${data.duration} min`
							: factories.formatDuration(data.startTime, data.endTime),
					},
				});
			})
			.catch((err) => {
				let msg = err.response.data.msg;
				this.handleSnackBar(true, msg, 'error');
				this.handleModal(false, '');
			});
	};

	render() {
		let {
			todayExamsList,
			conductedExamsList,
			upcomingExamsList,
			showModal,
			activeTab,
			snackbar,
		} = this.state;
		let { classes } = this.props;

		return (
			<div className='pt-4 px-3'>
				<Paper className='d-flex p-3'>
					<Typography
						className={`${classes.tabs} ${
							activeTab === 1 ? classes.activeTab : ''
						}`}
						onClick={() => this.handleTabChange(1)}
					>
						Conducted
					</Typography>
					<Typography
						className={`${classes.tabs} ${
							activeTab === 2 ? classes.activeTab : ''
						}`}
						onClick={() => this.handleTabChange(2)}
					>
						Today
					</Typography>
					<Typography
						className={`${classes.tabs} ${
							activeTab === 3 ? classes.activeTab : ''
						}`}
						onClick={() => this.handleTabChange(3)}
					>
						Upcoming
					</Typography>
					<Typography
						className={`${classes.tabs} ${
							activeTab === 4 ? classes.activeTab : ''
						}`}
						onClick={() => this.handleTabChange(4)}
					>
						Missed
					</Typography>
				</Paper>
				<div className='px-4'>
					{activeTab === 1
						? conductedExamsList.map((data, index) => (
								<div className='row my-4' key={index}>
									{data.map((exam) => (
										<div className='col-md-4' key={exam._id}>
											<ExamCard exam={exam} type='conducted' />
										</div>
									))}
								</div>
						  ))
						: null}
					{activeTab === 2
						? todayExamsList.map((data, index) => (
								<div className='row my-4' key={index}>
									{data.map((exam) => (
										<div className='col-md-4' key={exam._id}>
											<ExamCard
												exam={exam}
												type='today'
												handleModal={() =>
													this.handleModal(true, exam.examDetails._id)
												}
											/>
										</div>
									))}
								</div>
						  ))
						: null}
					{activeTab === 3
						? upcomingExamsList.map((data, index) => (
								<div className='row my-4' key={index}>
									{data.map((exam) => (
										<div className='col-md-4' key={exam._id}>
											<ExamCard exam={exam} type='upcoming' />
										</div>
									))}
								</div>
						  ))
						: null}
				</div>
				<ExamKeyModal
					show={showModal}
					hideModal={this.handleModal}
					handleSubmit={this.validateExamKey}
				/>
				<Snackbar
					show={snackbar.show}
					message={snackbar.msg}
					snackBarType={snackbar.type}
					handleSnackBar={this.handleSnackBar}
				/>
			</div>
		);
	}
}

export default withStyles(useStyles)(ExamList);
