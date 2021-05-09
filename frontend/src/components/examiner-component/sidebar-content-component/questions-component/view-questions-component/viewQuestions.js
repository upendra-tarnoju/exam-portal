import React from 'react';
import {
	Card,
	CardContent,
	Typography,
	CardActions,
	Button,
	Paper,
} from '@material-ui/core';
import { Add } from '@material-ui/icons';

import QuestionService from '../../../../../services/questionApi';
import styles from '../question.module.css';
import DeleteModal from '../../../../../modals/deleteModal';
import QuestionCard from './questionCard';

class ViewQuestions extends React.Component {
	constructor(props) {
		super(props);
		this.questionService = new QuestionService();
		this.state = {
			questionList: [],
			questionCount: 0,
			totalMarks: 0,
			deleteModal: { show: false, id: '' },
		};
	}

	componentDidMount() {
		let examId = this.props.match.params.examId;
		this.questionService.getAll(examId).then((response) => {
			this.setState({
				questionList: response.data.questions,
				questionCount: response.data.count,
				totalMarks: response.data.examDetails.totalMarks,
			});
		});
	}

	handleDeleteDialog = (show, id) => {
		this.setState({
			deleteModal: {
				show: show,
				id: id,
			},
		});
	};

	deleteQuestion = () => {
		let questionId = this.state.deleteModal.id;
		this.questionService.delete(questionId).then((response) => {
			let questionList = this.state.questionList.filter(
				(item) => item._id !== response.data._id
			);
			this.setState({ questionList });
			this.handleDeleteDialog(false, '');
		});
	};

	handleAddQuestion = () => {
		let examId = this.props.match.params.examId;
		this.props.history.push({
			pathname: `/examiner/exam/${examId}/question/new`,
		});
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
		let { questionCount, totalMarks, menu } = this.state;
		let questions = this.state.questionList.map((data, index) => {
			return (
				<QuestionCard
					index={index}
					questionDetails={data}
					handleDeleteDialog={this.handleDeleteDialog}
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
			</div>
		);
	}
}

export default ViewQuestions;
