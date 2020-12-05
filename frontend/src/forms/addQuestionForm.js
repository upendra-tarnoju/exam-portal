import React from 'react';
import { Button } from '@material-ui/core';
import { Formik } from 'formik';
import { Form } from 'react-bootstrap';
import Select from 'react-select';
import * as Yup from 'yup';

const AddQuestionForm = (props) => {
	let initialSchema = {
		question: Yup.string().required('Question is required'),
		optionType: Yup.string().required('Option Type is required'),
		totalOptions: Yup.string().required('Total Option is required'),
		correctAnswer: Yup.array()
			.min(1, 'Correct Answer is required')
			.of(
				Yup.object()
					.shape({
						label: Yup.string(),
						value: Yup.string(),
					})
					.nullable()
			)
			.nullable(),
	};

	let [totalOptions, setTotalOptions] = React.useState([]);
	let [correctAnswerList, setAnswerList] = React.useState([]);
	let [validationSchema, setValidationSchema] = React.useState(
		Yup.object(initialSchema)
	);

	let optionType = [
		{ value: 'single', label: 'Single' },
		{ value: 'multiple', label: 'Multiple' },
	];

	let totalOptionsList = [
		{ value: 1, label: '1' },
		{ value: 2, label: '2' },
		{ value: 3, label: '3' },
		{ value: 4, label: '4' },
		{ value: 5, label: '5' },
		{ value: 6, label: '6' },
	];

	let setOptionValidationSchema = (totalOptions) => {
		let customSchema = {};
		for (let i = 0; i < totalOptions; i++) {
			customSchema[`option${i + 1}`] = Yup.string().required(
				'Option is required'
			);
		}
		let mergedSchema = { ...customSchema, ...initialSchema };
		setValidationSchema(Yup.object(mergedSchema));
	};

	return (
		<Formik
			validationSchema={validationSchema}
			onSubmit={(values) => {
				console.log(values);
			}}
			initialValues={{
				question: '',
				optionType: '',
				totalOptions: '',
				option1: '',
				option2: '',
				option3: '',
				option4: '',
				option5: '',
				option6: '',
				correctAnswer: [],
			}}
		>
			{(formikProps) => (
				<Form noValidate onSubmit={formikProps.handleSubmit}>
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
								options={optionType}
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
								onChange={props.handleFileChange}
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
								>
									Upload
								</Button>
							</label>
						</Form.Group>
						<Form.Group>
							<Form.Label>Total Options</Form.Label>
							<Select
								options={totalOptionsList}
								name='totalOptions'
								onChange={(event) => {
									formikProps.setFieldTouched('totalOptions', true);
									formikProps.setFieldValue('totalOptions', event);
									let arr = new Array(event.value).fill('');
									let correctAnswerList = [...Array(event.value)].map(
										(_, i) => {
											return {
												label: `Option ${i + 1}`,
												value: `option${i + 1}`,
											};
										}
									);
									setTotalOptions(arr);
									setAnswerList(correctAnswerList);
									setOptionValidationSchema(event.value);
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

						{totalOptions.map((option, index) => (
							<Form.Group>
								<Form.Label>Option {index + 1}</Form.Label>
								<Form.Control
									name={`option${index + 1}`}
									value={formikProps.values[`option${index + 1}`]}
									onChange={(e) => {
										let value = e.target.value;
										formikProps.setFieldTouched(
											`option${index + 1}`,
											true
										);
										formikProps.setFieldValue(
											`option${index + 1}`,
											value
										);
									}}
									onBlur={() => {
										formikProps.setFieldTouched(`option${index + 1}`);
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
						totalOptions.length !== 0 ? (
							<Form.Group>
								<Form.Label>Correct Answer</Form.Label>
								<Select
									options={correctAnswerList}
									isMulti={
										formikProps.values.optionType.value === 'multiple'
									}
									name='correctAnswer'
									value={formikProps.values.correctAnswer}
									onChange={(value) => {
										formikProps.setFieldValue('correctAnswer', value);
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
							<Button type='submit' variant='contained' color='primary'>
								Create
							</Button>
						</div>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default AddQuestionForm;
