import React from 'react';
import { Formik } from 'formik';
import { Form } from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { Typeahead } from 'react-bootstrap-typeahead';

import schema from '../schema/examDetailSchema';
import * as ActionTypes from '../action';

let ExamDetailForm = (props) => {
	let filterByCallback = (option, data) => {
		let text = data.text;
		return (
			option.description.toLowerCase().indexOf(text.toLowerCase()) !== -1 ||
			option.name.toLowerCase().indexOf(text.toLowerCase()) !== -1
		);
	};
	return (
		<Formik
			validationSchema={schema}
			onSubmit={(values) => {
				props.setFieldsValues(values);
				props.handleInputs('nextInputs', true);
			}}
			initialValues={props.fieldDetails}
		>
			{({
				values,
				errors,
				touched,
				handleChange,
				handleSubmit,
				setFieldValue,
				setFieldTouched,
			}) => (
				<Form noValidate onSubmit={handleSubmit}>
					<Form.Group>
						<Form.Label>Subject</Form.Label>
						<Form.Control
							type='text'
							name='subject'
							placeholder='Subject'
							value={values.subject}
							onChange={handleChange}
							isInvalid={touched.subject && !!errors.subject}
							required
						/>
						<Form.Control.Feedback type='invalid'>
							{errors.subject}
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group>
						<Form.Label>Course</Form.Label>
						<Typeahead
							id='typeahead'
							filterBy={filterByCallback}
							defaultSelected={props.selected}
							onChange={(selected) => {
								setFieldValue('course', selected[0].id);
							}}
							onBlur={(event) => setFieldTouched('course', true)}
							isInvalid={touched.course && !!errors.course}
							options={props.courses}
							highlightOnlyResult={true}
							labelKey='name'
							placeholder='Course name'
							renderMenuItemChildren={(option) => (
								<div>
									<div id={option.id}>
										{option.name} ( {option.description} )
									</div>
								</div>
							)}
						/>
						{touched.course ? (
							<div className='d-block invalid-feedback'>
								{errors.course}
							</div>
						) : null}
					</Form.Group>
					<Form.Group>
						<Form.Label>Exam Password</Form.Label>
						<Form.Control
							type='password'
							name='password'
							placeholder='Exam password'
							value={values.password}
							onChange={handleChange}
							isInvalid={touched.password && !!errors.password}
							required
						/>
						<Form.Control.Feedback type='invalid'>
							{errors.password}
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group>
						<Form.Label>Exam Code</Form.Label>
						<Form.Control
							type='text'
							name='examCode'
							placeholder='Course name'
							value={values.examCode}
							onChange={handleChange}
							isInvalid={touched.examCode && !!errors.examCode}
							required
						/>
						<Form.Control.Feedback type='invalid'>
							{errors.examCode}
						</Form.Control.Feedback>
					</Form.Group>
					<div className='d-flex justify-content-end'>
						<Button type='submit' variant='contained' color='primary'>
							Next
						</Button>
					</div>
				</Form>
			)}
		</Formik>
	);
};

const mapStateToProps = (state) => {
	return {
		fieldDetails: state.examReducer.examDetails,
		courses: state.examinerReducer.courses,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setFieldsValues: (values) => {
			dispatch({
				type: ActionTypes.SET_EXAM_DETAILS,
				values: values,
			});
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ExamDetailForm);
