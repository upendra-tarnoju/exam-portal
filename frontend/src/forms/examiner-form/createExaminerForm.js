import React from 'react';
import { Button, TextField } from '@material-ui/core';
import { Formik } from 'formik';

import schema from '../../schema/examiner/examinerSchema';

const CreateExaminerForm = (props) => {
	return (
		<Formik
			onSubmit={(values) => props.handleSubmit(values)}
			validationSchema={schema}
			initialValues={{
				firstName: '',
				lastName: '',
				email: '',
				mobileNumber: '',
			}}
		>
			{(formikProps) => (
				<form onSubmit={formikProps.handleSubmit}>
					<div className='container'>
						<div className='row mt-3'>
							<div className='col-md-6'>
								<TextField
									variant='outlined'
									className='w-100'
									name='firstName'
									label='First name'
									value={formikProps.values.firstName}
									onChange={formikProps.handleChange}
									onBlur={formikProps.handleBlur}
									error={
										formikProps.touched.firstName &&
										!!formikProps.errors.firstName
									}
									helperText={
										formikProps.touched.firstName &&
										formikProps.errors.firstName
									}
								/>
							</div>
							<div className='col-md-6'>
								<TextField
									variant='outlined'
									className='w-100'
									name='lastName'
									label='Last name'
									value={formikProps.values.lastName}
									onChange={formikProps.handleChange}
									onBlur={formikProps.handleBlur}
									error={
										formikProps.touched.lastName &&
										!!formikProps.errors.lastName
									}
									helperText={
										formikProps.touched.lastName && formikProps.errors.lastName
									}
								/>
							</div>
						</div>
						<TextField
							variant='outlined'
							className='w-100 mt-3'
							name='mobileNumber'
							label='Mobile number'
							value={formikProps.values.mobileNumber}
							onChange={(event) => {
								let regex = /^[0-9\b]+$/;
								if (
									regex.test(event.target.value) ||
									event.target.value === ''
								) {
									formikProps.setFieldValue('mobileNumber', event.target.value);
								}
							}}
							onBlur={formikProps.handleBlur}
							error={
								formikProps.touched.mobileNumber &&
								!!formikProps.errors.mobileNumber
							}
							helperText={
								formikProps.touched.mobileNumber &&
								formikProps.errors.mobileNumber
							}
						/>
						<TextField
							variant='outlined'
							className='w-100 mt-3'
							name='email'
							label='Email'
							value={formikProps.values.email}
							onChange={formikProps.handleChange}
							onBlur={formikProps.handleBlur}
							error={formikProps.touched.email && !!formikProps.errors.email}
							helperText={formikProps.touched.email && formikProps.errors.email}
						/>
						<div className='d-flex justify-content-end mt-3'>
							<Button
								type='submit'
								variant='contained'
								className='bg-dark text-white'
							>
								Request
							</Button>
						</div>
					</div>
				</form>
			)}
		</Formik>
	);
};

export default CreateExaminerForm;
