import React from 'react';
import { Formik } from 'formik';
import { TextField, Typography, makeStyles, Button } from '@material-ui/core';

import schema from '../../schema/settings/smtpSchema';

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

const STMPForm = (props) => {
	const classes = useStyles();
	return (
		<Formik
			validationSchema={schema}
			enableReinitialize
			initialValues={{
				smtpSenderEmail: props.adminSettings.smtpCredentials
					? props.adminSettings.smtpCredentials.smtpSenderEmail
					: '',
				smtpAPIKey: props.adminSettings.smtpCredentials
					? props.adminSettings.smtpCredentials.smtpAPIKey
					: '',
				smtpServiceName: props.adminSettings.smtpCredentials
					? props.adminSettings.smtpCredentials.smtpServiceName
					: '',
			}}
			onSubmit={(values) => {
				props.updateSettings({ smtpCredentials: values });
			}}
		>
			{(formikProps) => (
				<form onSubmit={formikProps.handleSubmit}>
					<div className='px-5'>
						<Typography className={classes.heading}>SMTP Service</Typography>
						<div className='row py-3'>
							<div className='col-md-6'>
								<div className={classes.textFieldContainer}>
									<Typography className={classes.textFieldLabel}>
										Sender email
									</Typography>
									<TextField
										variant='outlined'
										className='w-100'
										name='smtpSenderEmail'
										value={formikProps.values.smtpSenderEmail}
										onChange={formikProps.handleChange}
										onBlur={formikProps.handleBlur}
										error={
											formikProps.touched.smtpSenderEmail &&
											!!formikProps.errors.smtpSenderEmail
										}
										helperText={
											formikProps.touched.smtpSenderEmail &&
											formikProps.errors.smtpSenderEmail
										}
									/>
								</div>
							</div>
							<div className='col-md-6'>
								<div className={classes.textFieldContainer}>
									<Typography className={classes.textFieldLabel}>
										API Key
									</Typography>
									<TextField
										variant='outlined'
										className='w-100'
										name='smtpAPIKey'
										value={formikProps.values.smtpAPIKey}
										onChange={formikProps.handleChange}
										onBlur={formikProps.handleBlur}
										error={
											formikProps.touched.smtpAPIKey &&
											!!formikProps.errors.smtpAPIKey
										}
										helperText={
											formikProps.touched.smtpAPIKey &&
											formikProps.errors.smtpAPIKey
										}
									/>
								</div>
							</div>
						</div>
						<div className='row py-3'>
							<div className='col-md-6'>
								<div className={classes.textFieldContainer}>
									<Typography className={classes.textFieldLabel}>
										Service name
									</Typography>
									<TextField
										variant='outlined'
										className='w-100'
										name='smtpServiceName'
										value={formikProps.values.smtpServiceName}
										onChange={formikProps.handleChange}
										onBlur={formikProps.handleBlur}
										error={
											formikProps.touched.smtpServiceName &&
											!!formikProps.errors.smtpServiceName
										}
										helperText={
											formikProps.touched.smtpServiceName &&
											formikProps.errors.smtpServiceName
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

export default STMPForm;
