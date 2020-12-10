import React from 'react';
import { Button } from '@material-ui/core';
import { Formik } from 'formik';
import { Form } from 'react-bootstrap';
import Select from 'react-select';
import * as Yup from 'yup';

import factories from '../factories/factories';
import styles from '../components/examiner-component/sidebar-content-component/questions-component/question.module.css';
import initialSchema from '../schema/questionSchema';

class AddQuestionForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			schema: Yup.object().shape(initialSchema),
			correctAnswerList: [],
			totalOptions: [],
		};
	}

	initialValues = {
		question: '',
		optionType: '',
		totalOptions: '',
		option1: '',
		correctAnswer: [],
	};

	setAnswerList(value) {
		let correctAnswerList = [...Array(value)].map((_, i) => {
			return {
				label: `Option ${i + 1}`,
				value: `option${i + 1}`,
			};
		});
		return correctAnswerList;
	}

	static getDerivedStateFromProps = (nextProps, prevState) => {
		let length = 0;
		Object.keys(nextProps.questionData).forEach((value) => {
			if (!isNaN(value.slice(-1))) {
				length = length + 1;
			}
		});
		if (nextProps.editExam) {
			if (length === prevState.totalOptions.length) {
				return {
					totalOptions: factories.correctAnswerList.slice(0, length),
				};
			} else {
				return {
					totalOptions:
						prevState.totalOptions.length === 0
							? factories.correctAnswerList.slice(0, length)
							: prevState.totalOptions,
				};
			}
		}
		return null;
	};

	render() {
		let { questionData } = this.props;
		return (
			<Formik
				key={this.props.questionData.question}
				validationSchema={
					this.props.editExam
						? this.props.editQuestionSchema
						: this.state.schema
				}
				onSubmit={(values, { resetForm }) => {
					this.props.submitQuestion(values);
					resetForm({ values: '' });
					this.setState({ correctAnswerList: [], totalOptions: [] });
				}}
				initialValues={
					this.props.editExam
						? this.props.questionData
						: this.initialValues
				}
			>
				{(formikProps) => (
					<Form
						noValidate
						onSubmit={formikProps.handleSubmit}
						encType='multipart/form-data'
					>
						<div className='card-body'>
							<Form.Group>
								<Form.Label>Question</Form.Label>
								<Form.Control
									as='textarea'
									name='question'
									placeholder='Enter new question'
									value={formikProps.values.question}
									onBlur={formikProps.handleBlur}
									onChange={formikProps.handleChange}
									isInvalid={
										formikProps.touched.question &&
										formikProps.errors.question
									}
									required
								/>
								<Form.Control.Feedback type='invalid'>
									{formikProps.errors.question}
								</Form.Control.Feedback>
							</Form.Group>
							<Form.Group>
								<Form.Label>Option type</Form.Label>
								<Select
									options={factories.optionType}
									name='optionType'
									onChange={(event) => {
										formikProps.setFieldTouched('optionType', true);
										formikProps.setFieldValue('optionType', event);
									}}
									onBlur={formikProps.setFieldTouched}
									isMulti={false}
									value={formikProps.values.optionType}
								/>
								{formikProps.touched.optionType ? (
									<div className='text-danger'>
										{formikProps.errors.optionType}
									</div>
								) : null}
							</Form.Group>
							<Form.Group>
								<Form.Label className='w-100'>Image</Form.Label>
								<input
									accept='image/*'
									className='d-none'
									onChange={this.props.handleFileChange}
									id='questionImage'
									name='questionImage'
									type='file'
								/>
								<label htmlFor='questionImage'>
									<Button
										variant='contained'
										color='primary'
										component='span'
										size='large'
										className={
											typeof this.props.image === 'object'
												? styles.btnSuccess
												: null
										}
									>
										{typeof this.props.image === 'object'
											? 'Uploaded'
											: 'Upload'}
									</Button>
								</label>
							</Form.Group>
							<Form.Group>
								<Form.Label>Total Options</Form.Label>
								<Select
									options={factories.totalOptionsList}
									name='totalOptions'
									onChange={(event) => {
										formikProps.setFieldTouched('totalOptions', true);
										formikProps.setFieldValue('totalOptions', event);
										let arr = factories.correctAnswerList.slice(
											0,
											event.value
										);
										let correctAnswerList = this.setAnswerList(
											event.value
										);
										let mergedSchema = factories.setOptionValidationSchema(
											arr.length
										);
										if (this.props.editExam)
											this.props.setQuestionSchema(mergedSchema);
										this.setState({
											schema: Yup.object().shape(mergedSchema),
											totalOptions: arr,
											correctAnswerList: correctAnswerList,
										});
									}}
									onBlur={formikProps.setFieldTouched}
									isMulti={false}
									value={formikProps.values.totalOptions}
								/>
								{formikProps.touched.totalOptions ? (
									<div className='text-danger'>
										{formikProps.errors.totalOptions}
									</div>
								) : null}
							</Form.Group>

							{this.state.totalOptions.map((option, index) => (
								<Form.Group key={index}>
									<Form.Label>{option.label}</Form.Label>
									<Form.Control
										name={option.value}
										value={formikProps.values[option.value]}
										onChange={(e) => {
											let value = e.target.value;
											formikProps.setFieldTouched(
												option.value,
												true
											);
											formikProps.setFieldValue(option.value, value);
										}}
										onBlur={() => {
											formikProps.setFieldTouched(option.value);
										}}
										isInvalid={
											formikProps.touched[`option${index + 1}`] &&
											formikProps.errors[`option${index + 1}`]
										}
										required
									/>
									<Form.Control.Feedback type='invalid'>
										{formikProps.errors[`option${index + 1}`]}
									</Form.Control.Feedback>
								</Form.Group>
							))}
							{formikProps.values.optionType !== '' &&
							this.state.totalOptions.length !== 0 ? (
								<Form.Group>
									<Form.Label>Correct Answer</Form.Label>
									<Select
										options={
											this.props.editExam
												? factories.correctAnswerList.slice(
														0,
														questionData.totalOptions[0].value
												  )
												: this.state.correctAnswerList
										}
										isMulti={
											formikProps.values.optionType.value ===
											'multiple'
										}
										name='correctAnswer'
										value={formikProps.values.correctAnswer}
										onChange={(value) => {
											formikProps.setFieldValue(
												'correctAnswer',
												value
											);
										}}
										onBlur={(value) => {
											formikProps.setFieldTouched(
												'correctAnswer',
												true
											);
										}}
									/>
									{formikProps.touched.correctAnswer ? (
										<div className='text-danger'>
											{formikProps.errors.correctAnswer}
										</div>
									) : null}
								</Form.Group>
							) : null}

							<div className='d-flex justify-content-end'>
								<Button
									type='submit'
									variant='contained'
									color='primary'
									onClick={formikProps.handleSubmit}
								>
									{this.props.editExam ? 'Update' : 'Create'}
								</Button>
							</div>
						</div>
					</Form>
				)}
			</Formik>
		);
	}
}

export default AddQuestionForm;
