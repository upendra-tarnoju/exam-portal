import React from 'react';
import { Formik } from 'formik';
import { Form } from 'react-bootstrap';
import { Button } from '@material-ui/core';

import schema from '../schema/profileSchema';
import ExaminerService from '../services/examinerApi';
import SnackBar from '../common/customSnackbar';

const ProfileForm = () => {
	let [snackBar, setSnackBar] = React.useState({
		msg: '',
		type: '',
		show: false,
	});

	let closeSnackBar = (status) => {
		setSnackBar({ msg: '', type: '', show: status });
	};
	return (
		<Formik
			validationSchema={schema}
			onSubmit={(values, { resetForm }) => {
				let examinerService = new ExaminerService();
				examinerService
					.updateProfile(values)
					.then((res) => {
						setSnackBar({
							msg: res.data.msg,
							type: 'success',
							show: true,
						});
						resetForm();
					})
					.catch((error) => {
						console.log(error.response.data.msg);
						setSnackBar({
							msg: error.response.data.msg,
							type: 'error',
							show: true,
						});
					});
			}}
			initialValues={{
				currentPassword: '',
				newPassword: '',
				reTypePassword: '',
			}}
		>
			{(formikProps) => (
				<Form noValidate onSubmit={formikProps.handleSubmit}>
					<div className='card-body px-5'>
						<Form.Group>
							<Form.Label>Current Password</Form.Label>
							<Form.Control
								name='currentPassword'
								onChange={formikProps.handleChange}
								onBlur={formikProps.handleBlur}
								value={formikProps.values.currentPassword}
								type='password'
								isInvalid={
									formikProps.touched.currentPassword &&
									formikProps.errors.currentPassword
								}
								required
							/>
							<Form.Control.Feedback type='invalid'>
								{formikProps.errors.currentPassword}
							</Form.Control.Feedback>
						</Form.Group>
						<Form.Group>
							<Form.Label>New Password</Form.Label>
							<Form.Control
								name='newPassword'
								onChange={formikProps.handleChange}
								onBlur={formikProps.handleBlur}
								value={formikProps.values.newPassword}
								type='password'
								isInvalid={
									formikProps.touched.newPassword &&
									formikProps.errors.newPassword
								}
								required
							/>
							<Form.Control.Feedback type='invalid'>
								{formikProps.errors.newPassword}
							</Form.Control.Feedback>
						</Form.Group>
						<Form.Group>
							<Form.Label>Re-type new Password</Form.Label>
							<Form.Control
								name='reTypePassword'
								onChange={formikProps.handleChange}
								onBlur={formikProps.handleBlur}
								value={formikProps.values.reTypePassword}
								type='password'
								isInvalid={
									formikProps.touched.reTypePassword &&
									formikProps.errors.reTypePassword
								}
								required
							/>
							<Form.Control.Feedback type='invalid'>
								{formikProps.errors.reTypePassword}
							</Form.Control.Feedback>
						</Form.Group>
					</div>
					<div className='card-footer d-flex justify-content-end bg-dark'>
						<Button variant='contained' type='submit' color='primary'>
							Update
						</Button>
					</div>
					<SnackBar
						show={snackBar.show}
						snackBarType={snackBar.type}
						handleSnackBar={closeSnackBar}
						message={snackBar.msg}
					/>
				</Form>
			)}
		</Formik>
	);
};

export default ProfileForm;
