import React from 'react';
import { Formik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import * as ActionTypes from '../action';
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
							<Button type='submit'>Login</Button>
						</div>
					</div>
				</Form>
			)}
		</Formik>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		setExaminerInputWindow: (status) => {
			dispatch({
				type: ActionTypes.SET_EXAMINER_INPUT_WINDOW,
				status: status,
			});
		},
	};
};

export default withRouter(connect(null, mapDispatchToProps)(LoginForm));
