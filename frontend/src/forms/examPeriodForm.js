import { Formik } from 'formik';
import React from 'react';
import { Form } from 'react-bootstrap';
import Button from '@material-ui/core/Button';

import schema from '../schema/examPeriodSchema';

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
				examDate: `${curr.getFullYear()}-${(
					'0' +
					(curr.getMonth() + 1)
				).slice(-2)}-${('0' + curr.getDate()).slice(-2)}`,
				startTime: `${('0' + curr.getHours()).slice(-2)}:${(
					'0' + curr.getMinutes()
				).slice(-2)}`,
				endTime: `${('0' + (curr.getHours() + 3)).slice(-2)}:${(
					'0' + curr.getMinutes()
				).slice(-2)}`,
				duration: '',
				hideDuration: false,
			}}
		>
			{({
				values,
				errors,
				touched,
				handleChange,
				handleSubmit,
				handleBlur,
			}) => (
				<Form noValidate onSubmit={handleSubmit}>
					<Form.Group>
						<Form.Label>Total marks</Form.Label>
						<Form.Control
							type='text'
							name='totalMarks'
							placeholder='Total marks'
							value={values.totalMarks}
							onChange={handleChange}
							onBlur={handleBlur}
							isInvalid={touched.totalMarks && !!errors.totalMarks}
							required
						/>
						<Form.Control.Feedback type='invalid'>
							{errors.totalMarks}
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group>
						<Form.Label>Passing marks</Form.Label>
						<Form.Control
							type='text'
							name='passingMarks'
							placeholder='Passing marks'
							value={values.passingMarks}
							onChange={handleChange}
							onBlur={handleBlur}
							isInvalid={touched.passingMarks && !!errors.passingMarks}
							required
						/>
						<Form.Control.Feedback type='invalid'>
							{errors.passingMarks}
						</Form.Control.Feedback>
					</Form.Group>
					<div className='row'>
						<div className='col-md-4'>
							<Form.Group>
								<Form.Label>Exam date</Form.Label>
								<Form.Control
									name='examDate'
									type='date'
									onChange={handleChange}
									value={values.examDate}
									onBlur={handleBlur}
									isInvalid={touched.examDate && !!errors.examDate}
									required
								/>
								<Form.Control.Feedback type='invalid'>
									{errors.examDate}
								</Form.Control.Feedback>
							</Form.Group>
						</div>
						<div className='col-md-4'>
							<Form.Group>
								<Form.Label>Start time</Form.Label>
								<Form.Control
									name='startTime'
									type='time'
									onChange={handleChange}
									value={values.startTime}
									onBlur={handleBlur}
									isInvalid={touched.startTime && !!errors.startTime}
									required
								/>
								<Form.Control.Feedback type='invalid'>
									{errors.startTime}
								</Form.Control.Feedback>
							</Form.Group>
						</div>
						<div className='col-md-4'>
							<Form.Group>
								<Form.Label>End time</Form.Label>
								<Form.Control
									name='endTime'
									type='time'
									onChange={handleChange}
									value={values.endTime}
									onBlur={handleBlur}
									isInvalid={touched.endTime && !!errors.endTime}
									required
								/>
								<Form.Control.Feedback type='invalid'>
									{errors.endTime}
								</Form.Control.Feedback>
							</Form.Group>
						</div>
					</div>
					<Form.Group>
						<Form.Check
							name='hideDuration'
							label='Do you want to have exam duration to be same as difference
                     between start time and end time ?'
							onChange={handleChange}
						/>
					</Form.Group>
					{values.hideDuration === true ? null : (
						<Form.Group>
							<Form.Label>Exam duration</Form.Label>
							<Form.Control
								name='duration'
								type='text'
								onChange={handleChange}
								value={values.duration}
								onBlur={handleBlur}
								isInvalid={touched.duration && !!errors.duration}
								required
							/>
							<Form.Control.Feedback type='invalid'>
								{errors.duration}
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
