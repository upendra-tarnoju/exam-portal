import React from 'react';
import {
	Card,
	CardActionArea,
	CardContent,
	Typography,
} from '@material-ui/core';

import QuestionService from '../../../../../services/questionApi';
import AddQuestionForm from '../../../../../forms/question-form/addQuestionForm';

class AddQuestions extends React.Component {
	constructor() {
		super();
		this.state = {
			image: null,
		};
		this.questionService = new QuestionService();
	}

	handleFileChange = (event) => {
		let file = event.target.files[0];
		if (
			file.type === 'image/jpeg' ||
			file.type === 'image/png' ||
			file.type === 'image/jpg'
		) {
			this.setState({ image: file });
		} else {
			let msg =
				'Invalid image type. Supported file types are .jpeg, .jpg and .png';
			this.handleSnackBar(true, msg, 'error');
		}
	};

	removeQuestionImage = () => {
		this.setState({ image: null });
	};

	submitQuestion = (values, optionsList) => {
		let { image } = this.state;
		let answerList = optionsList.filter((option) => option.answer);

		if (answerList.length === 0) {
			this.props.handleSnackBar(true, 'Select an correct option', 'error');
		} else {
			let examFormData = new FormData();

			for (let [key, value] of Object.entries(values)) {
				examFormData.append(key, value);
			}

			examFormData.append('examId', this.props.examId);

			let optionObj = {};
			for (let i = 0; i < optionsList.length; i++) {
				optionObj[optionsList[i].key] = {
					value: optionsList[i].value,
					answer: optionsList[i].answer,
				};
			}

			examFormData.append('optionsList', JSON.stringify(optionObj));
			examFormData.append('image', image);
			return this.questionService.create(examFormData);
		}
	};

	render() {
		let { image } = this.state;
		return (
			<Card>
				<CardActionArea className='bg-dark text-white py-3 px-4'>
					<Typography variant='h5'>Add Question</Typography>
				</CardActionArea>
				<CardContent>
					<AddQuestionForm
						handleSnackBar={this.props.handleSnackBar}
						handleSubmit={this.submitQuestion}
						handleFileChange={this.handleFileChange}
						image={image}
						removeQuestionImage={this.removeQuestionImage}
					/>
				</CardContent>
			</Card>
		);
	}
}

export default AddQuestions;
