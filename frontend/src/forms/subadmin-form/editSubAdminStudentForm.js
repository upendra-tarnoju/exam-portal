import React from 'react';
import {
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
} from '@material-ui/core';
import { Formik } from 'formik';
import DateFnsUtils from '@date-io/date-fns';
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from '@material-ui/pickers';

import schema from '../../schema/student/editStudentSchema';

const EditSubAdminStudentForm = (props) => {
	return (
		<Formik
			enableReinitialize
			validationSchema={schema}
			initialValues={{
				firstName: props.studentDetails.firstName,
				lastName: props.studentDetails.lastName,
				studentId: props.studentDetails.studentId,
				mobileNumber: props.studentDetails.mobileNumber,
				email: props.studentDetails.email,
				dob: new Date(props.studentDetails.dob),
				fatherName: props.studentDetails.fatherName,
				motherName: props.studentDetails.motherName,
				gender: props.studentDetails.gender,
				address: props.studentDetails.address,
				city: props.studentDetails.city,
				state: props.studentDetails.state,
			}}
			onSubmit={(values) => props.updateStudent(values)}
		>
			{(formikProps) => (
				<form noValidate onSubmit={formikProps.handleSubmit}>
					<div className='container py-3'>
						<Typography variant='h6' className='mb-2'>
							Personal Info
						</Typography>
						<div className='row mb-4'>
							<div className='col-md-4'>
								<TextField
									name='firstName'
									variant='outlined'
									label='First name'
									value={formikProps.values.firstName}
									onChange={formikProps.handleChange}
									onBlur={formikProps.handleBlur}
									helperText={
										formikProps.touched.firstName
											? formikProps.errors.firstName
											: ''
									}
									error={
										formikProps.touched.firstName &&
										Boolean(formikProps.errors.firstName)
									}
									placeholder='First name'
									className='w-100'
								/>
							</div>
							<div className='col-md-4'>
								<TextField
									name='lastName'
									variant='outlined'
									label='Last name'
									value={formikProps.values.lastName}
									onChange={formikProps.handleChange}
									onBlur={formikProps.handleBlur}
									helperText={
										formikProps.touched.lastName
											? formikProps.errors.lastName
											: ''
									}
									error={
										formikProps.touched.lastName &&
										Boolean(formikProps.errors.lastName)
									}
									placeholder='Last name'
									className='w-100'
								/>
							</div>
							<div className='col-md-4'>
								<TextField
									name='studentId'
									variant='outlined'
									label='Student ID'
									value={formikProps.values.studentId}
									onChange={formikProps.handleChange}
									onBlur={formikProps.handleBlur}
									helperText={
										formikProps.touched.studentId
											? formikProps.errors.studentId
											: ''
									}
									error={
										formikProps.touched.studentId &&
										Boolean(formikProps.errors.studentId)
									}
									placeholder='Student ID'
									className='w-100'
								/>
							</div>
						</div>
						<div className='row mb-4'>
							<div className='col-md-4'>
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
										formikProps.touched.email &&
										Boolean(formikProps.errors.email)
									}
									placeholder='Email'
									className='w-100'
								/>
							</div>
							<div className='col-md-4'>
								<TextField
									name='mobileNumber'
									variant='outlined'
									label='Mobile number'
									value={formikProps.values.mobileNumber}
									onChange={formikProps.handleChange}
									onBlur={formikProps.handleBlur}
									helperText={
										formikProps.touched.mobileNumber
											? formikProps.errors.mobileNumber
											: ''
									}
									error={
										formikProps.touched.mobileNumber &&
										Boolean(formikProps.errors.mobileNumber)
									}
									placeholder='Mobile number'
									className='w-100'
								/>
							</div>
							<div className='col-md-4'>
								<MuiPickersUtilsProvider utils={DateFnsUtils}>
									<KeyboardDatePicker
										className='w-100'
										label='date of birth'
										inputVariant='outlined'
										format='MM-dd-yyyy'
										name='dob'
										value={formikProps.values.dob}
										defaultValue={formikProps.values.dob}
										onChange={(dob) => formikProps.setFieldValue('dob', dob)}
										helperText={
											formikProps.touched.dob && formikProps.errors.dob
										}
										error={Boolean(
											formikProps.touched.dob && !!formikProps.errors.dob
										)}
									/>
								</MuiPickersUtilsProvider>
							</div>
						</div>
						<Typography variant='h6' className='mb-2'>
							Other Info
						</Typography>
						<div className='row mb-4'>
							<div className='col-md-4'>
								<TextField
									name='fatherName'
									variant='outlined'
									label='Father name'
									value={formikProps.values.fatherName}
									onChange={formikProps.handleChange}
									onBlur={formikProps.handleBlur}
									helperText={
										formikProps.touched.fatherName
											? formikProps.errors.fatherName
											: ''
									}
									error={
										formikProps.touched.fatherName &&
										Boolean(formikProps.errors.fatherName)
									}
									placeholder='Father name'
									className='w-100'
								/>
							</div>
							<div className='col-md-4'>
								<TextField
									name='motherName'
									variant='outlined'
									label='Mother name'
									value={formikProps.values.motherName}
									onChange={formikProps.handleChange}
									onBlur={formikProps.handleBlur}
									helperText={
										formikProps.touched.motherName
											? formikProps.errors.motherName
											: ''
									}
									error={
										formikProps.touched.motherName &&
										Boolean(formikProps.errors.motherName)
									}
									placeholder='Mother name'
									className='w-100'
								/>
							</div>
							<div className='col-md-4'>
								<TextField
									name='address'
									variant='outlined'
									label='Address'
									value={formikProps.values.address}
									onChange={formikProps.handleChange}
									onBlur={formikProps.handleBlur}
									helperText={
										formikProps.touched.address
											? formikProps.errors.address
											: ''
									}
									error={
										formikProps.touched.address &&
										Boolean(formikProps.errors.address)
									}
									placeholder='Address'
									className='w-100'
								/>
							</div>
						</div>
						<div className='row mb-4'>
							<div className='col-md-4'>
								<TextField
									name='city'
									variant='outlined'
									label='City'
									value={formikProps.values.city}
									onChange={formikProps.handleChange}
									onBlur={formikProps.handleBlur}
									helperText={
										formikProps.touched.city ? formikProps.errors.city : ''
									}
									error={
										formikProps.touched.city && Boolean(formikProps.errors.city)
									}
									placeholder='City'
									className='w-100'
								/>
							</div>
							<div className='col-md-4'>
								<TextField
									name='state'
									variant='outlined'
									label='State'
									value={formikProps.values.state}
									onChange={formikProps.handleChange}
									onBlur={formikProps.handleBlur}
									helperText={
										formikProps.touched.state ? formikProps.errors.state : ''
									}
									error={
										formikProps.touched.state &&
										Boolean(formikProps.errors.state)
									}
									placeholder='State'
									className='w-100'
								/>
							</div>
							<div className='col-md-4'>
								<FormControl variant='outlined' className='w-100'>
									<InputLabel id='demo-simple-select-outlined-label'>
										Gender
									</InputLabel>
									<Select
										labelId='demo-simple-select-outlined-label'
										id='demo-simple-select-outlined'
										value={formikProps.values.gender}
										onChange={formikProps.handleChange}
										label='Gender'
									>
										<MenuItem value='male'>Male</MenuItem>
										<MenuItem value='female'>Female</MenuItem>
										<MenuItem value='others'>others</MenuItem>
									</Select>
								</FormControl>
							</div>
						</div>
						<Button
							variant='outlined'
							type='submit'
							className='bg-dark text-white'
							size='large'
						>
							Save
						</Button>
					</div>
				</form>
			)}
		</Formik>
	);
};

export default EditSubAdminStudentForm;
