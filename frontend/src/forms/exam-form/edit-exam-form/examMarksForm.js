import { Formik } from 'formik';
import React from 'react';
import { Form } from 'react-bootstrap';
import {
	TextField,
	Typography,
	Button,
	MenuItem,
	Select,
	FormControl,
	InputLabel,
} from '@material-ui/core';

import schema from '../../../schema/exam/edit-exam/examMarksSchema';

const ExamMarksForm = (props) => {
	return (
		<Formik
			enableReinitialize
			validationSchema={schema}
			onSubmit={(values) => props.handleSubmit(values)}
			initialValues={{
				totalMarks: props.examDetails.totalMarks,
				passingMarks: props.examDetails.passingMarks,
				negativeMarks: props.examDetails.negativeMarks,
			}}
		>
			{(formikProps) => (
				<Form className='mt-3' onSubmit={formikProps.handleSubmit}>
					<Typography variant='h6' className='mb-3' component='p'>
						Update exam marks
					</Typography>
					<TextField
						name='totalMarks'
						label='Total marks'
						inputProps={{ maxLength: 4 }}
						className='w-100'
						variant='outlined'
						value={formikProps.values.totalMarks || ''}
						onChange={(event) => {
							let regex = /^[0-9\b]+$/;
							if (regex.test(event.target.value) || event.target.value === '') {
								formikProps.setFieldValue('totalMarks', event.target.value);
							}
						}}
						onBlur={formikProps.handleBlur}
						error={
							formikProps.touched.totalMarks && !!formikProps.errors.totalMarks
						}
						helperText={
							formikProps.touched.totalMarks && formikProps.errors.totalMarks
						}
					/>
					<TextField
						name='passingMarks'
						label='Passing marks'
						inputProps={{ maxLength: 4 }}
						className='w-100 mt-3'
						variant='outlined'
						value={formikProps.values.passingMarks || ''}
						onChange={(event) => {
							let regex = /^[0-9\b]+$/;
							if (regex.test(event.target.value) || event.target.value === '') {
								formikProps.setFieldValue('passingMarks', event.target.value);
							}
						}}
						onBlur={formikProps.handleBlur}
						error={
							formikProps.touched.passingMarks &&
							!!formikProps.errors.passingMarks
						}
						helperText={
							formikProps.touched.passingMarks &&
							formikProps.errors.passingMarks
						}
					/>
					<FormControl variant='outlined' className='mt-3 w-100'>
						<InputLabel id='exam-negative-marks'>Negative marks</InputLabel>
						<Select
							labelId='exam-negative-marks'
							id='demo-simple-select-outlined'
							onChange={formikProps.handleChange}
							onBlur={formikProps.handleBlur}
							value={formikProps.values.negativeMarks}
							label='Negative marks'
							name='negativeMarks'
							error={
								formikProps.touched.negativeMarks &&
								!!formikProps.errors.negativeMarks
							}
						>
							<MenuItem value={0}>0</MenuItem>
							<MenuItem value={1}>1</MenuItem>
							<MenuItem value={2}>2</MenuItem>
							<MenuItem value={3}>3</MenuItem>
						</Select>
					</FormControl>
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

export default ExamMarksForm;
