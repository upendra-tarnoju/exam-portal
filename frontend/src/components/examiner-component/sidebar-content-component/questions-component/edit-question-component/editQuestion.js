import React from 'react';
import { Card, Fab, Typography } from '@material-ui/core';
import { Delete } from '@material-ui/icons';

import EditQuestionForm from '../../../../../forms/question-form/editQuestionForm';
import QuestionService from '../../../../../services/questionApi';
import CustomSnackBar from '../../../../customSnackbar';

class EditQuestion extends React.Component {
	constructor() {
		super();
		this.state = {
			questionDetails: {},
			optionsList: [],
			selectedIndex: '',
			image: null,
			snackbar: { show: false, msg: '', type: '' },
		};
		this.questionService = new QuestionService();
	}

	componentDidMount() {
		let questionId = this.props.match.params.questionId;
		this.questionService.getParticular(questionId).then((res) => {
			let questionData = res.data;
			let optionsList = [];

			questionData.options.forEach((option) => {
				optionsList.push({
					key: option.key,
					value: option.value,
					answer: questionData.correctAnswer.includes(option.key),
				});
			});
			this.setState({
				questionDetails: {
					question: questionData.question,
					questionMark: questionData.questionMark,
					optionType: questionData.optionType,
					description: questionData.description,
				},
				optionsList,
			});
		});
	}

	submitQuestion = (values) => {
		let { image, optionsList } = this.state;

		let questionId = this.props.match.params.questionId;
		let examId = this.props.match.params.examId;

		let answerList = optionsList.filter((option) => option.answer);

		if (answerList.length === 0) {
			this.handleSnackBar(true, 'Select an correct option', 'error');
		} else {
			let examFormData = new FormData();

			for (let [key, value] of Object.entries(values)) {
				examFormData.append(key, value);
			}

			examFormData.append('examId', examId);

			let optionObj = {};
			for (let i = 0; i < optionsList.length; i++) {
				optionObj[optionsList[i].key] = {
					value: optionsList[i].value,
					answer: optionsList[i].answer,
				};
			}

			examFormData.append('optionsList', JSON.stringify(optionObj));
			examFormData.append('image', image);
			this.questionService.update(questionId, examFormData).then((res) => {
				this.handleSnackBar(true, res.data.msg, 'success');
			});
		}
	};

	handleCorrectAnswerChange = (index, optionType) => {
		let tempOptionsList = this.state.optionsList;

		if (optionType === 'single') {
			tempOptionsList.forEach((option, optIndex) => {
				if (optIndex === index) option.answer = true;
				else option.answer = false;
			});
		} else {
			tempOptionsList.forEach((option, optIndex) => {
				if (optIndex === index)
					if (option.answer) option.answer = false;
					else option.answer = true;
			});
		}

		this.setState({ optionsList: tempOptionsList });
	};

	removeOption = (index) => {
		let { optionsList } = this.state;
		optionsList = optionsList.filter((option, optIndex) => optIndex !== index);
		this.setState({ optionsList });
	};

	addNewQption = (formikProps) => {
		let option = formikProps.values.option;
		let { optionsList } = this.state;
		let index = optionsList.length + 1;
		optionsList.push({ key: `option${index}`, value: option, answer: false });
		this.setState({ optionsList: optionsList, optionModal: { show: false } });
		formikProps.setFieldValue('option', '');
	};

	handleSelectedIndex = (index) => {
		this.setState({
			selectedIndex: index,
		});
	};

	updateOption = (formikProps) => {
		let newOption = formikProps.values.option;
		let { optionsList, selectedIndex } = this.state;

		let tempOptionsList = optionsList.map((option, index) => {
			if (index === selectedIndex) {
				option.value = newOption;
			}
			return option;
		});

		this.setState({
			optionsList: tempOptionsList,
		});
		formikProps.setFieldValue('option', '');
	};

	handleSnackBar = (status, msg, type) => {
		this.setState({ snackbar: { show: status, msg: msg, type: type } });
	};

	render() {
		let { questionDetails, optionsList, snackbar } = this.state;
		return (
			<div className='container-fluid p-5'>
				<Card className='p-3 mb-3'>
					<div className='d-xs-block d-md-flex justify-content-between'>
						<div>
							<Typography variant='h4'>Question</Typography>
							<Typography variant='subtitle1'>Edit exam question</Typography>
						</div>
						<div className='align-self-center'>
							<Fab color='primary' aria-label='add'>
								<Delete />
							</Fab>
						</div>
					</div>
				</Card>
				<Card className='p-5'>
					<div className='w-100 mx-auto'>
						<EditQuestionForm
							questionDetails={questionDetails}
							optionsList={optionsList}
							handleCorrectAnswerChange={this.handleCorrectAnswerChange}
							removeOption={this.removeOption}
							addNewQption={this.addNewQption}
							updateOption={this.updateOption}
							handleSelectedIndex={this.handleSelectedIndex}
							handleSubmit={this.submitQuestion}
						/>
					</div>
				</Card>
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

export default EditQuestion;
