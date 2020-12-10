import { Formik } from 'formik';
import React from 'react';
import { Form } from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import Select from 'react-select';

import factories from '../factories/factories';
import schema from '../schema/examPeriodSchema';
import { FormGroup } from '@material-ui/core';

let ExamPeriodForm = (props) => {
	let curr = new Date();
	return (
		<Formik
			validationSchema={schema}
			onSubmit={(values) => {
				props.handleSubmit(values);
			}}
			initialValues={{
				totalMarks: '',
				passingMarks: '',
				examDate: factories.formatDate(curr),
				startTime: factories.formatTime(curr),
				endTime: moment(curr).add(3, 'hours').format('HH:mm'),
				duration: '',
				hideDuration: false,
				negativeMarks: '',
			}}
		>
			{(formikProps) => (
				<Form noValidate onSubmit={formikProps.handleSubmit}>
					<Form.Group>
						<Form.Label>Total marks</Form.Label>
						<Form.Control
							type='text'
							name='totalMarks'
							placeholder='Total marks'
							value={formikProps.values.totalMarks}
							onChange={formikProps.handleChange}
							onBlur={formikProps.handleBlur}
							isInvalid={
								formikProps.touched.totalMarks &&
								!!formikProps.errors.totalMarks
							}
							required
						/>
						<Form.Control.Feedback type='invalid'>
							{formikProps.errors.totalMarks}
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group>
						<Form.Label>Passing marks</Form.Label>
						<Form.Control
							type='text'
							name='passingMarks'
							placeholder='Passing marks'
							value={formikProps.values.passingMarks}
							onChange={formikProps.handleChange}
							onBlur={formikProps.handleBlur}
							isInvalid={
								formikProps.touched.passingMarks &&
								!!formikProps.errors.passingMarks
							}
							required
						/>
						<Form.Control.Feedback type='invalid'>
							{formikProps.errors.passingMarks}
						</Form.Control.Feedback>
					</Form.Group>
					<FormGroup>
						<Form.Label>Negative marks</Form.Label>
						<Select
							options={factories.negativeMarksList}
							name='negativeMarks'
							placeholder='Negative marks'
							onChange={(event) => {
								formikProps.setFieldTouched('negativeMarks', true);
								formikProps.setFieldValue('negativeMarks', event.value);
							}}
							onBlur={formikProps.setFieldTouched}
							isMulti={false}
							values={formikProps.values.negativeMarks}
						/>
						{formikProps.touched.negativeMarks ? (
							<div className='text-danger'>
								{formikProps.errors.negativeMarks}
							</div>
						) : null}
					</FormGroup>
					<div className='row'>
						<div className='col-md-4'>
							<Form.Group>
								<Form.Label>Exam date</Form.Label>
								<Form.Control
									name='examDate'
									type='date'
									onChange={formikProps.handleChange}
									value={formikProps.values.examDate}
									onBlur={formikProps.handleBlur}
									isInvalid={
										formikProps.touched.examDate &&
										!!formikProps.errors.examDate
									}
									required
								/>
								<Form.Control.Feedback type='invalid'>
									{formikProps.errors.examDate}
								</Form.Control.Feedback>
							</Form.Group>
						</div>
						<div className='col-md-4'>
							<Form.Group>
								<Form.Label>Start time</Form.Label>
								<Form.Control
									name='startTime'
									type='time'
									onChange={formikProps.handleChange}
									value={formikProps.values.startTime}
									onBlur={formikProps.handleBlur}
									isInvalid={
										formikProps.touched.startTime &&
										!!formikProps.errors.startTime
									}
									required
								/>
								<Form.Control.Feedback type='invalid'>
									{formikProps.errors.startTime}
								</Form.Control.Feedback>
							</Form.Group>
						</div>
						<div className='col-md-4'>
							<Form.Group>
								<Form.Label>End time</Form.Label>
								<Form.Control
									name='endTime'
									type='time'
									onChange={formikProps.handleChange}
									value={formikProps.values.endTime}
									onBlur={formikProps.handleBlur}
									isInvalid={
										formikProps.touched.endTime &&
										!!formikProps.errors.endTime
									}
									required
								/>
								<Form.Control.Feedback type='invalid'>
									{formikProps.errors.endTime}
								</Form.Control.Feedback>
							</Form.Group>
						</div>
					</div>
					<Form.Group>
						<Form.Check
							name='hideDuration'
							label='Do you want to have exam duration to be same as difference
                     between start time and end time ?'
							onChange={formikProps.handleChange}
						/>
					</Form.Group>
					{formikProps.values.hideDuration === true ? null : (
						<Form.Group>
							<Form.Label>Exam duration</Form.Label>
							<Form.Control
								name='duration'
								type='text'
								onChange={formikProps.handleChange}
								value={formikProps.values.duration}
								onBlur={formikProps.handleBlur}
								isInvalid={
									formikProps.touched.duration &&
									!!formikProps.errors.duration
								}
								required
							/>
							<Form.Control.Feedback type='invalid'>
								{formikProps.errors.duration}
							</Form.Control.Feedback>
						</Form.Group>
					)}
					<div className='d-flex justify-content-end'>
						<Button type='submit' variant='contained' color='primary'>
							Create
						</Button>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default ExamPeriodForm;
