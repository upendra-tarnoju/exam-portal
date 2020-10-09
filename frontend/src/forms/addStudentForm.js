import React from 'react';
import { Formik } from 'formik';
import { Form } from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import { Typeahead } from 'react-bootstrap-typeahead';

import schema from '../schema/studentSchema';
import ExaminerService from '../services/examinerApi';

let AddStudentForm = ({
	examCode,
	resetViewStudents,
	handleSuccessSnackBar,
	handleErrorSnackBar,
}) => {
	let filterByCallback = (option, data) => {
		let text = data.text;
		return option.examCode.toLowerCase().indexOf(text.toLowerCase()) !== -1;
	};
	return (
		<Formik
			validationSchema={schema}
			onSubmit={(values) => {
				let examinerService = new ExaminerService();
				examinerService
					.saveNewStudent(values)
					.then((response) => {
						let msg = response.data.msg;
						resetViewStudents();
						handleSuccessSnackBar(true, msg);
					})
					.catch((err) => {
						let msg = err.response.data.msg;
						handleErrorSnackBar(true, msg);
					});
			}}
			initialValues={{
				firstName: '',
				lastName: '',
				email: '',
				mobileNumber: '',
				password: '',
				fatherName: '',
				motherName: '',
				dob: '',
				address: '',
				examCode: '',
				studentId: '',
			}}
		>
			{({
				touched,
				values,
				errors,
				handleChange,
				handleBlur,
				handleSubmit,
				setFieldValue,
				setFieldTouched,
			}) => (
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
									isInvalid={touched.firstName && !!errors.firstName}
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
									placeholder='Last name'
									value={values.lastName}
									onBlur={handleBlur}
									onChange={handleChange}
									isInvalid={touched.lastName && !!errors.lastName}
									required
								/>
								<Form.Control.Feedback type='invalid'>
									{errors.lastName}
								</Form.Control.Feedback>
							</Form.Group>
						</div>
					</div>
					<Form.Group>
						<Form.Label>Exam code</Form.Label>
						<Typeahead
							id='typeahead'
							filterBy={filterByCallback}
							onBlur={(event) => setFieldTouched('examCode', true)}
							isInvalid={touched.examCode && !!errors.examCode}
							labelKey='examCode'
							placeholder='Exam code'
							options={examCode}
							highlightOnlyResult={true}
							onChange={(selected) => {
								if (selected.length !== 0) {
									setFieldValue('examCode', selected[0]._id);
								} else {
									setFieldValue('examCode', '');
								}
							}}
							renderMenuItemChildren={(option) => (
								<div>
									<div id={option._id}>{option.examCode}</div>
								</div>
							)}
						/>
						{touched.examCode ? (
							<div className='d-block invalid-feedback'>
								{errors.examCode}
							</div>
						) : null}
					</Form.Group>
					<div className='row'>
						<div className='col-md-6'>
							<Form.Group>
								<Form.Label>Father name</Form.Label>
								<Form.Control
									type='text'
									name='fatherName'
									placeholder='Father name'
									value={values.fatherName}
									onBlur={handleBlur}
									onChange={handleChange}
									isInvalid={touched.fatherName && !!errors.fatherName}
									required
								/>
								<Form.Control.Feedback type='invalid'>
									{errors.fatherName}
								</Form.Control.Feedback>
							</Form.Group>
						</div>
						<div className='col-md-6'>
							<Form.Group>
								<Form.Label>Mother name</Form.Label>
								<Form.Control
									type='text'
									name='motherName'
									placeholder='Mother name'
									value={values.motherName}
									onBlur={handleBlur}
									onChange={handleChange}
									isInvalid={touched.motherName && !!errors.motherName}
									required
								/>
								<Form.Control.Feedback type='invalid'>
									{errors.motherName}
								</Form.Control.Feedback>
							</Form.Group>
						</div>
					</div>
					<Form.Group>
						<Form.Label>Address</Form.Label>
						<Form.Control
							type='text'
							name='address'
							placeholder='Address'
							value={values.address}
							onBlur={handleBlur}
							onChange={handleChange}
							isInvalid={touched.address && !!errors.address}
							required
						/>
						<Form.Control.Feedback type='invalid'>
							{errors.address}
						</Form.Control.Feedback>
					</Form.Group>
					<div className='row'>
						<div className='col-md-6'>
							<Form.Group>
								<Form.Label>Mobile number</Form.Label>
								<Form.Control
									type='text'
									name='mobileNumber'
									placeholder='Mobile number'
									value={values.mobileNumber}
									onBlur={handleBlur}
									onChange={handleChange}
									isInvalid={
										touched.mobileNumber && !!errors.mobileNumber
									}
									required
								/>
								<Form.Control.Feedback type='invalid'>
									{errors.mobileNumber}
								</Form.Control.Feedback>
							</Form.Group>
						</div>
						<div className='col-md-6'>
							<Form.Group>
								<Form.Label>Date of birth</Form.Label>
								<Form.Control
									type='date'
									name='dob'
									placeholder='Date of birth'
									value={values.dob}
									onBlur={handleBlur}
									onChange={handleChange}
									isInvalid={touched.dob && !!errors.dob}
									required
								/>
								<Form.Control.Feedback type='invalid'>
									{errors.dob}
								</Form.Control.Feedback>
							</Form.Group>
						</div>
					</div>
					<Form.Group>
						<Form.Label>Student ID</Form.Label>
						<Form.Control
							type='text'
							name='studentId'
							placeholder='Student Roll no'
							value={values.studentId}
							onBlur={handleBlur}
							onChange={handleChange}
							isInvalid={touched.studentId && !!errors.studentId}
							required
						/>
						<Form.Control.Feedback type='invalid'>
							{errors.studentId}
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
							isInvalid={touched.email && !!errors.email}
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
							isInvalid={touched.password && !!errors.password}
							required
						/>
						<Form.Control.Feedback type='invalid'>
							{errors.password}
						</Form.Control.Feedback>
					</Form.Group>

					<div className='d-flex justify-content-end'>
						<Button type='submit' variant='contained' color='primary'>
							Create
						</Button>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default AddStudentForm;
