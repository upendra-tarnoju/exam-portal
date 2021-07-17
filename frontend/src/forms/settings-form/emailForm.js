import React from 'react';
import { Formik } from 'formik';
import { Editor } from '@tinymce/tinymce-react';
import { Typography, TextField, Button, makeStyles } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
	emailContainer: {
		border: 'solid 1px #E6E2E3',
		paddingTop: 12,
		paddingBottom: 12,
		paddingLeft: 14,
		paddingRight: 8,
	},
}));

const EmailForm = (props) => {
	const classes = useStyles();

	const addSelectiveUsers = (formikProps, userType) => {
		let emailAddress = props.emailAddressList.filter(
			(item) => item.userType === userType
		);
		formikProps.setFieldValue('emailAddress', emailAddress);
	};

	return (
		<Formik
			initialValues={{ emailAddress: [], emailBody: '', subject: '' }}
			onSubmit={(values) => props.sendEmail(values)}
		>
			{(formikProps) => (
				<form onSubmit={formikProps.handleSubmit}>
					<div className='d-flex justify-content-between mb-3'>
						<Typography className={classes.containerHeading}>
							Compose email
						</Typography>
						<div>
							<Button
								variant='outlined'
								className='align-self-center text-white bg-dark mr-2'
								onClick={() => addSelectiveUsers(formikProps, 'subAdmin')}
							>
								All sub admins
							</Button>
							<Button
								variant='outlined'
								className='align-self-center text-white bg-dark'
								onClick={() => addSelectiveUsers(formikProps, 'examiner')}
							>
								All examiners
							</Button>
						</div>
					</div>
					<div className='row mb-4'>
						<div className='col-md-1'>
							<Typography className='align-self-center mt-2'>To :</Typography>
						</div>
						<div className='col-md-7'>
							<Autocomplete
								multiple
								options={props.emailAddressList}
								getOptionLabel={(option) => option.email}
								onChange={(e, emailList) => {
									formikProps.setFieldValue('emailAddress', emailList);
								}}
								value={formikProps.values.emailAddress}
								name='emailAddress'
								renderInput={(params) => (
									<TextField
										{...params}
										variant='outlined'
										className='w-100 mt-1'
										size='small'
										name='emailAddress'
									/>
								)}
							/>
						</div>
					</div>
					<div className='row mb-4'>
						<div className='col-md-1'>
							<Typography className='align-self-center mt-2'>
								Subject :
							</Typography>
						</div>
						<div className='col-md-7'>
							<TextField
								variant='outlined'
								className='w-100 mt-1'
								name='subject'
								placeholder='Subject'
								size='small'
								value={formikProps.values.subject}
								onChange={formikProps.handleChange}
								onBlur={formikProps.handleBlur}
							/>
						</div>
					</div>
					<Editor
						value={formikProps.values.emailBody}
						apiKey={process.env.REACT_APP_EDITOR_API_KEY}
						init={{
							height: 400,
							menubar: false,
							toolbar:
								'bold italic backcolor | alignleft aligncenter ' +
								'alignright alignjustify | bullist numlist | ',
						}}
						onEditorChange={(content) => {
							formikProps.setFieldValue('emailBody', content);
						}}
					/>
					<div className='d-flex justify-content-end'>
						<Button
							type='submit'
							variant='outlined'
							className='mt-3 align-self-center text-white bg-dark'
						>
							Send
						</Button>
					</div>
				</form>
			)}
		</Formik>
	);
};

export default EmailForm;
