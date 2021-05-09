import React from 'react';
import {
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Typography,
	FormControlLabel,
	Radio,
	Checkbox,
	CardActions,
	IconButton,
	Button,
} from '@material-ui/core';
import { Edit, DeleteForever } from '@material-ui/icons';

import QuestionService from '../../../../../services/questionApi';
import styles from '../question.module.css';
import DeleteModal from '../../../../../modals/deleteModal';

class ViewQuestions extends React.Component {
	constructor(props) {
		super(props);
		this.questionService = new QuestionService();
		this.state = {
			questionList: [],
			deleteModal: { show: false, id: '' },
		};
	}

	componentDidMount() {
		let examId = this.props.match.params.examId;
		let queryType = 'all';
		this.questionService.getAll(examId, queryType).then((response) => {
			this.setState({
				questionList: response.data,
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

	showOptions = (options, correctAnswer, optionType) => {
		let rows = [...Array(Math.ceil(options.length / 2))];
		let optionRows = rows.map((row, index) =>
			options.slice(index * 2, index * 2 + 2)
		);
		// if (optionType !== 'single') {
		// 	correctAnswer = correctAnswer.split(',');
		// }
		let content = optionRows.map((row, index) => (
			<div className='row' key={index}>
				{row.map((option) => (
					<div key={option._id} className='col-md-6 py-2'>
						<div
							className={`border border-dark px-2 rounded ${styles.optionShadow}`}
						>
							<FormControlLabel
								control={
									optionType === 'single' ? (
										<Radio checked={option.name === correctAnswer} />
									) : (
										<Checkbox checked={correctAnswer.includes(option.name)} />
									)
								}
								label={option.value}
								value={option.value}
							/>
						</div>
					</div>
				))}
			</div>
		));
		return <div className='container'>{content}</div>;
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
		let questions = this.state.questionList.map((data, index) => {
			let optionContent = this.showOptions(
				data.options,
				data.correctAnswer,
				data.optionType
			);
			return (
				<div>
					<Card key={data._id} className='mb-2 w-75 mx-auto'>
						<CardActionArea>
							<CardMedia
								className={styles.cardImageHeight}
								image={
									data.image === null
										? 'https://directory.bodc.in/images/parish/parish_details/No_Image_Available.jpg'
										: `${process.env.REACT_APP_BASE_URL}/api/image/${data.image}`
								}
							/>
							<CardContent>
								<Typography
									gutterBottom
									variant='h5'
									component='h2'
								>{`Question ${index + 1}`}</Typography>
								<Typography
									variant='body2'
									color='textSecondary'
									component='pre'
									className={`mb-2 ${styles.questionSize}`}
								>
									{data.question}
								</Typography>
								{optionContent}
							</CardContent>
							<CardActions disableSpacing>
								<IconButton>
									<Edit />
								</IconButton>
								<IconButton
									onClick={() => this.handleDeleteDialog(true, data._id)}
								>
									<DeleteForever />
								</IconButton>
							</CardActions>
						</CardActionArea>
					</Card>
				</div>
			);
		});
		return (
			<div className='container pt-5'>
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
