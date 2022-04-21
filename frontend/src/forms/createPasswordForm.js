import React from 'react';
import { Formik } from 'formik';
import { Button, TextField } from '@material-ui/core';

import schema from '../schema/createPasswordSchema';

let CreatePasswordForm = (props) => {
	return (
		<Formik
			validationSchema={schema}
			onSubmit={(values) => props.updatePassword(values)}
			initialValues={{ new: '', confirm: '' }}
		>
			{(formikProps) => (
				<form noValidate onSubmit={formikProps.handleSubmit}>
					<div className='p-3'>
						<TextField
							variant='outlined'
							label='New password'
							type='password'
							className='mb-4'
							name='new'
							onChange={formikProps.handleChange}
							onBlur={formikProps.handleBlur}
							value={formikProps.values.new}
							helperText={formikProps.touched.new ? formikProps.errors.new : ''}
							error={formikProps.touched.new && Boolean(formikProps.errors.new)}
							fullWidth
						/>

						<TextField
							variant='outlined'
							label='Confirm password'
							type='password'
							fullWidth
							name='confirm'
							helperText={
								formikProps.touched.confirm && formikProps.errors.confirm
							}
							onChange={formikProps.handleChange}
							onBlur={formikProps.handleBlur}
							value={formikProps.values.confirm}
							error={formikProps.touched.confirm && formikProps.errors.confirm}
						/>

						<div className='d-flex justify-content-end mt-3'>
							<Button
								variant='contained'
								color='primary'
								className='bg-white text-dark mr-2'
								onClick={() => props.hideModal(false)}
							>
								Cancel
							</Button>
							<Button
								variant='contained'
								color='primary'
								type='submit'
								className='bg-dark text-white'
							>
								Change
							</Button>
						</div>
					</div>
				</form>
			)}
		</Formik>
	);
};

export default CreatePasswordForm;
