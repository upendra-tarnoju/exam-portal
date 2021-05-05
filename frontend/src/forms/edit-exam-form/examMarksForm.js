import { Formik } from 'formik';
import React from 'react';
import { Form } from 'react-bootstrap';
import { TextField, Typography, Button } from '@material-ui/core';

import schema from '../../schema/edit-exam/examMarksSchema';

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
					<TextField
						name='negativeMarks'
						label='Negative marks'
						inputProps={{ maxLength: 4 }}
						className='w-100 mt-3'
						variant='outlined'
						value={
							formikProps.values.negativeMarks === 0
								? 0
								: formikProps.values.negativeMarks || ''
						}
						onChange={(event) => {
							let regex = /^[0-9\b]+$/;
							if (regex.test(event.target.value) || event.target.value === '') {
								formikProps.setFieldValue('negativeMarks', event.target.value);
							}
						}}
						onBlur={formikProps.handleBlur}
						error={
							formikProps.touched.negativeMarks &&
							!!formikProps.errors.negativeMarks
						}
						helperText={
							formikProps.touched.negativeMarks &&
							formikProps.errors.negativeMarks
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

export default ExamMarksForm;
