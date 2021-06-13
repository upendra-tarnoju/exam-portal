import React from 'react';
import { Typography, Paper, Tabs, Tab, Box } from '@material-ui/core';

import ExamCard from './examCard';
import Examkey from './examKey';
import StudentService from '../../../../services/studentApi';

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
			{value === index && (
				<Box p={3}>
					<Typography>{children}</Typography>
				</Box>
			)}
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
			activeTab: 0,
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

	handleTabChange = (event, value) => {
		this.setState({ activeTab: value });
	};

	render() {
		let {
			todayExamsList,
			conductedExamsList,
			upcomingExamsList,
			selectedExam,
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
										handleModal={this.handleModal}
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
				<Examkey
					selectedExam={selectedExam}
					open={showModal}
					handleClose={this.handleModal}
					{...this.props}
				/>
			</div>
		);
	}
}

export default ExamList;
