import React from 'react';
import { Formik } from 'formik';
import moment from 'moment';
import { MenuItem, TextField } from '@material-ui/core';

import schema from '../../schema/student/editStudentSchema';
import ExaminerService from '../../services/examinerApi';

let gender = [
	{ value: 'male', label: 'Male' },
	{ value: 'female', label: 'Female' },
];

const EditStudentForm = (props) => {
	return (
		<Formik
			innerRef={props.studentRef}
			validationSchema={schema}
			initialValues={{
				firstName: props.student.userData.firstName,
				lastName: props.student.userData.lastName,
				gender: props.student.gender,
				email: props.student.userData.email,
				studentId: props.student.studentId,
				mobileNumber: props.student.userData.mobileNumber,
				fatherName: props.student.fatherName,
				motherName: props.student.motherName,
				dob: props.student.dob,
				address: props.student.address,
			}}
			onSubmit={(values) => {
				let examinerService = new ExaminerService();
				examinerService.updateStudent(props.student._id, values).then((res) => {
					let data = res.data;
					props.updateStudent(data.personalDetails, data.otherDetails);
				});
			}}
		>
			{(formikProps) => (
				<div className='container'>
					<h4>Personal details</h4>
					<div className='row mb-4'>
						<div className='col-md-6'>
							<TextField
								variant='outlined'
								name='firstName'
								label='First name'
								defaultValue={formikProps.values.firstName}
								helperText={formikProps.errors.firstName}
								onChange={formikProps.handleChange}
								onBlur={formikProps.handleBlur}
								error={formikProps.errors.firstName}
								fullWidth
							/>
						</div>
						<div className='col-md-6'>
							<TextField
								variant='outlined'
								name='lastName'
								label='Last name'
								defaultValue={formikProps.values.lastName}
								helperText={formikProps.errors.lastName}
								onChange={formikProps.handleChange}
								onBlur={formikProps.handleBlur}
								error={formikProps.errors.lastName}
								fullWidth
							/>
						</div>
					</div>
					<div className='row mb-4'>
						<div className='col-md-6'>
							<TextField
								variant='outlined'
								label='Gender'
								name='gender'
								fullWidth
								defaultValue={formikProps.values.gender}
								helperText={formikProps.errors.gender}
								onChange={formikProps.handleChange}
								onBlur={formikProps.handleBlur}
								error={formikProps.errors.gender}
								select
							>
								{gender.map((option) => (
									<MenuItem key={option.value} value={option.value}>
										{option.label}
									</MenuItem>
								))}
							</TextField>
						</div>
						<div className='col-md-6'>
							<TextField
								variant='outlined'
								label='Email'
								name='email'
								fullWidth
								defaultValue={formikProps.values.email}
								helperText={formikProps.errors.email}
								onChange={formikProps.handleChange}
								onBlur={formikProps.handleBlur}
								error={formikProps.errors.email}
							/>
						</div>
					</div>
					<div className='row mb-4'>
						<div className='col-md-6'>
							<TextField
								variant='outlined'
								label='Student ID'
								name='studentId'
								fullWidth
								defaultValue={formikProps.values.studentId}
								helperText={formikProps.errors.studentId}
								onChange={formikProps.handleChange}
								onBlur={formikProps.handleBlur}
								error={formikProps.errors.studentId}
							/>
						</div>
						<div className='col-md-6'>
							<TextField
								variant='outlined'
								label='Mobile number'
								name='mobileNumber'
								fullWidth
								defaultValue={formikProps.values.mobileNumber}
								helperText={formikProps.errors.mobileNumber}
								onChange={formikProps.handleChange}
								onBlur={formikProps.handleBlur}
								error={formikProps.errors.mobileNumber}
							/>
						</div>
					</div>

					<h4>Other details</h4>
					<div className='row mb-4'>
						<div className='col-md-6'>
							<TextField
								variant='outlined'
								label='Father name'
								name='fatherName'
								fullWidth
								defaultValue={formikProps.values.fatherName}
								helperText={formikProps.errors.fatherName}
								onChange={formikProps.handleChange}
								onBlur={formikProps.handleBlur}
								error={formikProps.errors.fatherName}
							/>
						</div>
						<div className='col-md-6'>
							<TextField
								variant='outlined'
								label='Mother name'
								name='motherName'
								fullWidth
								defaultValue={formikProps.values.motherName}
								helperText={formikProps.errors.motherName}
								onChange={formikProps.handleChange}
								onBlur={formikProps.handleBlur}
								error={formikProps.errors.motherName}
							/>
						</div>
					</div>
					<div className='row mb-4'>
						<div className='col-md-6'>
							<TextField
								variant='outlined'
								label='Date of birth'
								name='dob'
								fullWidth
								type='date'
								defaultValue={moment(formikProps.values.dob).format(
									'yyyy-MM-DD'
								)}
								InputLabelProps={{ shrink: true }}
								helperText={formikProps.errors.dob}
								onChange={formikProps.handleChange}
								onBlur={formikProps.handleBlur}
								error={formikProps.errors.dob}
							/>
						</div>
						<div className='col-md-6'>
							<TextField
								variant='outlined'
								label='Home address'
								name='address'
								fullWidth
								defaultValue={formikProps.values.address}
								helperText={formikProps.errors.address}
								onChange={formikProps.handleChange}
								onBlur={formikProps.handleBlur}
								error={formikProps.errors.address}
							/>
						</div>
					</div>
				</div>
			)}
		</Formik>
	);
};

export default EditStudentForm;
