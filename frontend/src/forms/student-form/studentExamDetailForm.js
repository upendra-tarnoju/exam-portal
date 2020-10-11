import React from 'react';
import { Formik } from 'formik';
import { Form } from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import { Typeahead } from 'react-bootstrap-typeahead';
import { connect } from 'react-redux';

import schema from '../../schema/studentExamDetailsSchema';
import ExaminerService from '../../services/examinerApi';
import * as ActionTypes from '../../action';

let StudentExamDetailForm = (props) => {
	let handleBack = () => {
		props.scrollStepper(props.activeStep - 1);
	};

	let filterByCallback = (option, data) => {
		let text = data.text;
		return option.examCode.toLowerCase().indexOf(text.toLowerCase()) !== -1;
	};

	return (
		<Formik
			validationSchema={schema}
			onSubmit={(values) => {
				let studentValues = {
					...props.personalDetails,
					...props.examDetails,
				};
				studentValues.examCode = studentValues.examCode[0];
				let examinerService = new ExaminerService();
				examinerService
					.saveNewStudent(studentValues)
					.then((response) => {
						console.log('success');
						let msg = response.data.msg;
						props.resetViewStudents();
						props.handleSuccessSnackBar(true, msg);
					})
					.catch((err) => {
						console.log('error');
						let msg = err.response.data.msg;
						props.handleErrorSnackBar(true, msg);
					});
			}}
			initialValues={props.examDetails}
		>
			{({
				touched,
				values,
				errors,
				handleBlur,
				handleSubmit,
				setFieldValue,
				setFieldTouched,
			}) => (
				<Form noValidate onSubmit={handleSubmit}>
					<div className='card-body'>
						<Form.Group>
							<Form.Label>Exam code</Form.Label>
							<Typeahead
								id='typeahead'
								selected={
									props.examDetails.length === 0
										? []
										: props.examDetails.examCode
								}
								filterBy={filterByCallback}
								onBlur={(event) => setFieldTouched('examCode', true)}
								isInvalid={touched.examCode && !!errors.examCode}
								labelKey='examCode'
								placeholder='Exam code'
								options={props.examCode}
								highlightOnlyResult={true}
								onChange={(selected) => {
									if (selected.length !== 0) {
										setFieldValue('examCode', selected[0]._id);
										props.setStudentFields('examCode', selected);
									} else {
										setFieldValue('examCode', '');
										props.setStudentFields('examCode', '');
									}
								}}
								renderMenuItemChildren={(option) => (
									<div id={option._id}>{option.examCode}</div>
								)}
							/>
							{touched.examCode ? (
								<div className='d-block invalid-feedback'>
									{errors.examCode}
								</div>
							) : null}
						</Form.Group>

						<div className='row'>
							<div className='col-md-6'>
								<Form.Group>
									<Form.Label>Mobile number</Form.Label>
									<Form.Control
										type='text'
										name='mobileNumber'
										placeholder='Mobile number'
										value={values.mobileNumber}
										onBlur={handleBlur}
										onChange={(event) => {
											let value = event.target.value;
											setFieldValue('mobileNumber', value);
											props.setStudentFields('mobileNumber', value);
										}}
										isInvalid={
											touched.mobileNumber && !!errors.mobileNumber
										}
										required
									/>
									<Form.Control.Feedback type='invalid'>
										{errors.mobileNumber}
									</Form.Control.Feedback>
								</Form.Group>
							</div>
							<div className='col-md-6'>
								<Form.Group>
									<Form.Label>Date of birth</Form.Label>
									<Form.Control
										type='date'
										name='dob'
										placeholder='Date of birth'
										value={values.dob}
										onBlur={handleBlur}
										onChange={(event) => {
											let value = event.target.value;
											setFieldValue('dob', value);
											props.setStudentFields('dob', value);
										}}
										isInvalid={touched.dob && !!errors.dob}
										required
									/>
									<Form.Control.Feedback type='invalid'>
										{errors.dob}
									</Form.Control.Feedback>
								</Form.Group>
							</div>
						</div>
						<Form.Group>
							<Form.Label>Student ID</Form.Label>
							<Form.Control
								type='text'
								name='studentId'
								placeholder='Student Roll no'
								value={values.studentId}
								onBlur={handleBlur}
								onChange={(event) => {
									let value = event.target.value;
									setFieldValue('studentId', value);
									props.setStudentFields('studentId', value);
								}}
								isInvalid={touched.studentId && !!errors.studentId}
								required
							/>
							<Form.Control.Feedback type='invalid'>
								{errors.studentId}
							</Form.Control.Feedback>
						</Form.Group>
						<Form.Group>
							<Form.Label>Email Address</Form.Label>
							<Form.Control
								type='text'
								name='email'
								placeholder='Email address'
								value={values.email}
								onBlur={handleBlur}
								onChange={(event) => {
									let value = event.target.value;
									setFieldValue('email', value);
									props.setStudentFields('email', value);
								}}
								isInvalid={touched.email && !!errors.email}
								required
							/>
							<Form.Control.Feedback type='invalid'>
								{errors.email}
							</Form.Control.Feedback>
						</Form.Group>
						<Form.Group>
							<Form.Label>Password</Form.Label>
							<Form.Control
								type='password'
								name='password'
								placeholder='Password'
								value={values.password}
								onBlur={handleBlur}
								onChange={(event) => {
									let value = event.target.value;
									setFieldValue('password', value);
									props.setStudentFields('password', value);
								}}
								isInvalid={touched.password && !!errors.password}
								required
							/>
							<Form.Control.Feedback type='invalid'>
								{errors.password}
							</Form.Control.Feedback>
						</Form.Group>
					</div>
					<div className='card-footer bg-dark'>
						<div className='d-flex justify-content-end'>
							<Button
								variant='contained'
								color='primary'
								disabled={props.activeStep === 0}
								onClick={handleBack}
								className='mr-2'
							>
								Back
							</Button>
							<Button type='submit' variant='contained' color='primary'>
								Submit
							</Button>
						</div>
					</div>
				</Form>
			)}
		</Formik>
	);
};

const mapStateToProps = (state) => {
	return {
		examDetails: state.studentReducer.examDetails,
		personalDetails: state.studentReducer.personalDetails,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setStudentFields: (key, value) => {
			dispatch({
				type: ActionTypes.EXAM_DETAIL_FIELDS,
				key: key,
				value: value,
			});
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(StudentExamDetailForm);
