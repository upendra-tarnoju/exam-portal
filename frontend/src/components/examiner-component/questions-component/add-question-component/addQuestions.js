import React from 'react';
import {
	Card,
	CardActionArea,
	CardContent,
	Typography,
} from '@material-ui/core';
import { connect } from 'react-redux';

import QuestionService from '../../../../services/questionApi';
import AddQuestionForm from '../../../../forms/question-form/addQuestionForm';
import * as ActionTypes from '../../../../action';
import { uploadQuestionImage } from '../../../../common/uploadImage';

class AddQuestions extends React.Component {
	constructor() {
		super();
		this.state = {
			image: null,
		};
		this.questionService = new QuestionService();
	}

	handleFileChange = async (event) => {
		let file = event.target.files[0];
		if (
			file.type === 'image/jpeg' ||
			file.type === 'image/png' ||
			file.type === 'image/jpg'
		) {
			await uploadQuestionImage(file);
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
		let { examId } = this.props;
		let answerList = optionsList.filter((option) => option.answer);

		if (answerList.length === 0) {
			this.props.handleSnackBar(true, 'Select an correct option', 'error');
		} else {
			let optionObj = {};
			for (let i = 0; i < optionsList.length; i++) {
				optionObj[optionsList[i].key] = {
					value: optionsList[i].value,
					answer: optionsList[i].answer,
				};
			}

			values['examId'] = examId;
			values['optionsList'] = JSON.stringify(optionObj);
			values['image'] = image;
			return this.questionService.create(values);
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

const mapDispatchToProps = (dispatch) => {
	return {
		setQuestionImage: (image) => {
			dispatch({
				type: ActionTypes.QUESTION_IMAGE,
				image: image,
			});
		},
	};
};

export default connect(null, mapDispatchToProps)(AddQuestions);
