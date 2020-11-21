import React from 'react';
import { connect } from 'react-redux';

import styles from './question.module.css';
import validateInputs from '../../../../services/validation';
import QuestionService from '../../../../services/questionApi';
import * as ActionTypes from '../../../../action';
import AddQuestionForm from '../../../../forms/addQuestionForm';

class AddQuestions extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			question: { value: '', error: '' },
			optionsType: { value: '', error: '' },
			options: { value: [], error: '' },
			correctAnswer: { show: false, value: [], error: '' },
			image: { value: '' },
			editExam: false,
			snackbar: { show: false, msg: '' },
			deleteModal: false,
		};
		this.baseState = this.state;
		this.questionService = new QuestionService();
	}

	handleOptionChange = (event) => {
		let key = event.target.name;
		let value = event.target.value;
		let arr = [];
		let prevOptions = this.state.options.value;
		let size = parseInt(value, 10);
		for (let i = 0; i < size; i++) {
			let innerKey = `option${i + 1}`;
			if (prevOptions.length !== 0 && i < prevOptions.length) {
				let existingValue = prevOptions[i][innerKey].value;
				arr[i] = { [innerKey]: { value: existingValue, error: '' } };
			} else {
				arr[i] = { [innerKey]: { value: '', error: '' } };
			}
		}
		value = arr;
		this.setState((prevState) => ({
			[key]: {
				...prevState[key],
				value: value,
			},
		}));
	};

	handleChange = (event) => {
		let key = event.target.name;
		let value = event.target.value;
		let regex = /\d/g;
		let arr = [];
		if (regex.test(key)) {
			let optionNo = parseInt(key[key.length - 1], 10);
			let totalOptions = this.state.options.value;
			totalOptions[optionNo - 1][key].value = value;
			key = 'options';
			value = totalOptions;
		} else if (key === 'single') {
			arr.push(value);
			key = 'correctAnswer';
			value = arr;
		} else if (key === 'multiple') {
			let values = event.target.options;
			for (let i = 0; i < values.length; i++) {
				if (values[i].selected) {
					arr.push(values[i].value);
				}
			}
			key = 'correctAnswer';
			value = arr;
		}
		this.setState((prevState) => ({
			[key]: {
				...prevState[key],
				value: value,
			},
		}));
	};

	handleOptionTypeChange = (event) => {
		let key = event.target.name;
		let show = true;
		let value = event.target.value;
		if (value === 'none') {
			show = false;
		}
		this.setState((prevState) => ({
			correctAnswer: {
				...prevState['correctAnswer'],
				show: show,
			},
			[key]: {
				...prevState[key],
				value: value,
			},
		}));
	};

	handleFileChange = (event) => {
		let file = event.target.files[0];
		this.setState({
			image: {
				value: file,
			},
		});
	};

	handleSnackBar = (status, msg) => {
		this.setState({
			snackbar: {
				show: status,
				msg: msg,
			},
		});
	};

	submitQuestion = (event) => {
		event.preventDefault();
		let examId = this.props.match.params.examId;
		let validationState = validateInputs.createQuestionFields(this.state);
		if (validationState.error) {
			this.setState(validationState.tempState);
		} else {
			let formData = new FormData();
			for (let key in this.state) {
				if (key === 'options') {
					let jsonArray = JSON.stringify(this.state[key].value);
					formData.append(key, jsonArray);
				} else formData.append(key, this.state[key].value);
			}
			formData.append('examId', examId);
			if (this.state.editExam) {
				let questionId = this.props.match.params.questionId;
				this.questionService
					.update(questionId, formData)
					.then((response) => {
						let data = response.data;
						let questions = this.props.questions.map((element) =>
							element._id === data._id
								? Object.assign({}, element, {
										question: data.question,
								  })
								: element
						);
						this.props.updateQuestion(questions, this.props.examCode);
						this.props.history.push(
							`/examiner/exam/${response.data.examId}/question`
						);
					});
			} else {
				this.questionService.create(formData).then((response) => {
					this.props.addQuestion(response.data.newQuestion);
					this.setState(this.baseState);
					this.handleSnackBar(true, response.data.msg);
				});
			}
		}
	};

	setValues(questionData) {
		let correctAnswer = questionData.correctAnswer.split(',');

		let options = questionData.options.map((option) => {
			return { [option.name]: { value: option.value, error: '' } };
		});

		this.setState({
			question: { value: questionData.question, error: '' },
			optionsType: { value: questionData.optionType, error: '' },
			options: { value: options, error: '' },
			correctAnswer: { show: true, value: correctAnswer, error: '' },
			image: { value: '' },
		});
	}

	editExam(pathname) {
		if (!pathname.endsWith('question/new') && !pathname.endsWith('exam')) {
			let questionId = pathname.split('/question/')[1];
			this.questionService.getParticular(questionId).then((response) => {
				this.setValues(response.data);
				this.setState({ editExam: true });
			});
		} else {
			this.setState(this.baseState);
		}
	}

	componentDidMount() {
		let pathname = this.props.match.url;
		this.editExam(pathname);
		this.props.history.listen((location) => {
			this.editExam(location.pathname);
		});
	}

	render() {
		return (
			<div className={`card ${styles.questionCard}`}>
				<div
					className={`card-header text-center ${styles.questionHeader} bg-dark text-white`}
				>
					{this.state.editExam ? 'Edit Question' : 'Add Question'}
				</div>
				<AddQuestionForm
					submitQuestion={this.submitQuestion}
					state={this.state}
					handleChange={this.handleChange}
					handleOptionTypeChange={this.handleOptionTypeChange}
					handleFileChange={this.handleFileChange}
					handleOptionChange={this.handleOptionChange}
					handleSnackBar={this.handleSnackBar}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		examCode: state.examinerReducer.examCode,
		questions: state.examinerReducer.questions,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		addQuestion: (question) => {
			dispatch({
				type: ActionTypes.ADD_QUESTION,
				question: question,
			});
		},

		updateQuestion: (questions) => {
			dispatch({
				type: ActionTypes.SET_QUESTIONS,
				questions: questions,
			});
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AddQuestions);
