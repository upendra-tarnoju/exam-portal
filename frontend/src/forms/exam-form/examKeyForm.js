import React from 'react';
import { Formik } from 'formik';
import { TextField, Button } from '@material-ui/core';

import schema from '../../schema/exam/examkeySchema';

const ExamKeyForm = (props) => {
	return (
		<Formik
			onSubmit={(values) => {
				props.handleSubmit(values);
			}}
			initialValues={{ password: '' }}
			validationSchema={schema}
		>
			{(formikProps) => (
				<form onSubmit={formikProps.handleSubmit} className='px-3'>
					<TextField
						label='Password'
						name='password'
						type='password'
						variant='outlined'
						className='w-100 my-3'
						onChange={formikProps.handleChange}
						onBlur={formikProps.handleBlur}
						value={formikProps.values.password}
						error={
							formikProps.touched.password && !!formikProps.errors.password
						}
						helperText={
							formikProps.touched.password && formikProps.errors.password
						}
					/>
					<div className='d-flex justify-content-end mt-3'>
						<Button
							onClick={() => props.hideModal()}
							variant='contained'
							className='text-dark bg-white mr-2'
							type='button'
						>
							Cancel
						</Button>
						<Button
							variant='contained'
							className='text-white bg-dark'
							type='submit'
						>
							Take test
						</Button>
					</div>
				</form>
			)}
		</Formik>
	);
};

export default ExamKeyForm;
