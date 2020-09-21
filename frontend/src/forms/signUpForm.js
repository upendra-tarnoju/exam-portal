import React from 'react';
import { Form } from 'react-bootstrap';
import { Formik } from 'formik';
import Button from '@material-ui/core/Button';

import schema from '../schema/signUpSchema';
import UserService from '../services/userApi';

let SignUpForm = ({ showModal }) => {
	return (
		<Formik
			validationSchema={schema}
			onSubmit={(values) => {
				let userService = new UserService();

				userService.saveNewUsers(values).then((response) => {
					showModal(response.data.msg);
				});
			}}
			initialValues={{
				firstName: '',
				lastName: '',
				mobileNumber: '',
				email: '',
				password: '',
				accountType: '',
			}}
		>
			{({ values, errors, handleChange, handleBlur, handleSubmit }) => (
				<Form noValidate onSubmit={handleSubmit}>
					<div className='row'>
						<div className='col-md-6'>
							<Form.Group>
								<Form.Label>First name</Form.Label>
								<Form.Control
									type='text'
									name='firstName'
									placeholder='First name'
									value={values.firstName}
									onBlur={handleBlur}
									onChange={handleChange}
									isInvalid={!!errors.firstName}
									required
								/>
								<Form.Control.Feedback type='invalid'>
									{errors.firstName}
								</Form.Control.Feedback>
							</Form.Group>
						</div>
						<div className='col-md-6'>
							<Form.Group>
								<Form.Label>Last name</Form.Label>
								<Form.Control
									type='text'
									name='lastName'
									placeholder='First name'
									value={values.lastName}
									onBlur={handleBlur}
									onChange={handleChange}
									isInvalid={!!errors.lastName}
									required
								/>
								<Form.Control.Feedback type='invalid'>
									{errors.lastName}
								</Form.Control.Feedback>
							</Form.Group>
						</div>
					</div>
					<Form.Group>
						<Form.Label>Mobile number</Form.Label>
						<Form.Control
							type='text'
							name='mobileNumber'
							placeholder='Mobile number'
							value={values.mobileNumber}
							onBlur={handleBlur}
							onChange={handleChange}
							isInvalid={!!errors.mobileNumber}
							required
						/>
						<Form.Control.Feedback type='invalid'>
							{errors.mobileNumber}
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group>
						<Form.Label>Email Address</Form.Label>
						<Form.Control
							type='text'
							name='email'
							placeholder='Email address'
							value={values.email}
							onBlur={handleBlur}
							onChange={handleChange}
							isInvalid={!!errors.email}
							required
						/>
						<Form.Control.Feedback type='invalid'>
							{errors.email}
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group>
						<Form.Label>Password</Form.Label>
						<Form.Control
							type='password'
							name='password'
							placeholder='Password'
							value={values.password}
							onBlur={handleBlur}
							onChange={handleChange}
							isInvalid={!!errors.password}
							required
						/>
						<Form.Control.Feedback type='invalid'>
							{errors.password}
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group>
						<Form.Label>Account Type</Form.Label>
						<Form.Control
							as='select'
							name='accountType'
							onBlur={handleBlur}
							onChange={handleChange}
							isInvalid={!!errors.accountType}
						>
							<option value='none'>Select account type</option>
							<option value='student'>Student</option>
							<option value='examiner'>Examiner</option>
						</Form.Control>
						<Form.Control.Feedback type='invalid'>
							{errors.accountType}
						</Form.Control.Feedback>
					</Form.Group>
					<div className='d-flex justify-content-end'>
						<Button type='submit' variant='contained' color='primary'>
							Sign Up
						</Button>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default SignUpForm;
