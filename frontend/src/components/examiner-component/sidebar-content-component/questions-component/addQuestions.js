import React from 'react';
import { connect } from 'react-redux';
import * as Yup from 'yup';

import styles from './question.module.css';
import QuestionService from '../../../../services/questionApi';
import * as ActionTypes from '../../../../action';
import AddQuestionForm from '../../../../forms/addQuestionForm';
import factories from '../../../../factories/factories';
import CustomSnackBar from '../../../customSnackbar';

class AddQuestions extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			image: '',
			editExam: false,
			snackbar: { show: false, msg: '', type: '' },
			deleteModal: false,
			questionData: {
				question: '',
				optionType: [],
				correctAnswer: [],
				totalOptions: [],
			},
			selectedOptionList: [],
			editQuestionSchema: {},
		};
		this.baseState = this.state;
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

	handleSnackBar = (status, msg, type) => {
		this.setState({
			snackbar: {
				show: status,
				msg: msg,
				type: type,
			},
		});
	};

	// setTotalOptions = (arr) => this.setState({ totalOptions: arr });

	setQuestionSchema = (mergedSchema) => {
		let tempState = this.state;

		let mergedSchemaOptionsCount = factories.calculateOptions(mergedSchema);
		let prevSchemaOptionsCount = factories.calculateOptions(
			tempState.questionData
		);
		if (mergedSchemaOptionsCount < prevSchemaOptionsCount) {
			for (
				let i = mergedSchemaOptionsCount + 1;
				i < factories.correctAnswerList.length;
				i++
			) {
				delete tempState.questionData[`option${i}`];
			}
		} else if (mergedSchemaOptionsCount > prevSchemaOptionsCount) {
			for (
				let i = prevSchemaOptionsCount + 1;
				i <= mergedSchemaOptionsCount;
				i++
			) {
				tempState.questionData[`option${i}`] = '';
			}
		}
		tempState.editQuestionSchema = Yup.object().shape(mergedSchema);
		this.setState(tempState);
	};

	submitQuestion = (values) => {
		let examId = this.props.match.params.examId;
		let formData = new FormData();
		if (this.state.image) {
			formData.append('image', this.state.image);
		}
		for (let key in values) {
			if (values[key] !== '') {
				if (key === 'optionType') {
					formData.append(key, values.optionType[0].value);
				} else if (key === 'correctAnswer') {
					if (values.optionType.value === 'single') {
						formData.append(key, values[key].value);
					} else {
						let correctAnswer = '';
						values.correctAnswer.forEach((element) => {
							correctAnswer = `${element.value},${correctAnswer}`;
						});
						formData.append(key, correctAnswer.slice(0, -1));
					}
				} else formData.append(key, values[key]);
			}
		}
		formData.append('examId', examId);
		if (this.state.editExam) {
			let questionId = this.props.match.params.questionId;
			this.questionService.update(questionId, formData).then((response) => {
				console.log(response.data);
			});
		} else {
			this.questionService.create(formData).then((response) => {
				this.props.addQuestion(response.data.newQuestion);
				this.setState({ questionData: {}, totalOptions: [] });
				this.handleSnackBar(true, response.data.msg, 'success');
			});
		}
	};

	setValues = (questionData) => {
		let correctAnswerArray = [];
		let optionType = factories.optionType.filter(
			(data) => data.value === questionData.optionType
		);
		let totalOptions = factories.totalOptionsList.filter(
			(obj) => obj.value == questionData.options.length
		);
		let options = {};
		let tempCorrectAnswerList = questionData.correctAnswer.split(',').sort();

		tempCorrectAnswerList.forEach((answer) => {
			correctAnswerArray.push({
				label: `Option ${answer.slice(-1)}`,
				value: `option${answer.slice(-1)}`,
			});
		});
		questionData.options.forEach((data) => {
			options[data.name] = data.value;
		});

		let schema = factories.setOptionValidationSchema(
			questionData.options.length
		);

		this.setState({
			editExam: true,
			questionData: {
				...options,
				question: questionData.question,
				optionType: optionType,
				correctAnswer: correctAnswerArray,
				totalOptions: totalOptions,
			},
			// selectedOptionList: totalOptions, // not used anywhere
			editQuestionSchema: Yup.object().shape(schema),
		});
	};

	editExam(pathname) {
		if (!pathname.endsWith('question/new') && !pathname.endsWith('exam')) {
			let questionId = pathname.split('/question/')[1];
			this.questionService.getParticular(questionId).then((response) => {
				this.setValues(response.data);
			});
		} else {
			this.setState(this.baseState);
		}
	}

	componentDidMount() {
		let pathname = this.props.match.url;
		this.editExam(pathname);
		this.props.history.listen((location) => {
			if (!location.pathname.endsWith('questions')) {
				this.editExam(location.pathname);
			}
		});
	}

	render() {
		let { snackbar } = this.state;
		return (
			<div className={`card ${styles.questionCard}`}>
				<div
					className={`card-header text-center ${styles.questionHeader} bg-dark text-white`}
				>
					{this.state.editExam ? 'Edit Question' : 'Add Question'}
				</div>
				<AddQuestionForm
					submitQuestion={this.submitQuestion}
					handleFileChange={this.handleFileChange}
					editExam={this.state.editExam}
					questionData={this.state.questionData}
					setQuestionSchema={this.setQuestionSchema}
					image={this.state.image}
					editQuestionSchema={this.state.editQuestionSchema}
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
