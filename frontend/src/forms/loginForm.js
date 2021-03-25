import React from 'react';
import { Formik } from 'formik';
import {
	Button,
	FormControlLabel,
	Checkbox,
	TextField,
	Typography,
	Link,
	makeStyles,
} from '@material-ui/core';

import schema from '../schema/loginSchema';
import UserService from '../services/userApi';

const useStyles = makeStyles((theme) => ({
	checkBoxContainer: {
		[theme.breakpoints.up('sm')]: {
			display: 'block',
		},
	},
}));

let LoginForm = (props) => {
	const classes = useStyles();
	return (
		<Formik
			validationSchema={schema}
			onSubmit={(values) => {
				let userService = new UserService();
				userService
					.loginExisitingUser(values)
					.then((response) => {
						let data = response.data;
						props.handleLogin(data);
					})
					.catch((error) => {
						props.handleError(error);
					});
			}}
			initialValues={{
				email: '',
				password: '',
				rememberMe: false,
			}}
		>
			{(formikProps) => (
				<form noValidate onSubmit={formikProps.handleSubmit}>
					<div className='p-3'>
						<TextField
							name='email'
							variant='outlined'
							label='Email'
							value={formikProps.values.email}
							onChange={formikProps.handleChange}
							onBlur={formikProps.handleBlur}
							helperText={
								formikProps.touched.email ? formikProps.errors.email : ''
							}
							error={
								formikProps.touched.email && Boolean(formikProps.errors.email)
							}
							margin='dense'
							placeholder='Enter valid email'
							fullWidth
						/>
						<TextField
							name='password'
							variant='outlined'
							label='Password'
							type='password'
							value={formikProps.values.password}
							onChange={formikProps.handleChange}
							onBlur={formikProps.handleBlur}
							helperText={
								formikProps.touched.password ? formikProps.errors.password : ''
							}
							error={
								formikProps.touched.password &&
								Boolean(formikProps.errors.password)
							}
							margin='dense'
							placeholder='Enter password'
							fullWidth
						/>
						<div className='d-flex justify-content-between'>
							<FormControlLabel
								control={
									<Checkbox
										color='primary'
										checked={formikProps.values.rememberMe}
										name='rememberMe'
										checked={formikProps.values.rememberMe}
										value={formikProps.values.rememberMe}
										onChange={(event) =>
											formikProps.setFieldValue(
												'rememberMe',
												event.target.checked
											)
										}
									/>
								}
								label='Remember me'
								name='rememberMe'
								className='align-self-center'
							/>
							<Link href='#' className='mt-2 text-dark'>
								Forget password
							</Link>
						</div>
						<div className='d-flex justify-content-center'>
							<Button
								variant='contained'
								color='primary'
								type='submit'
								size='large'
							>
								Login
							</Button>
						</div>
						<Typography component='p' className='mb-0 mt-1 text-center'>
							Don't have an account ?{' '}
							<Link
								href='/signup'
								className='text-danger font-weight-bold cursor-pointer'
							>
								Register
							</Link>
						</Typography>
					</div>
				</form>
			)}
		</Formik>
	);
};

export default LoginForm;
