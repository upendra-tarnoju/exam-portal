import React from 'react';
import {
	Button,
	FormControl,
	FormHelperText,
	MenuItem,
	Select,
	TextField,
	Typography,
} from '@material-ui/core';
import { Formik } from 'formik';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import moment from 'moment';

import schema from '../../schema/student/newStudentSchema';

const NewStudentForm = (props) => {
	const inputFile = React.useRef(null);

	return (
		<Formik
			initialValues={{
				firstName: '',
				lastName: '',
				fatherName: '',
				motherName: '',
				studentId: '',
				mobileNumber: '',
				address: '',
				city: '',
				state: '',
				email: '',
				password: '',
				dob: '',
				gender: '',
			}}
			validationSchema={schema}
			onSubmit={(values) => props.handleSubmit(values)}
		>
			{(formikProps) => (
				<form onSubmit={formikProps.handleSubmit}>
					<div className='container'>
						<Typography variant='h5'>Personal details</Typography>
						<div className='d-flex justify-content-center'>
							<img
								id='studentImage'
								alt='pic'
								src={
									props.image === null
										? require('../../assets/user-image.png')
										: props.image
								}
								width='100px'
								height='100px'
								onClick={() => inputFile.current.click()}
								className='cursor-pointer'
							/>
							<input
								accept='.png, .jpg, .jpeg'
								className='d-none'
								ref={inputFile}
								id='studentImage'
								onChange={props.handleImageChange}
								type='file'
								onClick={(event) => (event.target.value = null)}
							/>
						</div>
						<div className='row pt-3'>
							<div className='col-md-6'>
								<Typography variant='body1' className='mb-1'>
									First name
								</Typography>
								<TextField
									variant='outlined'
									name='firstName'
									placeholder='First name'
									value={formikProps.values.firstName}
									onChange={formikProps.handleChange}
									onBlur={formikProps.handleBlur}
									error={
										formikProps.touched.firstName &&
										!!formikProps.errors.firstName
									}
									helperText={
										formikProps.touched.firstName &&
										formikProps.errors.firstName
									}
									fullWidth
								/>
							</div>
							<div className='col-md-6'>
								<Typography variant='body1' className='mb-1'>
									Last name
								</Typography>
								<TextField
									variant='outlined'
									name='lastName'
									placeholder='Last name'
									value={formikProps.values.lastName}
									onChange={formikProps.handleChange}
									onBlur={formikProps.handleBlur}
									error={
										formikProps.touched.lastName &&
										!!formikProps.errors.lastName
									}
									helperText={
										formikProps.touched.lastName && formikProps.errors.lastName
									}
									fullWidth
								/>
							</div>
						</div>
						<div className='row pt-3'>
							<div className='col-md-6'>
								<Typography variant='body1' className='mb-1'>
									Father name
								</Typography>
								<TextField
									variant='outlined'
									placeholder='Father name'
									name='fatherName'
									fullWidth
									value={formikProps.values.fatherName}
									onChange={formikProps.handleChange}
									onBlur={formikProps.handleBlur}
									error={
										formikProps.touched.fatherName &&
										!!formikProps.errors.fatherName
									}
									helperText={
										formikProps.touched.fatherName &&
										formikProps.errors.fatherName
									}
								/>
							</div>
							<div className='col-md-6'>
								<Typography variant='body1' className='mb-1'>
									Mother name
								</Typography>
								<TextField
									variant='outlined'
									placeholder='Mother name'
									name='motherName'
									fullWidth
									value={formikProps.values.motherName}
									onChange={formikProps.handleChange}
									onBlur={formikProps.handleBlur}
									error={
										formikProps.touched.motherName &&
										!!formikProps.errors.motherName
									}
									helperText={
										formikProps.touched.motherName &&
										formikProps.errors.motherName
									}
								/>
							</div>
						</div>
						<div className='row pt-3'>
							<div className='col-md-12'>
								<Typography variant='body1' className='mb-1'>
									Address
								</Typography>
								<TextField
									variant='outlined'
									placeholder='Home address'
									name='address'
									fullWidth
									value={formikProps.values.address}
									onChange={formikProps.handleChange}
									onBlur={formikProps.handleBlur}
									error={
										formikProps.touched.address && !!formikProps.errors.address
									}
									helperText={
										formikProps.touched.address && formikProps.errors.address
									}
								/>
							</div>
						</div>
						<div className='row pt-3'>
							<div className='col-md-6'>
								<Typography variant='body1' className='mb-1'>
									City
								</Typography>
								<TextField
									variant='outlined'
									placeholder='City'
									name='city'
									fullWidth
									value={formikProps.values.city}
									onChange={formikProps.handleChange}
									onBlur={formikProps.handleBlur}
									error={formikProps.touched.city && !!formikProps.errors.city}
									helperText={
										formikProps.touched.city && formikProps.errors.city
									}
								/>
							</div>
							<div className='col-md-6'>
								<Typography variant='body1' className='mb-1'>
									State
								</Typography>
								<TextField
									variant='outlined'
									placeholder='State'
									name='state'
									fullWidth
									value={formikProps.values.state}
									onChange={formikProps.handleChange}
									onBlur={formikProps.handleBlur}
									error={
										formikProps.touched.state && !!formikProps.errors.state
									}
									helperText={
										formikProps.touched.state && formikProps.errors.state
									}
								/>
							</div>
						</div>
						<div className='row pt-3'>
							<div className='col-md-6'>
								<Typography variant='body1' className='mb-1'>
									Date of birth
								</Typography>
								<MuiPickersUtilsProvider utils={DateFnsUtils}>
									<DatePicker
										className='w-100'
										placeholder='Date of birth'
										inputVariant='outlined'
										name='dob'
										value={formikProps.values.dob || null}
										onChange={(dob) => {
											dob = moment(dob, 'dd-MM-YYYY').valueOf();
											formikProps.setFieldValue('dob', dob);
										}}
										format={'dd-MM-yyyy'}
										onBlur={formikProps.handleBlur}
										helperText={
											formikProps.touched.dob && formikProps.errors.dob
										}
										error={Boolean(
											formikProps.touched.dob && !!formikProps.errors.dob
										)}
									/>
								</MuiPickersUtilsProvider>
							</div>
							<div className='col-md-6'>
								<Typography variant='body1' className='mb-1'>
									Gender
								</Typography>
								<FormControl variant='outlined' className='w-100'>
									<Select
										value={formikProps.values.gender}
										onChange={formikProps.handleChange}
										onBlur={formikProps.handleBlur}
										error={
											formikProps.touched.gender && !!formikProps.errors.gender
										}
										placeholder='Gender'
										inputProps={{
											name: 'gender',
											id: 'outlined-age-native-simple',
										}}
									>
										<MenuItem value='male'>Male</MenuItem>
										<MenuItem value='female'>Female</MenuItem>
										<MenuItem value='other'>other</MenuItem>
									</Select>
									<FormHelperText error>
										{formikProps.touched.gender && formikProps.errors.gender}
									</FormHelperText>
								</FormControl>
							</div>
						</div>
						<Typography variant='h5' className='py-3'>
							College details
						</Typography>
						<div className='row'>
							<div className='col-md-6'>
								<Typography variant='body1' className='mb-1'>
									Email ID
								</Typography>
								<TextField
									variant='outlined'
									name='email'
									placeholder='Email ID'
									value={formikProps.values.email}
									onChange={formikProps.handleChange}
									onBlur={formikProps.handleBlur}
									error={
										formikProps.touched.email && !!formikProps.errors.email
									}
									helperText={
										formikProps.touched.email && formikProps.errors.email
									}
									fullWidth
								/>
							</div>
							<div className='col-md-6'>
								<Typography variant='body1' className='mb-1'>
									Password
								</Typography>
								<TextField
									variant='outlined'
									type='password'
									name='password'
									placeholder='Password'
									value={formikProps.values.password}
									onChange={formikProps.handleChange}
									onBlur={formikProps.handleBlur}
									error={
										formikProps.touched.password &&
										!!formikProps.errors.password
									}
									helperText={
										formikProps.touched.password && formikProps.errors.password
									}
									fullWidth
								/>
							</div>
						</div>
						<div className='row mt-3'>
							<div className='col-md-6'>
								<Typography variant='body1' className='mb-1'>
									Student ID
								</Typography>
								<TextField
									variant='outlined'
									name='studentId'
									placeholder='Student ID'
									value={formikProps.values.studentId}
									onChange={formikProps.handleChange}
									onBlur={formikProps.handleBlur}
									error={
										formikProps.touched.studentId &&
										!!formikProps.errors.studentId
									}
									helperText={
										formikProps.touched.studentId &&
										formikProps.errors.studentId
									}
									fullWidth
								/>
							</div>
							<div className='col-md-6'>
								<Typography variant='body1' className='mb-1'>
									Mobile number
								</Typography>
								<TextField
									variant='outlined'
									name='mobileNumber'
									inputProps={{ maxLength: 10 }}
									placeholder='Mobile number'
									value={formikProps.values.mobileNumber}
									onChange={(event) => {
										let regex = /^[0-9\b]+$/;
										if (
											regex.test(event.target.value) ||
											event.target.value === ''
										) {
											formikProps.setFieldValue(
												'mobileNumber',
												event.target.value
											);
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
									fullWidth
								/>
							</div>
						</div>
						<div className='d-flex justify-content-end mt-3'>
							<Button
								type='submit'
								variant='contained'
								className='bg-dark text-white'
								size='large'
							>
								Create
							</Button>
						</div>
					</div>
				</form>
			)}
		</Formik>
	);
};

export default NewStudentForm;
