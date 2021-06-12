import React from 'react';
import { Form } from 'react-bootstrap';
import { Formik } from 'formik';
import { TextField, Button, CircularProgress } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

import schema from '../schema/signUpSchema';
import UserService from '../services/userApi';

let SignUpForm = (props) => {
	const [open, setOpen] = React.useState(false);
	const [options, setOptions] = React.useState([]);
	const loading = open && options.length === 0;

	React.useEffect(() => {
		let active = true;

		if (!loading) {
			return undefined;
		}

		(async () => {
			let userService = new UserService();
			let response = await userService.getCollegeList();
			let colleges = response.data.collegeList;

			if (active) {
				setOptions(colleges);
			}
		})();

		return () => {
			active = false;
		};
	}, [loading]);

	React.useEffect(() => {
		if (!open) {
			setOptions([]);
		}
	}, [open]);

	return (
		<Formik
			validationSchema={schema}
			onSubmit={(values) => {
				let userService = new UserService();
				console.log(values);

				userService.saveNewUsers(values).then((response) => {
					props.showModal(response.data.msg);
				});
			}}
			initialValues={{
				firstName: '',
				lastName: '',
				mobileNumber: '',
				email: '',
				password: '',
				college: '',
			}}
		>
			{(formikProps) => (
				<Form noValidate onSubmit={formikProps.handleSubmit}>
					<div className='row mt-3'>
						<div className='col-md-6'>
							<TextField
								variant='outlined'
								className='w-100'
								name='firstName'
								label='First name'
								value={formikProps.values.firstName}
								onChange={formikProps.handleChange}
								onBlur={formikProps.handleBlur}
								error={
									formikProps.touched.firstName &&
									!!formikProps.errors.firstName
								}
								helperText={
									formikProps.touched.firstName && formikProps.errors.firstName
								}
							/>
						</div>
						<div className='col-md-6'>
							<TextField
								variant='outlined'
								className='w-100'
								name='lastName'
								label='Last name'
								value={formikProps.values.lastName}
								onChange={formikProps.handleChange}
								onBlur={formikProps.handleBlur}
								error={
									formikProps.touched.lastName && !!formikProps.errors.lastName
								}
								helperText={
									formikProps.touched.lastName && formikProps.errors.lastName
								}
							/>
						</div>
					</div>
					<TextField
						variant='outlined'
						className='w-100 mt-3'
						name='mobileNumber'
						label='Mobile number'
						value={formikProps.values.mobileNumber}
						onChange={(event) => {
							let regex = /^[0-9\b]+$/;
							if (regex.test(event.target.value) || event.target.value === '') {
								formikProps.setFieldValue('mobileNumber', event.target.value);
							}
						}}
						onBlur={formikProps.handleBlur}
						error={
							formikProps.touched.mobileNumber &&
							!!formikProps.errors.mobileNumber
						}
						helperText={
							formikProps.touched.mobileNumber &&
							formikProps.errors.mobileNumber
						}
					/>
					<Autocomplete
						style={{ width: 300 }}
						open={open}
						onOpen={() => {
							setOpen(true);
						}}
						onClose={() => {
							setOpen(false);
						}}
						getOptionSelected={(option, value) => option.name === value.name}
						getOptionLabel={(option) => option.name}
						options={options}
						loading={loading}
						className='w-100 mt-3'
						onChange={(e, college) => {
							formikProps.setFieldValue('college', college);
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								label='College'
								variant='outlined'
								error={
									formikProps.touched.college && !!formikProps.errors.college
								}
								helperText={
									formikProps.touched.college && formikProps.errors.college
								}
								onBlur={formikProps.handleBlur}
								InputProps={{
									...params.InputProps,
									endAdornment: (
										<React.Fragment>
											{loading ? (
												<CircularProgress color='inherit' size={20} />
											) : null}
											{params.InputProps.endAdornment}
										</React.Fragment>
									),
								}}
							/>
						)}
					/>
					<TextField
						variant='outlined'
						className='w-100 mt-3'
						name='email'
						label='Email'
						value={formikProps.values.email}
						onChange={formikProps.handleChange}
						onBlur={formikProps.handleBlur}
						error={formikProps.touched.email && !!formikProps.errors.email}
						helperText={formikProps.touched.email && formikProps.errors.email}
					/>
					<TextField
						variant='outlined'
						className='w-100 mt-3'
						name='password'
						label='Password'
						type='password'
						value={formikProps.values.password}
						onChange={formikProps.handleChange}
						onBlur={formikProps.handleBlur}
						error={
							formikProps.touched.password && !!formikProps.errors.password
						}
						helperText={
							formikProps.touched.password && formikProps.errors.password
						}
					/>
					<div className='d-flex justify-content-end mt-3'>
						<Button
							type='submit'
							variant='contained'
							className='bg-dark text-white'
						>
							Request for Sign Up
						</Button>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default SignUpForm;
