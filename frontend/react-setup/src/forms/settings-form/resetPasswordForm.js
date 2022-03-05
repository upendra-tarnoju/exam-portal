import React from 'react';
import { Formik } from 'formik';
import { TextField, Typography, makeStyles, Button } from '@material-ui/core';

import schema from '../../schema/exam/edit-exam/examPasswordSchema';

const useStyles = makeStyles((theme) => ({
	heading: {
		fontSize: 26,
		marginBottom: 10,
	},

	textFieldContainer: {
		width: '100%',
	},
	textFieldLabel: {
		fontSize: 15,
		marginBottom: 3,
	},
}));

const ResetPasswordForm = (props) => {
	const classes = useStyles();
	return (
		<Formik
			validationSchema={schema}
			enableReinitialize
			initialValues={{
				newPassword: '',
				confirmPassword: '',
			}}
			onSubmit={(values) => {
				props.resetPassword(values);
			}}
		>
			{(formikProps) => (
				<form onSubmit={formikProps.handleSubmit}>
					<div className='px-5'>
						<Typography className={classes.heading}>Reset Password</Typography>
						<div className='row py-3'>
							<div className='col-md-6'>
								<div className={classes.textFieldContainer}>
									<Typography className={classes.textFieldLabel}>
										New password
									</Typography>
									<TextField
										variant='outlined'
										className='w-100'
										type='password'
										name='newPassword'
										value={formikProps.values.newPassword}
										onChange={formikProps.handleChange}
										onBlur={formikProps.handleBlur}
										error={
											formikProps.touched.newPassword &&
											!!formikProps.errors.newPassword
										}
										helperText={
											formikProps.touched.newPassword &&
											formikProps.errors.newPassword
										}
									/>
								</div>
							</div>
						</div>
						<div className='row py-3'>
							<div className='col-md-6'>
								<div className={classes.textFieldContainer}>
									<Typography className={classes.textFieldLabel}>
										Confirm password
									</Typography>
									<TextField
										variant='outlined'
										className='w-100'
										type='password'
										name='confirmPassword'
										value={formikProps.values.confirmPassword}
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
								</div>
							</div>
						</div>
						<div className='d-flex justify-content-end'>
							<Button
								variant='outlined'
								className='text-white bg-dark'
								size='large'
								type='submit'
							>
								Save
							</Button>
						</div>
					</div>
				</form>
			)}
		</Formik>
	);
};

export default ResetPasswordForm;
