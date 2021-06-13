import React from 'react';
import { Paper, Tabs, Tab, Box } from '@material-ui/core';

import ExamCard from './examCard';
import StudentService from '../../../../services/studentApi';
import ExamKeyModal from '../../../../modals/examKeyModal';
import factories from '../../../../factories/factories';

const TabPanel = (props) => {
	const { children, value, index, ...other } = props;

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && <Box>{children}</Box>}
		</div>
	);
};

const a11yProps = (index) => {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
};

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
		console.log(showModal, selectedExam);
		this.setState({ showModal, selectedExam });
	};

	handleTabChange = (event, value) => {
		this.setState({ activeTab: value });
	};

	validateExamKey = (values) => {
		let { selectedExam } = this.state;

		this.studentService
			.validateExamKey({ examId: selectedExam, password: values.password })
			.then((res) => {
				let data = res.data.examDetails;

				this.props.history.push({
					pathname: `/exam/${selectedExam}/guidelines`,
					state: {
						totalMarks: data.totalMarks,
						negativeMarks: data.negativeMarks,
						subject: data.subject,
						duration: data.duration
							? `${data.duration} min`
							: factories.formatDuration(data.startTime, data.endTime),
					},
				});
			});
	};

	render() {
		let {
			todayExamsList,
			conductedExamsList,
			upcomingExamsList,
			showModal,
			activeTab,
		} = this.state;

		return (
			<div className='container p-5'>
				<Paper>
					<Tabs
						value={activeTab}
						onChange={this.handleTabChange}
						indicatorColor='primary'
						textColor='primary'
						centered
					>
						<Tab label='Conducted' {...a11yProps(0)} />
						<Tab label='Today' {...a11yProps(1)} />
						<Tab label='Upcoming' {...a11yProps(2)} />
					</Tabs>
				</Paper>
				<TabPanel value={activeTab} index={0}>
					{conductedExamsList.map((data, index) => (
						<div className='row my-4' key={index}>
							{data.map((exam) => (
								<div className='col-md-4' key={exam._id}>
									<ExamCard exam={exam} type='conducted' />
								</div>
							))}
						</div>
					))}
				</TabPanel>
				<TabPanel value={activeTab} index={1}>
					{todayExamsList.map((data, index) => (
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
					))}
				</TabPanel>
				<TabPanel value={activeTab} index={2}>
					{upcomingExamsList.map((data, index) => (
						<div className='row my-4' key={index}>
							{data.map((exam) => (
								<div className='col-md-4' key={exam._id}>
									<ExamCard exam={exam} type='upcoming' />
								</div>
							))}
						</div>
					))}
				</TabPanel>
				<ExamKeyModal
					show={showModal}
					hideModal={this.handleModal}
					handleSubmit={this.validateExamKey}
				/>
			</div>
		);
	}
}

export default ExamList;
