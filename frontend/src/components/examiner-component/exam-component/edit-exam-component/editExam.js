import React from 'react';
import {
	Card,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Typography,
} from '@material-ui/core';
import { Details, Lock, MoreHoriz, Phone, Timer } from '@material-ui/icons';

import ExamService from '../../../../services/examApi';
import ExamDetailsForm from '../../../../forms/exam-form/edit-exam-form/examDetailsForm';
import ExamMarksForm from '../../../../forms/exam-form/edit-exam-form/examMarksForm';
import ExamTimeForm from '../../../../forms/exam-form/edit-exam-form/examTimeForm';
import ExamPasswordForm from '../../../../forms/exam-form/edit-exam-form/examPasswordForm';
import CustomSnackBar from '../../../../common/customSnackbar';
import ExamOtherSettingsForm from '../../../../forms/exam-form/edit-exam-form/examOtherSettingsForm';

class EditExam extends React.Component {
	constructor() {
		super();
		this.state = {
			activeTab: 0,
			coursesList: [],
			exam: {},
			snackbar: { show: false, msg: '', type: '' },
		};
		this.examService = new ExamService();
	}

	componentDidMount() {
		let examId = this.props.match.params.examId;
		this.examService.getParticularExam(examId).then((res) => {
			let response = res.data;
			this.setState({
				exam: {
					...response.examDetails,
					course: response.examDetails.course._id,
					duration: response.examDetails.duration
						? response.examDetails.duration
						: '',
					examDate: new Date(response.examDetails.examDate),
					startTime: new Date(response.examDetails.startTime).toString(),
					endTime: new Date(response.examDetails.endTime).toString(),
				},
				coursesList: response.coursesList,
			});
		});
	}

	handleSnackBar = (status, msg, type) => {
		let { snackbar } = this.state;
		if (type === undefined) type = snackbar.type;

		this.setState({
			snackbar: {
				show: status,
				msg: msg,
				type: type,
			},
		});
	};

	updateExamDetails = (data) => {
		let examId = this.props.match.params.examId;

		if (data.startTime && data.endTime) {
			if (data.startTime === data.endTime) {
				let msg = 'Start time cannot be equal to end time';
				this.handleSnackBar(true, msg, 'error');
				return;
			}
		}

		this.examService
			.updateExam(examId, data)
			.then((response) => {
				this.handleSnackBar(true, response.data.msg, 'success');
				this.setState({
					exam: {
						...response.data.examDetails,
						hideDuration:
							response.data.examDetails.durationStatus === 'COMPLETE',
					},
				});
			})
			.catch((error) => {
				this.handleSnackBar(true, error.response.data.msg, 'error');
			});
	};

	handleTabChange = (newValue) => {
		this.setState({ activeTab: newValue });
	};

	render() {
		let { activeTab, coursesList, exam, snackbar } = this.state;
		return (
			<div className='container py-5 px-4'>
				<Card className='p-3 mb-4'>
					<div className='d-xs-block d-md-flex justify-content-between'>
						<div>
							<Typography variant='h4'>Edit exam</Typography>
							<Typography variant='subtitle1'>
								Change your exam settings
							</Typography>
						</div>
					</div>
				</Card>
				<Card style={{ height: '430px' }}>
					<div className='container'>
						<div className='row'>
							<div className='col-md-4'>
								<List component='nav'>
									<ListItem
										selected={activeTab === 0}
										button
										onClick={() => this.handleTabChange(0)}
									>
										<ListItemIcon>
											<Details />
										</ListItemIcon>
										<ListItemText primary='Exam details' />
									</ListItem>
									<ListItem
										selected={activeTab === 1}
										button
										onClick={() => this.handleTabChange(1)}
									>
										<ListItemIcon>
											<Phone />
										</ListItemIcon>
										<ListItemText primary='Marks' />
									</ListItem>
									<ListItem
										selected={activeTab === 2}
										button
										onClick={() => this.handleTabChange(2)}
									>
										<ListItemIcon>
											<Timer />
										</ListItemIcon>
										<ListItemText primary='Time period' />
									</ListItem>
									<ListItem
										selected={activeTab === 3}
										button
										onClick={() => this.handleTabChange(3)}
									>
										<ListItemIcon>
											<Lock />
										</ListItemIcon>
										<ListItemText
											selected={activeTab === 4}
											primary='Password'
										/>
									</ListItem>
									<ListItem
										selected={activeTab === 4}
										button
										onClick={() => this.handleTabChange(4)}
									>
										<ListItemIcon>
											<MoreHoriz />
										</ListItemIcon>
										<ListItemText selected={activeTab === 4} primary='Other' />
									</ListItem>
								</List>
							</div>
							<div className='col-md-8'>
								{activeTab === 0 ? (
									<ExamDetailsForm
										examDetails={exam}
										coursesList={coursesList}
										handleSubmit={this.updateExamDetails}
									/>
								) : activeTab === 1 ? (
									<ExamMarksForm
										examDetails={exam}
										handleSubmit={this.updateExamDetails}
									/>
								) : activeTab === 2 ? (
									<ExamTimeForm
										examDetails={exam}
										handleSubmit={this.updateExamDetails}
									/>
								) : activeTab === 3 ? (
									<ExamPasswordForm
										examDetails={exam}
										handleSubmit={this.updateExamDetails}
									/>
								) : activeTab === 4 ? (
									<ExamOtherSettingsForm
										examDetails={exam}
										handleSubmit={this.updateExamDetails}
									/>
								) : null}
							</div>
						</div>
					</div>
					<CustomSnackBar
						show={snackbar.show}
						snackBarType={snackbar.type}
						handleSnackBar={this.handleSnackBar}
						message={snackbar.msg}
					/>
				</Card>
			</div>
		);
	}
}

export default EditExam;
