import React from 'react';
import { Formik } from 'formik';
import { Form } from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';

import schema from '../../schema/personalDetailSchema';
import * as ActionTypes from '../../action';

let PersonalDetailsForm = (props) => {
	let handleBack = () => {
		props.history.goBack();
	};
	return (
		<Formik
			validationSchema={schema}
			onSubmit={(values) => {
				props.setStudentFields(values);
				props.scrollStepper(props.activeStep + 1);
			}}
			initialValues={props.personalDetails}
		>
			{({
				touched,
				values,
				errors,
				handleChange,
				handleBlur,
				handleSubmit,
			}) => (
				<Form noValidate onSubmit={handleSubmit} className='px-0'>
					<div className='card-body'>
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
										isInvalid={
											touched.firstName && !!errors.firstName
										}
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
										isInvalid={
											touched.fatherName && !!errors.fatherName
										}
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
										isInvalid={
											touched.motherName && !!errors.motherName
										}
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
						<Form.Group>
							<Form.Label>Gender</Form.Label>
							<Form.Control
								as='select'
								name='gender'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.gender}
								isInvalid={touched.gender && !!errors.gender}
								required
							>
								<option value='none'>Select gender</option>
								<option value='male'>Male</option>
								<option value='female'>Female</option>
							</Form.Control>
							<Form.Control.Feedback type='invalid'>
								{errors.gender}
							</Form.Control.Feedback>
						</Form.Group>
					</div>
					<div className='card-footer bg-dark'>
						<div className='d-flex justify-content-end'>
							<Button
								variant='contained'
								color='secondary'
								onClick={handleBack}
								className='mr-2'
							>
								Back
							</Button>
							<Button type='submit' variant='contained' color='primary'>
								Next
							</Button>
						</div>
					</div>
				</Form>
			)}
		</Formik>
	);
};

const mapStateToProps = (state) => {
	return {
		personalDetails: state.studentReducer.personalDetails,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setStudentFields: (data) => {
			dispatch({
				type: ActionTypes.CHANGE_STUDENT_FIELDS,
				data: data,
			});
		},
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PersonalDetailsForm);
