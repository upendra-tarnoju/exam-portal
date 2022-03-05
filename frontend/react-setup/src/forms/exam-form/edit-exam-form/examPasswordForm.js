import React from 'react';
import { Form } from 'react-bootstrap';
import { Button, TextField, Typography } from '@material-ui/core';
import { Formik } from 'formik';

import schema from '../../../schema/exam/edit-exam/examPasswordSchema';

const ExamPasswordForm = (props) => {
	return (
		<Formik
			enableReinitialize
			validationSchema={schema}
			onSubmit={(values) => props.handleSubmit(values)}
			initialValues={{ newPassword: '', confirmPassword: '' }}
		>
			{(formikProps) => (
				<Form className='mt-3' onSubmit={formikProps.handleSubmit}>
					<Typography variant='h6' className='mb-3' component='p'>
						Update exam password
					</Typography>
					<TextField
						variant='outlined'
						className='w-100 mt-3'
						type='password'
						name='newPassword'
						label='New password'
						value={formikProps.values.newPassword || ''}
						onChange={formikProps.handleChange}
						onBlur={formikProps.handleBlur}
						error={
							formikProps.touched.newPassword &&
							!!formikProps.errors.newPassword
						}
						helperText={
							formikProps.touched.newPassword && formikProps.errors.newPassword
						}
					/>
					<TextField
						variant='outlined'
						className='w-100 mt-3'
						type='password'
						name='confirmPassword'
						label='Confirm password'
						value={formikProps.values.confirmPassword || ''}
						onChange={formikProps.handleChange}
						onBlur={formikProps.handleBlur}
						error={
							formikProps.touched.confirmPassword &&
							!!formikProps.errors.confirmPassword
						}
						helperText={
							formikProps.touched.confirmPassword &&
							formikProps.errors.confirmPassword
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

export default ExamPasswordForm;
