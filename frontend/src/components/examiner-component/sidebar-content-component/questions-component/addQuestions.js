import React from 'react';

import styles from './question.module.css';
import validateInputs from '../../../../services/validation';
import QuestionService from '../../../../services/questionApi';

class AddQuestions extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			question: { value: '', error: '' },
			optionsType: { value: '', error: '' },
			options: { value: [], error: '' },
			correctAnswer: { show: false, value: [], error: '' },
			image: { value: '' },
		};
		this.baseState = this.state;
		this.handleChange = this.handleChange.bind(this);
		this.handleOptionTypeChange = this.handleOptionTypeChange.bind(this);
		this.createQuestion = this.createQuestion.bind(this);
		this.handleFileChange = this.handleFileChange.bind(this);
		this.questionService = new QuestionService();
		this.handleOptionChange = this.handleOptionChange.bind(this);
	}

	handleOptionChange(event) {
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
	}

	handleChange(event) {
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
	}

	handleOptionTypeChange(event) {
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
	}

	handleFileChange(event) {
		let file = event.target.files[0];
		this.setState({
			image: {
				value: file,
			},
		});
	}

	createQuestion(event) {
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
			this.questionService.saveQuestion(formData).then((response) => {
				this.setState(this.baseState);
			});
		}
	}

	render() {
		return (
			<div className={`card ${styles.questionCard}`}>
				<div className={`card-header text-center ${styles.questionHeader}`}>
					Add questions
				</div>
				<form onSubmit={this.createQuestion} encType='multipart/form-data'>
					<div className='card-body'>
						<div className='container'>
							<div className='form-group'>
								<label>
									Question{' '}
									{this.state.question.error ? (
										<span className='text-danger'>
											{this.state.question.error}
										</span>
									) : null}
								</label>
								<textarea
									className={`form-control ${styles.textArea}`}
									value={this.state.question.value}
									rows='2'
									name='question'
									onChange={this.handleChange}
								></textarea>
							</div>
							<div className='form-group'>
								<label>
									Option type{' '}
									{this.state.optionsType.error ? (
										<span className='text-danger'>
											{this.state.optionsType.error}
										</span>
									) : null}
								</label>
								<select
									name='optionsType'
									onChange={this.handleOptionTypeChange}
									value={this.state.optionsType.value}
									className='form-control'
								>
									<option value='none'>Select option</option>
									<option value='single'>Single</option>
									<option value='multiple'>Multiple</option>
								</select>
							</div>
							<div className='form-group'>
								<label>Image</label>
								<input
									type='file'
									onChange={this.handleFileChange}
									className='form-control-file'
									id='questionImage'
									name='questionImage'
									accept='image/*'
								/>
							</div>
							<div className='form-group'>
								<label>
									Total Options
									{this.state.optionsType.error ? (
										<span className='text-danger'>
											{this.state.options.error}
										</span>
									) : null}
								</label>
								<select
									className='form-control'
									name='options'
									value={this.state.options.value.length}
									onChange={this.handleOptionChange}
								>
									<option value='0'>Select number</option>
									<option value='1'>1</option>
									<option value='2'>2</option>
									<option value='3'>3</option>
									<option value='4'>4</option>
									<option value='5'>5</option>
									<option value='6'>6</option>
								</select>
							</div>
							{this.state.options.value.map((option, index) => {
								let key = Object.keys(option)[0];
								return (
									<div className='form-group' key={key}>
										<label>
											Option {index + 1}
											{option[key].error ? (
												<span className='text-danger'>
													{option[key].error}
												</span>
											) : null}
										</label>
										<input
											type='text'
											name={key}
											value={option.value}
											onChange={this.handleChange}
											className='form-control'
										/>
									</div>
								);
							})}
							{this.state.correctAnswer.show &&
							this.state.options.value.length !== 0 ? (
								this.state.optionsType.value === 'single' ? (
									<div className='form-group'>
										<label>
											Correct answer
											{this.state.correctAnswer.error ? (
												<span className='text-danger'>
													{this.state.correctAnswer.error}
												</span>
											) : null}
										</label>
										<select
											className='form-control'
											name='single'
											onChange={this.handleChange}
										>
											<option>Select correct option</option>
											{this.state.options.value.map(
												(option, index) => {
													let key = Object.keys(option)[0];
													return (
														<option
															key={key}
															value={`option${index + 1}`}
														>
															Option {index + 1}
														</option>
													);
												}
											)}
										</select>
									</div>
								) : (
									<div className='form-group'>
										<label>
											Correct answer
											{this.state.correctAnswer.error ? (
												<span className='text-danger'>
													{this.state.correctAnswer.error}
												</span>
											) : null}
										</label>
										<select
											multiple
											size='2'
											className='form-control'
											name='multiple'
											onChange={this.handleChange}
										>
											{this.state.options.value.map(
												(option, index) => {
													let key = Object.keys(option)[0];
													return (
														<option key={key} value={key}>
															Option {index + 1}
														</option>
													);
												}
											)}
										</select>
									</div>
								)
							) : null}
						</div>
					</div>
					<div className='card-footer'>
						<div className='d-flex justify-content-end'>
							<button type='submit' className='btn btn-primary'>
								Create
							</button>
						</div>
					</div>
				</form>
			</div>
		);
	}
}

export default AddQuestions;
