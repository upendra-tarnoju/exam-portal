import React from 'react';
import { Formik } from 'formik';
import { TextField, Typography, makeStyles, Button } from '@material-ui/core';

import schema from '../../schema/settings/imageStorageSchema';

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

const ImageStorageForm = (props) => {
	console.log(props.adminSettings.firebaseCredentials);
	const classes = useStyles();
	return (
		<Formik
			validationSchema={schema}
			enableReinitialize
			initialValues={{
				apiKey: props.adminSettings.firebaseCredentials
					? props.adminSettings.firebaseCredentials.apiKey
					: '',
				authDomain: props.adminSettings.firebaseCredentials
					? props.adminSettings.firebaseCredentials.authDomain
					: '',
				projectID: props.adminSettings.firebaseCredentials
					? props.adminSettings.firebaseCredentials.projectID
					: '',
				storageBucket: props.adminSettings.firebaseCredentials
					? props.adminSettings.firebaseCredentials.storageBucket
					: '',
				messageSenderID: props.adminSettings.firebaseCredentials
					? props.adminSettings.firebaseCredentials.messageSenderID
					: '',
				appId: props.adminSettings.firebaseCredentials
					? props.adminSettings.firebaseCredentials.appId
					: '',
				measurementID: props.adminSettings.firebaseCredentials
					? props.adminSettings.firebaseCredentials.measurementID
					: '',
			}}
			onSubmit={(values) => {
				props.updateSettings({ firebaseCredentials: values });
			}}
		>
			{(formikProps) => (
				<form onSubmit={formikProps.handleSubmit}>
					<div className='px-5'>
						<Typography className={classes.heading}>
							Firebase service
						</Typography>
						<div className='row py-3'>
							<div className='col-md-6'>
								<div className={classes.textFieldContainer}>
									<Typography className={classes.textFieldLabel}>
										API Key
									</Typography>
									<TextField
										variant='outlined'
										className='w-100'
										name='apiKey'
										value={formikProps.values.apiKey}
										onChange={formikProps.handleChange}
										onBlur={formikProps.handleBlur}
										error={
											formikProps.touched.apiKey && !!formikProps.errors.apiKey
										}
										helperText={
											formikProps.touched.apiKey && formikProps.errors.apiKey
										}
									/>
								</div>
							</div>
							<div className='col-md-6'>
								<div className={classes.textFieldContainer}>
									<Typography className={classes.textFieldLabel}>
										Auth Domain
									</Typography>
									<TextField
										variant='outlined'
										className='w-100'
										name='authDomain'
										value={formikProps.values.authDomain}
										onChange={formikProps.handleChange}
										onBlur={formikProps.handleBlur}
										error={
											formikProps.touched.authDomain &&
											!!formikProps.errors.authDomain
										}
										helperText={
											formikProps.touched.authDomain &&
											formikProps.errors.authDomain
										}
									/>
								</div>
							</div>
						</div>
						<div className='row py-3'>
							<div className='col-md-6'>
								<div className={classes.textFieldContainer}>
									<Typography className={classes.textFieldLabel}>
										Project ID
									</Typography>
									<TextField
										variant='outlined'
										className='w-100'
										name='projectID'
										value={formikProps.values.projectID}
										onChange={formikProps.handleChange}
										onBlur={formikProps.handleBlur}
										error={
											formikProps.touched.projectID &&
											!!formikProps.errors.projectID
										}
										helperText={
											formikProps.touched.projectID &&
											formikProps.errors.projectID
										}
									/>
								</div>
							</div>
							<div className='col-md-6'>
								<div className={classes.textFieldContainer}>
									<Typography className={classes.textFieldLabel}>
										Storage Bucket
									</Typography>
									<TextField
										variant='outlined'
										className='w-100'
										name='storageBucket'
										value={formikProps.values.storageBucket}
										onChange={formikProps.handleChange}
										onBlur={formikProps.handleBlur}
										error={
											formikProps.touched.storageBucket &&
											!!formikProps.errors.storageBucket
										}
										helperText={
											formikProps.touched.storageBucket &&
											formikProps.errors.storageBucket
										}
									/>
								</div>
							</div>
						</div>
						<div className='row py-3'>
							<div className='col-md-6'>
								<div className={classes.textFieldContainer}>
									<Typography className={classes.textFieldLabel}>
										Message Sender ID
									</Typography>
									<TextField
										variant='outlined'
										className='w-100'
										name='messageSenderID'
										value={formikProps.values.messageSenderID}
										onChange={formikProps.handleChange}
										onBlur={formikProps.handleBlur}
										error={
											formikProps.touched.messageSenderID &&
											!!formikProps.errors.messageSenderID
										}
										helperText={
											formikProps.touched.messageSenderID &&
											formikProps.errors.messageSenderID
										}
									/>
								</div>
							</div>
							<div className='col-md-6'>
								<div className={classes.textFieldContainer}>
									<Typography className={classes.textFieldLabel}>
										App ID
									</Typography>
									<TextField
										variant='outlined'
										className='w-100'
										name='appId'
										value={formikProps.values.appId}
										onChange={formikProps.handleChange}
										onBlur={formikProps.handleBlur}
										error={
											formikProps.touched.appId && !!formikProps.errors.appId
										}
										helperText={
											formikProps.touched.appId && formikProps.errors.appId
										}
									/>
								</div>
							</div>
						</div>
						<div className='row py-3'>
							<div className='col-md-6'>
								<div className={classes.textFieldContainer}>
									<Typography className={classes.textFieldLabel}>
										Measurement ID
									</Typography>
									<TextField
										variant='outlined'
										className='w-100'
										name='measurementID'
										value={formikProps.values.measurementID}
										onChange={formikProps.handleChange}
										onBlur={formikProps.handleBlur}
										error={
											formikProps.touched.measurementID &&
											!!formikProps.errors.measurementID
										}
										helperText={
											formikProps.touched.measurementID &&
											formikProps.errors.measurementID
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

export default ImageStorageForm;
