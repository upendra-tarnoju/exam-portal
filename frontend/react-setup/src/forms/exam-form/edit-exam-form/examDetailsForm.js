import React from 'react';
import { Formik } from 'formik';
import {
	Button,
	FormControl,
	FormHelperText,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
} from '@material-ui/core';
import { Form } from 'react-bootstrap';

import schema from '../../../schema/exam/edit-exam/examDetailsSchema';

const ExamDetailsForm = (props) => {
	return (
		<Formik
			enableReinitialize
			validationSchema={schema}
			onSubmit={(values) => props.handleSubmit(values)}
			initialValues={{
				course: props.examDetails.course,
				examCode: props.examDetails.examCode,
				subject: props.examDetails.subject,
			}}
		>
			{(formikProps) => (
				<Form className='mt-3' onSubmit={formikProps.handleSubmit}>
					<Typography variant='h6' className='mb-3' component='p'>
						Update exam details
					</Typography>
					<FormControl variant='outlined' className='w-100'>
						<InputLabel>Course</InputLabel>
						<Select
							value={formikProps.values.course || ''}
							onChange={formikProps.handleChange}
							onBlur={formikProps.handleBlur}
							error={formikProps.touched.course && !!formikProps.errors.course}
							label='Course'
							inputProps={{
								name: 'course',
								id: 'outlined-age-native-simple',
							}}
						>
							{props.coursesList.map((course) => {
								return (
									<MenuItem key={course._id} value={course._id}>
										{`${course.courseId.name} - ${course.description}`}
									</MenuItem>
								);
							})}
						</Select>
						<FormHelperText className='text-danger'>
							{formikProps.touched.course && formikProps.errors.course}
						</FormHelperText>
					</FormControl>
					<TextField
						variant='outlined'
						className='w-100 mt-3'
						name='examCode'
						label='Exam Code'
						value={formikProps.values.examCode || ''}
						onChange={formikProps.handleChange}
						onBlur={formikProps.handleBlur}
						error={
							formikProps.touched.examCode && !!formikProps.errors.examCode
						}
						helperText={
							formikProps.touched.examCode && formikProps.errors.examCode
						}
					/>
					<TextField
						variant='outlined'
						className='w-100 mt-3'
						name='subject'
						label='Subject'
						value={formikProps.values.subject || ''}
						onChange={formikProps.handleChange}
						onBlur={formikProps.handleBlur}
						error={formikProps.touched.subject && !!formikProps.errors.subject}
						helperText={
							formikProps.touched.subject && formikProps.errors.subject
						}
					/>
					<Button
						variant='outlined'
						size='large'
						className='text-white bg-dark my-3'
						type='submit'
					>
						Change
					</Button>
				</Form>
			)}
		</Formik>
	);
};

export default ExamDetailsForm;
