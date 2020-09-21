import React from 'react';
import { Formik } from 'formik';
import { Form } from 'react-bootstrap';
import Button from '@material-ui/core/Button';

import schema from '../schema/loginSchema';
import UserService from '../services/userApi';

let LoginForm = ({ handleLogin, handleError }) => {
	return (
		<Formik
			validationSchema={schema}
			onSubmit={(values) => {
				let userService = new UserService();
				userService
					.loginExisitingUser(values)
					.then((response) => {
						let data = response.data;
						handleLogin(data);
					})
					.catch((error) => {
						handleError(error);
					});
			}}
			initialValues={{
				email: '',
				password: '',
			}}
		>
			{({ values, errors, handleChange, handleBlur, handleSubmit }) => (
				<Form noValidate onSubmit={handleSubmit}>
					<div className='px-3 pb-4'>
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
						<div className='d-flex justify-content-end'>
							<Button variant='contained' color='primary' type='submit'>
								Login
							</Button>
						</div>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default LoginForm;
