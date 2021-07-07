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
				<form onSubmit={formikProps.handleSubmit}>
					<div className='p-3 mb-3'>
						<TextField
							label='Password'
							name='password'
							type='password'
							variant='outlined'
							className='w-100'
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
					</div>
					<div className='d-flex justify-content-end py-3 bg-dark'>
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
							className='text-white bg-secondary mr-2'
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
