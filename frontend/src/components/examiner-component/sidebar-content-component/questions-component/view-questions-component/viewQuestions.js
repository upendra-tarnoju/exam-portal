import React from 'react';
import {
	Card,
	CardContent,
	Typography,
	CardActions,
	Button,
	Paper,
} from '@material-ui/core';

import QuestionService from '../../../../../services/questionApi';
import styles from '../question.module.css';
import DeleteModal from '../../../../../modals/deleteModal';
import QuestionCard from './questionCard';
import CustomSnackBar from '../../../../customSnackbar';
import factories from '../../../../../factories/factories';

class ViewQuestions extends React.Component {
	constructor() {
		super();
		this.questionService = new QuestionService();
		this.state = {
			questionList: [],
			questionCount: 0,
			totalMarks: 0,
			examDate: '',
			startTime: '',
			status: false,
			deleteModal: { show: false, id: '' },
			snackbar: { show: false, msg: '', type: '' },
		};
	}

	componentDidMount() {
		let examId = this.props.match.params.examId;
		this.questionService.getAll(examId).then((response) => {
			let data = response.data;
			let status = factories.verifyExamExpiry(
				data.examDetails.examDate,
				data.examDetails.startTime
			);

			this.setState({
				questionList: data.questions,
				questionCount: data.count,
				totalMarks: data.examDetails.totalMarks,
				status: status,
			});
		});
	}

	handleDeleteDialog = (show, id) => {
		let { examDate, startTime, status } = this.state;

		if (status) {
			this.setState({ deleteModal: { show: show, id: id } });
		} else {
			let msg = 'You cannot delete question from expired exam';
			this.handleSnackBar(true, msg, 'error');
		}
	};

	handleSnackBar = (status, msg, type) => {
		let { snackbar } = this.state;

		if (type === undefined) type = snackbar.type;
		this.setState({ snackbar: { show: status, msg: msg, type: type } });
	};

	deleteQuestion = () => {
		let questionId = this.state.deleteModal.id;
		this.questionService.delete(questionId).then((response) => {
			let questionList = this.state.questionList.filter(
				(item) => item._id !== response.data.question._id
			);
			this.setState({ questionList });
			this.handleDeleteDialog(false, '');
			this.handleSnackBar(true, response.data.msg, 'success');
		});
	};

	handleQuestionStatus = (event, questionId) => {
		let value = event.target.checked;
		let checked;
		let { questionList } = this.state;

		if (value) checked = 'ACTIVE';
		else checked = 'INACTIVE';

		this.questionService
			.updateQuestionStatus(questionId, { status: checked })
			.then((res) => {
				let updatedQuestionList = questionList.map((question) => {
					if (question._id === questionId) {
						question.status = checked;
					}
					return question;
				});

				this.setState({ questionList: updatedQuestionList });
				this.handleSnackBar(true, res.data.msg, 'success');
			});
	};

	handleAddQuestion = () => {
		let examId = this.props.match.params.examId;
		this.props.history.push({
			pathname: `/examiner/exam/${examId}/question/new`,
		});
	};

	editQuestion = (questionId) => {
		let { status } = this.state;

		let examId = this.props.match.params.examId;

		if (status) {
			this.props.history.push(
				`/examiner/exam/${examId}/question/${questionId}`
			);
		} else {
			let msg = 'You cannot edit question from expired exam';
			this.handleSnackBar(true, msg, 'error');
		}
	};

	noQuestionsCard = () => (
		<Card className='w-50 m-auto'>
			<CardContent>
				<p className={`${styles.heading} text-dark text-center`}>
					This exam does not contain any questions
				</p>
				<p className={`text-secondary ${styles.subHeading} text-center mb-0`}>
					Add new question
				</p>
			</CardContent>
			<CardActions className='d-flex flex-row justify-content-center'>
				<Button
					size='large'
					color='primary'
					variant='contained'
					onClick={this.handleAddQuestion}
				>
					Add
				</Button>
			</CardActions>
		</Card>
	);
	render() {
		let { questionCount, totalMarks, snackbar, status } = this.state;
		let questions = this.state.questionList.map((data, index) => {
			return (
				<QuestionCard
					index={index}
					key={index}
					questionDetails={data}
					handleDeleteDialog={this.handleDeleteDialog}
					handleQuestionStatus={this.handleQuestionStatus}
					editQuestion={this.editQuestion}
					status={status}
				/>
			);
		});
		return (
			<div className='container py-5 h-100'>
				<Card className='p-3'>
					<div className='d-flex justify-content-between'>
						<div>
							<Typography variant='h4'>Exam Questions</Typography>
							<Typography variant='subtitle1'>
								View your exam questions
							</Typography>
						</div>
						<div className='d-flex flex-row'>
							<Paper className='d-flex flex-column bg-dark px-3 pt-1 text-white'>
								<Typography variant='h6'>Total Questions</Typography>
								<Typography className='align-self-center' variant='subtitle1'>
									{questionCount}
								</Typography>
							</Paper>
							<Paper className='d-flex flex-column ml-2 bg-dark px-3 pt-1 text-white'>
								<Typography variant='h6'>Exam marks</Typography>
								<Typography className='align-self-center' variant='subtitle1'>
									{totalMarks}
								</Typography>
							</Paper>
						</div>
					</div>
				</Card>
				{questions.length !== 0 ? questions : <this.noQuestionsCard />}
				<DeleteModal
					show={this.state.deleteModal.show}
					heading='question'
					deleteContent={this.deleteQuestion}
					hideModal={this.handleDeleteDialog}
				/>
				<CustomSnackBar
					show={snackbar.show}
					snackBarType={snackbar.type}
					handleSnackBar={this.handleSnackBar}
					message={snackbar.msg}
				/>
			</div>
		);
	}
}

export default ViewQuestions;
